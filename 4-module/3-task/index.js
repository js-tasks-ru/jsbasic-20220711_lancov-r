function highlight(table) {
  for (const row of table.rows) {
    if (!row.rowIndex) continue; // skipping of header

    for (const cell of row.cells) {
      //Age coloumn
      if (cell.cellIndex === 1) {
        const age = Number(cell.textContent);
        if (!isNaN(age) && age < 18) row.style.textDecoration = "line-through";
      }

      //Gender coloumn
      if (cell.cellIndex === 2) {
        switch (cell.textContent) {
          case "f":
            row.classList.add("female");
            break;
          case "m":
            row.classList.add("male");
            break;
        }
      }

      //Status coloumn
      if (cell.cellIndex === 3) {
        if (cell.dataset.available === undefined) {
          row.hidden = true;
        } else {
          row.classList.add(
            cell.dataset.available === 'true'
              ? "available"
              : "unavailable"
          );
        }
      }
    }
  }
}
