
function tsp_hk(distance_matrix) {
    // Sizes of 0 or 1 have no distance
    let size = distance_matrix.length;
    if (size == 0 || size == 1) { return 0; }
    

    let bestMin = Infinity; // Initialize min

    // Make Every City the Starting Node
    for (let i = 0; i < size; i++) {
        let cities = [];
        for (let j = 0; j < size; j++) { cities.push(j); }

        let currentMin = heldKarp(i, cities, distance_matrix);

        // Replaces current min with new min
        if (currentMin < bestMin) { bestMin = currentMin; }
    }
    
    return bestMin;
}


// Based on the psuedocode in the README
function heldKarp(city, cities, matrix) {
    let size = cities.length;
    
    // Base Case when there are two cities
    if (size == 2) {
        for (let i = 0; i < size; i++) {
            if (cities[i] != city) {
                return matrix[city][cities[i]];
            }
        }
    } else { 
        let minDistance = Infinity;

        for (let i = 0; i < size; i++) {
            if (i == city) continue; // Skips current city

            let newCities = [];

            // Removes current city from cities list
            for (let j = 0; j < size; j++) {
                if (j == city) continue; // Skips current city

                newCities.push(cities[j]);
            }
            
            let distance = matrix[city][cities[i]] + heldKarp(cities[i], newCities, matrix);

            // Find the min
            if (minDistance > distance) { minDistance = distance; }
        }

        return minDistance;
    }
}

