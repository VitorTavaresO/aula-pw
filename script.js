var repos = ['hass', 'arcade-ifpr', 'motor-control'];

window.addEventListener('load', function () {
    const container = document.getElementById('grid');
    const status = document.getElementById('status');
    status.innerText = 'Loading...';
    repos.forEach(repo => {
        fetch(`https://api.github.com/repos/vitortavareso/${repo}`)
            .then(response => response.json())
            .then(data => {
                const link = document.createElement('a');
                link.href = `https://github.com/VitorTavaresO/${repo}`;
                link.className = 'card-project';

                const card = document.createElement('section');

                const image = document.createElement('img');
                image.src = `images/${repo}.png`;
                image.alt = repo;

                const name = document.createElement('h1');
                name.className = 'name';
                name.textContent = data.name;

                const description = document.createElement('p');
                description.className = 'description';
                description.textContent = data.description;

                card.appendChild(image);
                card.appendChild(name);
                card.appendChild(description);

                link.appendChild(card); // Adiciona o card ao link
                container.appendChild(link);
            });
    });
    status.innerText = "";
});