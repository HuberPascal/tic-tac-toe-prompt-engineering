let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

let isCircleTurn = true;
let currentPlayer = 'cross';
let audio_draw = new Audio('audio/draw.mp3');
let audio_end = new Audio('audio/end.mp3');

function init() {
  render();
  renderSymbols();
}


function render() {
  const contentDiv = document.getElementById('content');

  let tableHTML = '<table>';
  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      const fieldValue = fields[index];
      const symbol = fieldValue === 'circle' ? generateCircleSVG() : fieldValue === 'cross' ? generateCrossSVG() : '';

      tableHTML += `<td class="${fieldValue}" onclick="handleClick(${index})">${symbol}</td>`;
    }

    tableHTML += '</tr>';
  }

  tableHTML += '</table>';

  contentDiv.innerHTML = tableHTML;
}


function renderSymbols() {
  let crossSymbol = document.getElementById('cross');
  let circleSymbol = document.getElementById('circle');
  crossSymbol.innerHTML = generateCrossSVG();
  circleSymbol.innerHTML = generateCircleSVG();
  if (currentPlayer === 'circle') {
      crossSymbol.classList.add('inactive');
      circleSymbol.classList.remove('inactive');
  } else {
      crossSymbol.classList.remove('inactive');
      circleSymbol.classList.add('inactive');
  }
}


function isGameFinished() {
  // Überprüfe auf Gewinnbedingungen
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Linien
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Linien
    [0, 4, 8], [2, 4, 6] // Diagonale Linien
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return true; // Es gibt einen Gewinner
    }
  }

  // Überprüfe auf Unentschieden
  if (fields.every(field => field !== null)) {
    return true; // Alle Felder sind belegt, das Spiel endet unentschieden
  }

  return false; // Das Spiel ist noch nicht beendet
}


function handleClick(index) {
  if (!isGameFinished()) { // Überprüfe, ob das Spiel beendet ist
    const fieldValue = fields[index];
    if (!fieldValue) {
      fields[index] = isCircleTurn ? 'circle' : 'cross';
      currentPlayer = fields[index];
      const symbol = isCircleTurn ? generateCircleSVG(index) : generateCrossSVG(index);
      const tdElement = document.getElementsByTagName('td')[index];
      tdElement.innerHTML = symbol;
      tdElement.onclick = null;
      checkWinningCondition();
      audio_draw.play();
      isCircleTurn = !isCircleTurn; // Umschalten des aktuellen Spielers
      renderSymbols();
    }
  }
}


function restartGame() {
  fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  render()
  renderSymbols();
}


function checkWinningCondition() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Linien
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Linien
    [0, 4, 8], [2, 4, 6] // Diagonale Linien
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      drawWinningLine(combination);
      audio_end.play();
      break;
    }
  }
}


function drawWinningLine(combination) {
  const [a, b, c] = combination;
  const tdElements = document.getElementsByTagName('td');

  tdElements[a].classList.add('winning-cell', 'active');
  tdElements[b].classList.add('winning-cell', 'active');
  tdElements[c].classList.add('winning-cell', 'active');

  if (a === 0 && b === 1 && c === 2) {
    tdElements[a].classList.add('winning-line-horizontal');
    tdElements[b].classList.add('winning-line-horizontal');
    tdElements[c].classList.add('winning-line-horizontal');
  } else if (a === 3 && b === 4 && c === 5) {
    tdElements[a].classList.add('winning-line-horizontal');
    tdElements[b].classList.add('winning-line-horizontal');
    tdElements[c].classList.add('winning-line-horizontal');
  } else if (a === 6 && b === 7 && c === 8) {
    tdElements[a].classList.add('winning-line-horizontal');
    tdElements[b].classList.add('winning-line-horizontal');
    tdElements[c].classList.add('winning-line-horizontal');
  } else if (a === 0 && b === 3 && c === 6) {
    tdElements[a].classList.add('winning-line-vertical');
    tdElements[b].classList.add('winning-line-vertical');
    tdElements[c].classList.add('winning-line-vertical');
  } else if (a === 1 && b === 4 && c === 7) {
    tdElements[a].classList.add('winning-line-vertical');
    tdElements[b].classList.add('winning-line-vertical');
    tdElements[c].classList.add('winning-line-vertical');
  } else if (a === 2 && b === 5 && c === 8) {
    tdElements[a].classList.add('winning-line-vertical');
    tdElements[b].classList.add('winning-line-vertical');
    tdElements[c].classList.add('winning-line-vertical');
  } else if (a === 0 && b === 4 && c === 8) {
    tdElements[a].classList.add('winning-line-diagonal');
    tdElements[a].classList.add('winning-line-diagonal-1');
    tdElements[b].classList.add('winning-line-diagonal');
    tdElements[b].classList.add('winning-line-diagonal-1');
    tdElements[c].classList.add('winning-line-diagonal');
    tdElements[c].classList.add('winning-line-diagonal-1');
  } else if (a === 2 && b === 4 && c === 6) {
    tdElements[a].classList.add('winning-line-diagonal');
    tdElements[a].classList.add('winning-line-diagonal-2');
    tdElements[b].classList.add('winning-line-diagonal');
    tdElements[b].classList.add('winning-line-diagonal-2');
    tdElements[c].classList.add('winning-line-diagonal');
    tdElements[c].classList.add('winning-line-diagonal-2');
  }
}


function generateCircleSVG() {
  const svg = `
    <svg width="70" height="70">
      <circle cx="35" cy="35" r="30" stroke="#02AAE7" stroke-width="4" fill="none">
        <animate attributeName="r" from="0" to="30" dur="0.3s" fill="freeze" />
        <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.3s" fill="freeze" />
      </circle>
    </svg>
  `;
  return svg;
}


function generateCrossSVG() {
  const svg = `
    <svg width="70" height="70">
      <line x1="0" y1="0" x2="70" y2="70" stroke="#FFC000" stroke-width="4">
        <animate attributeName="stroke-dasharray" from="0 140" to="140 0" dur="0.3s" fill="freeze" />
      </line>
      <line x1="0" y1="70" x2="70" y2="0" stroke="#FFC000" stroke-width="4">
        <animate attributeName="stroke-dasharray" from="0 140" to="140 0" dur="0.3s" fill="freeze" />
      </line>
    </svg>
  `;
  return svg;
}





  
  
  
  
  
  
  
  
  
  
  
  
  
  