'use strict'

//
//ejemplo de request 
//const minefield = [
//     ['*', '*','',''],
//     ['*', '*','',''],
//     ['', '','*',''],
//     ['', '','',''],
// ];

/*
Devuelve un json con las posiciones a las distancias que esta cada bomba, si hay una bomba en esa posicion pone un *
*/
module.exports.minesweeper = (event, context, callback) => {
    //recorro el minefield
    // por ahora uso un minefield local
    let body = JSON.parse(event.body);
    let minefield = body.minefield;
    let lines = '';

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
        lines += line;
    }
    
    const response = {
        statusCode: 200,
        body: { result: lines }
    };
    callback(null, response);
}


function getCell(row,col) {
    //busco la bomba en una locacion valida
    if (row < 0 || col < 0) return 0
    if (row >= minefield.length) return 0
    if (col >= minefield[row].length) return 0
    if (minefield [row][col] === '*') return 1
    return 0
}
