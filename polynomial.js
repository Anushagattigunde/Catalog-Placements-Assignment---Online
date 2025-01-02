const fs = require('fs');

// Function to compute the secret using Lagrange interpolation
function lagrangeInterpolation(points, k) {
    let result = 0;

    for (let i = 0; i < k; i++) {
        let { x: xi, y: yi } = points[i];

        // Calculate Lagrange basis polynomial L_i(0)
        let numerator = 1;
        let denominator = 1;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const xj = points[j].x;
                numerator *= -xj; // L_i(0): product of (-xj)
                denominator *= xi - xj; // xi - xj
            }
        }

        // Add contribution of this term to the result
        result += (yi * numerator) / denominator;
    }

    return Math.round(result); // Round to handle floating-point imprecision
}

// Function to process a test case
function processTestCase(testCase) {
    const { n, k } = testCase.keys;

    // Convert values to decimal
    const points = [];
    Object.keys(testCase).forEach((key) => {
        if (key === 'keys') return;

        const { base, value } = testCase[key];
        const x = parseInt(key); // Use the key as x-coordinate
        const y = parseInt(value, parseInt(base)); // Convert value to decimal

        points.push({ x, y });
    });

    // Sort points by x-coordinate to ensure consistency
    points.sort((a, b) => a.x - b.x);

    // Use only the first k points for interpolation
    const selectedPoints = points.slice(0, k);

    // Compute the secret 'c' (constant term at x=0)
    return lagrangeInterpolation(selectedPoints, k);
}

// Read test cases from JSON files
const testCase1 = JSON.parse(fs.readFileSync('inp1.json', 'utf-8'));
const testCase2 = JSON.parse(fs.readFileSync('inp2.json', 'utf-8'));

// Compute the secrets for both test cases
const secret1 = processTestCase(testCase1);
const secret2 = processTestCase(testCase2);

// Output the secrets (constant terms c)
console.log(secret1); // Output the constant term for test case 1
console.log(secret2); // Output the constant term for test case 2
