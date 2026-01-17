# Programa de Lista de Compras
lista_compras = []

print('=== LISTA DE COMPRAS ===')
print('Digite os produtos (digite 0 para parar):\n')

while True:
    produto = input('Produto: ')
    if produto == '0':
        break
    lista_compras.append(produto)

print('\n=== ITENS CADASTRADOS ===')
if lista_compras:
    for i, item in enumerate(lista_compras, 1):
        print(f'{i}. {item}')
else:
    print('Nenhum produto foi adicionado.')
