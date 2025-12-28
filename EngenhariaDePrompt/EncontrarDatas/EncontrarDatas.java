package EngenhariaDePrompt.EncontrarDatas;

import java.util.*;
import java.util.regex.*;

public class EncontrarDatas {
    private static final Pattern DATE_PATTERN = Pattern.compile(
        "\\b(0[1-9]|[12][0-9]|3[01])[\\/-](0[1-9]|1[0-2])[\\/-](\\d{2}|\\d{4})\\b"
    );

    public static List<String> encontrarDatas(String texto) {
        if (texto == null || texto.isEmpty()) return Collections.emptyList();
        List<String> datas = new ArrayList<>();
        Matcher matcher = DATE_PATTERN.matcher(texto);
        while (matcher.find()) {
            datas.add(matcher.group());
        }
        return datas;
    }
}

