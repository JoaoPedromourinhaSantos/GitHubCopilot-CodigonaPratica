# AutoMercado - Plataforma de Vendas de Carros Usados

![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)

## 📋 Resumo

Plataforma web desenvolvida para exibir e gerenciar listagem de veículos usados (car sales). O projeto implementa uma interface responsiva, listagem dinâmica com busca avançada, e remoção de veículos com feedback visual ao usuário.

## 📁 Estrutura de Arquivos

```
Sistema Simples/
├── carSales.html          # Página principal (HTML puro)
├── carSales.css           # Estilos e responsividade
├── carSales.js            # Lógica e funcionalidades
├── README.MD              # Este documento
└── IMG/                   # Pasta com imagens dos veículos
    ├── car1.jpg
    ├── car2.jpg
    ├── car3.jpg
    └── car4.jpg
```

## ✨ Funcionalidades Implementadas

### Listagem e Visualização
- ✅ Listagem de veículos com campos: marca, modelo, ano, quilometragem e preço
- ✅ Exibição de imagens em miniatura com fallback para placeholder
- ✅ Interface responsiva (mobile e desktop)
- ✅ Design limpo e moderno com tema visual consistente

### Busca e Filtros
- ✅ Busca em tempo real por texto (marca, modelo, ano, quilometragem, preço)
- ✅ Filtragem dinâmica sem necessidade de recarregar página

### Ações do Usuário
- ✅ **Comprar veículo**: Remove o carro da lista com toast visual (popup) por 5 segundos
- ✅ **Contato com vendedor**: Abre cliente de email com informações do veículo
- ✅ **Anunciar veículo**: Botão para futuro formulário de cadastro

### Experiência do Usuário
- ✅ Toast (popup) com feedback visual durante compra
- ✅ Desabilitação temporária de botões durante processamento
- ✅ Mensagens de confirmação e alerta
- ✅ Remoção imediata do veículo da tela após compra
- ✅ Acessibilidade básica (labels, ARIA attributes)

### Design e Responsividade
- ✅ Layout flex responsivo
- ✅ Media queries para dispositivos pequenos (≤800px)
- ✅ CSS customizável via variáveis CSS (:root)
- ✅ Animações suave do toast
- ✅ Contraste adequado para legibilidade

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|-----------|-----------|
| **HTML5** | Estrutura semântica e marcação |
| **CSS3** | Estilos, layout flexbox, variáveis CSS, media queries |
| **JavaScript Vanilla** | Manipulação do DOM, eventos, lógica de negócio |

## 📝 Prompts Utilizados para Criar o Código

### Prompt 1: Estruturação do Projeto
```
"Quero que você atualize o código do carSales.html e coloque o javascript no 'carSales.js' 
e o css no 'carSales.css'. Além disso, faça um script para remover o carro da tela do usuario 
assim que ele clicar em comprar veículo, lembre-se que o pop up da compra seja mantido."
```

**Resultado**: Separação dos arquivos em estrutura modular com funcionalidade de compra e remoção de veículos.

### Prompt 2: Atualização do README
```
"Reescreva o Readme.md com todas as mudanças realizadas e com os possíveis prompts que você 
utilizei para você criar todo esse código. Coloque badges das linguagens utilizadas e quais 
as funcionalidades que temos. Coloque um tópico de possíveis funcionalidades a ser implementadas 
no código para o site de carros"
```

**Resultado**: Documentação completa com badges, histórico de prompts e roadmap de funcionalidades.

## 🚀 Como Executar / Testar

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Acesso a um servidor local ou file://

### Passos
1. Abra o arquivo `carSales.html` no navegador
2. Visualize a listagem de veículos disponíveis
3. Teste as funcionalidades:
   - Use a **barra de busca** para filtrar veículos
   - Clique em **"Comprar"** para processar uma compra (observe o popup e remoção do carro)
   - Clique em **"Contato"** para enviar email ao vendedor
   - Clique em **"Anunciar veículo"** (funcionalidade em desenvolvimento)

### Testes Recomendados
- ✅ Busca por marca (ex: "Fiat", "Honda")
- ✅ Busca por ano (ex: "2018", "2019")
- ✅ Clique em comprar e observe o popup de 5s
- ✅ Redimensione a janela para testar responsividade
- ✅ Teste em dispositivo mobile

## 🎨 Customização

### Variáveis CSS
Altere as cores no início do arquivo `carSales.css`:

```css
:root {
    --accent: #0b5ed7;      /* Cor principal (azul) */
    --muted: #6c757d;       /* Cor secundária (cinza) */
    --bg: #f7f9fc;          /* Fundo da página */
    --card: #ffffff;        /* Fundo dos cards */
    --radius: 10px;         /* Arredondamento */
}
```

### Adicionar Novos Carros
Edite o array `cars` em `carSales.js`:

```javascript
{
    id: 4,
    brand: 'Toyota',
    model: 'Corolla 2020',
    year: 2020,
    mileage: '32.000 km',
    price: 'R$ 65.000',
    image: 'IMG/car5.jpg',
    shortAlt: 'Toyota Corolla 2020',
    description: 'Descrição do veículo...'
}
```

## 🔮 Funcionalidades Planejadas para Implementação que voce pode fazer

> 💡 **Contribuições Bem-Vindas!** Qualquer pessoa interessada em implementar estas funcionalidades pode fazer um **Pull Request** com as mudanças. Siga o processo de contribuição descrito na seção [🤝 Contribuindo](#-contribuindo) e descreva claramente as funcionalidades adicionadas no seu PR.

### Curto Prazo
- 📌 **Formulário de Cadastro**: Implementar form completo para anunciar novos veículos
- 🔍 **Filtros Avançados**: Filtrar por marca, faixa de preço e ano
- 📊 **Ordenação**: Ordenar por preço (crescente/decrescente) ou ano
- 💾 **localStorage**: Persistir dados de carros entre recarregamentos da página

### Médio Prazo
- 🖼️ **Galeria de Imagens**: Múltiplas fotos por veículo com carousel
- ⭐ **Avaliações**: Sistema de comentários e rating de veículos
- ❤️ **Favoritos**: Permitir usuários salvar carros favoritos
- 📱 **Detalhes Expandidos**: Página separada (carDetail.html) com informações completas
- 🔐 **Autenticação**: Login de usuários e vendedores

### Longo Prazo
- 💳 **Sistema de Pagamento**: Integração com gateway de pagamento
- 📧 **Notificações**: Emails automáticos de interesse e atualizações
- 📍 **Localização**: Google Maps integrado para localizar vendedores
- 🤖 **IA**: Recomendações personalizadas baseadas em histórico
- 📊 **Dashboard Admin**: Painel para gerenciar listagens e usuários
- 🌐 **Backend**: Implementar API REST com Node.js/Express ou Python/Flask
- 📈 **Analytics**: Rastreamento de visualizações e conversões

## 📄 Estrutura do Código

### carSales.js - Funções Principais

```javascript
renderRows(list)        // Renderiza linhas da tabela
purchase(id)            // Processa compra e remove carro
contactSeller(id)       // Abre cliente de email
openDetail(id)          // Abre página de detalhes (futuro)
```

### carSales.css - Classes Principais

```css
.card        // Container com sombra
.controls    // Barra de busca e botões
.btn         // Botões primários
.actions     // Botões de ação na tabela
#purchaseToast  // Toast de notificação
```

## 🤝 Contribuindo

Para adicionar novas funcionalidades:
1. Crie uma nova branch: `git checkout -b feature/nova-funcionalidade`
2. Implemente a funcionalidade
3. Teste em diferentes browsers
4. Faça commit: `git commit -m "Adiciona nova funcionalidade"`
5. Push para a branch: `git push origin feature/nova-funcionalidade`

## 📝 Notas de Desenvolvimento

- O código utiliza JavaScript vanilla (sem frameworks) para máxima compatibilidade
- Todos os estilos são centralizados em variáveis CSS para fácil manutenção
- A estrutura HTML é semântica e acessível (WCAG)
- Implementações futuras devem manter a modularidade atual

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato ou abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando GitHub Copilot**

