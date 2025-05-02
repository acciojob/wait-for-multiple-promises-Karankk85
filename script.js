
const output = document.getElementById('output');
const loadingRow = document.getElementById('loading'); // "Loading..." row

// Function to create a promise that resolves after a random time (1-3 seconds)
function createRandomPromise(promiseName) {
  const randomTime = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ promiseName, time: parseFloat(randomTime) });
    }, randomTime * 1000);
  });
}

// Create an array of promises
const promises = [
  createRandomPromise('Promise 1'),
  createRandomPromise('Promise 2'),
  createRandomPromise('Promise 3'),
];

// Use Promise.all() to wait for all promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove the "Loading..." row
    output.removeChild(loadingRow);

    let maxTime = 0;
    results.forEach((result) => {
      // Create a row for each promise
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const timeCell = document.createElement('td');

      nameCell.textContent = result.promiseName;
      timeCell.textContent = result.time.toFixed(3); // Formatting time to 3 decimal places
      row.appendChild(nameCell);
      row.appendChild(timeCell);
      output.appendChild(row);

      // Track the maximum time
      maxTime = Math.max(maxTime, result.time);
    });

    // Add the "Total" row showing the longest time
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
      <td><strong>Total</strong></td>
      <td><strong>${maxTime.toFixed(3)}</strong></td>
    `;
    output.appendChild(totalRow);
  })
  .catch((error) => {
    console.error('Error in promises:', error);
  });
