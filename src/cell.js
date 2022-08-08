export class Cell {

    #row
    #column
    #cell
    #topWall
    #rightWall
    #bottomWall
    #leftWall

    constructor(row, column, cell)
    {
        this.#row    = row
        this.#column = column
        this.#cell   = cell

        this.visited = false

        this.#topWall    = true
        this.#rightWall  = true
        this.#bottomWall = true
        this.#leftWall   = true   
    }

    //WallRemovers
    removeLeftWall()
    {
        this.#leftWall = false
        this.#updateWallsStyle()
    }

    removeRightWall()
    {
        this.#rightWall = false
        this.#updateWallsStyle()
    }

    removeBottomWall()
    {
        this.#bottomWall = false
        this.#updateWallsStyle()
    }

    removeTopWall()
    {
        this.#topWall = false
        this.#updateWallsStyle()
    }

    #updateWallsStyle()
    {
        this.updateWallsColor()

        //Putting dashed for undraw walls cuz hidden or none colapse the cells
        //and change his size
        let top    = this.#topWall    ? 'solid' : 'dashed'
        let right  = this.#rightWall  ? 'solid' : 'dashed'
        let bottom = this.#bottomWall ? 'solid' : 'dashed'
        let left   = this.#leftWall   ? 'solid' : 'dashed'

        this.#cell.style.borderStyle = `${top} ${right} ${bottom} ${left}`
    }

    //ColorManage
    drawYellow()
    {
        this.#cell.style.backgroundColor = '#FCE12B'
    }

    drawGreen()
    {
        this.#cell.style.backgroundColor = '#00DA1E'
    }

    drawRed()
    {
        this.#cell.style.backgroundColor = '#FF1612'
    }

    drawBlue()
    {
        this.#cell.style.backgroundColor = '#006AF7'
    }

    drawWhite()
    {
        this.#cell.style.backgroundColor = 'white'
    }

    drawLightBlue()
    {
        this.#cell.style.backgroundColor = '#00CFFA'
    }

   //Wall color manage
   #getWallsColor()
    {
        let wallColor = {
            top: '',
            right:'',
            bottom:'',
            left:''
        }
        wallColor.top   = this.#topWall   ? 'black' : 'white'
        wallColor.right = this.#rightWall ? 'black' : 'white'
        wallColor.bottom   = this.#bottomWall   ? 'black' : 'white'
        wallColor.left  = this.#leftWall  ? 'black' : 'white'
        
        return wallColor
    }

    updateWallsColor()
    {
        let wallColor = this.#getWallsColor()
        this.#cell.style.borderColor = `${wallColor.top}  ${wallColor.right} ${wallColor.bottom} ${wallColor.left}` 
    }

    drawTopWallRed()
    {
        let wallColor = this.#getWallsColor()
        this.#cell.style.borderColor = `red  ${wallColor.right} ${wallColor.bottom} ${wallColor.left}`
    }
    drawRightWallRed()
    {
        let wallColor = this.#getWallsColor()
        this.#cell.style.borderColor = `${wallColor.top} red ${wallColor.bottom} ${wallColor.left}`
    }
    drawBottomWallRed()
    {
        let wallColor = this.#getWallsColor()
        this.#cell.style.borderColor = `${wallColor.top} ${wallColor.right} red ${wallColor.left}`
    }
    drawLeftWallRed()
    {
        let wallColor = this.#getWallsColor()
        this.#cell.style.borderColor = `${wallColor.top} ${wallColor.right} ${wallColor.bottom} red`
    }


    equals(cell)
    {
        return (this.#column == cell.#column && this.#row == cell.#row)
    }

    //GETTERS
    getColumn()
    {
        return this.#column
    }
    getRow()
    {
        return this.#row
    }

    getTopWall()
    {
        return this.#topWall
    }

    getRightWall()
    {
        return this.#rightWall
    }

    getBottomWall()
    {
        return this.#bottomWall
    }

    getLeftWall()
    {
        return this.#leftWall
    }

    //SETTERS
    setDraggable(bool)
    {
        this.#cell.draggable = bool
    }
  
}