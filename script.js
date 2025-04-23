// Get the table body element to populate with data
const output = document.getElementById('output');

// Create the "Loading..." row initially
const loadingRow = document.createElement('tr');
loadingRow.setAttribute('id', 'loading'); // ✅ Add this line
const loadingCell = document.createElement('td');
loadingCell.setAttribute('colspan', '2');
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);
output.appendChild(loadingRow);


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

        // Populate the table with the results of each promise
        let maxTime = 0;
        results.forEach((result) => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const timeCell = document.createElement('td');

            nameCell.textContent = result.promiseName;
            timeCell.textContent = result.time.toFixed(3);
            row.appendChild(nameCell);
            row.appendChild(timeCell);
            output.appendChild(row);

            maxTime = Math.max(maxTime, result.time);
        });

        // Add the "Total" row
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
