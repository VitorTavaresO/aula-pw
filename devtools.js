let form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let numbersTextArea = document.getElementById('numbers');
        let numbersString = numbersTextArea.value;

        let numbersArray = numbersString.split(',');

        let numbers = numbersArray.map(function(num) {
            return parseInt(num.trim());
        });
        
        numbers.sort(function(a, b) {
            return a - b;
        }
        );
        
        let sum = numbers.reduce(function(a, b) {
            return a + b;
        } 
        );

        let average = sum / numbers.length;

        let median = 0;
        if (numbers.length % 2 === 0) {
            let middle = numbers.length / 2;
            median = (numbers[middle - 1] + numbers[middle]) / 2;
        } else {
            let middle = Math.floor(numbers.length / 2);
            median = numbers[middle];
        }

        let results = document.getElementById('results');
        results.innerHTML = `
            <p><strong>Vetor Ordenado:</strong> ${numbers.join(', ')}</p>
            <p><strong>Média:</strong> ${average}</p>
            <p><strong>Mediana:</strong> ${median}</p>
        `;

        results.style.display = 'block';
        

    })
}
