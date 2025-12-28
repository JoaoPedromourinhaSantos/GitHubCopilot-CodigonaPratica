package EngenhariaDePrompt.Quizz.junit;

public final class Assumptions {
    private Assumptions() {}
    public static void assumeTrue(boolean condition, String message) {
        if (!condition) throw new AssumptionViolatedException(message);
    }
}
