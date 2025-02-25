// Unified JavaScript code for all pages
document.addEventListener("DOMContentLoaded", function() {
    // Initialize particles.js
    initParticles();
    
    // Determine which page we're on and set up appropriate functionality
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    // Pages specific initialization
    if (page === "index.html" || page === "" || page === "/") {
        // Home page - About tab is default
        document.getElementById("About").style.display = "block";
    } else if (page === "projects.html") {
        // Projects page
        loadProjects();
    } else if (page.startsWith("project") && page.endsWith(".html")) {
        // Individual project page
    }
});

// Initialize particles.js with consistent settings
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#60a5fa' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#60a5fa',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
            },
            retina_detect: true
        });
    }
}

// Navigation between tabs
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    if (evt) {
        evt.currentTarget.className += " active";
    } else {
        // Try to find the button for this tab and make it active
        var buttons = document.querySelectorAll('.tab button');
        for (i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent.trim() === tabName) {
                buttons[i].className += " active";
                break;
            }
        }
    }
}

// Projects data - consolidated from research.json
const projectsData = {
    "publications": [
        {
            "title": "Bioinformatics for Ukraine",
            "authors": "Matvii Mykhailichenko, Dariia Nishchenko, Nadiia Kasianchuk",
            "summary": "",
            "link": "project1.html",
            "details": "Supporting Ukraine through bioinformatics education and research",
            "image": "Projects/project1/icon.jpg"
        },
        {
            "title": "Developing a WES pipeline for reproduction medicine",
            "authors": "M. Mykhailichenko",
            "summary": "",
            "link": "project2.html",
            "details": "Contract, Leogene (Lviv, Ukraine)",
            "image": "Projects/project4/icon.jpg"
        },
        {
            "title": "Assembling snail genomes",
            "authors": "M. Mykhailichenko",
            "summary": "",
            "link": "project3.html",
            "details": "Bachelor thesis, University of Wroclaw",
            "image": "Projects/project3/icon.jpg"
        },
        {
            "title": "Scrutinised and Compared: HVG Identification Methods in Terms of Common Metrics",
            "authors": "Nadiia Kasianchuk, Yevhenii Kukuruza, Vladyslav Ostash, Anastasiia Boshtova, Dmytro Tsvyk and Matvii Mykhailichenko",
            "summary": "",
            "link": "https://icaiit.org/proceedings/11th_ICAIIT_2/2_4_ICAIIT_Paper_2023(2)_Kasianchuk_28.pdf",
            "details": "Proceedings of International Conference on Applied Innovation in IT. Volume 11, Issue 2, pp. 59-65. (DOI:10.25673/112994). First and last author contributed equally.",
            "image": "Pictures/project1.png"
        },
        {
            "title": "Review of cuproptosis-related lncRNA's potential as cancer biomarkers",
            "authors": "Matvii Mykhailichenko, Nadiia Kasianchuk",
            "summary": "",
            "link": "Files/Poster2.pdf",
            "details": "Abstract book of the 9th International Student Congress, Graz, Austria.",
            "image": "Pictures/project2.png"
        },
        {
            "title": "Designing a ceRNA Network and Discovering Hub Genes in Breast Cancer: A Comprehensive Approach",
            "authors": "M. Mykhailichenko, R. Dzykirba, V. Ostash, N. Kasianchuk",
            "summary": "",
            "link": "Files/Poster.pdf",
            "details": "In progress.",
            "image": "Pictures/project3.png"
        },
        {
            "title": "Developing Bioinformatics Capacities in Eastern Europe",
            "authors": "S. Mangul, N. Kasianchuk, M. Mykhailichenko, T. Oleksyk",
            "summary": "",
            "link": "",
            "details": "In progress.",
            "image": "/api/placeholder/400/300"
        }
    ]
};

// Function to create project cards
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const cardContent = `
        <a href="${project.link}">
            <img src="${project.image}" alt="${project.title}" class="project-image">
        </a>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-authors">${project.authors}</p>
            <p class="project-details">${project.details}</p>
            ${project.link ? `
                <a href="${project.link}" class="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    View Details
                </a>
            ` : ''}
        </div>
    `;

    card.innerHTML = cardContent;
    return card;
}

// Function to load projects
function loadProjects() {
    const container = document.getElementById('projects-container');
    if (container) {
        container.innerHTML = ''; // Clear any existing content or loader

        projectsData.publications.forEach(project => {
            container.appendChild(createProjectCard(project));
        });
    }
}

// Function to navigate back from project pages
function goBack() {
    window.location.href = 'projects.html';
}
