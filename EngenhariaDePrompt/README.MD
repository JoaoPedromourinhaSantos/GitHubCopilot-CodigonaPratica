# 🤖 Engenharia de Prompt (Prompt Engineering)

> **Domine a arte de comunicar com inteligência artificial. Descubra como formular prompts eficazes para obter as melhores respostas de modelos de linguagem.**

---

Este repositório contém material completo sobre **Engenharia de Prompts**, desde conceitos fundamentais até técnicas avançadas. Aqui você encontrará explicações claras sobre prompts, diferenças entre SLMs e LLMs, estratégias como few-shot learning, e como usar ferramentas como o GitHub Copilot de forma otimizada.

## 📚 Conteúdo

- [O que é um prompt?](#o-que-é-um-prompt)
- [Modelos de Linguagem: SLMs vs LLMs](#llm-slm-e-xlms--qual-a-diferença)
- [Técnicas de Prompting](#técnicas-de-prompting)
- [Boas Práticas](#boas-práticas-de-prompt-engineering)
- [Glossário](#glossário-rápido)
- [Recursos](#recursos-e-leituras-recomendadas)

### O que é um prompt?

Um prompt é qualquer entrada (texto, instrução, contexto, exemplos) enviada a um sistema — em especial um modelo de linguagem — com o objetivo de guiar sua saída. Em aplicações com LLMs, o prompt é a principal forma de controlar comportamento, formato e conteúdo da resposta.

**Exemplos práticos de prompts:**

```
❌ Vago: "Resuma o texto"
✅ Bem definido: "Resuma o artigo em 3 pontos-chave, em linguagem simples, focando em impacto financeiro"

❌ Falta contexto: "O que é melhor?"
✅ Com contexto: "Comparando SLMs e LLMs, qual é melhor para aplicações embarcadas com baixa latência?"

❌ Sem formato: "Liste ideias"
✅ Com formato esperado: "Retorne uma lista numerada com 5 ideias de projetos IA, com descrição de 1-2 linhas cada"
```

### LLM, SLM e xLMs — qual a diferença?

Entender os diferentes tipos de modelos ajuda você a escolher a ferramenta certa para cada tarefa.

#### 📊 Comparação entre SLMs e LLMs

| Característica | **SLMs** 🏃 | **LLMs** 🦾 |
|---|:---:|:---:|
| **Número de parâmetros** | Milhões a dezenas de milhões | Bilhões a trilhões |
| **Dados de treino** | Menores, mais específicos | Maiores, variados |
| **Requisitos computacionais** | ✅ Baixos (rápido) | ⚠️ Altos (lento) |
| **Customização/Fine-tune** | ✅ Fácil | ⚠️ Custoso |
| **Custo operacional** | ✅ Barato | ⚠️ Caro |
| **Especialização** | ✅ Excelente em nichos | ✅ Geral, versátil |
| **Desempenho simples** | ✅ Satisfatório | ✅ Excelente |

**🎯 Quando usar cada um:**

- **SLM**: Aplicações embarcadas, dispositivos IoT, requisitos de baixa latência, domínios específicos (e.g., análise médica).
- **LLM**: Tarefas gerais, compreensão profunda, criatividade, múltiplos domínios.

**💡 O que é xLMs?** Termo geral que agrupa SLMs, LLMs e outros tipos de modelos. Serve para comparações teóricas sobre arquitetura, escala e performance.

## 🎯 Técnicas de Prompting

### De geral a específico (técnica de prompting)

Uma boa prática de engenharia de prompt é começar com instruções simples (geral) e então ir refinando até obter o comportamento esperado (específico).

**Exemplo de refinamento iterativo:**

```
Iteração 1 (genérica):
→ "Resuma o texto abaixo em 2 frases."

Iteração 2 (mais específica):
→ "Resuma em 2 frases, focando nos impactos financeiros."

Iteração 3 (ainda mais específica):
→ "Resuma em 2 frases, focando nos impactos financeiros e evitando jargões técnicos, usando linguagem acessível para públicos leigos."
```

**💡 Dica:** Use essa abordagem incremental para refinar prompts até atingir exatamente o resultado desejado em formato, tom e detalhe.

---

### Few-shot learning (poucos exemplos)

Few-shot é a técnica de incluir **exemplos** de entrada/saída dentro do próprio prompt para demonstrar ao modelo o padrão esperado. É especialmente útil quando você quer um formato ou comportamento muito específico.

**Exemplo prático:**

```
Instruir o modelo com exemplos:

Exemplo 1:
Entrada: "Rome"
Saída: "Capital: Roma, País: Itália"

Exemplo 2:
Entrada: "Paris"
Saída: "Capital: Paris, País: França"

Agora faça o mesmo para:
Entrada: "Madrid"
Saída:
```

**✅ Boas práticas:**
- Use 2–10 exemplos bem escolhidos (muito exemplos deixa o prompt custoso em tokens)
- Varie exemplos para cobrir casos-limite e padrões diferentes
- Certifique-se que exemplos representam exatamente o que você espera

---

### Copilot Inline

O GitHub Copilot (e ferramentas similares) usam **prompts inline**: o contexto do seu código, nomes de variáveis e comentários são enviados como parte do prompt para gerar sugestões relevantes diretamente no editor.

**Como aproveitar melhor:**

```java
// ❌ Vago
// escrever função

// ✅ Específico
// Escrever função que valida email usando regex, retorna boolean, lança IllegalArgumentException se null
```

**💡 Dicas Copilot:**
- Escreva comentários descritivos antes de funções
- Use nomes de variáveis e métodos significativos (contexto ajuda!)
- Deixe o histórico de código visível (funções anteriores informam o padrão)
- Seja específico sobre entrada, saída, restrições e erros

---

### AI e Estocástico — o que significa?

**AI (Inteligência Artificial):** Neste contexto, refere-se a modelos de machine learning treinados para processar e gerar linguagem natural de forma inteligente.

**Estocástico:** Significa que o modelo pode gerar **saídas diferentes** para o mesmo prompt, dependendo de parâmetros como `temperature` e seed aleatória. Não é determinístico.

#### Temperature (controle de criatividade)

```
Temperature = 0.1 (conservador):
→ "A capital da França é Paris." (sempre a mesma resposta)

Temperature = 0.7 (balanceado):
→ Respostas variadas mas coerentes (padrão para a maioria)

Temperature = 1.5+ (criativo):
→ Respostas muito criativas, às vezes irrelevantes
```

**🎯 Quando usar:**
- **Temp baixa (0.0–0.3):** Tarefas precisas (análise, código, dados)
- **Temp média (0.5–0.7):** Redação, resumos, criatividade controlada
- **Temp alta (0.8–1.0+):** Brainstorm, criatividade, exploração

## ✅ Boas práticas de prompt engineering

Seguindo essas práticas, você obterá respostas de melhor qualidade de qualquer modelo de linguagem:

1. **🎯 Defina o objetivo claramente**
   - O que exatamente você espera da saída?
   - Qual é o contexto e o público-alvo?

2. **📋 Forneça o formato esperado**
   - JSON, CSV, lista numerada, tabela, Markdown?
   - Especifique: "Retorne em formato JSON com chaves: nome, email, telefone"

3. **🚀 Adicione restrições e prioridades**
   - Tamanho máximo: "máximo 150 palavras"
   - Tom: "use linguagem técnica" ou "use linguagem acessível"
   - Público-alvo: "explicar para um leigo" vs "explicar para especialista"

4. **📚 Use exemplos (few-shot) quando complexo**
   - Para tarefas com formato não-trivial, forneça 2–5 exemplos
   - Exemplos demonstram padrão melhor que descrição textual

5. **🔄 Teste, itere e meça**
   - Teste o prompt várias vezes
   - Refine conforme resultado
   - Meça sucesso: precisão, relevância, coerência, conformidade com formato

**Checklist para um bom prompt:**
- [ ] Objetivo está explícito?
- [ ] Contexto suficiente fornecido?
- [ ] Formato de saída especificado?
- [ ] Restrições de tamanho, tom, público mencionadas?
- [ ] Exemplos inclusos (se necessário)?
- [ ] Instruções de error handling (o que fazer se não souber a resposta?)

## 📖 Glossário rápido

| Termo | Descrição |
|---|---|
| **Prompt** | Entrada (texto, instrução, contexto) enviada ao modelo para guiar sua saída |
| **Token** | Unidade básica de texto processada (palavra, subpalavra, símbolo — não é 1:1 com caracteres) |
| **Temperature** | Parâmetro que controla aleatoriedade: baixo = conservador, alto = criativo |
| **Few-shot** | Técnica de incluir exemplos no prompt para demonstrar padrão esperado |
| **Fine-tune** | Treinar adicionalmente um modelo pré-treinado com dados específicos do usuário |
| **Embedding** | Representação numérica de texto usada internamente pelo modelo |
| **Context window** | Quantidade máxima de tokens que o modelo pode "ver" (ex: 4K, 8K, 128K tokens) |
| **LLM** | Large Language Model — modelo com bilhões-trilhões de parâmetros |
| **SLM** | Small Language Model — modelo com milhões-dezenas de milhões de parâmetros |
| **Chain-of-thought** | Técnica que instrui o modelo a "pensar passo a passo" para melhor raciocínio |

## 📚 Recursos e leituras recomendadas

### Documentação Oficial
- 🔗 [GitHub Copilot — Documentação Oficial (PT-BR)](https://docs.github.com/pt/copilot)
- 🔗 [OpenAI API Documentation](https://platform.openai.com/docs)
- 🔗 [Anthropic Claude Documentation](https://docs.anthropic.com)

### Artigos e Papers
- 📄 **"Attention Is All You Need"** — Vaswani et al. (Arquitetura Transformer, base de LLMs modernos)
- 📄 **"Chain-of-Thought Prompting"** — Wei et al. (Técnica de raciocínio passo a passo)
- 📄 **"Few-shot Learning in Large Language Models"** — Brown et al. (GPT-3 paper)

### Tutoriais e Blogs
- 🌐 [Prompt Engineering Guide](https://www.promptingguide.ai/) — Guia interativo completo
- 🌐 [DeepLearning.AI — Short Courses](https://www.deeplearning.ai/) — Cursos gratuitos sobre prompts
- 🌐 [Hugging Face — Course](https://huggingface.co/course) — Aprender sobre modelos de linguagem

### Ferramentas Úteis
- 🛠️ **Prompt Testing:** GPT-4, Claude, Gemini (experimentar diferentes prompts)
- 🛠️ **Análise:** Ragas, LangChain (avaliar qualidade de respostas)
- 🛠️ **Versionamento:** Prompt management tools (Langsmith, Weights & Biases)

---

## 🚀 Próximos passos

- Explore os projetos dentro deste repositório: `Quizz/`, `EncontrarDatas/`, `ImparPar/`
- Experimente técnicas de prompting com o GitHub Copilot enquanto programa
- Teste diferentes temperaturas, exemplos (few-shot) e formatos
- Meça e itere até atingir qualidade desejada

---

**Última atualização:** Dezembro 2025  
**Autor:** João Moura / GitHub Copilot