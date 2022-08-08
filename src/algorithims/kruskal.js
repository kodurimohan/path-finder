import { Utils } from "../utils"
import { find, union } from '@manubb/union-find'

export class Kruskal {

    async generateMaze(grid)
    {
        let edges = grid.getEdges()
        let sets  = grid.getSets()

        const speed = document.getElementById('randomizerspeed').value

        while(edges.length > 0)
        {
            let random = Math.round(Math.random() * (edges.length - 1))
            let current = edges[random]
            let next

            if(current.direction == 'Top')
            {
                next = grid.getTopCell(current.cell)
                current.cell.drawTopWallRed()
                next.drawBottomWallRed()
            }
            else if(current.direction == 'Right')
            {
                next = grid.getRightCell(current.cell)
                current.cell.drawRightWallRed()
                next.drawLeftWallRed()
            }

            await Utils.delay(speed)
            
            let currentSet = sets[current.cell.getRow()][current.cell.getColumn()]
            let nextSet    = sets[next.getRow()][next.getColumn()]
           
            if(!(find(currentSet) === find(nextSet)))
            {   
                if(current.direction == 'Top')
                {
                    current.cell.removeTopWall()
                    next.removeBottomWall()
                }
                else
                {
                    current.cell.removeRightWall()
                    next.removeLeftWall()
                }
                current.cell.drawWhite()
                next.drawWhite()

                union(currentSet, nextSet)
            }
            else
            {
                current.cell.updateWallsColor()
                next.updateWallsColor()
            }
            
            edges.splice(random,1)
        }
        grid.breakWalls(Utils.selectBreakWals())
        grid.setDefaultBeginGoalCells()
    }

}