# Criando um dicionário com informações pessoais
pessoa = {
    'nome': 'Sérgio',
    'idade': 34,
    'profissão': 'Engenheiro de Software'
}

# Mostrando o dicionário na tela
print('--- Informações Originais ---')
print(f'Nome: {pessoa["nome"]}')
print(f'Idade: {pessoa["idade"]}')
print(f'Profissão: {pessoa["profissão"]}')

# Alterando a profissão
pessoa['profissão'] = 'Desenvolvedor Full Stack'

# Mostrando novamente após a alteração
print('\n--- Informações Após Alteração ---')
print(f'Nome: {pessoa["nome"]}')
print(f'Idade: {pessoa["idade"]}')
print(f'Profissão: {pessoa["profissão"]}')
