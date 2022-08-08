# Pathfinder Visualizer

The main goal of this project is to develop an application to visualize the operation of graph traversal algorithms in JavaScript, in order to learn and practice how they work.

[Give it a try.](https://maze-pathfinder-visualizer.herokuapp.com/)

### Technologies summary
Vanilla JavaScript, Object-Oriented Programming, HTML, CSS.

### Algorithms

**Maze generators:** [Randomized DFS](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search),  [Randomized Kruskal's](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Kruskal's_algorithm),  [Randomized Prim's](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Prim's_algorithm).

**Maze solvers:** [DFS](https://en.wikipedia.org/wiki/Depth-first_search "DFS"), [BFS](https://en.wikipedia.org/wiki/Breadth-first_search "BFS"), [A*](https://en.wikipedia.org/wiki/A*_search_algorithm "A*")

------------

## How it works?
In the navbar we can see several options that are separated into 2 blocks. The first one is in charge of shaping the maze and the second one of solving the maze.

![NavBar](readmeresources/Navbar.png?raw=true)

## Generate maze

![NavBar1](readmeresources/navbarFirstBlock.png?raw=true)

**Size:** the first text box determines the width and the second one the height of the board. It will not be possible to exceed a height of 50 and a width of 100 for aesthetic reasons, beyond these measures the cells begin to be little visible.

**Randomizer:** is a dropdown that allows you to choose which algorithm will be used to generate the maze.

**Speed:** is a dropdown that allows you to choose at what speed the maze will be generated.

**Wallsbreaker:** is a dropdown that allows you to destroy a % of the walls randomly. This option is used to generate several possible paths between the different cells.

Clicking on the first `Generate maze` button will generate a totally random maze determined by the previous values.
 
![options](readmeresources/firstBlockOptions.png?raw=true) 

**Pictures 1 and 2:** we can see how size works. It should be noted that in the second screenshot the width and height exceed the limits and a maze is generated with the maximum possible values. 

**Pictures 3 and 4:** we can see how BreakWalls works. Additionally we can check that if any of the size values are not defined, default values will be taken.

<br/>

### Generate maze caption
![mazegenerator](readmeresources/mazegenerators.png?raw=true) 

**Dark blue cells:** represent cells that are inserted into a collection (e.g. a stack or a queue, denpending on the algorithm).

**White cells:** represent processed cells that are already part of the final maze.

**Red walls:** represent the division of the 2 subgroups of cells that are being processed (only applies to the kruskal algorithm).

**Light blue cell:** represent the cell that is currently being processed.

<br/>

## Solve maze

![NavBar2](readmeresources/navbarSecondBlock.png?raw=true)

**Pathfinder:** in this dropdown you select the algorithm that will be used to solve the maze.

**Speed:** this dropdown modifies the speed at which the maze is solved.

Clicking on the `Solve maze` button will start the animation that shows how the algorithm works. Clicking `Remove Path` button will remove the explored paths in the current maze without removing the walls.

After generating the maze, 2 boxes of different colors will appear the green one represents the beginning of the maze and the red one the end. You can change the position of these boxes by dragging them over the maze. If you move the squares while an algorithm is running, they will continue their course with
the values they had when they started.

![options2](readmeresources/pathfinders.png?raw=true)
(1.DFS, 2.BFS, 3.A*)

**Pictures 1, 2 and 3:** we can see how the different algorithms work in the same maze.

**Picture 4:** we can see that you can move the start and the end of the maze.

### Solve maze caption

**Light blue:** light blue cells represent cells that are inserted into a collection (e.g. a stack or a queue, denpending on the algorithm).

**Dark blue:** dark blue cells represent cells that have already been processed.

**Yellow:** Yellow cells represent one of the shortest possible paths, except DFS which returns the first path it finds. 


