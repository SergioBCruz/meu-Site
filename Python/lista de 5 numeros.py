# Programa que pede 5 números, guarda em lista e calcula soma e média
lista_numeros = []

print('Digite 5 números:')
for i in range(1, 6):
    numero = float(input(f'Número {i}: '))
    lista_numeros.append(numero)

soma = sum(lista_numeros)
media = soma / len(lista_numeros)

print(f'\nLista de números: {lista_numeros}')
print(f'Soma dos números: {soma}')
print(f'Média dos números: {media}')
