var form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var numbersTextArea = document.getElementById('numbers');
        var numbersString = numbersTextArea.value;

        var numbersArray = numbersString.split(',');

        var numbers = numbersArray.map(function(num) {
            return parseInt(num.trim());
        });
        
        numbers.sort(function(a, b) {
            return a - b;
        }
        );
        

        });
} else {
    console.error('Formulário não encontrado.');
};
