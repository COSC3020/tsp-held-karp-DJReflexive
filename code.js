
function tsp_hk(distance_matrix) {
    let size = distance_matrix.length;
    
    // Sizes of 0 or 1 have no distance
    if (size == 0 || size == 1) { return 0; }

    
    let startingNode = findStartNode(distance_matrix);
    
    // If no edges exist, there is no distance
    if (startingNode == null) { return 0; }
    
    // Calls the Held-Karp Algorithm
    let result = heldKarp(distance_matrix, startingNode)
    console.log("RESULT = " + result)
    return result;
}


// Based on the psuedocode in the README
function heldKarp(cities, start) {
    let size = cities.length;
    let startIndex = cities.indexOf(start);
    
    // Base Case when there are two cities
    if (size == 2) {
        for (let i = 0; i < size; i++) {
            if (cities[startIndex][i] > 0) {
                return cities[startIndex][i];
            }
        }
    } else { 
        /* 
        return the minimum of
        for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
        */
        
        
        for (let city = 0; city < size; city++) {
            if (city == startIndex) continue; // Skips start city

            let distToStart = cities[city][startIndex];

            // delete city
            cities.splice(city, 1);

            // delete the city in the other nodes
            for (let i = 0; i < cities.length; i++) {
                cities[i].splice(city, 1);
            }

            return heldKarp(cities, findStartNode(cities)) + distToStart;
        }
    }
}


// Finds a new start node
function findStartNode(cities) {
    let size = cities.length;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            // Checks for an existing edge
            if (cities[i][j] > 0) return cities[i]; 

            // If there were no nodes in the matrix that contained an edge
            if (i == size-1) return null;
        }
    }
}