package EngenhariaDePrompt.Quizz.junit;

public final class Assertions {
    private Assertions() {}
    public static void assertNotNull(Object obj, String message) {
        if (obj == null) throw new AssertionError(message);
    }
    public static void assertNotNull(String s, String message) {
        if (s == null) throw new AssertionError(message);
    }
    public static void fail(String message) {
        throw new AssertionError(message);
    }
}
