import { Depthfirst } from "./algorithims/depthfirst"
import { Prim } from "./algorithims/prim"
import { Kruskal } from "./algorithims/kruskal"
import { Breadthfirst } from "./algorithims/breadthfirst" 
import { AStar } from "./algorithims/astar"


export class Utils {

    creatingmaze;
    static #selectRandomizerAlgorithim()
    {
        let selectValue = document.getElementById('randomizerAlgorithim').value
        let algorithim
        switch(selectValue)
        {
            case '0':
                algorithim = new Depthfirst()
            break

            case '1':
                algorithim = new Prim()
            break

            case '2':
                algorithim = new Kruskal()
            break
        }
        return algorithim
    }

    static selectSolveAlgorithim()
    {
        let selectValue = document.getElementById('pathfinders').value
        let algorithim
        switch(selectValue)
        {
            case '0':
                algorithim = new Depthfirst()
            break

            case '1':
                algorithim = new Breadthfirst()
            break

            case '2':
                algorithim = new AStar()
            break
        }
        return algorithim
    }

    static selectBreakWals()
    {
        let selectValue = document.getElementById('breakwalls').value
        let number

        switch(selectValue)
        {
            case '0':
                number = 0
            break

            case '1':
                number = 10
            break

            case '2':
                number = 20
            break

            case '3':
                number = 40
            break
        }
        return number
    }

    static async generateMaze(grid)
    {
        this.creatingmaze = true
        let algorithim = Utils.#selectRandomizerAlgorithim()
        await algorithim.generateMaze(grid)
        this.creatingmaze = false
    }

    static delay(selectvalue)
    {
        let ms

        //Revisión
        switch(selectvalue)
        {
            //Instant
            case '0':
                ms = 0
            break

            //Quick
            case '1':
                ms = 10
            break

            //Average
            case '2':
                ms = 100
            break

            //Slow
            case '3':
                ms = 500
            break
        }

        if(ms > 0)
        {
            return new Promise(resolve => setTimeout(resolve, ms))
        }
    }
}