window.onload = function() {
    // Trigger the About tab to open when the page loads
    openTab(null, 'About');
};
document.addEventListener("DOMContentLoaded", function() {
    loadResearchData();
});

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    if (evt) {
        evt.currentTarget.className += " active";
    } else {
        document.querySelector(`.tablinks[onclick="openTab(event, '${tabName}')"]`).className += " active";
    }
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
