function toggleText() {
  document
    .querySelector(".toggle-text-button")
    .addEventListener("click", (event) => {
      const textElement = document.getElementById("text");
      if (textElement) textElement.hidden = !textElement.hidden;
    });
}
