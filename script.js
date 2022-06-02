// DEFINIÇÃO DE PROPRIEDADES

const divColors = document.querySelector('#color-palette');
const colors = document.querySelectorAll('.color');
const randomColor1 = document.querySelector('#random-color-container-1');
const randomColor2 = document.querySelector('#random-color-container-2');
const randomColor3 = document.querySelector('#random-color-container-3');
const cleaner = document.querySelector('#clear-board');
const board = document.querySelector('#pixel-board');
const createBoardButton = document.querySelector('#generate-board');
const inputBox = document.querySelector('#board-size');

// FUNÇÕES DE EVENTOS

// Cria  função para gerar cores aleatórias

function generateRandomColor() {
  const r = () => Math.floor(Math.random() * 256);
  const color = `rgb(${r()}, ${r()}, ${r()})`;
  return color;
}
randomColor1.style.backgroundColor = generateRandomColor();
randomColor2.style.backgroundColor = generateRandomColor();
randomColor3.style.backgroundColor = generateRandomColor();

// Cria função para adicionar classe selected ao elemento selecionado

function addSelected(target) {
  if (target.classList.contains('color')) {
    target.classList.add('selected');
  }
}

// Cria função que remove classe selected do elemento selecionado

function removeSelected() {
  for (let i = 0; i < colors.length; i += 1) {
    if (colors[i].classList.contains('selected')) {
      colors[i].classList.remove('selected');
    }
  }
}

//  Adiciona evento de clique nas cores da paleta

divColors.addEventListener('click', function (event) {
    removeSelected();
    addSelected(event.target);
});

// Cria função que pinta o pixel

function paintPixel(target) {
  const allPixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < allPixels.length; i += 1) {
    if (target === allPixels[i]) {
     allPixels[i].style.backgroundColor = window.getComputedStyle(document.getElementsByClassName('selected')[0]).getPropertyValue('background-color');
    }
  }
}

//  Adiciona evento de clique na pixel-board

board.addEventListener('click', function (event) {
  paintPixel(event.target);
});

// Cria função que limpa o board ao clicar no botão Limpar

function clearBoard() {
  const allPixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < allPixels.length; index += 1) {
    allPixels[index].style.backgroundColor = 'white';
  }
}

//  Adiciona evento de clique no botão Limpar

cleaner.addEventListener('click', function () {
    clearBoard();
});


// PARTE 2

// Cria função que gera quadro de pixels com input de tamanho pelo usuário

function buildRow(number) {
  const divRow = document.createElement('div');
  divRow.className = 'row';
  for (let index = 0; index < number; index += 1) {
    const pixels = document.createElement('div');
    pixels.className = 'pixel';
    divRow.appendChild(pixels);
  }
  board.appendChild(divRow);
}

function buildBoard(number) {
  board.innerHTML = '';
  for (let index = 0; index < number; index += 1) {
    buildRow(number);
  }
}
// Adiciona evento de click ao botão de gerar o quadro

createBoardButton.addEventListener('click', function () {
  let number = 0;
  if (inputBox.value === '') {
    alert('Board inválido!');
  } else if (inputBox.value < 5) {
    number = 5;
    buildBoard(number);
  } else if (inputBox.value > 50) {
    number = 50;
    buildBoard(number);
  } else {
    number = inputBox.value;
    buildBoard(number);
  }

});