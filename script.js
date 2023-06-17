let fields = [
    null,
    'circle',
    'cross',
    null,
    null,
    null,
    null,
    null,
];


function init() {
    render();
}


function render() {
    const contentDiv = document.getElementById('content');

    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
      tableHTML += '<tr>';
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        const fieldValue = fields[index];
        const symbol = fieldValue === 'circle' ? 'O' : fieldValue === 'cross' ? 'X' : '';
  
        tableHTML += `<td class="${fieldValue}">${symbol}</td>`;
      }
  
      tableHTML += '</tr>';
    }
  
    tableHTML += '</table>';
  
    contentDiv.innerHTML = tableHTML;
  }
  