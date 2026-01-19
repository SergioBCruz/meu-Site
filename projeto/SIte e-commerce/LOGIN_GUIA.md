# 🔐 Sistema de Login - Painel Admin

## 📋 Como Funciona

O painel administrativo agora possui um **sistema de login seguro** com autenticação por usuário e senha.

---

## 🎯 Acessar Admin

### URL de Login
```
login.html
```

### Credenciais Padrão
- **Usuário**: `admin`
- **Senha**: `admin123`

---

## ✨ Funcionalidades

### ✅ Login Protegido
- Validação de usuário e senha
- Proteção da página admin
- Redirecionamento automático

### 🔑 Alterar Senha
- Botão "Alterar Senha" no painel admin
- Validação de senha atual
- Confirmação de nova senha

### 🚪 Logout
- Botão de logout no painel
- Limpa sessão automaticamente
- Redireciona para login

### 💾 Armazenamento Seguro
- Usa localStorage (seguro no navegador)
- Credenciais persistem entre sessões
- Nenhum servidor necessário

---

## 🔄 Fluxo de Acesso

```
login.html
    ↓
[Valida credenciais]
    ↓
admin.html (protegido)
    ↓
[Usuário logado com sucesso]
```

---

## 🔧 Alterar Credenciais

### Via Painel Admin (Recomendado)
1. Faça login com a senha atual
2. Clique em "🔑 Alterar Senha"
3. Digite senha atual, nova senha e confirme
4. Clique em "Salvar"

### Manualmente (Console)
Abra o console (F12) e execute:

```javascript
const newCredentials = {
    username: 'novo_usuario',
    password: 'nova_senha'
};
localStorage.setItem('adminCredentials', JSON.stringify(newCredentials));
```

---

## 📁 Arquivos Modificados

- ✅ `login.html` - Página de login
- ✅ `admin.html` - Adicionado header com usuário
- ✅ `js/login.js` - Lógica de autenticação
- ✅ `js/admin.js` - Scripts adicionais

---

## 🎨 Página de Login

### Características
- Design moderno e responsivo
- Tema claro e fácil de usar
- Mensagens de erro amigáveis
- Mostra credenciais de teste
- Animações suaves

### Estilos
- Gradiente azul (cor primária)
- Sombra moderna
- Responsivo em mobile
- Animações de entrada

---

## 🛡️ Segurança

### ⚠️ Importante
Este sistema usa **localStorage** para armazenar credenciais.

**Para desenvolvimento e teste**: ✅ Seguro
**Para produção**: ❌ Implemente um backend real!

### Recomendações para Produção
1. Use um backend seguro (Node.js, PHP, Python)
2. Hash as senhas com bcrypt
3. Use JWT tokens
4. Implemente HTTPS
5. Configure CORS adequadamente

---

## 🔍 Verificar Credenciais Armazenadas

Abra o console (F12) e execute:

```javascript
console.log(JSON.parse(localStorage.getItem('adminCredentials')));
```

---

## 🚀 Resetar para Padrão

Se esquecer a senha, execute no console:

```javascript
localStorage.removeItem('adminCredentials');
localStorage.removeItem('adminLoggedIn');
localStorage.removeItem('adminUsername');
```

Depois recarregue a página e use:
- Usuário: `admin`
- Senha: `admin123`

---

## 📱 Responsividade

O login funciona perfeitamente em:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px+)
- ✅ Mobile (até 480px)

---

## ❓ Dúvidas Frequentes

**P: Onde as credenciais são armazenadas?**
R: No localStorage do navegador (dados locais, não sincronizados).

**P: Alguém pode hackear?**
R: Sim, se tiver acesso ao computador. Para mais segurança, implemente um backend.

**P: Como resetar para a senha padrão?**
R: Use o console como mostrado acima.

**P: Posso usar múltiplos usuários?**
R: Sim, modifique o código em `js/login.js` para suportar banco de dados.

**P: Como integrar com um banco de dados real?**
R: Crie um backend e substitua a validação local por chamadas de API.

---

## 🔐 Credenciais de Teste

Para fins de **demonstração**, as credenciais padrão são:

```
Usuário: admin
Senha: admin123
```

⚠️ **Mude estas credenciais em produção!**

---

## 📞 Suporte

Se precisar de ajuda com o sistema de login ou quiser implementar autenticação mais robusta, entre em contato.

---

**Última atualização**: 17 de Janeiro de 2026
