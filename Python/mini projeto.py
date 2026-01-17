# Mini Projeto - Sistema de Cadastro de Pessoas com Tkinter
import tkinter as tk
from tkinter import ttk, messagebox
import json
import os

# Lista para guardar os dicionários com dados das pessoas
pessoas = []

# Arquivo para armazenar os dados
ARQUIVO_DADOS = 'pessoas.json'

# Definição de cores
COR_PRIMARIA = '#2C3E50'
COR_SECUNDARIA = '#3498DB'
COR_SUCESSO = '#27AE60'
COR_FUNDO = '#ECF0F1'
COR_TEXTO = '#2C3E50'

class SistemaCadastro:
    def __init__(self, root):
        self.root = root
        self.root.title('Sistema de Cadastro de Pessoas')
        self.root.geometry('750x750')
        self.root.resizable(False, False)
        
        # Configurar cores e estilo
        self.root.configure(bg=COR_FUNDO)
        self.configurar_estilo()
        
        # Carregar dados ao iniciar
        self.carregar_dados()
        
        # Frame principal
        self.frame_principal = tk.Frame(root, bg=COR_FUNDO)
        self.frame_principal.pack(fill=tk.BOTH, expand=True)
        
        # Frame header
        self.frame_header = tk.Frame(self.frame_principal, bg=COR_PRIMARIA, height=100)
        self.frame_header.pack(fill=tk.X, padx=0, pady=0)
        
        # Título
        titulo = tk.Label(self.frame_header, text='📋 Sistema de Cadastro', 
                         font=('Segoe UI', 22, 'bold'), bg=COR_PRIMARIA, fg='white')
        titulo.pack(pady=15)
        
        subtitulo = tk.Label(self.frame_header, text='Gerenciador de Cadastro de Pessoas', 
                            font=('Segoe UI', 10), bg=COR_PRIMARIA, fg='#BDC3C7')
        subtitulo.pack()
        
        # Frame conteúdo
        self.frame_conteudo = tk.Frame(self.frame_principal, bg=COR_FUNDO)
        self.frame_conteudo.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # Frame para entrada de dados
        self.frame_entrada = tk.LabelFrame(self.frame_conteudo, text='Novo Cadastro', 
                                           bg=COR_FUNDO, fg=COR_TEXTO, font=('Segoe UI', 11, 'bold'),
                                           padx=15, pady=15)
        self.frame_entrada.pack(fill=tk.X, pady=10)
        
        # Nome
        tk.Label(self.frame_entrada, text='Nome:', bg=COR_FUNDO, fg=COR_TEXTO, 
                font=('Segoe UI', 10)).grid(row=0, column=0, sticky=tk.W, pady=8)
        self.entry_nome = tk.Entry(self.frame_entrada, width=35, font=('Segoe UI', 10),
                                   bg='white', fg=COR_TEXTO, relief=tk.FLAT, bd=1)
        self.entry_nome.grid(row=0, column=1, pady=8, padx=10)
        
        # Idade
        tk.Label(self.frame_entrada, text='Idade:', bg=COR_FUNDO, fg=COR_TEXTO,
                font=('Segoe UI', 10)).grid(row=1, column=0, sticky=tk.W, pady=8)
        self.entry_idade = tk.Entry(self.frame_entrada, width=35, font=('Segoe UI', 10),
                                    bg='white', fg=COR_TEXTO, relief=tk.FLAT, bd=1)
        self.entry_idade.grid(row=1, column=1, pady=8, padx=10)
        
        # Gênero
        tk.Label(self.frame_entrada, text='Gênero:', bg=COR_FUNDO, fg=COR_TEXTO,
                font=('Segoe UI', 10)).grid(row=2, column=0, sticky=tk.W, pady=8)
        self.combo_genero = ttk.Combobox(self.frame_entrada, values=['Masculino', 'Feminino', 'Outro'], 
                                         width=32, state='readonly', font=('Segoe UI', 10))
        self.combo_genero.grid(row=2, column=1, pady=8, padx=10)
        
        # Estado Civil
        tk.Label(self.frame_entrada, text='Estado Civil:', bg=COR_FUNDO, fg=COR_TEXTO,
                font=('Segoe UI', 10)).grid(row=3, column=0, sticky=tk.W, pady=8)
        self.combo_estado = ttk.Combobox(self.frame_entrada, 
                                        values=['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'], 
                                        width=32, state='readonly', font=('Segoe UI', 10))
        self.combo_estado.grid(row=3, column=1, pady=8, padx=10)
        
        # Cidade
        tk.Label(self.frame_entrada, text='Cidade:', bg=COR_FUNDO, fg=COR_TEXTO,
                font=('Segoe UI', 10)).grid(row=4, column=0, sticky=tk.W, pady=8)
        self.entry_cidade = tk.Entry(self.frame_entrada, width=35, font=('Segoe UI', 10),
                                     bg='white', fg=COR_TEXTO, relief=tk.FLAT, bd=1)
        self.entry_cidade.grid(row=4, column=1, pady=8, padx=10)
        
        # Botão Cadastrar
        self.btn_cadastrar = tk.Button(self.frame_entrada, text='✓ Cadastrar Pessoa', 
                                      command=self.cadastrar_pessoa, bg=COR_SECUNDARIA, 
                                      fg='white', font=('Segoe UI', 11, 'bold'),
                                      relief=tk.FLAT, padx=20, pady=10, cursor='hand2')
        self.btn_cadastrar.grid(row=5, column=0, columnspan=2, pady=20, sticky=tk.EW)
        
        # Frame para exibição
        self.frame_exibicao = tk.LabelFrame(self.frame_conteudo, text='Total de Cadastros: 0', 
                                           bg=COR_FUNDO, fg=COR_TEXTO, font=('Segoe UI', 11, 'bold'),
                                           padx=15, pady=15)
        self.frame_exibicao.pack(fill=tk.BOTH, expand=True, pady=10)
        
        # Frame de busca/filtragem
        self.frame_busca = tk.Frame(self.frame_conteudo, bg=COR_FUNDO)
        self.frame_busca.pack(fill=tk.X, pady=(0,10))
        tk.Label(self.frame_busca, text='Buscar:', bg=COR_FUNDO, fg=COR_TEXTO, font=('Segoe UI', 10)).pack(side=tk.LEFT)
        self.entry_busca = tk.Entry(self.frame_busca, width=30, font=('Segoe UI', 10))
        self.entry_busca.pack(side=tk.LEFT, padx=8)
        self.combo_filtro = ttk.Combobox(self.frame_busca, values=['Nome', 'Cidade', 'Gênero'], width=12, state='readonly')
        self.combo_filtro.set('Nome')
        self.combo_filtro.pack(side=tk.LEFT, padx=6)
        self.btn_buscar = tk.Button(self.frame_busca, text='🔎 Buscar', command=self.aplicar_filtro, bg='#95A5A6', fg='white', font=('Segoe UI', 10, 'bold'), relief=tk.FLAT, cursor='hand2')
        self.btn_buscar.pack(side=tk.LEFT, padx=6)
        self.btn_limpar_filtro = tk.Button(self.frame_busca, text='✖ Limpar Filtro', command=self.mostrar_cadastro, bg='#E67E22', fg='white', font=('Segoe UI', 10, 'bold'), relief=tk.FLAT, cursor='hand2')
        self.btn_limpar_filtro.pack(side=tk.LEFT, padx=6)

        # Treeview para listar cadastros
        columns = ('nome', 'idade', 'genero', 'estado_civil', 'cidade')
        self.tree = ttk.Treeview(self.frame_exibicao, columns=columns, show='headings', selectmode='browse')
        self.tree.heading('nome', text='Nome')
        self.tree.heading('idade', text='Idade')
        self.tree.heading('genero', text='Gênero')
        self.tree.heading('estado_civil', text='Estado Civil')
        self.tree.heading('cidade', text='Cidade')
        self.tree.column('nome', width=200)
        self.tree.column('idade', width=60, anchor=tk.CENTER)
        self.tree.column('genero', width=100, anchor=tk.CENTER)
        self.tree.column('estado_civil', width=120, anchor=tk.CENTER)
        self.tree.column('cidade', width=130, anchor=tk.W)
        self.tree.pack(fill=tk.BOTH, expand=True)

        # Scrollbar para treeview
        vsb = ttk.Scrollbar(self.frame_exibicao, orient='vertical', command=self.tree.yview)
        vsb.place(relx=0.985, rely=0.0, relheight=1.0)
        self.tree.configure(yscrollcommand=vsb.set)

        # Frame botões
        self.frame_botoes = tk.Frame(self.frame_conteudo, bg=COR_FUNDO)
        self.frame_botoes.pack(fill=tk.X, pady=15)

        self.btn_editar = tk.Button(self.frame_botoes, text='✏️ Editar Selecionado', command=self.editar_selecionado, bg='#F1C40F', fg='white', font=('Segoe UI', 10, 'bold'), relief=tk.FLAT, padx=12, pady=8, cursor='hand2')
        self.btn_editar.pack(side=tk.LEFT, padx=5)

        self.btn_remover = tk.Button(self.frame_botoes, text='🗑️ Remover Selecionado', command=self.remover_selecionado, bg='#E74C3C', fg='white', font=('Segoe UI', 10, 'bold'), relief=tk.FLAT, padx=12, pady=8, cursor='hand2')
        self.btn_remover.pack(side=tk.LEFT, padx=5)

        self.btn_exportar = tk.Button(self.frame_botoes, text='📤 Exportar CSV', command=self.exportar_csv, bg='#2980B9', fg='white', font=('Segoe UI', 10, 'bold'), relief=tk.FLAT, padx=12, pady=8, cursor='hand2')
        self.btn_exportar.pack(side=tk.LEFT, padx=5)

        self.btn_salvar = tk.Button(self.frame_botoes, text='💾 Salvar em Arquivo', 
                       command=self.salvar_dados, bg=COR_SUCESSO, 
                       fg='white', font=('Segoe UI', 10, 'bold'),
                       relief=tk.FLAT, padx=15, pady=8, cursor='hand2')
        self.btn_salvar.pack(side=tk.LEFT, padx=5)

        self.btn_sair = tk.Button(self.frame_botoes, text='❌ Sair', command=self.on_closing, 
                     bg='#7F8C8D', fg='white', font=('Segoe UI', 10, 'bold'),
                     relief=tk.FLAT, padx=15, pady=8, cursor='hand2')
        self.btn_sair.pack(side=tk.RIGHT, padx=5)
        
        # Configurar evento de fechamento
        self.root.protocol('WM_DELETE_WINDOW', self.on_closing)
        
        self.mostrar_cadastro()
    
    def configurar_estilo(self):
        """Configura o estilo visual dos widgets"""
        style = ttk.Style()
        style.theme_use('clam')
        style.configure('TCombobox', font=('Segoe UI', 10))
        style.configure('TLabel', background=COR_FUNDO, foreground=COR_TEXTO)
        style.configure('Treeview', font=('Segoe UI', 9), rowheight=25)
        style.configure('Treeview.Heading', font=('Segoe UI', 10, 'bold'))
    
    def cadastrar_pessoa(self):
        nome = self.entry_nome.get().strip()
        idade = self.entry_idade.get().strip()
        genero = self.combo_genero.get()
        estado_civil = self.combo_estado.get()
        cidade = self.entry_cidade.get().strip()
        
        # Validação
        if not nome or not idade or not genero or not estado_civil or not cidade:
            messagebox.showerror('Erro', 'Todos os campos são obrigatórios!')
            return
        
        try:
            idade = int(idade)
        except ValueError:
            messagebox.showerror('Erro', 'Idade deve ser um número!')
            return
        
        # Criar dicionário
        pessoa = {
            'nome': nome,
            'idade': idade,
            'genero': genero,
            'estado_civil': estado_civil,
            'cidade': cidade
        }
        
        pessoas.append(pessoa)
        messagebox.showinfo('Sucesso', f'✓ Pessoa "{nome}" cadastrada com sucesso!\nTotal: {len(pessoas)} pessoa(s)')
        self.limpar_campos()
        self.mostrar_cadastro()
    
    def limpar_campos(self):
        self.entry_nome.delete(0, tk.END)
        self.entry_idade.delete(0, tk.END)
        self.combo_genero.set('')
        self.combo_estado.set('')
        self.entry_cidade.delete(0, tk.END)
        self.entry_nome.focus()
    
    def on_closing(self):
        """Ao fechar a janela, salva automaticamente"""
        if messagebox.askokcancel('Sair', f'Tem {len(pessoas)} pessoa(s) cadastrada(s).\nDeseja sair? (Os dados foram salvos automaticamente)'):
            self.root.destroy()
    
    def mostrar_cadastro(self):
        # Atualizar título do frame
        self.frame_exibicao.config(text=f'Total de Cadastros: {len(pessoas)}')
        # Limpar tree
        for item in self.tree.get_children():
            self.tree.delete(item)

        if len(pessoas) == 0:
            # Insere mensagem vazia como item único
            pass
        else:
            for pessoa in pessoas:
                self.tree.insert('', tk.END, values=(pessoa.get('nome',''), pessoa.get('idade',''), pessoa.get('genero',''), pessoa.get('estado_civil',''), pessoa.get('cidade','')))
    
    def salvar_dados(self):
        """Salva os dados em arquivo JSON"""
        try:
            with open(ARQUIVO_DADOS, 'w', encoding='utf-8') as arquivo:
                json.dump(pessoas, arquivo, ensure_ascii=False, indent=2)
            messagebox.showinfo('Sucesso', f'✓ Dados salvos com sucesso em "{ARQUIVO_DADOS}"!\nTotal de pessoas: {len(pessoas)}')
        except Exception as e:
            messagebox.showerror('Erro', f'Erro ao salvar dados: {str(e)}')

    def exportar_csv(self):
        """Exporta os cadastros para CSV"""
        try:
            import csv
            caminho = 'pessoas_export.csv'
            with open(caminho, 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(['nome','idade','genero','estado_civil','cidade'])
                for p in pessoas:
                    writer.writerow([p.get('nome',''), p.get('idade',''), p.get('genero',''), p.get('estado_civil',''), p.get('cidade','')])
            messagebox.showinfo('Exportado', f'CSV exportado em "{caminho}"')
        except Exception as e:
            messagebox.showerror('Erro', f'Erro ao exportar CSV: {str(e)}')

    def aplicar_filtro(self):
        termo = self.entry_busca.get().strip().lower()
        campo = self.combo_filtro.get()
        if not termo:
            self.mostrar_cadastro()
            return
        # Mapear campo para chave do dicionário
        chave = 'nome'
        if campo == 'Cidade':
            chave = 'cidade'
        elif campo == 'Gênero':
            chave = 'genero'

        # Filtrar
        resultados = [p for p in pessoas if termo in str(p.get(chave,'')).lower()]
        # Atualizar tree
        for item in self.tree.get_children():
            self.tree.delete(item)
        for p in resultados:
            self.tree.insert('', tk.END, values=(p.get('nome',''), p.get('idade',''), p.get('genero',''), p.get('estado_civil',''), p.get('cidade','')))

    def editar_selecionado(self):
        sel = self.tree.selection()
        if not sel:
            messagebox.showwarning('Aviso', 'Nenhum cadastro selecionado!')
            return
        item = sel[0]
        values = self.tree.item(item, 'values')
        # Preenche campos para edição
        self.entry_nome.delete(0, tk.END)
        self.entry_nome.insert(0, values[0])
        self.entry_idade.delete(0, tk.END)
        self.entry_idade.insert(0, values[1])
        self.combo_genero.set(values[2])
        self.combo_estado.set(values[3])
        self.entry_cidade.delete(0, tk.END)
        self.entry_cidade.insert(0, values[4])

        # Ao salvar, atualizar o cadastro original
        def salvar_edicao():
            nome = self.entry_nome.get().strip()
            try:
                idade = int(self.entry_idade.get().strip())
            except:
                messagebox.showerror('Erro', 'Idade inválida')
                return
            genero = self.combo_genero.get()
            estado = self.combo_estado.get()
            cidade = self.entry_cidade.get().strip()
            # localizar objeto correspondente pelo nome+cidade+idade como heurística
            for p in pessoas:
                if (str(p.get('nome','')) == str(values[0]) and str(p.get('cidade','')) == str(values[4]) and str(p.get('idade','')) == str(values[1])):
                    p['nome'] = nome
                    p['idade'] = idade
                    p['genero'] = genero
                    p['estado_civil'] = estado
                    p['cidade'] = cidade
                    break
            self.salvar_dados()
            self.mostrar_cadastro()
            # restaurar botão cadastrar
            self.btn_cadastrar.config(text='✓ Cadastrar Pessoa', command=self.cadastrar_pessoa, bg=COR_SECUNDARIA)
            # remover listener temporário
            self.btn_cadastrar.unbind('<Button-1>')

        # trocar comportamento do botão cadastrar temporariamente
        self.btn_cadastrar.config(text='💾 Salvar Edição', command=salvar_edicao, bg='#F39C12')

    def remover_selecionado(self):
        sel = self.tree.selection()
        if not sel:
            messagebox.showwarning('Aviso', 'Nenhum cadastro selecionado!')
            return
        if not messagebox.askyesno('Confirmar', 'Deseja remover o cadastro selecionado?'):
            return
        item = sel[0]
        values = self.tree.item(item, 'values')
        # localizar e remover
        for i, p in enumerate(list(pessoas)):
            if (str(p.get('nome','')) == str(values[0]) and str(p.get('cidade','')) == str(values[4]) and str(p.get('idade','')) == str(values[1])):
                pessoas.pop(i)
                break
        self.mostrar_cadastro()
    
    def carregar_dados(self):
        """Carrega os dados do arquivo JSON se existir"""
        global pessoas
        try:
            if os.path.exists(ARQUIVO_DADOS):
                with open(ARQUIVO_DADOS, 'r', encoding='utf-8') as arquivo:
                    pessoas = json.load(arquivo)
        except Exception as e:
            messagebox.showerror('Erro', f'Erro ao carregar dados: {str(e)}')
            pessoas = []

# Programa principal
if __name__ == '__main__':
    root = tk.Tk()
    app = SistemaCadastro(root)
    root.mainloop()

