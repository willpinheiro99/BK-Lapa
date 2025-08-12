// Seleciona os elementos necessários para o carrossel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

// Obtém a largura de um slide para calcular o deslocamento
const slideWidth = slides[0].getBoundingClientRect().width;

// Função para posicionar cada slide ao lado do outro no carrossel
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

// Posiciona todos os slides na inicialização
slides.forEach(setSlidePosition);

let currentIndex = 0; // Índice do slide atual visível

// Função para mover o carrossel para o slide especificado
const moveToSlide = (track, currentIndex) => {
  const amountToMove = slides[currentIndex].style.left;
  track.style.transform = `translateX(-${amountToMove})`;
};

// Evento do botão "Próximo" para avançar o carrossel
nextButton.addEventListener('click', () => {
  if (currentIndex >= slides.length - getSlidesVisible()) return; // Evita ultrapassar último slide
  currentIndex++;
  moveToSlide(track, currentIndex);
});

// Evento do botão "Anterior" para retroceder o carrossel
prevButton.addEventListener('click', () => {
  if (currentIndex <= 0) return; // Evita ultrapassar o primeiro slide
  currentIndex--;
  moveToSlide(track, currentIndex);
});

// Função auxiliar para definir quantos slides são visíveis conforme a largura da tela
function getSlidesVisible() {
  const width = window.innerWidth;
  if (width <= 480) return 1;
  if (width <= 768) return 2;
  return 3;
}

// Atualiza posições dos slides e corrige índice ao redimensionar a janela
window.addEventListener('resize', () => {
  slides.forEach(setSlidePosition);
  if (currentIndex > slides.length - getSlidesVisible()) {
    currentIndex = slides.length - getSlidesVisible();
  }
  if (currentIndex < 0) currentIndex = 0;
  moveToSlide(track, currentIndex);
});

// Seleciona elementos para a pesquisa (ícone e campo de busca)
const btnPesquisa = document.getElementById("btnPesquisa");
const campoPesquisa = document.getElementById("campoPesquisa");

// Evento para abrir ou fechar o campo de pesquisa ao clicar no ícone
btnPesquisa.addEventListener("click", () => {
    campoPesquisa.classList.toggle("ativo");
    if (campoPesquisa.classList.contains("ativo")) {
        campoPesquisa.focus(); // Foca o input quando aberto
    }
});

// Fecha o campo de pesquisa ao apertar ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        campoPesquisa.classList.remove("ativo");
    }
});

