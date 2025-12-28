package EngenhariaDePrompt.Quizz;


import EngenhariaDePrompt.Quizz.junit.Test;
import EngenhariaDePrompt.Quizz.junit.BeforeAll;
import EngenhariaDePrompt.Quizz.junit.Assumptions;
import static EngenhariaDePrompt.Quizz.junit.Assertions.*;

import java.lang.reflect.*;

public class TestQuizzTest {

    private static Class<?> quizzClass;
    private static Object quizzInstance;

    @BeforeAll
    static void setup() {
        try {
            // Tenta carregar a classe pelo nome completo
            quizzClass = Class.forName("EngenhariaDePrompt.Quizz.Quizz");
        } catch (ClassNotFoundException e) {
            quizzClass = null;
        }

        if (quizzClass != null) {
            quizzInstance = tryInstantiate(quizzClass);
        }
    }

    @Test
    void classShouldExist() {
        assertNotNull(quizzClass, "Classe EngenhariaDePrompt.Quizz.Quizz não encontrada. Verifique o nome do pacote e da classe.");
    }

    @Test
    void shouldHaveAnInstantiableConstructor() {
        Assumptions.assumeTrue(quizzClass != null, "Classe Quizz ausente - teste ignorado.");
        assertNotNull(quizzInstance, "Não foi possível instanciar Quizz com nenhum construtor disponível.");
    }

    @Test
    void shouldHaveAtLeastOneMethodInvocable() {
        Assumptions.assumeTrue(quizzInstance != null, "Instância de Quizz não disponível - teste ignorado.");
        
        Method[] methods = quizzClass.getDeclaredMethods();
        Method found = null;
        
        for (Method m : methods) {
            // Ignora métodos não públicos
            if (!Modifier.isPublic(m.getModifiers())) continue;
            
            // Ignora métodos sintéticos ou de ponte (gerados pelo compilador)
            if (m.isSynthetic() || m.isBridge()) continue;
            
            // Ignora métodos herdados de Object (toString, hashCode, etc.)
            if (m.getDeclaringClass() == Object.class) continue;

            // CRÍTICO: Ignora o método main para evitar que o teste trave esperando input do console
            if (m.getName().equals("main")) continue;

            // Tenta construir argumentos padrão para os parâmetros do método
            Class<?>[] params = m.getParameterTypes();
            Object[] args = new Object[params.length];
            boolean ok = true;
            
            for (int i = 0; i < params.length; i++) {
                try {
                    args[i] = defaultFor(params[i]);
                } catch (Exception ex) {
                    ok = false;
                    break;
                }
            }
            if (!ok) continue;

            try {
                m.setAccessible(true);
                Object target = Modifier.isStatic(m.getModifiers()) ? null : quizzInstance;
                m.invoke(target, args);
                found = m;
                // Se invocou com sucesso (ou lançou exceção de lógica interna), conta como encontrado
                break; 
            } catch (IllegalAccessException e) {
                // Não tem acesso; ignora
                continue;
            } catch (InvocationTargetException e) {
                // O método executou mas deu erro interno (ex: NullPointerException). 
                // Isso significa que o método EXISTE e é INVOCÁVEL. O teste passa.
                found = m;
                break;
            }
        }

        assertNotNull(found, "Não foi encontrado nenhum método público invocável (além do main) na classe Quizz.");
    }

    @Test
    void toStringShouldNotThrowAndReturnString() {
        Assumptions.assumeTrue(quizzInstance != null, "Instância de Quizz não disponível - teste ignorado.");
        String s = null;
        try {
            s = quizzInstance.toString();
        } catch (Throwable t) {
            fail("toString lançou exceção: " + t.getMessage());
        }
        assertNotNull(s, "toString() retornou null.");
    }

    // --- Métodos Utilitários ---

    private static Object tryInstantiate(Class<?> cls) {
        Constructor<?>[] ctors = cls.getDeclaredConstructors();
        
        // 1. Tenta construtor padrão (sem argumentos) público primeiro
        for (Constructor<?> c : ctors) {
            if (c.getParameterCount() == 0 && Modifier.isPublic(c.getModifiers())) {
                try {
                    return c.newInstance();
                } catch (Exception ignored) { }
            }
        }
        
        // 2. Tenta qualquer construtor preenchendo com valores padrão
        for (Constructor<?> c : ctors) {
            c.setAccessible(true);
            Class<?>[] types = c.getParameterTypes();
            Object[] args = new Object[types.length];
            boolean ok = true;
            
            for (int i = 0; i < types.length; i++) {
                try {
                    args[i] = defaultFor(types[i]);
                } catch (Exception ex) {
                    ok = false;
                    break;
                }
            }
            if (!ok) continue;
            
            try {
                return c.newInstance(args);
            } catch (Exception ignored) { }
        }
        return null;
    }

    private static Object defaultFor(Class<?> type) {
        if (!type.isPrimitive()) {
            if (type == String.class) return "";
            if (type.isArray()) return Array.newInstance(type.getComponentType(), 0);
            if (type.isEnum()) {
                Object[] constants = type.getEnumConstants();
                return constants.length > 0 ? constants[0] : null;
            }
            return null; // Retorna null para objetos complexos
        }
        if (type == boolean.class) return false;
        if (type == byte.class) return (byte) 0;
        if (type == short.class) return (short) 0;
        if (type == int.class) return 0;
        if (type == long.class) return 0L;
        if (type == float.class) return 0f;
        if (type == double.class) return 0d;
        if (type == char.class) return '\0';
        return null;
    }
}