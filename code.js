
function tsp_hk(distance_matrix) {
    // Sizes of 0 or 1 have no distance
    let size = distance_matrix.length;
    if (size == 0 || size == 1) { return 0; }
    

    let bestMin = Infinity; // Initialize min
    let dictionaryCache = {};

    // Make Every City the Starting Node
    for (let i = 0; i < size; i++) {
        let cities = [];

        // Fill array with the all cities
        for (let j = 0; j < size; j++) { cities.push(j); }

        let currentMin = heldKarp(i, cities, distance_matrix, dictionaryCache);

        // Replaces current min with new min
        if (currentMin < bestMin) { bestMin = currentMin; }
    }
    
    return bestMin;
}


// Based on the psuedocode in the README
function heldKarp(city, cities, matrix, cache) {
    let size = cities.length;

    // Check if it exists already in cache
    let key = JSON.stringify([city, cities]);
    console.log("cities: " + cities);
    if (cache[key] != undefined) { return cache[key]; }
    

    // Base Case when there are two cities
    if (size == 2) {
        for (let i = 0; i < size; i++) {
            if (cities[i] != city) {
                cache[key] = matrix[city][cities[i]];
                return cache[key];
            }
        }
    } else { 
        let minDistance = Infinity;

        for (let i = 0; i < size; i++) {
            if (cities[i] == city) { continue; } // Skips current city

            let newCities = [];

            // Removes current city from cities list
            for (let j = 0; j < size; j++) {
                if (cities[j] == city) { continue; } // Skips current city

                newCities.push(cities[j]);
            }
            
            let distance = matrix[city][cities[i]] 
                            + heldKarp(cities[i], newCities, matrix, cache);

            // Find the min
            if (minDistance > distance) { minDistance = distance; }
        }

        cache[key] = minDistance;
        return minDistance;
    }
}

