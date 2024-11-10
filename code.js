
function tsp_hk(distance_matrix) {
    let size = distance_matrix.length;
    let startingNode;

    if (size == 0 || size == 1) { return 0; }

    // Find a starting node and create a cost matrix between pairs of cities
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            // Checks for an existing edge
            if (distance_matrix[i][j] > 0) {
                startingNode = distance_matrix[i];
                break;
            }

            // If no nodes contained an edge
            if (i == size-1) {
                return 0;
            }
        }
    }

    return heldKarp(distance_matrix, startingNode);
}

// Based on the psuedocode in the README
function heldKarp(cities, start) {
    let size = cities.length;
    let startIndex = cities.indexOf(start);

    if (size == 2) {
        for (let i = 0; i < size; i++) {
            if (cities[startIndex][i] > 0) {
                return cities[startIndex][i];
            }
        }
    } else { 
        

        /* 
        for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
        */
        return -1;
    }
}
