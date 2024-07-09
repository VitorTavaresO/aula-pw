document.addEventListener('DOMContentLoaded', function () {
    const theme = localStorage.getItem('theme');
    if (theme) {
        document.body.setAttribute('data-theme', theme);
    }
    showNavbar();
    localization();
});

function showNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });
}

function localization() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(position);
            fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`).then(response => response.json()).then(data => {
                const localization = data.region || data.city || `${latitude}, ${longitude}`;
            }).catch(error => {
                console.log("Error: ", error);
            });
        }
        )
    }
}

function navbarEnable() {
    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

function changeTheme() {
    const theme = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
}

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

                link.appendChild(card);
                container.appendChild(link);
            });
    });
    status.innerText = "";
});