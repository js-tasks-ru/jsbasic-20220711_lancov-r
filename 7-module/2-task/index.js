import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this._modal = document.createElement("div");
    this._modal.className = "modal";
    this._modal.insertAdjacentHTML(
      "afterbegin",
      `
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
  
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    `
    );

    this._modalTitle = this._modal.querySelector(".modal__title");
    this._modalBody = this._modal.querySelector(".modal__body");
    this._modalClose = this._modal.querySelector(".modal__close");

    this.close = this.close.bind(this);
    this._escKeyDownEvent = this._escKeyDownEvent.bind(this);
  }

  setTitle(titleText) {
    this._modalTitle.innerHTML = titleText;
  }

  setBody(bodyNode) {
    this._modalBody.innerHTML = "";
    this._modalBody.append(bodyNode);
  }

  open() {
    const body = document.querySelector("body");
    body.append(this._modal);
    body.classList.add("is-modal-open");

    this._modalClose.addEventListener("click", this.close);
    document.addEventListener("keydown", this._escKeyDownEvent);
  }

  close() {
    if(document.querySelector("body").classList.contains("is-modal-open")){
    document.querySelector("body").classList.remove("is-modal-open");
    document.querySelector(".modal").remove();
    this._modalClose.removeEventListener("click", this.close);
    this._modalClose.removeEventListener("keydown", this._escKeyDownEvent);}
  }

  _escKeyDownEvent(event) {
    if (event.code === "Escape") {
      this.close();
    }
  }
}
