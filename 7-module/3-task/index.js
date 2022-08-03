export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this.elem = document.createElement("div");
    this.elem.className = "slider";
    this.elem.insertAdjacentHTML(
      "afterbegin",
      `
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>
    
      <!--Полоска слайдера-->
      <div class="slider__progress"></div>
        `
    );

    this._sliderSteps = document.createElement("div");
    this._sliderSteps.className = "slider__steps";
    this.elem.append(this._sliderSteps);

    for (let currStep = 0; currStep < steps; currStep++) {
      const newSpan = document.createElement("span");
      if (currStep === value) newSpan.classList.add("slider__step-active");
      this._sliderSteps.append(newSpan);
    }

    this.elem.addEventListener("click", this._calculateNearestStep.bind(this));
  }

  _calculateNearestStep(event) {
    const rect = this.elem
      .querySelector(".slider__steps")
      .getBoundingClientRect();
    const nearestStep = Math.round(
      (event.clientX - (rect.left + window.pageXOffset)) /
        (rect.width / (this._steps - 1))
    );

    this.elem.querySelector(".slider__value").innerHTML = nearestStep;
    const stepsChildren = this.elem.querySelector(".slider__steps").children;
    for (let index = 0; index < stepsChildren.length; index++) {
      stepsChildren[index].className =
        index === nearestStep ? "slider__step-active" : "";
    }

    let leftPercents = (nearestStep / (this._steps - 1)) * 100;
    this.elem.querySelector(".slider__thumb").style.left = `${leftPercents}%`;
    this.elem.querySelector(
      ".slider__progress"
    ).style.width = `${leftPercents}%`;

    this.elem.dispatchEvent(new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    }))

  }
}
