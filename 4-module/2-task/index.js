function makeDiagonalRed(table) {
  for (let counter = 0; counter < table.rows.length; counter++)
    table.rows[counter].cells[counter].style.backgroundColor = "red";
}
