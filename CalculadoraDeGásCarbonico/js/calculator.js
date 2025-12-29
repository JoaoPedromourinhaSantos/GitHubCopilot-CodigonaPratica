/**
 * Calculator - Global Calculator Object
 * 
 * Contains methods for calculating CO2 emissions based on distance and transport mode,
 * comparing emissions across different transport modes, calculating savings,
 * and estimating carbon credit values.
 */

const Calculator = {
  /**
   * calculateEmission(distanceKm, transportMode)
   * 
   * Calculates the CO2 emissions for a given distance and transport mode.
   * Uses emission factors from CONFIG.EMISSION_FACTORS (kg CO2 per km).
   * 
   * Calculation: emission = distance (km) × emission factor (kg CO2/km)
   * 
   * @param {number} distanceKm - Distance in kilometers
   * @param {string} transportMode - Transport mode key (bicycle, car, bus, truck)
   * @returns {number} CO2 emissions in kilograms, rounded to 2 decimal places
   */
  calculateEmission: function (distanceKm, transportMode) {
    // Validate inputs
    if (distanceKm < 0 || !transportMode) {
      console.error("Invalid inputs for calculateEmission");
      return 0;
    }

    // Get emission factor from CONFIG
    const emissionFactor = CONFIG.EMISSION_FACTORS[transportMode];

    if (emissionFactor === undefined) {
      console.error(`Unknown transport mode: ${transportMode}`);
      return 0;
    }

    // Calculate emission: distance × factor
    const emission = distanceKm * emissionFactor;

    // Return result rounded to 2 decimal places
    return Math.round(emission * 100) / 100;
  },

  /**
   * calculateAllModes(distanceKm)
   * 
   * Calculates CO2 emissions for all transport modes for a given distance.
   * Compares each mode's emissions as a percentage relative to car emissions (baseline).
   * 
   * Calculation: percentageVsCar = (mode emission / car emission) × 100
   * 
   * @param {number} distanceKm - Distance in kilometers
   * @returns {Array<Object>} Array of objects sorted by emission (lowest first):
   *                          [{mode: 'bicycle', emission: 0, percentageVsCar: 0}, ...]
   */
  calculateAllModes: function (distanceKm) {
    // Create array to store results
    const results = [];

    // First, calculate car emission as baseline for comparison
    const carEmission = this.calculateEmission(distanceKm, "car");

    // Iterate through all transport modes in CONFIG
    for (const mode in CONFIG.EMISSION_FACTORS) {
      if (CONFIG.EMISSION_FACTORS.hasOwnProperty(mode)) {
        // Calculate emission for this mode
        const emission = this.calculateEmission(distanceKm, mode);

        // Calculate percentage vs car baseline: (mode emission / car emission) × 100
        const percentageVsCar = carEmission > 0 
          ? Math.round((emission / carEmission) * 100)
          : (emission === 0 ? 0 : 100);

        // Push result object to array
        results.push({
          mode: mode,
          emission: emission,
          percentageVsCar: percentageVsCar
        });
      }
    }

    // Sort array by emission (lowest first)
    results.sort((a, b) => a.emission - b.emission);

    // Return sorted array
    return results;
  },

  /**
   * calculateSavings(emission, baselineEmission)
   * 
   * Calculates the CO2 savings when using one transport mode instead of another.
   * 
   * Calculations:
   * - saved = baseline emission - chosen emission
   * - percentage = (saved / baseline) × 100
   * 
   * @param {number} emission - Emissions of the chosen transport mode (kg CO2)
   * @param {number} baselineEmission - Emissions of the baseline transport mode (kg CO2)
   * @returns {Object} Object containing:
   *                   - savedKg: Amount of CO2 saved in kilograms
   *                   - percentage: Percentage reduction relative to baseline
   */
  calculateSavings: function (emission, baselineEmission) {
    // Validate inputs
    if (baselineEmission < 0 || emission < 0) {
      console.error("Emissions values cannot be negative");
      return {
        savedKg: 0,
        percentage: 0
      };
    }

    // Calculate saved emissions: baseline - chosen emission
    const saved = baselineEmission - emission;

    // Calculate percentage reduction: (saved / baseline) × 100
    const percentage = baselineEmission > 0
      ? Math.round((saved / baselineEmission) * 100)
      : 0;

    // Return result object with 2 decimal places
    return {
      savedKg: Math.round(saved * 100) / 100,
      percentage: percentage
    };
  },

  /**
   * calculateCarbonCredits(emissionKg)
   * 
   * Calculates the number of carbon credits equivalent to the emissions.
   * Based on CONFIG.CARBON_CREDIT.KG_PER_CREDIT (default: 1000 kg per credit).
   * 
   * Calculation: credits = emissions / KG_PER_CREDIT
   * 
   * @param {number} emissionKg - CO2 emissions in kilograms
   * @returns {number} Number of carbon credits, rounded to 4 decimal places
   */
  calculateCarbonCredits: function (emissionKg) {
    // Validate input
    if (emissionKg < 0) {
      console.error("Emissions cannot be negative");
      return 0;
    }

    // Divide emission by KG_PER_CREDIT from CONFIG
    const credits = emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;

    // Return result rounded to 4 decimal places
    return Math.round(credits * 10000) / 10000;
  },

  /**
   * estimateCreditPrice(credits)
   * 
   * Estimates the price range for carbon credits based on minimum and maximum values.
   * Uses price ranges from CONFIG.CARBON_CREDIT (PRICE_MIN_BRL and PRICE_MAX_BRL).
   * 
   * Calculations:
   * - min = credits × PRICE_MIN_BRL
   * - max = credits × PRICE_MAX_BRL
   * - average = (min + max) / 2
   * 
   * @param {number} credits - Number of carbon credits
   * @returns {Object} Object containing:
   *                   - min: Minimum price in BRL
   *                   - max: Maximum price in BRL
   *                   - average: Average price in BRL
   *                   All values rounded to 2 decimal places
   */
  estimateCreditPrice: function (credits) {
    // Validate input
    if (credits < 0) {
      console.error("Credits cannot be negative");
      return {
        min: 0,
        max: 0,
        average: 0
      };
    }

    // Calculate minimum price: credits × PRICE_MIN_BRL
    const min = credits * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;

    // Calculate maximum price: credits × PRICE_MAX_BRL
    const max = credits * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;

    // Calculate average price: (min + max) / 2
    const average = (min + max) / 2;

    // Return result object with 2 decimal places
    return {
      min: Math.round(min * 100) / 100,
      max: Math.round(max * 100) / 100,
      average: Math.round(average * 100) / 100
    };
  }
};
