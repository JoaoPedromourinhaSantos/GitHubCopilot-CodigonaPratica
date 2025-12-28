entrada = input().strip()

def descrever_elemento(elemento):
    if elemento == "Contexto detalhado com informacoes importantes":
        return "Apresenta o cenario, o usuario e limites para a tarefa"

    elif elemento == "Objetivo especifico descrevendo o resultado esperado":
        return "Define com clareza o que a resposta final deve entregar"

    elif elemento == "Exemplos no prompt para mostrar o formato da resposta":
        return "Mostra modelos de entrada e saida como referencia"

    elif elemento == "Formato de saida definindo lista tabela ou passos":
        return "Explica como a resposta deve ser estruturada pela IA"

    else:
        return "Tecnica desconhecida"

print(descrever_elemento(entrada))