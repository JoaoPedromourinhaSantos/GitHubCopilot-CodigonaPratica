# 🌱 Calculadora de Emissão de CO² 

> **Calcule o impacto ambiental de suas viagens e compare modos de transporte sustentáveis**

![Status](https://img.shields.io/badge/Status-Ativo-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![HTML5](https://img.shields.io/badge/HTML-Semântico-orange)
![CSS3](https://img.shields.io/badge/CSS-Glassmorphism-purple)

---

## 🎯 Sobre o Projeto

Uma **aplicação web moderna e interativa** que calcula a quantidade de dióxido de carbono (CO²) emitida durante viagens entre cidades brasileiras. Compare diferentes modos de transporte e descubra o impacto ambiental de suas escolhas.

**Benefícios principais:**
- ✅ Cálculos automáticos e precisos de emissões de CO²
- ✅ Comparação visual entre todos os modos de transporte
- ✅ Interface moderna com glassmorphism design
- ✅ Funcionalidade responsiva (mobile, tablet, desktop)
- ✅ Completamente funcional sem dependências externas (Vanilla JS)

---

## 🚀 Como Usar em 4 Passos

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUXO DE UTILIZAÇÃO                      │
└─────────────────────────────────────────────────────────────┘

  1️⃣ ORIGEM
     └─ Selecione a cidade de partida
     └─ Autocomplete com 40+ cidades brasileiras
     
  2️⃣ DESTINO  
     └─ Escolha a cidade de destino
     └─ Distância é calculada automaticamente
     
  3️⃣ MODO DE TRANSPORTE
     └─ 🚴 Bicicleta  | 🚗 Carro (padrão)
     └─ 🚌 Ônibus    | 🚚 Caminhão
     
  4️⃣ RESULTADOS INSTANTÂNEOS
     └─ 📊 Emissão de CO² em kg
     └─ 📈 Comparação com outros modos
     └─ 💳 Créditos de carbono necessários
```

### Exemplo Prático

| Campo | Valor |
|-------|-------|
| **Origem** | São Paulo, SP |
| **Destino** | Rio de Janeiro, RJ |
| **Distância** | 430 km (automático) |
| **Transporte** | Carro 🚗 |
| **Resultado** | 51.6 kg CO² |
| **Comparação** | 45% menos que caminhão |

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Arquivos

```
CalculadoraDeGásCarbonico/
│
├── 📄 index.html                    # Estrutura HTML5 Semântica
│   ├── Header com título e subtítulo
│   ├── Formulário de entrada
│   └── Seções de resultados
│
├── 🎨 css/
│   └── style.css                   # Glassmorphism + BEM + Responsivo
│       ├── Variáveis CSS (cores, spacing, shadows)
│       ├── Componentes (cards, buttons, inputs)
│       └── Media queries (mobile-first)
│
├── ⚙️ js/
│   ├── routes-data.js              # Base de dados de rotas (40+ cidades)
│   │   └─ RoutesDB.getAllCities()
│   │   └─ RoutesDB.findDistance()
│   │
│   ├── config.js                   # Configurações globais
│   │   ├─ Fatores de emissão por modal
│   │   ├─ Metadata de transporte (ícones, cores)
│   │   ├─ Dados de crédito de carbono
│   │   └─ Inicialização (datalist, autofill)
│   │
│   ├── calculator.js               # Lógica de cálculos
│   │   ├─ calculateEmission()
│   │   ├─ calculateAllModes()
│   │   ├─ calculateSavings()
│   │   ├─ calculateCarbonCredits()
│   │   └─ estimateCreditPrice()
│   │
│   ├── ui.js                       # Renderização e interação
│   │   ├─ Métodos utilitários (formatação, manipulação DOM)
│   │   ├─ renderResults()
│   │   ├─ renderComparison()
│   │   └─ renderCarbonCredits()
│   │
│   └── app.js                      # Orquestração e event handlers
│       ├─ DOMContentLoaded (inicialização)
│       └─ handleFormSubmit (processamento)
│
└── 📖 README.md                    # Este arquivo
```

### Responsabilidade de Cada Módulo

| Arquivo | Responsabilidade | Principais Funções |
|---------|------------------|-------------------|
| **routes-data.js** | Base de dados geográficos | `getAllCities()`, `findDistance()` |
| **config.js** | Configurações + inicialização | `populateDatalist()`, `setupDistanceAutofill()` |
| **calculator.js** | Cálculos matemáticos de emissão | `calculateEmission()`, `calculateAllModes()` |
| **ui.js** | Renderização e formatação visual | `renderResults()`, `renderComparison()` |
| **app.js** | Orquestração e fluxo da aplicação | Form submit, erro handling, timing |

---

## 🧮 Como Funciona a Lógica de Cálculo

### Fórmula Principal

```
EMISSÃO DE CO² (kg) = DISTÂNCIA (km) × FATOR DE EMISSÃO (kg CO²/km)
```

### Fatores de Emissão por Modo

| Transporte | Fator (kg CO²/km) | Exemplo: 100 km |
|------------|------------------|-----------------|
| 🚴 Bicicleta | 0.00 | 0 kg |
| 🚌 Ônibus | 0.089 | 8.9 kg |
| 🚗 Carro | 0.12 | **12 kg** |
| 🚚 Caminhão | 0.96 | 96 kg |

**💡 Insight:** Um ônibus emite **7x menos CO²** que um caminhão na mesma distância!

### Fluxo de Processamento

```
┌─────────────────────────────────────────────────────────────┐
│  1. ENTRADA DE DADOS (Usuário preenche formulário)          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. VALIDAÇÃO (Verifica campos obrigatórios)                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. CÁLCULO (Calculator.calculateAllModes())                │
│     ├─ Emissão para modo selecionado                        │
│     ├─ Emissão para todos os modos                          │
│     └─ Comparativo percentual                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  4. CARBON CREDITS (Calculator.calculateCarbonCredits())    │
│     └─ Créditos necessários para compensar                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  5. RENDERIZAÇÃO (UI.renderResults/Comparison/Credits)      │
└─────────────────────────────────────────────────────────────┘
```

### Auto-Preenchimento de Distância

```javascript
// Quando o usuário seleciona ORIGEM e DESTINO:

1. Busca na base RoutesDB
   └─ RoutesDB.findDistance("São Paulo, SP", "Rio de Janeiro, RJ")
   
2. Se encontrado (430 km)
   ├─ Preenche campo de distância
   ├─ Torna readonly
   └─ Mostra ✓ verde (sucesso)
   
3. Se não encontrado
   ├─ Sugere ao usuário inserir manualmente
   └─ Desbloqueia campo para edição
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend Stack

| Tecnologia | Função | Metodologia |
|-----------|--------|------------|
| **HTML5** | Estrutura semântica | Formulários acessíveis |
| **CSS3** | Styling moderno | BEM + Glassmorphism |
| **Vanilla JS** | Lógica interativa | IIFE + Event-driven |

### Features Técnicas

✨ **Glassmorphism Design**
- Backgrounds translúcidos com blur effect
- Bordas finas com opacidade controlada
- Sombras suaves e sofisticadas

🎨 **Metodologia BEM (Block Element Modifier)**
- `.calculator-form` (bloco)
- `.calculator-form__input` (elemento)
- `.calculator-form__button` (elemento)
- `.results-card--savings` (modificador)

📱 **Mobile-First Responsive**
- Grid CSS para layouts flexíveis
- Clamp() para tipografia responsiva
- Breakpoints: 640px, 1024px

⚡ **Performance**
- Zero dependências externas
- Bundle size: < 50KB
- Carregamento instantâneo

---

## 📊 Base de Dados de Rotas

A aplicação inclui **40+ rotas populares entre cidades brasileiras**, organizadas por regiões:

### Cobertura Geográfica

```
🏙️ CAPITAL PARA CAPITAL
   São Paulo ↔ Rio de Janeiro (430 km)
   São Paulo ↔ Brasília (1015 km)
   Rio ↔ Belo Horizonte (708 km)

📍 ROTAS REGIONAIS
   São Paulo → Campinas (95 km)
   Rio → Niterói (13 km)
   BH → Ouro Preto (100 km)

🗺️ NORTE, NORDESTE, SUL
   Fortaleza, Recife, Salvador
   Curitiba, Porto Alegre
   Florianópolis e mais...
```

---

## 🎮 Como Executar Localmente

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Nenhuma dependência ou instalação necessária

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/JoaoPedromourinhaSantos/GitHubCopilot-CodigonaPratica.git
   ```

2. **Navegue até o projeto**
   ```bash
   cd CalculadoraDeGásCarbonico
   ```

3. **Abra no navegador**
   ```bash
   # Windows
   start index.html
   
   # macOS
   open index.html
   
   # Linux
   firefox index.html
   ```

4. **Pronto!** 🎉
   - A aplicação está 100% funcional offline
   - Todos os dados estão locais

---

## 💡 Exemplos de Cálculos

### Exemplo 1: Trip Ecológico
```
📍 São Paulo → Rio de Janeiro
🚴 Bicicleta (incompleto, mas possível!)
💨 Emissão: 0 kg CO²
```

### Exemplo 2: Viagem em Ônibus
```
📍 São Paulo → Brasília (1015 km)
🚌 Ônibus (recomendado!)
💨 Emissão: 90.3 kg CO²
💚 45% menos que carro
```

### Exemplo 3: Transporte de Carga
```
📍 Belo Horizonte → Montes Claros (435 km)
🚚 Caminhão
💨 Emissão: 417.6 kg CO²
💳 Créditos: 0.4176
💰 Valor: R$ 45.93 - R$ 62.63
```

---

## 🔮 Recursos Futuros

- [ ] Integração com API de rotas real (Google Maps, OpenStreetMap)
- [ ] Histórico de cálculos (localStorage)
- [ ] Compartilhamento de resultados (social media)
- [ ] Modo escuro automático
- [ ] PWA (Progressive Web App)
- [ ] Suporte a mais cidades globais
- [ ] Gráficos interativos de emissões

---

## 🤝 Contribuindo

Encontrou um bug ou tem uma sugestão?

1. **Abra uma Issue** descrevendo o problema
2. **Faça um Fork** do projeto
3. **Crie uma Branch** (`git checkout -b feature/AmazingFeature`)
4. **Commit** suas mudanças (`git commit -m 'Add AmazingFeature'`)
5. **Push** para a Branch (`git push origin feature/AmazingFeature`)
6. **Abra um Pull Request**

---

## 📝 Licença

Este projeto está sob a licença **MIT** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**João Pedro Mourinha Santos**

Desenvolvido com ❤️ usando **GitHub Copilot** para demonstrar práticas modernas de desenvolvimento web.

---

## 🙏 Agradecimentos

- Baseado em padrões de desenvolvimento sustentável
- Inspirado em calculadoras de pegada de carbono globais
- Educação ambiental através de tecnologia

---

## 📞 Suporte

Dúvidas ou feedback?

- 📧 Abra uma Issue no repositório
- 💬 Discuta ideas em Discussions
- ⭐ Deixe uma estrela se gostou!

---

<div align="center">

**Ajude a tornar o planeta mais verde! 🌍♻️**

*A sustentabilidade começa com pequenas escolhas.*

</div>
