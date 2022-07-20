function camelize(str) {
  return str
    .split("-")
    .map(
      (val, index) => (index === 0 ? val : val[0].toUpperCase() + val.slice(1))
    )
    .join("");
}

