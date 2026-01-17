nome = input("Qual é seu nome? ")
idade = int(input("Qual sua idade? "))

if idade < 12:
    print(nome, "você é uma criança.")
elif idade  < 18:
    print(nome, "você é um adolescente.")
elif idade < 60:
    print(nome, "você é um adulto.")
else:
    print(nome, "você é idoso.")