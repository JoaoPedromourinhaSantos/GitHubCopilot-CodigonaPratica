/**
 * CONFIG - Global Configuration Object
 * 
 * Contains application settings, emission factors, transport mode metadata,
 * carbon credit configuration, and utility methods for initializing the app.
 */

const CONFIG = {
  /**
   * EMISSION_FACTORS
   * CO2 emissions in kilograms per kilometer for each transport mode
   */
  EMISSION_FACTORS: {
    bicycle: 0,
    car: 0.12,
    bus: 0.089,
    truck: 0.96
  },

  /**
   * TRANSPORT_MODES
   * Metadata for each transport mode including label, icon, and color
   */
  TRANSPORT_MODES: {
    bicycle: {
      label: "Bicicleta",
      icon: "🚴",
      color: "#3b82f6"
    },
    car: {
      label: "Carro",
      icon: "🚗",
      color: "#f59e0b"
    },
    bus: {
      label: "Ônibus",
      icon: "🚌",
      color: "#10b981"
    },
    truck: {
      label: "Caminhão",
      icon: "🚚",
      color: "#ef4444"
    }
  },

  /**
   * CARBON_CREDIT
   * Configuration for carbon credit calculations
   */
  CARBON_CREDIT: {
    KG_PER_CREDIT: 1000,
    PRICE_MIN_BRL: 50,
    PRICE_MAX_BRL: 150
  },

  /**
   * populateDatalist()
   * 
   * Populates the cities datalist with all unique cities from RoutesDB.
   * Creates option elements for each city and appends them to the datalist.
   * 
   * @returns {void}
   */
  populateDatalist: function () {
    // Get the datalist element
    const datalistElement = document.getElementById("cities-list");

    // Safety check: ensure datalist exists
    if (!datalistElement) {
      console.error("Datalist element with id 'cities-list' not found");
      return;
    }

    // Get all unique cities from RoutesDB
    const cities = RoutesDB.getAllCities();

    // Create and append option elements for each city
    cities.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      datalistElement.appendChild(option);
    });

    console.log(`Datalist populated with ${cities.length} cities`);
  },

  /**
   * setupDistanceAutofill()
   * 
   * Sets up event listeners for automatic distance filling based on origin and destination.
   * Manages the manual distance input option and provides user feedback.
   * 
   * @returns {void}
   */
  setupDistanceAutofill: function () {
    // Get form elements
    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");
    const distanceInput = document.getElementById("distance");
    const manualCheckbox = document.getElementById("manual-distance");
    const helperText = document.querySelector(".calculator-form__helper-text");

    // Safety checks
    if (!originInput || !destinationInput || !distanceInput || !manualCheckbox || !helperText) {
      console.error("One or more required form elements not found");
      return;
    }

    /**
     * Attempts to find and fill the distance based on origin and destination
     */
    const tryFillDistance = () => {
      const origin = originInput.value.trim();
      const destination = destinationInput.value.trim();

      // Only proceed if both cities are filled
      if (!origin || !destination) {
        distanceInput.value = "";
        helperText.textContent = "A distância será preenchida automáticamente";
        helperText.style.color = "var(--text-light)";
        distanceInput.removeAttribute("readonly");
        return;
      }

      // Try to find the distance between cities
      const distance = RoutesDB.findDistance(origin, destination);

      if (distance !== null) {
        // Distance found: fill input and make readonly
        distanceInput.value = distance;
        distanceInput.setAttribute("readonly", "readonly");
        helperText.textContent = "✓ Distância encontrada automaticamente";
        helperText.style.color = "var(--primary)";
      } else {
        // Distance not found: clear input and suggest manual entry
        distanceInput.value = "";
        distanceInput.removeAttribute("readonly");
        helperText.textContent = "⚠ Rota não encontrada. Marque 'inserir distância manualmente' para continuar";
        helperText.style.color = "var(--warning)";
      }
    };

    // Add change event listeners to origin and destination inputs
    originInput.addEventListener("change", tryFillDistance);
    destinationInput.addEventListener("change", tryFillDistance);

    // Add change listener to manual distance checkbox
    manualCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // When checked: allow manual entry
        distanceInput.removeAttribute("readonly");
        helperText.textContent = "Digite a distância em quilômetros";
        helperText.style.color = "var(--text-light)";
      } else {
        // When unchecked: try to find route again
        tryFillDistance();
      }
    });

    console.log("Distance autofill setup completed");
  }
};
