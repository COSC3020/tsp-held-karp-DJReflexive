# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

# Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.


# My Analysis

### My Runtime Analysis

Once my algorithm runs, it will check if the length is 0 or 1, which the shortest distance is 0. Past this, is a loop that will make every city the start city. This will happen $n$ times. Nested inside of this operation is a loop that creates an array filled with all the cities, which will take $n$ time. Also nested is the recursive heldKarp() function which is analyzed in the next paragraph.

The heldKarp() recursive function occurs, which has a complexity of $\Theta(n * 2^n)$. The $n * 2^n$ comes from the fact that when the algorithm executes, that for $n$ cities, there are $2^n$ possible subsets of cities that need to be processed. 

The final runtime complexity is $\Theta(n * (n + n*2^n))$, which simplifies down to $\Theta(n * n*2^n)$, and finally $\Theta(n^2 * 2^n)$.

### My Memory Analysis

The first notable use of memory is my dictionaryCache which when every subsets is calculated, it is cached. Meaning this cache has a complexity of $2^n$. 

I also have a cities array in the tsp_hk() function which provides all the cities to the heldKarp() function. This array takes up $n$ space. Similarly is the newCities array in the heldKarp function, which after some processing, can also hold up to $n$ cities within it.

The final memory complexity is $\Theta(n^2 * 2^n)$.

# Sources

- KobeLimon21's Repository on GitHub (https://github.com/COSC3020/tsp-held-karp-KobeLimon21/blob/main/code.js) - Borrowed some ideas to help my tsp_hk() method to function properly. Specifically for having every city become the start city every iteration, and checking whether a new best minimum value had been found. I did not borrow from it for anything else.
- https://www.youtube.com/watch?v=jUYAJ72m8P0&t=379s - For how to run the held-kelp algorithm by hand and giving insight to how this works.
- https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/# - For documentation on how to use object literal notation as a dictionary.

# Plagiarism Acknowledgement

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
