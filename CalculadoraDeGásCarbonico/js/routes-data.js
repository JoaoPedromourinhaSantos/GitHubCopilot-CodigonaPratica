/**
 * RoutesDB - Global Database of Brazilian Routes
 * 
 * This object contains a collection of popular routes between Brazilian cities
 * with their respective distances in kilometers.
 * 
 * Structure:
 * - routes: Array of route objects with origin, destination, and distanceKm
 * - Methods to retrieve and search route data
 */

const RoutesDB = {
  /**
   * Array of routes between Brazilian cities
   * Each route object contains:
   * - origin: City name with state abbreviation (e.g., "São Paulo, SP")
   * - destination: Destination city with state abbreviation
   * - distanceKm: Distance in kilometers between cities
   */
  routes: [
    // Capital to Capital Connections
    { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
    { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
    { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
    { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
    { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 708 },
    { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1936 },
    { origin: "São Paulo, SP", destination: "Recife, PE", distanceKm: 2542 },
    { origin: "São Paulo, SP", destination: "Fortaleza, CE", distanceKm: 2844 },
    { origin: "São Paulo, SP", destination: "Manaus, AM", distanceKm: 4047 },
    { origin: "Rio de Janeiro, RJ", destination: "Salvador, BA", distanceKm: 2020 },

    // São Paulo Region Routes
    { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
    { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 70 },
    { origin: "São Paulo, SP", destination: "Sorocaba, SP", distanceKm: 108 },
    { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 305 },
    { origin: "São Paulo, SP", destination: "Araraquara, SP", distanceKm: 377 },
    { origin: "Campinas, SP", destination: "Ribeirão Preto, SP", distanceKm: 260 },

    // Rio de Janeiro Region Routes
    { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
    { origin: "Rio de Janeiro, RJ", destination: "Duque de Caxias, RJ", distanceKm: 35 },
    { origin: "Rio de Janeiro, RJ", destination: "Itaboraí, RJ", distanceKm: 45 },
    { origin: "Rio de Janeiro, RJ", destination: "Nova Iguaçu, RJ", distanceKm: 50 },

    // Minas Gerais Region Routes
    { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
    { origin: "Belo Horizonte, MG", destination: "Juiz de Fora, MG", distanceKm: 260 },
    { origin: "Belo Horizonte, MG", destination: "Uberlândia, MG", distanceKm: 565 },
    { origin: "Belo Horizonte, MG", destination: "Montes Claros, MG", distanceKm: 435 },

    // Bahia Region Routes
    { origin: "Salvador, BA", destination: "Feira de Santana, BA", distanceKm: 109 },
    { origin: "Salvador, BA", destination: "Vitória da Conquista, BA", distanceKm: 460 },
    { origin: "Salvador, BA", destination: "Camaçari, BA", distanceKm: 42 },

    // Pernambuco Region Routes
    { origin: "Recife, PE", destination: "Olinda, PE", distanceKm: 8 },
    { origin: "Recife, PE", destination: "Caruaru, PE", distanceKm: 134 },
    { origin: "Recife, PE", destination: "Petrolina, PE", distanceKm: 566 },

    // Ceará Region Routes
    { origin: "Fortaleza, CE", destination: "Maracanaú, CE", distanceKm: 24 },
    { origin: "Fortaleza, CE", destination: "Juazeiro do Norte, CE", distanceKm: 501 },

    // Santa Catarina Region Routes
    { origin: "Curitiba, PR", destination: "São Paulo, SP", distanceKm: 408 },
    { origin: "Curitiba, PR", destination: "Florianópolis, SC", distanceKm: 633 },
    { origin: "Curitiba, PR", destination: "Blumenau, SC", distanceKm: 310 },

    // Rio Grande do Sul Region Routes
    { origin: "Porto Alegre, RS", destination: "Curitiba, PR", distanceKm: 710 },
    { origin: "Porto Alegre, RS", destination: "Pelotas, RS", distanceKm: 270 },
    { origin: "Porto Alegre, RS", destination: "Caxias do Sul, RS", distanceKm: 190 },
  ],

  /**
   * getAllCities()
   * 
   * Retrieves all unique city names from the routes database
   * and returns them sorted alphabetically.
   * 
   * @returns {Array<string>} Sorted array of unique city names with state
   */
  getAllCities: function () {
    const citiesSet = new Set();

    // Extract all cities from both origin and destination
    this.routes.forEach(route => {
      citiesSet.add(route.origin);
      citiesSet.add(route.destination);
    });

    // Convert Set to Array and sort alphabetically
    return Array.from(citiesSet).sort();
  },

  /**
   * findDistance(origin, destination)
   * 
   * Finds the distance between two cities.
   * Searches in both directions (origin→destination and destination→origin).
   * Input is normalized by trimming whitespace and converting to lowercase.
   * 
   * @param {string} origin - Origin city name
   * @param {string} destination - Destination city name
   * @returns {number|null} Distance in kilometers if found, null if not found
   */
  findDistance: function (origin, destination) {
    // Normalize inputs: trim and convert to lowercase for comparison
    const normalizedOrigin = origin.trim().toLowerCase();
    const normalizedDestination = destination.trim().toLowerCase();

    // Search for route in both directions
    for (let route of this.routes) {
      const routeOrigin = route.origin.toLowerCase();
      const routeDestination = route.destination.toLowerCase();

      // Check if route matches in origin→destination direction
      if (routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) {
        return route.distanceKm;
      }

      // Check if route matches in destination→origin direction (reverse)
      if (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin) {
        return route.distanceKm;
      }
    }

    // Return null if no matching route is found
    return null;
  }
};
