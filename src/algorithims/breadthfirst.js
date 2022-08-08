import { Utils } from "../utils"
import { Queue } from '@datastructures-js/queue';

export class Breadthfirst {

    #explored
    #queue
    #map
    #beginCell
    #goalCell
    #stop = false

    stop()
    {
        this.#stop = true
    }

    #pushAsPotentialNextCell(current, next)
    {
        if(!this.#explored.includes(next))
        {
            this.#queue.enqueue(next)
            this.#explored.push(next)
            next.drawLightBlue()
            this.#map.set(`${next.getRow()}-${next.getColumn()}`, current)
        }
    }

    #processAdjacents(grid, current)
    {
        let next 

        if(!current.getTopWall())
        {
            next = grid.getTopCell(current)
            this.#pushAsPotentialNextCell(current, next)
        }

        if(!current.getRightWall())
        { 
            next = grid.getRightCell(current)
            this.#pushAsPotentialNextCell(current, next)
        }

        if(!current.getBottomWall())   
        {
            next = grid.getBottomCell(current)
            this.#pushAsPotentialNextCell(current, next)
        }

        if(!current.getLeftWall())  
        { 
            next = grid.getLeftCell(current)
            this.#pushAsPotentialNextCell(current, next) 
        }
    }

    async #drawPath(speed)
    {
        let pathColor = this.#map.get(`${this.#goalCell.getRow()}-${this.#goalCell.getColumn()}`)
        
        while(!pathColor.equals(this.#beginCell))
        {
            if(this.#stop){ return }
            pathColor.drawYellow()
            pathColor = this.#map.get(`${pathColor.getRow()}-${pathColor.getColumn()}`)

            await Utils.delay(speed)
        }
    }

    async solveMaze(grid)
    {
        this.#explored = []
        this.#queue = new Queue()
        this.#map = new Map()

        this.#goalCell = grid.getGoalCell()
        this.#beginCell = grid.getBeginCell()
        this.#explored.push(this.#beginCell)
        this.#queue.enqueue(this.#beginCell)

        const speed = document.getElementById('solvespeed').value

        while(!this.#queue.isEmpty())
        {
            if(this.#stop){ return } 
            let current = this.#queue.dequeue()

            if(!current.equals(this.#beginCell) && !current.equals(this.#goalCell))
            {
                current.drawBlue()
            }

            if(current.equals(this.#goalCell))
            {
                current.drawRed()
                break 
            }

            this.#processAdjacents(grid, current)
            await Utils.delay(speed)
        }

        this.#drawPath(speed)
    }
}