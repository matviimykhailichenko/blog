document.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (page === "projects.html") {
        loadCombinedProjects();
    }
});

async function loadCombinedProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    // 1. Always load local research data first
    try {
        const response = await fetch('research.json');
        const data = await response.json();

        // Clear loader only when we have data to show
        container.innerHTML = '';

        data.publications.forEach(project => {
            const el = createGHRepoCard(
                project.title,
                project.details,
                "Research/Publication",
                project.link,
                true // Mark as "pinned" or special
            );
            container.appendChild(el);
        });
    } catch (e) {
        console.error("Local JSON failed to load", e);
    }

    // 2. Try to fetch GitHub Repos
    try {
        const ghResponse = await fetch('https://api.github.com/users/matviimykhailichenko/repos?sort=updated');
        if (!ghResponse.ok) throw new Error('API Limit');

        const ghRepos = await ghResponse.json();

        ghRepos.forEach(repo => {
            if (!repo.fork) {
                const el = createGHRepoCard(repo.name, repo.description, repo.language, repo.html_url, false);
                container.appendChild(el);
            }
        });
    } catch (error) {
        // If GitHub fails, we just add a small notice instead of replacing the whole screen
        const notice = document.createElement('div');
        notice.style.padding = "20px";
        notice.style.color = "#8b949e";
        notice.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Note: GitHub API rate limit reached. Live repositories hidden, showing archived projects only.`;
        container.appendChild(notice);
    }
}

function createGHRepoCard(title, desc, lang, link, isPinned) {
    const div = document.createElement('div');
    div.className = 'repo-item';
    div.innerHTML = `
        <div style="flex-grow: 1;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <a href="${link}" class="repo-title" target="_blank">${title}</a>
                ${isPinned ? '<span class="gh-badge">Public</span>' : ''}
            </div>
            <p class="repo-description">${desc || "No description provided."}</p>
            <div class="repo-meta">
                <span><i class="fa-solid fa-circle" style="color: ${getColor(lang)}; font-size: 10px;"></i> ${lang || 'Data'}</span>
                ${isPinned ? '<span><i class="fa-regular fa-star"></i> Featured</span>' : ''}
            </div>
        </div>
    `;
    return div;
}

function getColor(lang) {
    const colors = {
        'Python': '#3572A5',
        'R': '#198CE7',
        'HTML': '#e34c26',
        'JavaScript': '#f1e05a',
        'Research/Publication': '#f78166'
    };
    return colors[lang] || '#8b949e';
}