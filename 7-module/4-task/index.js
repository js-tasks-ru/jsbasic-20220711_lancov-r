import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  #steps = 0;
  #value = 0;
  #previousValue = 0;

  elem = null;
  #sliderThumb = null;
  #sliderValue = null;
  #sliderProgress = null;
  #sliderSteps = null;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = Math.min(value, steps - 1);
    this.#previousValue = this.#value;

    this.elem = createElement(this.#template());
    this.#sliderThumb = this.elem.querySelector(".slider__thumb");
    this.#sliderValue = this.elem.querySelector(".slider__value");
    this.#sliderProgress = this.elem.querySelector(".slider__progress");
    this.#sliderSteps = this.elem.querySelector(".slider__steps");

    this.#setStep(this.elem);

    this.elem.ondragstart = () => false;
    // this.elem.addEventListener("click", this.#onSliderClick);
    this.elem.addEventListener("pointerdown", this.#mousePointerdown);
  }

  #template() {
    let spansHTML = "";
    for (let index = 0; index < this.#steps; index++)
      spansHTML += "<span></span>";

    return `
    <!--Корневой элемент слайдера-->
    <div class="slider">
  
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>
  
      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>
  
      <!--Шаги слайдера-->
      <div class="slider__steps">
        ${spansHTML}
      </div>
    </div>
      `;
  }

  #onSliderClick = (event) => {
    this.#setNearestValue(event.clientX);
    this.#setStep();
  };

  #setNearestValue(clientX) {
    const rect = this.#sliderSteps.getBoundingClientRect();
    this.#value = Math.round(
      (clientX - (rect.left + window.pageXOffset)) /
        (rect.width / (this.#steps - 1))
    );
  }

  #setStep() {
    this.#sliderValue.innerHTML = this.#value;

    const stepsChildren = this.#sliderSteps.children;
    for (let index = 0; index < stepsChildren.length; index++) {
      stepsChildren[index].className =
        index === this.#value ? "slider__step-active" : "";
    }

    let leftPercents = (this.#value / (this.#steps - 1)) * 100;
    this.#sliderThumb.style.left = `${leftPercents}%`;
    this.#sliderProgress.style.width = `${leftPercents}%`;

    if (this.#previousValue !== this.#value) {
      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          // имя события должно быть именно 'slider-change'
          detail: this.#value, // значение 0, 1, 2, 3, 4
          bubbles: true, // событие всплывает - это понадобится в дальнейшем
        })
      );
      this.#previousValue = this.#value;
    }
  }

  #mousePointerdown = (event) => {
    const moveAt = (pageX) => {
      this.#sliderThumb.style.left = pageX - shiftX + "px";
      // console.log(`pageX: ${pageX}; shiftX ${shiftX}`);
    };

    const onPointermove = (event) => {
      moveAt(event.pageX);
    };

    let shiftX = event.clientX - this.#sliderThumb.getBoundingClientRect().left;
    console.log(this.#sliderThumb.getBoundingClientRect());
    this.#sliderThumb.style.position = "absolute";
    this.#sliderThumb.style.zIndex = 1000;

    //moveAt(event.pageX);

    document.addEventListener("pointermove", onPointermove);

    this.#sliderThumb.onmouseup = function () {
      document.removeEventListener("pointermove", onPointermove);
      this.#sliderThumb.onmouseup = null;
    };
  };

  currentDroppable = null;
}
