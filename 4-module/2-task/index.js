function makeDiagonalRed(table) {
  let rowCounter = 0;
  for (const row of table.rows) {
    let cellCounter = 0;
    for (const cell of row.cells) {
      if (cellCounter === rowCounter) cell.style.backgroundColor = "red";
      cellCounter++;
    }
    rowCounter++;
  }
}
