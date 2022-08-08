import { Utils } from "../utils"

export class Depthfirst {

    #drawMovement(direction, current, next, stack)
    { 
        switch(direction)
        {
            case 'top':
                current.removeTopWall()
                next.removeBottomWall()
            break;
            
            case 'right':
                current.removeRightWall()
                next.removeLeftWall()
            break;

            case 'bottom':
                current.removeBottomWall()
                next.removeTopWall()
            break;

            case 'left':
                current.removeLeftWall()
                next.removeRightWall()
            break;
        }

        next.visited = true
        stack.push(next)
        current.drawBlue()
        next.drawLightBlue()      
    }

    async generateMaze(grid)
    {
        let stack = []

        const firstcell = grid.getRandomCell()
        firstcell.visited  = true
        stack.push(firstcell)

        const speed = document.getElementById('randomizerspeed').value

        while(stack.length > 0)
        {
            let valid     = false
            let checks    = 0
            let current   = stack[stack.length - 1]
            
            while(!valid && checks < 20)
            {
                checks++
                let direction = Math.round(Math.random() * 3)
                switch(direction)
                {
                    // UP
                    case 0:
                        if(!grid.isTopEdge(current))
                        {
                            let next = grid.getTopCell(current)
                            if(!next.visited)
                            {
                                this.#drawMovement('top', current, next, stack)
                                valid = true
                            }
                           
                        }
                    break;
                    // RIGHT
                    case 1:
                        if(!grid.isRightEdge(current))
                        {
                            let next = grid.getRightCell(current)
                            if(!next.visited)
                            {
                                this.#drawMovement('right', current, next, stack)
                                valid = true
                            }
                        }
                    break;
                    // BOTTOM
                    case 2:
                        if(!grid.isBottomEdge(current))
                        {
                            let next = grid.getBottomCell(current)
                            if(!next.visited)
                            {
                                this.#drawMovement('bottom', current, next, stack)
                                valid = true
                            }
                        }
                    break;
                    // LEFT
                    case 3:
                        if(!grid.isLeftEdge(current))
                        {
                            let next = grid.getLeftCell(current)
                            if(!next.visited)
                            {
                                this.#drawMovement('left', current, next, stack)
                                valid = true
                            }
                        }
                    break;
                }
                        
            }

            if(!valid)
            {
                stack.pop().drawWhite()
                
                if(stack.length > 0)
                {
                    stack[stack.length - 1].drawLightBlue()
                }
            }

            await Utils.delay(speed)
        }
        grid.breakWalls(Utils.selectBreakWals())
        grid.setDefaultBeginGoalCells()
    }



    //SOLVE MAZE
    #stop = false
    
    stop()
    {
        this.#stop = true
    }

    #pushAsPotentialNextCell(stack, explored, current, next, map)
    {
        if(!explored.includes(next))
        {
            stack.push(next)
            explored.push(next)
            next.drawLightBlue()
            map.set(`${next.getRow()}-${next.getColumn()}`, current)
        }
    }
    #processAdjacents(grid, stack, explored, current, map)
    {
        let next 

        if(!current.getTopWall())
        {
            next = grid.getTopCell(current)
            this.#pushAsPotentialNextCell(stack, explored, current, next, map)
        }

        if(!current.getRightWall())
        { 
            next = grid.getRightCell(current)
            this.#pushAsPotentialNextCell(stack, explored, current, next, map)
        }

        if(!current.getBottomWall())   
        {
            next = grid.getBottomCell(current)
            this.#pushAsPotentialNextCell(stack, explored, current, next, map)
        }

        if(!current.getLeftWall())  
        { 
            next = grid.getLeftCell(current)
            this.#pushAsPotentialNextCell(stack, explored, current, next, map) 
        }
    }

    async #drawPath(beginCell, goalCell, map, speed)
    {
        let pathColor = map.get(`${goalCell.getRow()}-${goalCell.getColumn()}`)
        
        while(!pathColor.equals(beginCell))
        {
            if(this.#stop){ return }
            pathColor.drawYellow()
            pathColor = map.get(`${pathColor.getRow()}-${pathColor.getColumn()}`)

            await Utils.delay(speed)
        }
    }

    async solveMaze(grid)
    {
        let explored = []
        
        //Using stack array like a stack
        let stack = []
        let map = new Map()

        const goalCell = grid.getGoalCell()
        const beginCell = grid.getBeginCell()
        explored.push(beginCell)
        stack.push(beginCell)

        const speed = document.getElementById('solvespeed').value

        while(stack.length > 0)
        {
            if(this.#stop){ return }
            let current = stack.pop()

            if(!current.equals(beginCell) && !current.equals(goalCell))
            {
                current.drawBlue()
            }

            if(current.equals(goalCell))
            {
                current.drawRed()
                break 
            }

            this.#processAdjacents(grid, stack, explored, current, map)
            await Utils.delay(speed)
        }

        this.#drawPath(beginCell, goalCell, map, speed)
    }
}