export default class StepSlider {
  constructor({ steps, value = 0 }) {
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

    this.elem.addEventListener("click", this._calculateNearestStep);
  }

  _calculateNearestStep(event) {
    console.log(event);
  }
}
