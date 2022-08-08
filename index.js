import { Grid } from './src/grid'
import { Utils } from './src/utils'

let grid
const MAZE_RANDOMIZER_BUTTON = document.getElementById('mazerun')

grid = new Grid(18, 32)
grid.makeGrid()
Utils.generateMaze(grid)

MAZE_RANDOMIZER_BUTTON.onclick = function()
{
    if(grid != undefined)
    {
        grid.removeGrid()
    }

    let gridWidth = document.getElementById('width').value
    gridWidth = gridWidth == '' ? 32 : gridWidth
    gridWidth = gridWidth > 100 ? 100 : gridWidth

    let gridHeight  = document.getElementById('heigth').value
    gridHeight = gridHeight == '' ? 18 : gridHeight
    gridHeight = gridHeight > 50 ? 50 : gridHeight 

    grid = new Grid(gridHeight, gridWidth)
    grid.makeGrid()

    Utils.generateMaze(grid)
}

const PATHFINDER_RUN_BUTTON = document.getElementById('pathrun')

let algorithim

PATHFINDER_RUN_BUTTON.onclick = function()
{
    if(grid == undefined || Utils.creatingmaze)
    {
        return
    }

    if(algorithim != undefined)
    {
        algorithim.stop()
        grid.clearGrid()
    }

    algorithim = Utils.selectSolveAlgorithim()
    algorithim.solveMaze(grid)
}

const CLEAR_BUTTON = document.getElementById('clear')

CLEAR_BUTTON.onclick = function()
{
    if(Utils.creatingmaze)
    {
        return
    }
    if(algorithim != undefined)
    {
        algorithim.stop()
    }
    grid.clearGrid()
}
