class Matrix {
    constructor(rows, cols) {
        this.ROWS = rows;
        this.COLS = cols;
        this.header = new Array(this.COLS).fill(0);
        this.terminal = Array.from({ length: this.ROWS }, () => new Array(this.COLS).fill(0));
        this.textBoard = this.generateTextMatrix(this.ROWS, this.COLS);
    }

    addLine() {
        const max = this.ROWS / 2;
        const min = Math.floor(this.ROWS / 4);

        // Update header
        for (let i = 0; i < this.COLS; i++) {
            if (this.header[i] == 0 && Math.random() > 0.97) {
                this.header[i] = Math.floor(Math.random() * (max - min + 1)) + min; 
            }
        }

        let top_row = new Array(this.COLS).fill(0);
        for (let j = 0; j < this.COLS; j++) {
        if (this.header[j] > 0) {
            top_row[j] = 1;
            this.header[j]--;
        }
        }
        this.terminal.unshift(top_row);
        this.terminal.pop();


        // Print terminal in the view
        const testDiv = document.querySelector('.matrix');
        const rows = testDiv.querySelectorAll('p');
        rows.forEach(p => p.remove());

        for (let i = 0; i < this.ROWS; i++) {
            const newRow = document.createElement('p');
            newRow.textContent = this.toString(this.terminal[i], i);
            testDiv.appendChild(newRow);
        }

        this.updateTextMatrix();
    }

    toString(binary, row) {
        let out = "";
        for (let i = 0; i < this.COLS; i++) {
            if (binary[i] == 1) {
                out += this.textBoard[row][i];
            } else {
                out += " ";
            }
        }
        return out;
    }

    // Function to generate a random alphanumeric character
    randomAlphanumeric() {
        const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const index = Math.floor(Math.random() * alphanumeric.length);
        return alphanumeric[index];
    }

    // Function to generate a 2D array of random alphanumeric characters
    generateTextMatrix(n, m) {
        return Array.from({ length: n }, () =>
            Array.from({ length: m }, () => this.randomAlphanumeric())
        );
    }

    updateTextMatrix() {
        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLS; j++) {
            if (this.terminal[i][j] == 0) {
                this.textBoard[i][j] = this.randomAlphanumeric();
            }
            }
        }
    }
}

const myMatrix = new Matrix(28, 68);
setInterval(() => {
    myMatrix.addLine();
}, 70);