/**
 * UI - Global UI Object
 * 
 * Contains utility methods for formatting, DOM manipulation,
 * and rendering methods for displaying calculator results.
 */

const UI = {
  /**
   * UTILITY METHODS
   */

  /**
   * formatNumber(number, decimals)
   * 
   * Formats a number with thousand separators and fixed decimal places.
   * Uses Brazilian locale (pt-BR) for proper formatting.
   * 
   * @param {number} number - Number to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted number string (e.g., "1.234,56")
   */
  formatNumber: function (number, decimals = 2) {
    return Number(number).toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  },

  /**
   * formatCurrency(value)
   * 
   * Formats a value as Brazilian Real (R$) currency.
   * 
   * @param {number} value - Value to format
   * @returns {string} Formatted currency string (e.g., "R$ 1.234,56")
   */
  formatCurrency: function (value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  },

  /**
   * showElement(elementId)
   * 
   * Shows an element by removing the 'hidden' class.
   * 
   * @param {string} elementId - ID of the element to show
   * @returns {void}
   */
  showElement: function (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.remove("hidden");
    } else {
      console.warn(`Element with id '${elementId}' not found`);
    }
  },

  /**
   * hideElement(elementId)
   * 
   * Hides an element by adding the 'hidden' class.
   * 
   * @param {string} elementId - ID of the element to hide
   * @returns {void}
   */
  hideElement: function (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add("hidden");
    } else {
      console.warn(`Element with id '${elementId}' not found`);
    }
  },

  /**
   * scrollToElement(elementId)
   * 
   * Smoothly scrolls to an element on the page.
   * 
   * @param {string} elementId - ID of the element to scroll to
   * @returns {void}
   */
  scrollToElement: function (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Element with id '${elementId}' not found`);
    }
  },

  /**
   * RENDERING METHODS
   */

  /**
   * renderResults(data)
   * 
   * Renders the main calculation results with cards showing:
   * - Route information (origin → destination)
   * - Distance traveled
   * - CO2 emissions
   * - Transport mode used
   * - Savings compared to car (if applicable)
   * 
   * @param {Object} data - Result data containing:
   *                        - origin: Origin city
   *                        - destination: Destination city
   *                        - distance: Distance in km
   *                        - emission: CO2 emissions in kg
   *                        - mode: Transport mode (bicycle, car, bus, truck)
   *                        - savings: Object with {savedKg, percentage} or null
   * @returns {string} HTML string with formatted results
   */
  renderResults: function (data) {
    const modeData = CONFIG.TRANSPORT_MODES[data.mode];
    const emissionColor = data.emission === 0 ? "#10b981" : "#f59e0b";

    let savingsHTML = "";
    if (data.mode !== "car" && data.savings) {
      savingsHTML = `
        <div class="results-card results-card--savings">
          <div class="results-card__header">
            <h3 class="results-card__title">🌱 Você economizou</h3>
          </div>
          <div class="results-card__content">
            <p class="results-card__value">${this.formatNumber(data.savings.savedKg, 2)} kg CO₂</p>
            <p class="results-card__subtitle">${data.savings.percentage}% menos que um carro</p>
          </div>
        </div>
      `;
    }

    return `
      <!-- Route Information -->
      <div class="results-card">
        <div class="results-card__header">
          <h3 class="results-card__title">🛣️ Rota</h3>
        </div>
        <div class="results-card__content">
          <p class="results-card__text">
            <strong>${data.origin}</strong>
          </p>
          <p class="results-card__arrow">↓</p>
          <p class="results-card__text">
            <strong>${data.destination}</strong>
          </p>
        </div>
      </div>

      <!-- Distance Card -->
      <div class="results-card">
        <div class="results-card__header">
          <h3 class="results-card__title">📏 Distância</h3>
        </div>
        <div class="results-card__content">
          <p class="results-card__value">${this.formatNumber(data.distance, 1)} km</p>
        </div>
      </div>

      <!-- Emissions Card -->
      <div class="results-card">
        <div class="results-card__header">
          <h3 class="results-card__title">💨 Emissão de CO₂</h3>
        </div>
        <div class="results-card__content">
          <p class="results-card__value" style="color: ${emissionColor};">
            ${this.formatNumber(data.emission, 2)} kg
          </p>
          <p class="results-card__subtitle">${data.emission === 0 ? "Neutro em carbono" : "Dióxido de carbono emitido"}</p>
        </div>
      </div>

      <!-- Transport Mode Card -->
      <div class="results-card">
        <div class="results-card__header">
          <h3 class="results-card__title">🚗 Modo de Transporte</h3>
        </div>
        <div class="results-card__content results-card__transport">
          <p class="results-card__icon">${modeData.icon}</p>
          <p class="results-card__value">${modeData.label}</p>
        </div>
      </div>

      <!-- Savings Card (if applicable) -->
      ${savingsHTML}
    `;
  },

  /**
   * renderComparison(modesArray, selectedMode)
   * 
   * Renders a comparison of all transport modes showing:
   * - Emissions for each mode
   * - Percentage comparison vs car
   * - Visual progress bars with color coding
   * - Selection indicator for current mode
   * 
   * @param {Array} modesArray - Array from Calculator.calculateAllModes()
   *                             Each item: {mode, emission, percentageVsCar}
   * @param {string} selectedMode - Currently selected transport mode
   * @returns {string} HTML string with comparison cards
   */
  renderComparison: function (modesArray, selectedMode) {
    // Find the maximum emission for scale reference
    const maxEmission = Math.max(...modesArray.map(m => m.emission));

    // Generate color based on emission percentage
    const getBarColor = (percentage) => {
      if (percentage <= 25) return "#10b981"; // Green
      if (percentage <= 75) return "#f59e0b"; // Yellow
      if (percentage < 100) return "#f97316"; // Orange
      return "#ef4444"; // Red
    };

    let comparisonHTML = `
      <div class="comparison-container">
    `;

    // Render each transport mode
    modesArray.forEach(mode => {
      const modeData = CONFIG.TRANSPORT_MODES[mode.mode];
      const barWidth = maxEmission > 0 ? (mode.emission / maxEmission) * 100 : 0;
      const barColor = getBarColor(mode.percentageVsCar);
      const isSelected = mode.mode === selectedMode;
      const selectedClass = isSelected ? "comparison-item--selected" : "";

      comparisonHTML += `
        <div class="comparison-item ${selectedClass}">
          <div class="comparison-item__header">
            <div class="comparison-item__mode">
              <span class="comparison-item__icon">${modeData.icon}</span>
              <span class="comparison-item__label">${modeData.label}</span>
            </div>
            ${isSelected ? '<span class="comparison-item__badge">✓ Selecionado</span>' : ""}
          </div>

          <div class="comparison-item__stats">
            <p class="comparison-item__emission">
              <strong>${this.formatNumber(mode.emission, 2)} kg CO₂</strong>
            </p>
            <p class="comparison-item__percentage">
              ${mode.percentageVsCar}% vs carro
            </p>
          </div>

          <div class="comparison-item__bar-container">
            <div class="comparison-item__bar" style="width: ${barWidth}%; background-color: ${barColor};"></div>
          </div>
        </div>
      `;
    });

    // Add tip box
    comparisonHTML += `
      <div class="comparison-tip">
        <p class="comparison-tip__text">
          💡 <strong>Dica:</strong> Bicicleta e transporte público são as opções mais sustentáveis!
        </p>
      </div>
      </div>
    `;

    return comparisonHTML;
  },

  /**
   * renderCarbonCredits(creditsData)
   * 
   * Renders carbon credit information showing:
   * - Number of credits needed to offset emissions
   * - Estimated price range for credits
   * - Educational information about carbon credits
   * 
   * @param {Object} creditsData - Object containing:
   *                               - credits: Number of carbon credits
   *                               - price: {min, max, average}
   * @returns {string} HTML string with carbon credits info
   */
  renderCarbonCredits: function (creditsData) {
    return `
      <div class="carbon-credits-container">
        <!-- Credits Card -->
        <div class="carbon-credits-card">
          <div class="carbon-credits-card__header">
            <h3 class="carbon-credits-card__title">💳 Créditos Necessários</h3>
          </div>
          <div class="carbon-credits-card__content">
            <p class="carbon-credits-card__value">
              ${this.formatNumber(creditsData.credits, 4)}
            </p>
            <p class="carbon-credits-card__helper">
              1 crédito = 1.000 kg CO₂
            </p>
          </div>
        </div>

        <!-- Price Card -->
        <div class="carbon-credits-card">
          <div class="carbon-credits-card__header">
            <h3 class="carbon-credits-card__title">💰 Valor Estimado</h3>
          </div>
          <div class="carbon-credits-card__content">
            <p class="carbon-credits-card__value">
              ${this.formatCurrency(creditsData.price.average)}
            </p>
            <p class="carbon-credits-card__range">
              ${this.formatCurrency(creditsData.price.min)} - ${this.formatCurrency(creditsData.price.max)}
            </p>
          </div>
        </div>
      </div>

      <!-- Info Box -->
      <div class="carbon-credits-info">
        <h4 class="carbon-credits-info__title">🌍 O que são Créditos de Carbono?</h4>
        <p class="carbon-credits-info__text">
          Créditos de carbono representam uma tonelada de dióxido de carbono reduzida ou removida da atmosfera.
          Investir em créditos de carbono ajuda a financiar projetos sustentáveis e a combater as mudanças climáticas.
        </p>
      </div>

      <!-- Action Button -->
      <button class="carbon-credits-button" disabled>
        🌱 Compensar Emissões
      </button>
    `;
  },

  /**
   * showLoading(buttonElement)
   * 
   * Shows a loading spinner on a button and disables it.
   * Saves the original button text for later restoration.
   * 
   * @param {HTMLElement} buttonElement - The button element to show loading on
   * @returns {void}
   */
  showLoading: function (buttonElement) {
    if (!buttonElement) {
      console.warn("Button element not provided");
      return;
    }

    // Save original text in data attribute
    buttonElement.dataset.originalText = buttonElement.textContent;

    // Disable button
    buttonElement.disabled = true;

    // Show spinner with loading text
    buttonElement.innerHTML = `<span class="spinner"></span> Calculando...`;
  },

  /**
   * hideLoading(buttonElement)
   * 
   * Hides the loading spinner and restores the button's original state.
   * 
   * @param {HTMLElement} buttonElement - The button element to hide loading from
   * @returns {void}
   */
  hideLoading: function (buttonElement) {
    if (!buttonElement) {
      console.warn("Button element not provided");
      return;
    }

    // Enable button
    buttonElement.disabled = false;

    // Restore original text from data attribute
    buttonElement.textContent = buttonElement.dataset.originalText || "Calcular Emissão";
  }
};
