var repos = ['hass', 'plantae', 'haos', 'motor-control'];

window.addEventListener('load', function () {
    const container = document.getElementById('grid');
    const status = document.getElementById('status');
    status.innerText = 'Loading...';
    /*repos.forEach(repo => {
        fetch(`https://api.github.com/repos/vitortavareso/${repo}`)
            .then(response => response.json())
            .then(data => {
                const card = document.createElement('section');
                card.className = 'card-project';

                const link = document.createElement('a');
                link.href = `https://github.com/VitorTavaresO/${repo}`;

                const image = document.createElement('img');
                image.src = `images/${repo}.png`;
                image.alt = repo;

                const name = document.createElement('h1');
                name.className = 'name';
                name.textContent = data.name;

                const description = document.createElement('p');
                description.className = 'description';
                description.textContent = data.description;

                link.appendChild(image);
                card.appendChild(link);
                card.appendChild(name);
                card.appendChild(description);
                container.appendChild(card);
            });
    });
    status.innerText = "";
    */
});