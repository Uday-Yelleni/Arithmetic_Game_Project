document.addEventListener('DOMContentLoaded', function() {
    let number_of_questions = document.getElementById('num-questions');
    
    let addCheckbox = document.getElementById('addition');
    let subCheckbox = document.getElementById('subtraction');
    let mulCheckbox = document.getElementById('multiplication');
    let divCheckbox = document.getElementById('division');
    
    let Min_digit = document.getElementById('min-digit');
    let Max_digit = document.getElementById('max-digit');

    let num_continue = document.getElementById('number_continue');
    let range_continue = document.getElementById('range_continue');
    let Start_game = document.getElementById('start_game');

    let settings_Container = document.getElementById('settings_container');
    let range_operand = document.getElementById('range_operand');
    let timer_container = document.getElementById('timer');

    let timer_yes = document.getElementById('timer_yes');
    let timer_no = document.getElementById('timer_no');

    let timer_yes_checked = document.getElementById('timer_yes_checked');
    let timer_input = document.getElementById('timer_seconds');

    let operations = [];
    let number_Questions;
    let minimum_operand, maximum_operand;
    let timer_seconds;

    // Function to start the quiz

    const start_game = () => {
        alert('Game starts in 3 seconds \nGood Luck!');
    }

    num_continue.addEventListener('click', function() {

        // Check for any type of errors that could form

        number_Questions = parseInt(number_of_questions.value);
        if (isNaN(number_Questions)) {
            alert('Please provide a number of questions');
            return;
        }

        // Reset operations array
        operations = [];
        
        if (addCheckbox.checked) operations.push('add');
        if (subCheckbox.checked) operations.push('sub');
        if (mulCheckbox.checked) operations.push('mul');
        if (divCheckbox.checked) operations.push('div');

        if (operations.length === 0) {
            alert('Please select at least one operation');
            return;
        }

        // Hide settings_Container and show range_operand
        settings_Container.hidden = true;
        range_operand.hidden = false;
    });

    range_continue.addEventListener('click', function() {
        minimum_operand = parseInt(Min_digit.value);
        if (isNaN(minimum_operand)) {
            alert('Please provide a minimum operand');
            return;
        }
        maximum_operand = parseInt(Max_digit.value);
        if (isNaN(maximum_operand)) {
            alert('Please provide a maximum operand');
            return;
        }
        else if (maximum_operand <= minimum_operand) {
            alert('Maximum operand must be greater than minimum operand');
            return;
        }

        range_operand.hidden = true;
        timer_container.hidden = false;
    }); 

    timer_yes.addEventListener('click', function() {
        timer_yes_checked.hidden = false;
    });
    
    timer_no.addEventListener('click', function() { 
        timer_yes_checked.hidden = true;
    });

    Start_game.addEventListener('click', function() {
        if (timer_yes.checked){
            if(timer_yes_checked.hidden === false) {
                timer_seconds = parseInt(timer_input.value);
                if (isNaN(timer_seconds)) {
                    alert('Please provide a number of seconds');
                    return;
                }
            }
        }
        else if (timer_no.checked) {
            timer_seconds = number_Questions * 10;
        }
        else {
            alert('Please select a timer option');
            return;
        }
        
        alert('Press OK to start the game\nGood Luck!');

        // Store values in localStorage
        localStorage.setItem('timer_seconds', timer_seconds);
        localStorage.setItem('number_questions', number_Questions);
        localStorage.setItem('min_digit', minimum_operand);
        localStorage.setItem('max_digit', maximum_operand);
        localStorage.setItem('operations', JSON.stringify(operations));

        location.href = 'Game.html';
    });

});
