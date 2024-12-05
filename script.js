// Variables for fractions and attempt control
let numerator1, numerator2, denominator1, denominator2, operation, lcm, attempts;

function startExercise() {
    // Generate random fractions
    numerator1 = Math.floor(Math.random() * 10) + 1;
    numerator2 = Math.floor(Math.random() * 10) + 1;
    denominator1 = Math.floor(Math.random() * 10) + 1;
    denominator2 = Math.floor(Math.random() * 10) + 1;

    // Determine operation
    operation = Math.random() > 0.5 ? '+' : '-';

    // Initialize attempts
    attempts = 3;

    // Display the initial fractions
    const fractionDisplay = document.getElementById('fraction-display');
    fractionDisplay.innerHTML = `
        <div class="fraction-container">
            <div class="fraction">
                <span>${numerator1}</span>
                <span>─</span>
                <span>${denominator1}</span>
            </div>
            <div class="operation">
                <span>${operation}</span>
            </div>
            <div class="fraction">
                <span>${numerator2}</span>
                <span>─</span>
                <span>${denominator2}</span>
            </div>
        </div>
    `;

    // Reset the initial question
    document.getElementById('current-question').innerHTML = 'What is the Least Common Multiple (LCM) of the denominators?';

    // Restore the LCM input
    document.getElementById('input-container').innerHTML = `
        <input type="number" id="user-input" placeholder="Enter the LCM">
        <button onclick="checkAnswer()">Check</button>
    `;

    // Clear feedback messages
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('homogeneous-display').innerHTML = '';

    // Calculate the LCM
    lcm = calculateLCM(denominator1, denominator2);
}

function calculateLCM(a, b) {
    let max = Math.max(a, b);
    while (true) {
        if (max % a === 0 && max % b === 0) return max;
        max++;
    }
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('user-input').value);
    const feedback = document.getElementById('feedback');
    const fractionDisplay = document.getElementById('fraction-display');
    const question = document.getElementById('current-question');
    const inputContainer = document.getElementById('input-container');

    if (userAnswer === lcm) {
        feedback.innerHTML = 'Correct!';
        feedback.style.color = '#28a745';

        // Show homogeneous fractions while maintaining the previous format
        fractionDisplay.innerHTML = `
            <div class="fraction-container">
                <div class="fraction">
                    <span>( )</span>
                    <span>─</span>
                    <span>( )</span>
                </div>
                <div class="fraction">
                    <span>${numerator1}</span>
                    <span>─</span>
                    <span>${denominator1}</span>
                </div>
                <div class="operation">
                    <span>${operation}</span>
                </div>
                <div class="fraction">
                    <span>${numerator2}</span>
                    <span>─</span>
                    <span>${denominator2}</span>
                </div>
                <div class="fraction">
                    <span>( )</span>
                    <span>─</span>
                    <span>( )</span>
                </div>
            </div>
            <div class="operation">
                <span>=</span>
            </div>
            <div class="fraction-container">
                <div class="fraction">
                    <span>( )</span>
                    <span>─</span>
                    <span>${lcm}</span>
                </div>
                <div class="operation">
                    <span>${operation}</span>
                </div>
                <div class="fraction">
                    <span>( )</span>
                    <span>─</span>
                    <span>${lcm}</span>
                </div>
            </div>
        `;

        // Change the question
        question.innerHTML = 'What is the factor to multiply the numerator and denominator of the first fraction to match the LCM?';

        // Change the input for the factor
        inputContainer.innerHTML = `
            <input type="number" id="factor-input" placeholder="Enter the factor">
            <button onclick="checkFirstFractionFactor()">Check</button>
        `;
    } else {
        attempts--;
        if (attempts > 0) {
            feedback.innerHTML = `Incorrect. You have ${attempts} attempts left.`;
            feedback.style.color = '#dc3545';
        } else {
            feedback.innerHTML = `Incorrect. The correct LCM was ${lcm}. Start a new operation.`;
            feedback.style.color = '#dc3545';
            document.getElementById('user-input').disabled = true; // Disable input
        }
    }
}

function checkFirstFractionFactor() {
    const factor = parseInt(document.getElementById('factor-input').value);
    const expectedFactor = lcm / denominator1;
    const feedback = document.getElementById('feedback');

    if (factor === expectedFactor) {
        const numeratorFactor = document.querySelector('#fraction-display .fraction-container:nth-child(1) .fraction span:nth-child(1)');
        const denominatorFactor = document.querySelector('#fraction-display .fraction-container:nth-child(1) .fraction span:nth-child(3)');

        numeratorFactor.innerHTML = `(${factor})`;
        denominatorFactor.innerHTML = `(${factor})`;

        feedback.innerHTML = 'Correct! The factor has been applied successfully.';
        feedback.style.color = '#28a745';

        // Change the question about the second fraction
        document.getElementById('current-question').innerHTML = 'What is the factor to multiply the numerator and denominator of the second fraction to match the LCM?';

        // Change the input for the second factor
        document.getElementById('input-container').innerHTML = `
            <input type="number" id="second-factor-input" placeholder="Enter the factor">
            <button onclick="checkSecondFractionFactor()">Check</button>
        `;
    } else {
        feedback.innerHTML = 'Incorrect. Review the entered value.';
        feedback.style.color = '#dc3545';
    }
}

function checkSecondFractionFactor() {
    const factor = parseInt(document.getElementById('second-factor-input').value);
    const expectedFactor = lcm / denominator2;
    const feedback = document.getElementById('feedback');

    if (factor === expectedFactor) {
        const numeratorFactor = document.querySelector('#fraction-display .fraction-container:nth-child(1) .fraction:nth-child(5) span:nth-child(1)');
        const denominatorFactor = document.querySelector('#fraction-display .fraction-container:nth-child(1) .fraction:nth-child(5) span:nth-child(3)');

        numeratorFactor.innerHTML = `(${factor})`;
        denominatorFactor.innerHTML = `(${factor})`;

        feedback.innerHTML = 'Correct! The factor has been successfully applied to the second fraction.';
        feedback.style.color = '#28a745';

        // Change to the question about multiplying the numerator of the first fraction
        document.getElementById('current-question').innerHTML = 'What is the result of multiplying the numerator of the first fraction by its corresponding factor?';

        // Change the input for the numerator result
        document.getElementById('input-container').innerHTML = `
            <input type="number" id="first-numerator-result" placeholder="Enter the result">
            <button onclick="checkFirstNumeratorResult()">Check</button>
        `;
    } else {
        feedback.innerHTML = 'Incorrect. Review the entered value.';
        feedback.style.color = '#dc3545';
    }
}

function checkFirstNumeratorResult() {
    const userResult = parseInt(document.getElementById('first-numerator-result').value);
    const factor = lcm / denominator1; // Factor for the first fraction
    const expectedResult = numerator1 * factor; // Expected multiplication result
    const feedback = document.getElementById('feedback');

    if (userResult === expectedResult) {
        feedback.innerHTML = 'Correct! The result has been applied to the numerator of the first fraction.';
        feedback.style.color = '#28a745';

        // Dynamically select the parenthesis of the numerator in the fraction on the right side
        const resultNumerator = document.querySelector('#fraction-display .fraction-container:nth-child(3) .fraction:nth-child(1) span:nth-child(1)');
        resultNumerator.innerHTML = `(${userResult})`; // Place the result inside the parenthesis

        // Change to the question about multiplying the numerator of the second fraction
        document.getElementById('current-question').innerHTML = 'What is the result of multiplying the numerator of the second fraction by its corresponding factor?';

        // Change the input for the numerator result
        document.getElementById('input-container').innerHTML = `
            <input type="number" id="second-numerator-result" placeholder="Enter the result">
            <button onclick="checkSecondNumeratorResult()">Check</button>
        `;
    } else {
        feedback.innerHTML = 'Incorrect. Review the entered value.';
        feedback.style.color = '#dc3545';
    }
}

function checkSecondNumeratorResult() {
    const userResult = parseInt(document.getElementById('second-numerator-result').value);
    const factor = lcm / denominator2; // Factor for the second fraction
    const expectedResult = numerator2 * factor; // Expected multiplication result
    const feedback = document.getElementById('feedback');

    if (userResult === expectedResult) {
        feedback.innerHTML = 'Correct! The result has been applied to the numerator of the second fraction.';
        feedback.style.color = '#28a745';

        // Reflect the result in the numerator parenthesis of the second fraction on the right side
        const resultNumerator = document.querySelector('#fraction-display .fraction-container:nth-child(3) .fraction:nth-child(3) span:nth-child(1)');
        resultNumerator.innerHTML = `(${userResult})`; // Place the result inside the parenthesis

        // Modify fractionDisplay content to include the new set of fractions
        const fractionDisplay = document.getElementById('fraction-display');
        const term1 = numerator1 * (lcm / denominator1); // First term in the combined numerator
        const term2 = numerator2 * (lcm / denominator2); // Second term in the combined numerator
        const combinedNumerator = `${term1} ${operation} ${term2}`;

        fractionDisplay.innerHTML += `
            <div class="operation">
                <span>=</span>
            </div>
            <div class="fraction-container">
                <div class="fraction long">
                    <span class="numerator">${combinedNumerator}</span>
                    <span>────</span>
                    <span class="denominator">${lcm}</span>
                </div>
            </div>
            <div class="operation">
                <span>=</span>
            </div>
            <div class="fraction-container">
                <div class="fraction">
                    <span>( )</span>
                    <span>──</span>
                    <span>${lcm}</span>
                </div>
            </div>
        `;

        // Change the question for adding or subtracting the terms
        document.getElementById('current-question').innerHTML =
            `What is the result of the ${operation === '+' ? 'addition' : 'subtraction'} of the terms in the numerator?`;

        // Change the input for the operation result
        document.getElementById('input-container').innerHTML = `
            <input type="number" id="combined-numerator-result" placeholder="Enter the result">
            <button onclick="checkCombinedNumeratorResult(${term1}, ${term2}, '${operation}')">Check</button>
        `;
    } else {
        feedback.innerHTML = 'Incorrect. Review the entered value.';
        feedback.style.color = '#dc3545';
    }
}

function checkCombinedNumeratorResult(term1, term2, operation) {
    const userResult = parseInt(document.getElementById('combined-numerator-result').value);
    const feedback = document.getElementById('feedback');

    // Calculate the expected result based on the operation
    const expectedResult = operation === '+' ? term1 + term2 : term1 - term2;

    if (userResult === expectedResult) {
        // Remove the question and input
        document.getElementById('current-question').innerHTML = '';
        document.getElementById('input-container').innerHTML = '';

        // Show final feedback
        feedback.innerHTML = 'Correct! You have successfully operated on both fractions.';
        feedback.style.color = '#28a745';

        // Reflect the result in the final numerator
        const finalNumerator = document.querySelector('#fraction-display .fraction-container:nth-child(7) .fraction span:nth-child(1)');
        finalNumerator.innerHTML = `${userResult}`; // Place the final result inside the parenthesis
    } else {
        feedback.innerHTML = 'Incorrect. Review the entered value.';
        feedback.style.color = '#dc3545';
    }
}

// Start the exercise on page load
window.onload = startExercise;
