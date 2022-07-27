function makeFriendsList(friends) {
  // ваш код...
  const ul = document.createElement("ul");

  friends.forEach((element) => {
    const li = document.createElement("li");
    li.append(`${element.firstName} ${element.lastName}`);
    ul.append(li);
  });

  return ul;
}
