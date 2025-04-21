// Get the table body element to populate with data
const output = document.getElementById('output');

// Create the "Loading..." row initially
const loadingRow = document.createElement('tr');
const loadingCell1 = document.createElement('td');
const loadingCell2 = document.createElement('td');
loadingCell1.setAttribute('colspan', '2');
loadingCell1.textContent = 'Loading...';
loadingRow.appendChild(loadingCell1);
loadingRow.appendChild(loadingCell2);
output.appendChild(loadingRow);

// Function to create a promise that resolves after a random time (1-3 seconds)
function createRandomPromise(promiseName) {
    const randomTime = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ promiseName, time: randomTime });
        }, randomTime * 1000); // Convert to milliseconds
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
        let totalTime = 0;
        results.forEach((result, index) => {
            const row = document.createElement('tr');
            const promiseNameCell = document.createElement('td');
            const timeCell = document.createElement('td');

            promiseNameCell.textContent = result.promiseName;
            timeCell.textContent = result.time;
            row.appendChild(promiseNameCell);
            row.appendChild(timeCell);

            output.appendChild(row);

            // Track the total time (the time the longest promise took)
            totalTime = Math.max(totalTime, parseFloat(result.time));
        });

        // Add the "Total" row
        const totalRow = document.createElement('tr');
        const totalNameCell = document.createElement('td');
        const totalTimeCell = document.createElement('td');

        totalNameCell.textContent = 'Total';
        totalTimeCell.textContent = totalTime.toFixed(3); // Format the total time to 3 decimal places
        totalRow.appendChild(totalNameCell);
        totalRow.appendChild(totalTimeCell);

        output.appendChild(totalRow);
    })
    .catch((error) => {
        console.error('Error in promises:', error);
    });
