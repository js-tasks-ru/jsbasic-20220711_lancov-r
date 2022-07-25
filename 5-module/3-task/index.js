function initCarousel() {


  const carousel = document.querySelector(".carousel");
  const carouselArrowRight = document.querySelector(".carousel__arrow_right");
  const carouselArrowLeft  = document.querySelector(".carousel__arrow_left");

  carouselArrowLeft.style.display = "none";

  carouselArrowRight.addEventListener("click", carouselScrolling);
  carouselArrowRight.addEventListener("click", carouselArrowButtonVisibility);

  carouselArrowLeft.addEventListener("click", carouselScrolling);
  carouselArrowLeft.addEventListener("click", carouselArrowButtonVisibility);

}

function carouselScrolling(event) {
  const carousel = event.currentTarget.closest(".carousel");
  let currentScrollState = parseInt(carousel.dataset.currentScrollState,10) || 0;

  if (event.currentTarget.classList.contains("carousel__arrow_right"))
    currentScrollState--;
  if (event.currentTarget.classList.contains("carousel__arrow_left"))
    currentScrollState++;

  carousel.dataset.currentScrollState = currentScrollState;
  console.log(carousel.dataset.currentScrollState);
  carousel.querySelector(
    ".carousel__inner"
  ).style.transform = `translateX(${ 100 * currentScrollState}%)`;
}

function carouselArrowButtonVisibility(event) {
  const carousel = event.currentTarget.closest(".carousel");
  const carouselArrowRight = carousel.querySelector(".carousel__arrow_right");
  const carouselArrowLeft = carousel.querySelector(".carousel__arrow_left");

  const currentScrollState = carousel.dataset.currentScrollState;
  const carouselChildrenElementsCount =
    carousel.querySelector(".carousel__inner").childElementCount;

  carouselArrowLeft.style.display =
    currentScrollState === "0" ? "none" : "";
  carouselArrowRight.style.display =
    -currentScrollState === carouselChildrenElementsCount - 1 ? "none" : "";
}
