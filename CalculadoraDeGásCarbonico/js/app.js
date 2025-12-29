/**
 * app.js - Application Initialization and Event Handling
 * 
 * This file initializes the CO2 emissions calculator application,
 * sets up event listeners, and handles form submissions with calculation logic.
 */

// Immediately Invoked Function Expression (IIFE)
// Wraps all code in function scope to avoid polluting global namespace
(function () {
  /**
   * INITIALIZATION
   * Runs when the DOM is fully loaded and ready
   */
  document.addEventListener("DOMContentLoaded", function () {
    console.log("🌱 Inicializando Calculadora de Emissões de CO²...");

    // Step 1: Populate the datalist with all available cities
    // This enables autocomplete functionality in origin and destination inputs
    CONFIG.populateDatalist();

    // Step 2: Setup automatic distance filling when cities are selected
    // This listens for changes in origin/destination inputs and auto-fills distance
    CONFIG.setupDistanceAutofill();

    // Step 3: Get the form element from the DOM
    const calculatorForm = document.getElementById("calculator-form");

    // Safety check: ensure form exists
    if (!calculatorForm) {
      console.error("Form with id 'calculator-form' not found");
      return;
    }

    // Step 4: Add submit event listener to the form
    // This handles the calculation when user clicks "Calcular Emissão"
    calculatorForm.addEventListener("submit", handleFormSubmit);

    // Step 5: Log successful initialization
    console.log("✅ Calculadora inicializada!");
  });

  /**
   * handleFormSubmit(event)
   * 
   * Handles the form submission, validates inputs, performs calculations,
   * and displays results to the user.
   * 
   * @param {Event} event - The form submit event
   * @returns {void}
   */
  function handleFormSubmit(event) {
    // Step 1: Prevent default form submission behavior
    event.preventDefault();

    console.log("📝 Processando cálculo de emissões...");

    // Step 2: Get all form values from the user
    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");
    const distanceInput = document.getElementById("distance");
    const transportRadios = document.querySelectorAll('input[name="transport"]');

    // Extract and trim values
    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();
    const distance = parseFloat(distanceInput.value);

    // Get selected transport mode
    let selectedTransportMode = null;
    transportRadios.forEach(radio => {
      if (radio.checked) {
        selectedTransportMode = radio.value;
      }
    });

    // Step 3: Validate all inputs
    // Check if origin is filled
    if (!origin) {
      alert("⚠️ Por favor, preencha a cidade de origem");
      originInput.focus();
      return;
    }

    // Check if destination is filled
    if (!destination) {
      alert("⚠️ Por favor, preencha a cidade de destino");
      destinationInput.focus();
      return;
    }

    // Check if distance is filled
    if (!distance || isNaN(distance)) {
      alert("⚠️ Por favor, preencha a distância");
      distanceInput.focus();
      return;
    }

    // Check if distance is greater than 0
    if (distance <= 0) {
      alert("⚠️ A distância deve ser maior que 0 km");
      distanceInput.focus();
      return;
    }

    // Check if transport mode is selected
    if (!selectedTransportMode) {
      alert("⚠️ Por favor, selecione um modo de transporte");
      return;
    }

    console.log("✓ Validação concluída com sucesso");

    // Step 4: Get the submit button element
    const submitButton = event.target.querySelector('button[type="submit"]');

    // Step 5: Show loading state on button
    UI.showLoading(submitButton);

    // Step 6: Hide previous results section to prevent visual confusion
    UI.hideElement("results");
    UI.hideElement("comparison");
    UI.hideElement("carbon-credits");

    // Step 7: Simulate processing with 1500ms delay
    // In a real application, this would be an actual API call
    setTimeout(function () {
      try {
        console.log("🔄 Calculando emissões...");

        // Calculate emission for the selected transport mode
        const selectedModeEmission = Calculator.calculateEmission(distance, selectedTransportMode);

        // Get car emission as baseline for comparison
        const carEmission = Calculator.calculateEmission(distance, "car");

        // Calculate savings compared to car (if not already car)
        const savingsData = Calculator.calculateSavings(selectedModeEmission, carEmission);

        // Calculate emissions for all transport modes
        const allModesComparison = Calculator.calculateAllModes(distance);

        // Calculate carbon credits needed
        const carbonCredits = Calculator.calculateCarbonCredits(selectedModeEmission);

        // Calculate carbon credit price estimates
        const creditPriceData = Calculator.estimateCreditPrice(carbonCredits);

        console.log("✓ Cálculos concluídos");

        // Build main results data object
        const resultsData = {
          origin: origin,
          destination: destination,
          distance: distance,
          emission: selectedModeEmission,
          mode: selectedTransportMode,
          savings: selectedModeEmission === carEmission ? null : savingsData
        };

        // Build carbon credits data object
        const creditsData = {
          credits: carbonCredits,
          price: creditPriceData
        };

        // Render and display results
        const resultsHTML = UI.renderResults(resultsData);
        const resultsContent = document.getElementById("results-content");
        resultsContent.innerHTML = resultsHTML;

        // Render and display mode comparison
        const comparisonHTML = UI.renderComparison(allModesComparison, selectedTransportMode);
        const comparisonContent = document.getElementById("comparison-content");
        comparisonContent.innerHTML = comparisonHTML;

        // Render and display carbon credits information
        const creditsHTML = UI.renderCarbonCredits(creditsData);
        const creditsContent = document.getElementById("carbon-credits-content");
        creditsContent.innerHTML = creditsHTML;

        // Show all result sections
        UI.showElement("results");
        UI.showElement("comparison");
        UI.showElement("carbon-credits");

        // Scroll smoothly to results section
        UI.scrollToElement("results");

        console.log("✓ Resultados exibidos com sucesso");

      } catch (error) {
        // Error handling: catch any unexpected errors during calculation
        console.error("❌ Erro durante o cálculo:", error);
        alert("❌ Ocorreu um erro ao processar o cálculo. Por favor, tente novamente.");

      } finally {
        // Always restore button state, whether calculation succeeded or failed
        UI.hideLoading(submitButton);
      }
    }, 1500); // 1500ms delay simulates processing time
  }
})();
