package EngenhariaDePrompt.EncontrarDatas;

import java.util.*;

public class TestEncontrarDatas {
    public static void main(String[] args) {
        String texto = "Hoje é 28/12/2025, ontem foi 27-12-2025 e aniversário em 01/01/26.";
        List<String> datas = EncontrarDatas.encontrarDatas(texto);
        System.out.println("Datas encontradas: " + datas);
    }
}
