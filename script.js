document.addEventListener("DOMContentLoaded", function() {
    loadResearchData();
});

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

function loadResearchData() {
    fetch('research.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.research-container');
            data.publications.forEach(pub => {
                const pubDiv = document.createElement('div');
                pubDiv.className = 'research-item';
                const imageUrl = pub.image || 'icons/image_placeholder.png';
                pubDiv.innerHTML = `
                    <img src="${imageUrl}" alt="Research image"> <!-- Research image -->
                    <div class="research-item-content">
                        <h3>${pub.title}</h3>
                        <p><strong>Authors:</strong> ${pub.authors}</p>
                        <p>${pub.details}</p>
                        <a href="${pub.link}" target="_blank">Read More</a>
                    </div>
                `;
                container.appendChild(pubDiv);
            });
        })
        .catch(error => console.error('Error loading research data:', error));
}
