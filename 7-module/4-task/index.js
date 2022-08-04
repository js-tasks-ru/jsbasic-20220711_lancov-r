export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement("div");
    this.elem.className = "slider";
    this.elem.dataset.steps = steps;
    this.elem.dataset.value = Math.min(value, steps - 1);
    this.elem.dataset.previousStep = value;

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

    this.elem.addEventListener("click", this.#_sliderClickEvent.bind(this));
    //this.elem.addEventListener("pointerdown", this._mousePointerdown.bind(this))
    this.elem.ondragstart = () => false;

    this.#_setStep(this.elem);
  }

  #_sliderClickEvent(event) {
    const slider = event.currentTarget;
    this.#_setNearestValue(slider, event.clientX);
    this.#_setStep(slider);
  }

  #_setNearestValue(slider, clientX) {
    const rect = slider.querySelector(".slider__steps").getBoundingClientRect();
    slider.dataset.value = Math.round(
      (clientX - (rect.left + window.pageXOffset)) /
        (rect.width / (slider.dataset.steps - 1))
    );
  }

  #_setStep(slider) {
    slider.querySelector(".slider__value").innerHTML = slider.dataset.value;

    const stepsChildren = slider.querySelector(".slider__steps").children;
    for (let index = 0; index < stepsChildren.length; index++) {
      stepsChildren[index].className =
        index === slider.dataset.value ? "slider__step-active" : "";
    }

    let leftPercents =
      (slider.dataset.value / (slider.dataset.steps - 1)) * 100;
    slider.querySelector(".slider__thumb").style.left = `${leftPercents}%`;
    slider.querySelector(".slider__progress").style.width = `${leftPercents}%`;

    if (slider.dataset.previousStep !== slider.dataset.value) {
      slider.dispatchEvent(
        new CustomEvent("slider-change", {
          // имя события должно быть именно 'slider-change'
          detail: this.value, // значение 0, 1, 2, 3, 4
          bubbles: true, // событие всплывает - это понадобится в дальнейшем
        })
      );
      slider.dataset.previousStep = slider.dataset.value;
    }
  }



  #_mousePointerdown(event) {
    thumb = this.elem.querySelector('slider__thumb');
    let shiftX = event.clientX - thumb.getBoundingClientRect().left;
    let shiftY = event.clientY - thumb.getBoundingClientRect().top;
  
    thumb.style.position = 'absolute';
    thumb.style.zIndex = 1000;
    document.body.append(thumb);
  
    moveAt(event.pageX, event.pageY);
  
    // переносит мяч на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши
    function moveAt(pageX, pageY) {
      thumb.style.left = pageX - shiftX + 'px';
      thumb.style.top = pageY - shiftY + 'px';
    }
  
    function onPointermove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // передвигаем мяч при событии mousemove
    document.addEventListener('pointermove', onPointermove);
  
    // отпустить мяч, удалить ненужные обработчики
    thumb.onmouseup = function() {
      document.removeEventListener('pointermove', onPointermove);
      thumb.onmouseup = null;
    };
  
  };
  

// потенциальная цель переноса, над которой мы пролетаем прямо сейчас
 currentDroppable = null;

}





