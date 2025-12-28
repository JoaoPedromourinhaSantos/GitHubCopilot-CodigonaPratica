# Desafios — Prompt Engineering (Resumo)

Este repositório contém três desafios práticos sobre Prompt Engineering. Cada desafio pede que você escreva um pequeno programa que mapeie uma entrada (nome de técnica ou elemento) para uma descrição curta e específica.

Os scripts de referência estão em `Desafios/Desafio01.py`, `Desafios/Desafio02.py` e `Desafios/Desafio03.py`.

---

## Desafio 01 — Técnicas básicas de prompt

Objetivo: dado o nome de uma técnica de prompt, retornar a descrição correspondente.

Entradas válidas:

- "Prompt claro e especifico para tarefa de programacao"
- "Persona de sistema definindo papel e tom da IA"
- "Few-shot prompting com poucos exemplos no proprio prompt"
- "Cadeia de pensamento pedindo raciocinio detalhado"

Saídas (descrições):

- Prompt direto e detalhado que reduz ambiguidades
- Definicao de papel e regras para a IA seguir
- Uso de exemplos no prompt para ensinar o padrao
- Tecnica que estimula a IA a explicar cada passo

Comportamento esperado: se a técnica não estiver na lista, imprimir `Tecnica desconhecida`.

Exemplo:

```text
Entrada:
Prompt claro e especifico para tarefa de programacao

Saida:
Prompt direto e detalhado que reduz ambiguidades
```

Arquivo relacionado: `Desafio01.py` (implementação de referência em Python).

---

## Desafio 02 — Elementos de um prompt bem estruturado

Objetivo: dado o nome de um elemento de prompt (contexto, objetivo, exemplos, formato), retornar uma breve explicação do papel desse elemento.

Entradas válidas:

- "Contexto detalhado com informacoes importantes"
- "Objetivo especifico descrevendo o resultado esperado"
- "Exemplos no prompt para mostrar o formato da resposta"
- "Formato de saida definindo lista tabela ou passos"

Saídas (descrições):

- Apresenta o cenario, o usuario e limites para a tarefa
- Define com clareza o que a resposta final deve entregar
- Mostra modelos de entrada e saida como referencia
- Explica como a resposta deve ser estruturada pela IA

Comportamento esperado: se o elemento não estiver na lista, imprimir `Tecnica desconhecida`.

Exemplo:

```text
Entrada:
Formato de saida definindo lista tabela ou passos

Saida:
Explica como a resposta deve ser estruturada pela IA
```

Arquivo relacionado: `Desafio02.py` (implementação de referência em Python).

---

## Desafio 03 — Técnicas de refinamento de prompt

Objetivo: dado o nome de uma técnica de refinamento, retornar a explicação correspondente.

Entradas válidas:

- "Refinamento iterativo ajustando o prompt varias vezes"
- "Dividir em etapas para resolver partes da tarefa"
- "Pedir melhorias solicitando revisao da mesma resposta"
- "Testar variacoes criando versoes diferentes do prompt"

Saídas (descrições):

- Ajusta o prompt com base nas respostas anteriores da IA
- Quebra a tarefa em passos menores resolvidos em ordem
- Pede para a IA revisar e melhorar a resposta inicial
- Compara diferentes prompts para achar o mais eficiente

Comportamento esperado: se a técnica não estiver na lista, imprimir `Tecnica desconhecida`.

Exemplo:

```text
Entrada:
Refinamento iterativo ajustando o prompt varias vezes

Saida:
Ajusta o prompt com base nas respostas anteriores da IA
```

Arquivo relacionado: `Desafio03.py` (implementação de referência em Python).

---

## Como executar

Os desafios são scripts Python simples que leem uma linha da entrada padrão e imprimem a descrição correspondente.

Para rodar localmente (Windows, terminal CMD):

```bat
python Desafios\Desafio01.py
python Desafios\Desafio02.py
python Desafios\Desafio03.py
```

Em cada caso, digite (ou redirecione) a string de entrada exatamente como nos exemplos e pressione Enter.

## Observações e dicas

- As entradas devem corresponder exatamente às frases listadas (incluindo acentos e espaços). Se quiser robustez extra, considere normalizar maiúsculas/minúsculas e espaços no código.
- Estes exercícios são bons para praticar mapeamento de valores e condicionais simples em Python.

---
