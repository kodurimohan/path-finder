import { Cell } from './cell'
import { makeSet } from '@manubb/union-find'

export class Grid {

    #rows
    #columns
    #cells = []
    #beginCell
    #goalCell
    constructor(rows, columns)
    {
        this.#rows    = rows
        this.#columns = columns

    }

    makeGrid()
    {
        let table = document.getElementById('grid')
        
        let sideSizes = this.#gridSize()
        table.style.width  = sideSizes.width + 'px'
        table.style.height = sideSizes.height + 'px'

        for(let x = 0; x < this.#rows; x++)
        {
            let row = document.createElement('tr')
            row.id = `row${x}`
            table.appendChild(row)
            
            const rows = []

            for(let i = 0; i <  this.#columns; i++)
            {
                let cell = document.createElement('td')
                cell.id  =  `cell${x}${i}`
                row.appendChild(cell)

                rows.push(new Cell(x, i, cell))
            }

            this.#cells.push(rows)
        }
    }

    // Calculate the size of the sides to generate square cells
    #gridSize()
    {
        let navbarHeight = document.getElementById('navbar').clientHeight

        let sideSizes = {
            width: window.innerWidth,
            height: window.innerHeight - navbarHeight
        }

        let width_columns = sideSizes.width / this.#columns
        let height_rows   = sideSizes.height / this.#rows

        if(width_columns < height_rows)
        {
            sideSizes.height = width_columns * this.#rows
        }
        else if(width_columns > height_rows)
        {
            sideSizes.width = height_rows *  this.#columns
        }

        return sideSizes;
    }

    #breakWallsSwitch(direction, randomCell)
    {
        switch(direction)
        {
            //TOP
            case 0:
                if(!this.isTopEdge(randomCell) && randomCell.getTopWall())
                {
                    randomCell.removeTopWall()
                    this.getTopCell(randomCell).removeBottomWall()
                    return true
                }
            break

            //RIGHT
            case 1:
                if(!this.isRightEdge(randomCell) && randomCell.getRightWall())
                {
                    randomCell.removeRightWall()
                    this.getRightCell(randomCell).removeLeftWall()
                    return true
                }
            break

            //BOTTOM
            case 2:
                if(!this.isBottomEdge(randomCell) && randomCell.getBottomWall())
                {
                    randomCell.removeBottomWall()
                    this.getBottomCell(randomCell).removeTopWall()
                    return true
                }
            break
            
            //LEFT
            case 3:
                if(!this.isLeftEdge(randomCell) && randomCell.getLeftWall())
                {
                    randomCell.removeLeftWall()
                    this.getLeftCell(randomCell).removeRightWall()
                    return true
                }
            break
        }
        return false
    }

    breakWalls(breakWalls)
    {
        let removeWalls = ((breakWalls / 100 ) * (this.#rows * this.#columns))
        while(removeWalls > 0)
        {
            let randomRow    = Math.round(Math.random() * (this.#rows - 1))
            let randomColumn = Math.round(Math.random() * (this.#columns - 1))
            let randomCell   = this.#cells[randomRow][randomColumn]
            let direction   = Math.round(Math.random() * 3)

            if(this.#breakWallsSwitch(direction, randomCell))
            {
                removeWalls--
            }
        }
    }

    clearGrid()
    { 
        for(let i = 0; i < this.#rows; i++)
        {
            for(let j = 0; j < this.#columns; j++)
            {
                this.#cells[i][j].drawWhite()
            }
        }
        this.#beginCell.drawGreen()
        this.#goalCell.drawRed()
    }

    removeGrid()
    {
        for(let x = 0; x < this.#rows; x++){
            let row = document.getElementById(`row${x}`)
            row.remove()
        }
        this.#cells.length = 0
    }
    

    // EDGE CHECK

    isTopEdge(cell)
    {
        return (cell.getRow() == 0)
    }

    isRightEdge(cell)
    {
        return (cell.getColumn() == this.#columns - 1)
    }

    isBottomEdge(cell)
    {
        return (cell.getRow() == this.#rows - 1)
    }

    isLeftEdge(cell)
    {
        return (cell.getColumn() == 0)
    }
    

    // GETTERS

    getTopCell(cell)
    {
        return this.#cells[cell.getRow() - 1][cell.getColumn()]
    }

    getRightCell(cell)
    {
        return this.#cells[cell.getRow()][cell.getColumn() + 1]
    }

    getBottomCell(cell)
    {
        return this.#cells[cell.getRow() + 1][cell.getColumn()]
    }

    getLeftCell(cell)
    {
        return this.#cells[cell.getRow()][cell.getColumn() - 1]
    }

    getRandomCell()
    {
        const randomRow    = Math.round(Math.random() * (this.#rows - 1))
        const randomColumn = Math.round(Math.random() * (this.#columns - 1))
        return this.#cells[randomRow][randomColumn]
    }

    getBeginCell()
    {
        return this.#beginCell
    }

    getGoalCell()
    {
        return this.#goalCell
    }

    getEdges()
    {
        let edges = []
        for(let i = 0; i < this.#rows; i++)
        {
            for(let j = 0; j < this.#columns; j++)
            {
                if(!this.isTopEdge(this.#cells[i][j]))
                {
                    let edge = {
                        cell: this.#cells[i][j],
                        direction: 'Top'
                    }
                    edges.push(edge)
                }

                if(!this.isRightEdge(this.#cells[i][j]))
                { 
                    let edge = {
                        cell: this.#cells[i][j],
                        direction: 'Right'
                    }  
                    edges.push(edge)
                }
            }
        }
   
        return edges
    }

    getSets()
    {
        let sets = []
        for(let i = 0; i < this.#rows; i++)
        {
            let row = []
            for(let j = 0; j < this.#columns; j++)
            {
                let set = makeSet()
                set.rank = `${i}${j}`
                row.push(set)
            }
            sets.push(row)
        }
        return sets
    }

    getScores()
    {
        let scores = []
        for(let i = 0; i < this.#rows; i++)
        {
            let row = []
            for(let j = 0; j < this.#columns; j++)
            {
                //f(n) = g(n) + h(n)
                //f = the cost of node
                //g = distance betwen node and start
                //h = manhattan distance betwen node and goal
                let score = {
                    f: Infinity,
                    g: Infinity
                }
                row.push(score)
            }
            scores.push(row)
        }
        return scores
    }

    //SETTERS
    #setBeginCell(cell)
    {
        this.#beginCell = cell
        this.#beginCell.drawGreen()
    }

    #setGoalCell(cell)
    {
        this.#goalCell = cell
        this.#goalCell.drawRed()
    }

    setDefaultBeginGoalCells()
    {
        //Default settings
        this.#beginCell = this.#cells[0][0]
        this.#goalCell = this.#cells[this.#rows - 1][this.#columns - 1]

        this.#beginCell.drawGreen()
        this.#goalCell.drawRed()

        this.#beginCell.setDraggable(true)
        this.#goalCell.setDraggable(true)

        const cells = document.querySelectorAll('td')

        cells.forEach(cell => {
            
            cell.addEventListener('dragstart', () => {
                if(cell.draggable)
                {
                    cell.classList.add('dragging')
                }
            })
            
            cell.addEventListener('dragend', () => {
                cell.classList.remove('dragging')
            })

            cell.addEventListener('dragover', e => { 
                e.preventDefault()  
            })

            cell.addEventListener('drop', e => {

                if(e.target.draggable)
                {
                    return
                }


                //Change xml elements for cell class
                let draggable = document.querySelector('.dragging')
                let draggableCell = this.#cells[draggable.parentElement.rowIndex][draggable.cellIndex]
                let myCell = this.#cells[cell.parentElement.rowIndex][cell.cellIndex]
                
                //Printing color
                draggableCell.equals(this.#beginCell) ? this.#setBeginCell(myCell) : this.#setGoalCell(myCell)
                draggableCell.drawWhite()

                //Setting dragable
                myCell.setDraggable(true)
                draggableCell.setDraggable(false)
                

            })
        })
    }
}