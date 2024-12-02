document.addEventListener('DOMContentLoaded', (event) => {
    const correctResponses = parseInt(localStorage.getItem('correctResponses'));
    const wrongResponses = parseInt(localStorage.getItem('wrongResponses'));
    const numberQuestions = parseInt(localStorage.getItem('number_questions'));
    const timerSeconds = parseInt(localStorage.getItem('timer_seconds'));

    const percentageCorrect = ((correctResponses / numberQuestions) * 100).toFixed(2);
    const timeTaken = parseInt(localStorage.getItem('timeTaken'));

    document.getElementById('correctResponses').textContent = correctResponses;
    document.getElementById('wrongResponses').textContent = wrongResponses;
    document.getElementById('percentageCorrect').textContent = percentageCorrect;
    document.getElementById('timeTaken').textContent = `${Math.floor(timeTaken / 60)}:${timeTaken % 60}`;
   
});
