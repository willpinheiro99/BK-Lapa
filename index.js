const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to each other
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

let currentIndex = 0;

const moveToSlide = (track, currentIndex) => {
  const amountToMove = slides[currentIndex].style.left;
  track.style.transform = `translateX(-${amountToMove})`;
};

// Click Next, move slides right
nextButton.addEventListener('click', () => {
  if (currentIndex >= slides.length - getSlidesVisible()) return;
  currentIndex++;
  moveToSlide(track, currentIndex);
});

// Click Prev, move slides left
prevButton.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  moveToSlide(track, currentIndex);
});

// Helper function to determine slides visible based on viewport width
function getSlidesVisible() {
  const width = window.innerWidth;
  if (width <= 480) return 1;
  if (width <= 768) return 2;
  return 3;
}

// Optional: Update slide positions on window resize
window.addEventListener('resize', () => {
  slides.forEach(setSlidePosition);
  if (currentIndex > slides.length - getSlidesVisible()) {
    currentIndex = slides.length - getSlidesVisible();
  }
  if (currentIndex < 0) currentIndex = 0;
  moveToSlide(track, currentIndex);
});
