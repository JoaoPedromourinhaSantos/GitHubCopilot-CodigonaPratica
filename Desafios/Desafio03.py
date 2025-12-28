entrada = input().strip()

def descrever_tecnica_refinamento(tecnica):
    if tecnica == "Refinamento iterativo ajustando o prompt varias vezes":
        return "Ajusta o prompt com base nas respostas anteriores da IA"

    elif tecnica == "Dividir em etapas para resolver partes da tarefa":
        return "Quebra a tarefa em passos menores resolvidos em ordem"

    elif tecnica == "Pedir melhorias solicitando revisao da mesma resposta":
        return "Pede para a IA revisar e melhorar a resposta inicial"

    elif tecnica == "Testar variacoes criando versoes diferentes do prompt":
        return "Compara diferentes prompts para achar o mais eficiente"

    else:
        return "Tecnica desconhecida"

print(descrever_tecnica_refinamento(entrada))