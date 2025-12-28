package EngenhariaDePrompt.Quizz;

import java.util.*;

/*
 Crie uma lista de questões com 5 perguntas e 4 possíveis respostas, cada pergunta
 deve ter apenas uma resposta correta, cada resposta correta deve valer 1 ponto.
 Esse quizz é sobre Engenharia de Prompts (Prompt Engineering).
*/

/**
 * Quizz program sobre Engenharia de Prompts.
 *
 * Este programa contém uma lista de perguntas (mistas: múltipla escolha e abertas),
 * faz a interação com o usuário via terminal, coleta respostas e calcula uma
 * pontuação. Para perguntas abertas o programa compara a resposta do usuário
 * com a resposta esperada (após normalização); exatamente iguais valem 1 ponto,
 * respostas suficientemente similares recebem 0.5 ponto.
 */
public class Quizz {

	/**
	 * Classe interna que representa uma questão do quizz.
	 * Pode ser uma questão de múltipla escolha (options != null) ou aberta (openQuestion = true).
	 */
	static class Question {
		/** Enunciado da pergunta */
		String prompt;
		/** Alternativas para múltipla escolha; null se for questão aberta */
		String[] options; // for MCQ; null for open questions
		/** Índice da alternativa correta (0-based) quando for MCQ */
		int correctIndex; // 0-based for MCQ
		/** Resposta esperada para questões abertas */
		String correctAnswer; // for open questions (expected answer)
		/** Flag indicando se é questão aberta */
		boolean openQuestion;

		/**
		 * Construtor para questões de múltipla escolha.
		 * @param prompt enunciado
		 * @param options alternativas
		 * @param correctIndex índice (0-based) da alternativa correta
		 */
		Question(String prompt, String[] options, int correctIndex) {
			this.prompt = prompt;
			this.options = options;
			this.correctIndex = correctIndex;
			this.openQuestion = false;
		}

		/**
		 * Construtor para questões abertas.
		 * @param prompt enunciado
		 * @param correctAnswer resposta esperada (texto)
		 */
		Question(String prompt, String correctAnswer) {
			this.prompt = prompt;
			this.correctAnswer = correctAnswer;
			this.openQuestion = true;
		}
	}

	public static void main(String[] args) {
		// Constroi a lista de perguntas e prepara o scanner para leitura do usuário
		List<Question> questions = buildQuestions();
		Scanner scanner = new Scanner(System.in);

		// Cabeçalho de apresentação
		System.out.println("=== Quizz: Engenharia de Prompts ===\nResponda com o número da alternativa (1-4).\n");

		// score armazena a pontuação total (pode conter 0.5 para respostas parciais)
		double score = 0.0;
		for (int i = 0; i < questions.size(); i++) {
			// Recupera a pergunta atual
			Question q = questions.get(i);
			System.out.printf("%d) %s\n", i + 1, q.prompt);
			// Se for múltipla escolha (MCQ)
			if (!q.openQuestion) {
				for (int j = 0; j < q.options.length; j++) {
					System.out.printf("   %d) %s\n", j + 1, q.options[j]);
				}

				// Leitura e validação da escolha do usuário (1..n)
				int choice = 0;
				while (true) {
					System.out.print("Sua resposta (1-4): ");
					String line = scanner.nextLine().trim();
					try {
						choice = Integer.parseInt(line);
						if (choice >= 1 && choice <= q.options.length) break;
					} catch (NumberFormatException e) {
						// entrada inválida; repete o prompt
					}
					System.out.println("Entrada inválida. Digite um número entre 1 e " + q.options.length + ".");
				}

				// Checa se a alternativa selecionada é a correta e atualiza a pontuação
				if (choice - 1 == q.correctIndex) {
					System.out.println("Resposta correta! +1 ponto.\n");
					score += 1.0;
				} else {
					System.out.println("Resposta incorreta.\n");
				}
			} else {
				// Questão aberta: lê resposta livre e compara com a resposta esperada
				System.out.print("Sua resposta: ");
				String answer = scanner.nextLine().trim();
				if (answer.isEmpty()) {
					// Se o usuário enviar vazio, considera como não respondida e segue
					System.out.println("Resposta vazia.\n");
					continue;
				}

				// Normaliza tanto a resposta do usuário quanto a esperada antes de comparar
				String expected = q.correctAnswer.trim();
				if (normalize(answer).equalsIgnoreCase(normalize(expected))) {
					// Igualdade exata após normalização => pontuação completa
					System.out.println("Resposta exatamente correta! +1 ponto.\n");
					score += 1.0;
				} else {
					// Calcula similaridade (0.0 .. 1.0) usando distância de Levenshtein normalizada
					double sim = similarity(normalize(answer), normalize(expected));
					// Se estiver suficientemente próximo, dá ponto parcial
					if (sim >= 0.70) {
						System.out.printf("Resposta parcialmente correta (similaridade %.2f). +0.5 ponto.\n\n", sim);
						score += 0.5;
					} else {
						// Caso contrário, considera incorreta
						System.out.println("Resposta incorreta.\n");
					}
				}
			}
		}

		System.out.println("--- Resultado ---");
		System.out.printf("Você acertou (em pontos) %.1f de %d perguntas.\n", score, questions.size());
		scanner.close();
	}

	/**
	 * Normaliza uma string para comparação: trim, lowercase e remoção de acentos/diacríticos.
	 * Isso ajuda a comparar respostas ignorando diferenças de caixa e acentuação.
	 */
	private static String normalize(String s) {
		if (s == null) return "";
		s = s.trim().toLowerCase(Locale.ROOT);
		// remove diacritics (acentos) usando Normalizer
		s = java.text.Normalizer.normalize(s, java.text.Normalizer.Form.NFD);
		s = s.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
		return s;
	}

	/**
	 * Calcula a distância de Levenshtein entre duas strings a e b.
	 * Implementação iterativa otimizada em memória (vetor de custos).
	 * Retorna o número mínimo de edições (inserção, deleção, substituição) para transformar a em b.
	 */
	private static int levenshtein(String a, String b) {
		int[] costs = new int[b.length() + 1];
		for (int j = 0; j < costs.length; j++) costs[j] = j;
		for (int i = 1; i <= a.length(); i++) {
			costs[0] = i;
			int lastCost = i - 1;
			for (int j = 1; j <= b.length(); j++) {
				int newCost = Math.min(Math.min(costs[j] + 1, costs[j - 1] + 1), lastCost + (a.charAt(i - 1) == b.charAt(j - 1) ? 0 : 1));
				lastCost = costs[j];
				costs[j] = newCost;
			}
		}
		return costs[b.length()];
	}

	/**
	 * Calcula similaridade entre duas strings baseada na distância de Levenshtein.
	 * Retorna um valor entre 0.0 e 1.0 onde 1.0 significa idêntico.
	 * A similaridade é definida como 1 - (levenshtein / maxLen).
	 */
	private static double similarity(String a, String b) {
		if (a == null || b == null) return 0.0;
		if (a.equals(b)) return 1.0;
		int lev = levenshtein(a, b);
		int max = Math.max(a.length(), b.length());
		if (max == 0) return 1.0;
		return 1.0 - ((double) lev / (double) max);
	}

	/**
	 * Constrói a lista de perguntas do quizz.
	 * Retorna uma lista contendo questões de múltipla escolha e abertas.
	 */
	private static List<Question> buildQuestions() {
		List<Question> qs = new ArrayList<>();

		qs.add(new Question(
			"O que é 'prompt engineering'?",
			new String[] {
				"Escrever código para treinar modelos de ML.",
				"A prática de formular instruções claras e eficientes para modelos de linguagem.",
				"Deploy de modelos em produção.",
				"Criar grandes conjuntos de dados rotulados manualmente."
			},
			1
		));

		qs.add(new Question(
			"Qual prática costuma melhorar a qualidade das respostas de um LLM?",
			new String[] {
				"Usar instruções vagas e genéricas.",
				"Fornecer contexto, exemplos e restrições claras no prompt.",
				"Aumentar apenas o tamanho do prompt sem contexto.",
				"Remover todas as instruções e deixar o modelo adivinhar."
			},
			1
		));

		qs.add(new Question(
			"O que é 'few-shot learning' quando usado em prompts?",
			new String[] {
				"Treinar um novo modelo com poucos dados.",
				"Incluir alguns exemplos de entrada/saída no próprio prompt para orientar o modelo.",
				"Executar o modelo com poucos tokens permitidos.",
				"Usar poucas camadas na arquitetura do modelo."
			},
			1
		));

		qs.add(new Question(
			"Como você pode avaliar a efetividade de um prompt?",
			new String[] {
				"Medindo precisão, relevância, coerência e cobertura nas respostas do modelo.",
				"Apenas cronometrando o tempo de resposta.",
				"Contando o número de palavras no prompt.",
				"Verificando se o prompt é o mais curto possível."
			},
			0
		));

		qs.add(new Question(
			"Qual técnica ajuda a reduzir ambiguidade em um prompt?",
			new String[] {
				"Deixar instruções abertas para interpretação livre.",
				"Definir formato de saída, restrições e exemplos claros.",
				"Aumentar apenas a temperatura do modelo.",
				"Fornecer menos contexto para o modelo."
			},
			1
		));
/*faça questões abertas para o usuário digitar a resposta e compare com a resposta
exata dentro dos arquivos, se a resposta do usuário chegar perto,
considere ela parcialmente, se ele acertar exatamente,
considere completamente correta. No final, mostre a pontuação total do usuário.
adicione mais 5 perguntas ao quizz, totalizando 10 perguntas*/
		// Adiciona 5 questões abertas (totalizando 10 perguntas)
		qs.add(new Question(
			"O que significa 'temperature' em geração de texto por LLMs?",
			"Controle da aleatoriedade nas saídas do modelo (grau de variação nas respostas)."
		));

		qs.add(new Question(
			"O que é 'few-shot' quando aplicado em prompts?",
			"Incluir alguns exemplos de entrada/saída no próprio prompt para orientar o modelo."
		));

		qs.add(new Question(
			"O que é um 'chain-of-thought' prompt?",
			"Instruir o modelo a raciocinar passo a passo, mostrando o processo de pensamento."
		));

		qs.add(new Question(
			"Como você pode reduzir alucinações em respostas de LLMs?",
			"Fornecer contexto preciso, evidências e instruções para verificar fatos."
		));

		qs.add(new Question(
			"O que é um 'prompt template'?",
			"Um modelo de prompt reutilizável com espaços reservados para variáveis."
		));

		return qs;
	}
}



