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

    return Math.round(result); 
}

// Function to process a test case
function processTestCase(testCase) {
    const { n, k } = testCase.keys;

    // Convert values to decimal
    const points = [];
    Object.keys(testCase).forEach((key) => {
        if (key === 'keys') return;

        const { base, value } = testCase[key];
        const x = parseInt(key); 
        const y = parseInt(value, parseInt(base)); 

        points.push({ x, y });
    });

   
    points.sort((a, b) => a.x - b.x);

    // Use only the first k points for interpolation
    const selectedPoints = points.slice(0, k);

    // Compute the secret 'c' (constant term at x=0)
    return lagrangeInterpolation(selectedPoints, k);
}


const testCase1 = JSON.parse(fs.readFileSync('inp1.json', 'utf-8'));
const testCase2 = JSON.parse(fs.readFileSync('inp2.json', 'utf-8'));


const secret1 = processTestCase(testCase1);
const secret2 = processTestCase(testCase2);


console.log(secret1); 
console.log(secret2); 
