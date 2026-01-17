numero = int(input('Digite um número para ver a tabuada: '))
while True:
    for i in range(1, 11):
        print(f'{numero} x {i} = {numero * i}')
    parar = input('Digite 0 para parar ou qualquer outro número para continuar: ')
    if parar == '0':
        break
    numero = int(input('Digite um número para ver a tabuada: '))