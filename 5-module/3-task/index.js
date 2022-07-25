function initCarousel() {
  const carouselArrowRight = document.getElementsByClassName(
    "carousel__arrow_right"
  )[0];
  const carouselArrowLeft = document.getElementsByClassName(
    "carousel__arrow_left"
  )[0];

  const carousel__inner = document.getElementsByClassName("carousel__inner")[0];

  carousel__inner.dataset.currentScrollState = 0;

  carouselArrowRight.addEventListener("click", carouselScrolling);
  carouselArrowRight.addEventListener("click", carouselArrowButtonVisibility);

  carouselArrowLeft.addEventListener("click", carouselScrolling);
  carouselArrowLeft.addEventListener("click", carouselArrowButtonVisibility);
}

function carouselScrolling(event) {
  const carousel__inner = document.getElementsByClassName("carousel__inner")[0];
  let currentScrollState = Number(carousel__inner.dataset.currentScrollState);

  if (event.target.classList.contains("carousel__arrow_right"))
    currentScrollState--;
  if (event.target.classList.contains("carousel__arrow_left"))
    currentScrollState++;

  event.target.classList.contains("carousel__arrow_right");

  carousel__inner.dataset.currentScrollState = currentScrollState;

  const elementWidth = 985.45;
  const currentOffset = elementWidth * currentScrollState;
  carousel__inner.style.transform = `translateX(${currentOffset}px)`;
}
function carouselArrowButtonVisibility(event) {
  const carousel__inner = document.getElementsByClassName("carousel__inner")[0];

  const carouselArrowRight = document.getElementsByClassName(
    "carousel__arrow_right"
  )[0];
  const carouselArrowLeft = document.getElementsByClassName(
    "carousel__arrow_left"
  )[0];

  carouselArrowRight.hidden =
    carousel__inner.dataset.currentScrollState ===
    carousel__inner.childElementCount - 1;

  carouselArrowLeft.hidden = carousel__inner.dataset.currentScrollState === 0;
}
