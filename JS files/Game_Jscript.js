document.addEventListener('DOMContentLoaded', () => {
    const num1Element = document.getElementById('num1');
    const num2Element = document.getElementById('num2');
    const operandElement = document.getElementById('operand');
    const userAnswerElement = document.getElementById('userAnswer');
    const resultElement = document.getElementById('result');
    const crctResponseElement = document.getElementById('crctresponse');
    const flseResponseElement = document.getElementById('flseresponse');
    const checkAnswerButton = document.getElementById('checkAnswer');
    const nextProblemButton = document.getElementById('nextProblem');
    const submitButton = document.getElementById('submit');
    const timerElement = document.getElementById('timer'); // Assuming you have an element to display the timer

    let correctResponses = 0;
    let wrongResponses = 0;
    let currentQuestion = 1;
    let startTime;

    const timerSeconds = parseInt(localStorage.getItem('timer_seconds'));
    const numberQuestions = parseInt(localStorage.getItem('number_questions'));
    const minDigit = parseInt(localStorage.getItem('min_digit'));
    const maxDigit = parseInt(localStorage.getItem('max_digit'));
    const operations = JSON.parse(localStorage.getItem('operations'));

    function generateProblem() {
        const num1 = Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit;
        const num2 = Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit;
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        num1Element.textContent = num1;
        num2Element.textContent = num2;
        operandElement.textContent = operation === 'add' ? '+' : operation === 'sub' ? '-' : operation === 'mul' ? '*' : '/';
        userAnswerElement.value = '';
        resultElement.textContent = '';
    }

    function checkAnswer() {
        const num1 = parseInt(num1Element.textContent);
        const num2 = parseInt(num2Element.textContent);
        const userAnswer = parseInt(userAnswerElement.value);
        const operation = operandElement.textContent;
        let correctAnswer;

        switch (operation) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                correctAnswer = num1 - num2;
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
            case '/':
                correctAnswer = num1 / num2;
                break;
        }

        if (userAnswer === correctAnswer) {
            resultElement.textContent = 'Correct!';
        } else {
            resultElement.textContent = `Wrong! The correct answer was ${correctAnswer}`;
        }

        userAnswerElement.disabled = true;  
        checkAnswerButton.disabled = true;
    }

    function nextProblem() {
        userAnswerElement.disabled = false;
        checkAnswerButton.disabled = false;
        const num1 = parseInt(num1Element.textContent);
        const num2 = parseInt(num2Element.textContent);
        const userAnswer = parseInt(userAnswerElement.value);
        const operation = operandElement.textContent;
        let correctAnswer;

        switch (operation) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                correctAnswer = num1 - num2;
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
            case '/':
                correctAnswer = num1 / num2;
                break;
        }

        if (userAnswer === correctAnswer) {
            correctResponses++;
        } else {
            wrongResponses++;
        }

        crctResponseElement.textContent = correctResponses;
        flseResponseElement.textContent = wrongResponses;

        if (currentQuestion < numberQuestions -1) {
            currentQuestion++;
            generateProblem();
        } else {
            nextProblemButton.hidden = true;
            submitButton.hidden = false;
            calculateTimeTaken();
        }
    }

    function startTimer(timerSeconds) {
        let timer = timerSeconds, minutes, seconds;
        const interval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timerElement.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(interval);
                location.href = 'Results.html';
            }
        }, 1000);
    }

    function calculateTimeTaken() {
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - startTime) / 1000); // time taken in seconds
        localStorage.setItem('timeTaken', timeTaken);
    }

    checkAnswerButton.addEventListener('click', checkAnswer);
    nextProblemButton.addEventListener('click', nextProblem);

    generateProblem();
    startTime = new Date(); // Record the start time
    startTimer(timerSeconds);

    submitButton.addEventListener('click', function() {
        calculateTimeTaken();
        localStorage.setItem('correctResponses', correctResponses);
        localStorage.setItem('wrongResponses', wrongResponses);
        location.href = 'Results.html';
    });

    
});