function hideSelf() {
  for (const element of document.getElementsByClassName('hide-self-button')) {
    element.addEventListener('click', event => event.target.hidden = !event.target.hidden)
  }
}
