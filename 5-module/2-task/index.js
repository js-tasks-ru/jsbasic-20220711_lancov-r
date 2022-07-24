function toggleText() {
  for (const element of document.getElementsByClassName('toggle-text-button')) {
    element.addEventListener('click', event => {
      const textElement = document.getElementById('text');
      if(textElement) textElement.hidden = !textElement.hidden
    })
  }
}
