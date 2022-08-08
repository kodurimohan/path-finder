import { Utils } from "../utils";
import { PriorityQueue } from "@datastructures-js/priority-queue";

export class AStar {

    #goalCell
    #beginCell
    #scores
    #path
    #stop = false

    stop()
    {
        this.#stop = true
    }

    #calculateHeuristicCost(cell)
    {
        //Manhattan distance
        return Math.abs(cell.getColumn() - this.#goalCell.getColumn()) + Math.abs(cell.getRow() - this.#goalCell.getRow())
    }

    #getCellScore(cell)
    {
        return this.#scores[cell.getRow()][cell.getColumn()]
    }

    #checkToEnqueue(current, next, priorityQueue)
    {
        let tmpG = this.#getCellScore(current).g + 1
        let tmpF = tmpG + this.#calculateHeuristicCost(next, this.#goalCell)

        if(tmpF < this.#getCellScore(next).f)
        {
            this.#getCellScore(next).g = tmpG
            this.#getCellScore(next).f = tmpF
            priorityQueue.enqueue([tmpF, this.#calculateHeuristicCost(next), next])
            next.drawLightBlue()
            this.#path.set(`${next.getRow()}-${next.getColumn()}`, current)
        }
    }

    #processAdjacents(grid, current, priorityQueue)
    {
        let next 

        if(!current.getTopWall())
        {
            next = grid.getTopCell(current)
            this.#checkToEnqueue(current, next, priorityQueue)
        }

        if(!current.getRightWall())
        { 
            next = grid.getRightCell(current)
            this.#checkToEnqueue(current, next, priorityQueue)
        }

        if(!current.getBottomWall())   
        {
            next = grid.getBottomCell(current)
            this.#checkToEnqueue(current, next, priorityQueue)
        }

        if(!current.getLeftWall())  
        { 
            next = grid.getLeftCell(current)
            this.#checkToEnqueue(current, next, priorityQueue)
        }
    }

    async #drawPath(speed)
    {
        let pathColor = this.#path.get(`${this.#goalCell.getRow()}-${this.#goalCell.getColumn()}`)
        
        while(!pathColor.equals(this.#beginCell))
        {
            if(this.#stop){ return }
            pathColor.drawYellow()
            pathColor = this.#path.get(`${pathColor.getRow()}-${pathColor.getColumn()}`)

            await Utils.delay(speed)
        }
    }
    
    async solveMaze(grid)
    {
        this.#goalCell  = grid.getGoalCell()
        this.#beginCell = grid.getBeginCell()
        this.#scores = grid.getScores()
        this.#path = new Map()

        let priorityQueue = new PriorityQueue(this.#priorityQueueComparator)

        const speed = document.getElementById('solvespeed').value

        let startF = this.#calculateHeuristicCost(this.#beginCell)
        this.#getCellScore(this.#beginCell).g = 0
        this.#getCellScore(this.#beginCell).f = startF

        //f const, heuristic cost, cell
        priorityQueue.enqueue([startF, startF, this.#beginCell])

        while (priorityQueue.size() > 0) 
        {
            if(this.#stop){ return }

            let current = priorityQueue.dequeue()[2]

            if(!current.equals(this.#beginCell) && !current.equals(this.#goalCell))
            {
                current.drawBlue()
            }

            if(current.equals(this.#goalCell))
            {
                current.drawRed()
                break 
            }

            this.#processAdjacents(grid, current, priorityQueue)
            await Utils.delay(speed)
        }
        
        this.#drawPath(speed)
    }

    #priorityQueueComparator(a, b)
    {
        if(a[0] < b[0])
        {
            return -1
        }
        if(a[0] > b[0])
        {
            return 1
        }

        return a[1] < b[1] ? -1 : 1
    }
}