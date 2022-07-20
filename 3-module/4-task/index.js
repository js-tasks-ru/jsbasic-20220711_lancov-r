function showSalary(users, age) {
  return users
    .filter((val) => val.age <= age)
    .map((val) => `${val.name}, ${val.balance}`)
    .join("\n");
}
