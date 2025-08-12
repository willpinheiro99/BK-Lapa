const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const btnPesquisa = document.getElementById("btnPesquisa");
const campoPesquisa = document.getElementById("campoPesquisa");

// Posiciona slides lado a lado
const slideWidth = slides[0].getBoundingClientRect().width;
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

let currentIndex = 0;

const getSlidesVisible = () => {
  const width = window.innerWidth;
  if (width <= 480) return 1;
  if (width <= 768) return 2;
  return 3;
};

const moveToSlide = (track, currentIndex) => {
  const amountToMove = slides[currentIndex].style.left;
  track.style.transform = `translateX(-${amountToMove})`;
};

nextButton.addEventListener('click', () => {
  if (currentIndex >= slides.length - getSlidesVisible()) return;
  currentIndex++;
  moveToSlide(track, currentIndex);
});

prevButton.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  moveToSlide(track, currentIndex);
});

window.addEventListener('resize', () => {
  slides.forEach(setSlidePosition);
  if (currentIndex > slides.length - getSlidesVisible()) {
    currentIndex = slides.length - getSlidesVisible();
  }
  if (currentIndex < 0) currentIndex = 0;
  moveToSlide(track, currentIndex);
});

btnPesquisa.addEventListener("click", () => {
  campoPesquisa.classList.toggle("ativo");
  if (campoPesquisa.classList.contains("ativo")) {
    campoPesquisa.focus();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    campoPesquisa.classList.remove("ativo");
  }
});

// Menu hambúrguer
const hamburguer = document.querySelector('.hamburguer');
const navUl = document.querySelector('.menu nav ul');

hamburguer.addEventListener('click', () => {
  navUl.classList.toggle('ativo');
});

