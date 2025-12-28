package EngenhariaDePrompt.ImparPar;

public class ImparPar {
    /**
     * Recebe um número (double). Retorna:
     * - true  -> se for ímpar
     * - false -> se for par
     * - null  -> se não for um número inteiro (imprime mensagem)
     */
    public static Boolean isOdd(double number) {
        if (Double.isNaN(number) || Double.isInfinite(number) || number % 1 != 0) {
            System.out.println("Não é um número inteiro");
            return null;
        }
        long v = (long) number;
        return v % 2 != 0;
    }

    /**
     * Versão que recebe uma String e tenta converter para inteiro.
     * Comportamento igual ao método acima.
     */
    public static Boolean isOdd(String input) {
        try {
            long v = Long.parseLong(input);
            return v % 2 != 0;
        } catch (NumberFormatException e) {
            System.out.println("Não é um número inteiro");
            return null;
        }
    }

    // Exemplo de uso
    public static void main(String[] args) {
        System.out.println(isOdd(3));       // true
        System.out.println(isOdd(4));       // false
        System.out.println(isOdd(3.5));     // "Não é um número inteiro" + null
        System.out.println(isOdd("7"));     // true
        System.out.println(isOdd("7.2"));   // "Não é um número inteiro" + null
        System.out.println(isOdd("abc"));   // "Não é um número inteiro" + null
    }
}
