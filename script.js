const output = document.getElementById('output');
const loadingRow = document.getElementById('loading');

// Function to create a promise that resolves after a random time (1–3 seconds)
function createRandomPromise(name) {
  const time = (Math.random() * 2 + 1).toFixed(3); // Between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name, time: parseFloat(time) });
    }, time * 1000);
  });
}

// Create three promises
const promises = [
  createRandomPromise('Promise 1'),
  createRandomPromise('Promise 2'),
  createRandomPromise('Promise 3'),
];

// Wait for all promises to resolve
Promise.all(promises).then(results => {
  // Remove loading row
  output.removeChild(loadingRow);

  let maxTime = 0;

  // Add each promise result as a row
  results.forEach(result => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
    maxTime = Math.max(maxTime, result.time);
  });

  // Add the total (maximum) time row
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${maxTime.toFixed(3)}</strong></td>
  `;
  output.appendChild(totalRow);
});
