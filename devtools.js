let genVector = document.getElementById('genVector');
if (genVector) {
    genVector.addEventListener('submit', function(event) {
        event.preventDefault();

        let size = parseInt(document.getElementById('size').value);
        let decimalCheckbox = document.getElementById('decimal');
        let min = parseFloat(document.getElementById('min').value);
        let max = parseFloat(document.getElementById('max').value);
        let isDecimal = decimalCheckbox.checked;

        let numbers = [];
        for (let i = 0; i < size; i++) {
            if (isDecimal) {
                numbers.push((Math.random() * (max - min) + min).toFixed(2));
            } else {
                numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
            }
        }

        let vector = document.getElementById('vector');
        vector.innerHTML = numbers.join(', ');
        vector.style.display = 'block';
    });
}




let vectorInfo = document.getElementById('vectorInfo');
if (vectorInfo) {
    vectorInfo.addEventListener('submit', function(event) {
        event.preventDefault();

        let numbersTextArea = document.getElementById('numbers');
        let numbersString = numbersTextArea.value;

        let numbersArray = numbersString.split(',');

        let numbers = numbersArray.map(function(num) {
            return parseFloat(num.trim());
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

        let variance = 0;
        let varianceSum = 0;
        numbers.forEach(function(num) {
            varianceSum += Math.pow(num - average, 2);
        });
        variance = varianceSum / numbers.length;

        let standardDeviation = Math.sqrt(variance);

        let coefficientOfVariation = (standardDeviation / average) * 100;

        let results = document.getElementById('results');
        results.innerHTML = `
            <p><strong>Vetor Ordenado:</strong> ${numbers.join(', ')}</p>
            <p><strong>Média:</strong> ${average}</p>
            <p><strong>Mediana:</strong> ${median}</p>
            <p><strong>Variância:</strong> ${variance}</p>
            <p><strong>Desvio Padrão:</strong> ${standardDeviation}</p>
            <p><strong>Coeficiente de Variação:</strong> ${coefficientOfVariation.toFixed(2)}%</p>
        `;

        results.style.display = 'block';
        

    })
}
