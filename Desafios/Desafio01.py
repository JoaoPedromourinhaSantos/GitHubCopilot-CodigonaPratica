entrada = input().strip()

def descrever_tecnica(tecnica):
    if tecnica == "Prompt claro e especifico para tarefa de programacao":
        return "Prompt direto e detalhado que reduz ambiguidades"

    elif tecnica == "Persona de sistema definindo papel e tom da IA":
        return "Definicao de papel e regras para a IA seguir"

    elif tecnica == "Few-shot prompting com poucos exemplos no proprio prompt":
        return "Uso de exemplos no prompt para ensinar o padrao"

    elif tecnica == "Cadeia de pensamento pedindo raciocinio detalhado":
        return "Tecnica que estimula a IA a explicar cada passo"

    else:
        return "Tecnica desconhecida"

print(descrever_tecnica(entrada))