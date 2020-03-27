const minefield = [
    ['*', '*','',''],
    ['*', '*','',''],
    ['', '','*',''],
    ['', '','',''],
];


module.exports = function minesweeper(minefield) {
    //recorro el minefield
    for (let row = 0; row < minefield.length; row++) {
        let line = ''
        for (let col = 0; col < minefield[row].length; col++) {
            if (getCell(row,col) === 1) {
                line += '*';
            } else {

                let bombs = 0;
                // top-left, top-right
                bombs += getCell(row -1 , col -1);
                bombs += getCell(row -1 , col);
                bombs += getCell(row -1 , col +1);

                bombs += getCell(row, col -1); //left
                bombs += getCell(row , col +1); //right

                // bottom-left, bottom-right
                bombs += getCell(row +1 , col -1);
                bombs += getCell(row +1 , col);
                bombs += getCell(row +1 , col +1);

                line += bombs;

            }
        }
        console.log(line)

    }
}


function getCell(row,col) {
    //busco la bomba en una locacion valida
    if (row < 0 || col < 0) return 0
    if (row >= minefield.length) return 0
    if (col >= minefield[row].length) return 0
    if (minefield [row][col] === '*') return 1
    return 0
}
