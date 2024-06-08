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
    evt.currentTarget.className += " active";
}

// Consolidate DOMContentLoaded into a single function
document.addEventListener("DOMContentLoaded", function() {
    // Load research data
    fetch('research.json')
    .then(response => response.json())
    .then(data => {
        const researchContainer = document.getElementById('Research');
        if (!researchContainer) {
            console.error('No element with ID "Research" found in the document.');
            return;
        }
        data.publications.forEach(pub => {
            const pubElement = document.createElement('div');
            pubElement.innerHTML = `<h3>${pub.title}</h3><p>${pub.authors}</p><p>${pub.summary}</p><a href="${pub.link}" target="_blank">Read More</a>`;
            researchContainer.appendChild(pubElement);
        });
    })
    .catch(error => console.error('Error loading research data:', error));

    // Load portfolio data
    fetch('portfolio.json')
    .then(response => response.json())
    .then(data => {
        const portfolioContainer = document.getElementById('Portfolio');
        if (!portfolioContainer) {
            console.error('No element with ID "Portfolio" found in the document.');
            return;
        }
        data.projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p><p>Technologies Used: ${project.technologies.join(', ')}</p>`;
            portfolioContainer.appendChild(projectElement);
        });
    })
    .catch(error => console.error('Error loading portfolio data:', error));

    // Simulate clicking the first tab to show the main content initially
    if (document.getElementsByClassName("tablinks").length > 0) {
        document.getElementsByClassName("tablinks")[0].click();
    } else {
        console.error('No tablinks found to simulate a click for the initial view.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
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
        evt.currentTarget.className += " active";
    }

    function loadResearch() {
        fetch('research.json')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('research-container');
                data.publications.forEach(pub => {
                    const pubDiv = document.createElement('div');
                    pubDiv.className = 'publication';

                    const pubTitle = document.createElement('h3');
                    pubTitle.textContent = pub.title;

                    const pubAuthors = document.createElement('p');
                    pubAuthors.textContent = pub.authors;

                    const pubLink = document.createElement('a');
                    pubLink.href = pub.link;
                    pubLink.textContent = "Download PDF";
                    pubLink.target = "_blank";

                    const pubDetails = document.createElement('p');
                    pubDetails.textContent = pub.details;

                    pubDiv.appendChild(pubTitle);
                    pubDiv.appendChild(pubAuthors);
                    pubDiv.appendChild(pubLink);
                    pubDiv.appendChild(pubDetails);
                    container.appendChild(pubDiv);
                });
            });
    }

    document.querySelector('.tablinks[onclick="openTab(event, \'Research\')"]').addEventListener('click', loadResearch);

    // Initialize the first tab
    document.querySelector('.tablinks').click();
});

