function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const carouselArrowLeft = document.querySelector(".carousel__arrow_left");
  const carouselArrowRight = document.querySelector(".carousel__arrow_right");

  carouselArrowLeft.style.display = "none";
  carouselArrowLeft.style.userSelect = "none";
  carouselArrowRight.style.userSelect = "none";

  carouselArrowLeft.addEventListener("click", carouselScrolling);
  carouselArrowLeft.addEventListener("click", carouselArrowButtonVisibility);

  carouselArrowRight.addEventListener("click", carouselScrolling);
  carouselArrowRight.addEventListener("click", carouselArrowButtonVisibility);
}

function carouselScrolling(event) {
  const carousel = event.currentTarget.closest(".carousel");
  let currentScrollState =
    parseInt(carousel.dataset.currentScrollState, 10) || 0;

  if (event.currentTarget.matches(".carousel__arrow_left"))
    currentScrollState++;
  if (event.currentTarget.matches(".carousel__arrow_right"))
    currentScrollState--;

  carousel.dataset.currentScrollState = currentScrollState;

  const carousel__inner = carousel.querySelector(".carousel__inner");
  carousel__inner.style.transform = `translateX(${
    carousel__inner.clientWidth * currentScrollState
  }px)`;
}

function carouselArrowButtonVisibility(event) {
  const carousel = event.currentTarget.closest(".carousel");
  const carouselArrowRight = carousel.querySelector(".carousel__arrow_right");
  const carouselArrowLeft = carousel.querySelector(".carousel__arrow_left");

  const currentScrollState = parseInt(carousel.dataset.currentScrollState, 10);
  const carouselChildrenElementsCount =
    carousel.querySelector(".carousel__inner").childElementCount;

  carouselArrowLeft.style.display = !currentScrollState ? "none" : "";
  carouselArrowRight.style.display =
    -currentScrollState === carouselChildrenElementsCount - 1 ? "none" : "";
}
