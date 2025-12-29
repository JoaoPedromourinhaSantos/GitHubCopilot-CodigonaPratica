# 🌟 Copilot Chat — Guia rápido

Este README explica, de forma prática e direta, como usar o GitHub Copilot Chat no Visual Studio Code. Contém definições, exemplos de prompts e boas práticas para trabalhar com a ferramenta no seu workspace.

## Índice

- [O que é o Copilot Chat?](#o-que-é-o-copilot-chat)
- [Membros](#membros)
- [@workspace — o que é e como funciona](#workspace---o-que-é-e-como-funciona)
- [Exemplos de prompts (práticos)](#exemplos-de-prompts-práticos)
- [Boas práticas](#boas-práticas)
- [Como começar rapidamente](#como-começar-rapidamente)
- [Referências](#referências)

## O que é o Copilot Chat?

O Copilot Chat é uma interface de chat com IA integrada ao VS Code que ajuda desenvolvedores a escrever, entender e modificar código usando linguagem natural.

Funcionalidades principais:

- Sugestões inline: completam linhas, trechos ou funções enquanto você digita.
- Chat em linguagem natural: faça perguntas sobre o projeto, peça explicações, ou solicite criação/alterações de arquivos.
- Agentes (autonomous coding): permitem que a IA planeje e execute tarefas mais complexas (criar apps, refatorar múltiplos arquivos, rodar comandos).
- Smart actions: ações rápidas integradas ao editor (corrigir testes, gerar mensagem de commit, renomear símbolos com suporte da IA).

Por que usar?

- Acelera tarefas repetitivas e gera exemplos de código.
- Ajuda na depuração e na criação automática de testes.
- Facilita aprendizado e documentação do próprio código.

## Membros

No contexto do Copilot (especialmente em empresas/organizações), "membros" são as pessoas que têm acesso à assinatura/instância do Copilot:

- Administradores podem atribuir licenças e definir políticas de uso.
- É possível controlar permissões, políticas de privacidade e quais arquivos podem ser processados.
- Equipes podem compartilhar configurações, prompts e agentes customizados segundo regras internas.

Se você usa o Copilot pessoalmente, o conceito de "membros" normalmente não se aplica — apenas sua conta utiliza a ferramenta.

## @workspace — o que é e como funciona

No VS Code, *workspace* é a pasta (ou conjunto de pastas) que você abriu — é o contexto do seu projeto. O Copilot Chat usa esse contexto para gerar respostas mais relevantes.

Como o Copilot interage com o workspace:

- Lê arquivos e estrutura do projeto para entender dependências, rotas e convenções.
- Pode propor alterações que envolvam vários arquivos do workspace.
- Você pode limitar o escopo selecionando código, abrindo arquivos específicos ou mencionando paths no prompt.

> Observação: a tag `@workspace` não é uma sintaxe oficial do VS Code — é uma convenção que equipes às vezes usam em prompts para indicar "considere todo o projeto".

## Exemplos de prompts (práticos)

Use esses exemplos no Copilot Chat (em português):

1) Explicação do projeto

```text
Explique a arquitetura deste projeto e identifique o ponto de entrada da API.
```

2) Refatoração (peça por partes)

```text
Refatore os métodos públicos da classe `ClienteService` para reduzir duplicação e escreva testes unitários básicos para os métodos alterados.
```

3) Geração de testes

```text
Gere testes unitários para a função `calcularTotal` no arquivo `src/utils.js`.
```

4) Mudanças em múltiplos arquivos

```text
Adicione validação de entrada a todos os endpoints POST em `src/api` e retorne mensagens de erro padronizadas JSON.
```

## Boas práticas

- Dê contexto: abra ou selecione os arquivos relevantes antes de perguntar.
- Seja específico nos prompts e, quando pedir alterações em vários arquivos, solicite um resumo das modificações antes de aplicá-las.
- Revise todas as mudanças propostas pelo Copilot antes de aceitar (especialmente em código de produção).
- Em equipes, padronize prompts e documente políticas de privacidade/uso.

## Como começar rapidamente

1. Abra seu projeto no VS Code (o workspace).
2. Configure o Copilot: clique no ícone do Copilot na barra de status e siga o fluxo de autenticação.
3. Abra a aba Chat (Ctrl+Alt+I) ou use o chat inline (selecione código e pressione Ctrl+I).
4. Experimente com prompts curtos e aceite sugestões com Tab.

Mais detalhes em: https://code.visualstudio.com/docs/copilot/overview

## Referências

- Documentação oficial: https://code.visualstudio.com/docs/copilot/overview

---
Arquivo criado/atualizado para ajudar a entender e usar o Copilot Chat no seu workspace VS Code.
