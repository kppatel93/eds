function buildCell(rowIndex) {
  const cell = rowIndex ? document.createElement('td') : document.createElement('th');
  if (!rowIndex) cell.setAttribute('scope', 'col');
  return cell;
}

export default async function decorate(block) {
  const searchContainer = document.createElement('div');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';

  searchContainer.append(searchInput, searchButton);
  document.body.append(searchContainer);

  // Create table elements
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const header = !block.classList.contains('no-header');
  if (header) table.append(thead);
  table.append(tbody);

  [...block.children].forEach((child, i) => {
    const row = document.createElement('tr');
    if (header && i === 0) thead.append(row);
    else tbody.append(row);
    [...child.children].forEach((col) => {
      const cell = buildCell(header ? i : i + 1);
      cell.innerHTML = col.innerHTML;
      row.append(cell);
    });
  });

  block.innerHTML = '';
  block.append(table);

  // Search Function
  searchButton.addEventListener('click', () => {
    const searchQuery = searchInput.value.toLowerCase();
    const rows = tbody.querySelectorAll('tr');
    rows.forEach((row) => {
      let matchFound = false;
      row.querySelectorAll('td').forEach((cell) => {
        if (cell.innerText.toLowerCase().includes(searchQuery)) {
          matchFound = true;
        }
      });

      // Show or hide rows based on search match
      if (matchFound) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}
