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

document.addEventListener('click', clickRemove);

function clickRemove(event) {
    let isClickInsideCard = false;
    const cards = document.querySelectorAll('.card-copy');
    cards.forEach(card => {
        if (card.contains(event.target)) {
            isClickInsideCard = true;
        }
    });

    if (!isClickInsideCard) {
        cards.forEach(card => card.remove());
    }
}

function addCopyOnClick(inputElement) {
    inputElement.addEventListener('click', function (event) {
        navigator.clipboard.writeText(inputElement.value);

        const tooltip = document.createElement('span');
        tooltip.innerText = 'Copiado!';
        tooltip.style.position = 'absolute';
        tooltip.style.zIndex = '2';
        tooltip.style.background = 'black';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.fontSize = '12px';
        tooltip.style.top = `${event.clientY + 170}px`;
        tooltip.style.left = `${event.clientX}px`;

        document.body.appendChild(tooltip);

        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    });
}

function copyContent(event) {
    event.stopPropagation();

    const existingCard = document.querySelector('.card-copy');
    if (existingCard) {
        existingCard.remove();
    }

    const card = document.createElement('div');
    card.className = 'card-copy';
    card.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    const containerGithub = document.createElement('div');
    const iconGithub = document.createElement('i');
    iconGithub.className = 'devicon-github-plain icon-input-copy';
    const inputGithub = document.createElement('input');
    inputGithub.value = document.getElementById('github').dataset.value;
    inputGithub.setAttribute('readonly', true);
    inputGithub.className = 'input-read-only';
    containerGithub.appendChild(iconGithub);
    containerGithub.appendChild(inputGithub);
    addCopyOnClick(inputGithub);

    const containerLinkedin = document.createElement('div');
    const iconLinkedin = document.createElement('i');
    iconLinkedin.className = 'devicon-linkedin-plain icon-input-copy';

    const inputLinkedin = document.createElement('input');
    inputLinkedin.value = document.getElementById('linkedin').dataset.value;
    inputLinkedin.setAttribute('readonly', true);
    inputLinkedin.className = 'input-read-only';
    containerLinkedin.appendChild(iconLinkedin);
    containerLinkedin.appendChild(inputLinkedin);
    addCopyOnClick(inputLinkedin);

    const containerWpp = document.createElement('div');
    const iconWpp = document.createElement('i');
    iconWpp.className = 'fi fi-brands-whatsapp icon-input-copy';
    const inputWpp = document.createElement('input');
    inputWpp.value = document.getElementById('wpp').dataset.value;
    inputWpp.setAttribute('readonly', true);
    inputWpp.className = 'input-read-only';
    containerWpp.appendChild(iconWpp);
    containerWpp.appendChild(inputWpp);
    addCopyOnClick(inputWpp);

    card.appendChild(containerGithub);
    card.appendChild(containerLinkedin);
    card.appendChild(containerWpp);

    document.body.appendChild(card);

    card.style.position = 'absolute';
    card.style.left = `${event.clientX - 200}px`;
    card.style.top = `${event.clientY - 75}px`;
}