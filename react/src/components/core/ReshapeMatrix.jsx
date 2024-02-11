// Функция пересобирания матрицы из БД в двумерную матрицу
export default function reshapeMatrix(matrixSeats, rows, seats) {
    let i = 0;
    let j = 0;
    let k = 0;
    let line = [];
    let matrix = [];

    if (matrixSeats) {
        while (i < rows) {
            while (j < seats) {
                line.push(matrixSeats[k]);
                j++;
                k++;
            }
            matrix.push(line);
            j = 0;
            line = [];
            i++;
        }
        return matrix;
    } else {
        return [];
    }
};
