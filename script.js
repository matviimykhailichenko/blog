document.addEventListener("DOMContentLoaded", function() {
    // 1. Better page detection that works both on servers and local files
    const path = window.location.pathname;
    const isProjectsPage = path.includes("projects.html");

    if (isProjectsPage) {
        loadCombinedProjects();
    }
});

async function loadCombinedProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    // Remove the loader immediately to prevent "never-ending" spinning
    container.innerHTML = '';

    // 2. Load Local Data from research.json
    try {
        const response = await fetch('research.json');
        if (response.ok) {
            const data = await response.json();
            data.publications.forEach(project => {
                container.appendChild(createGHRepoCard(
                    project.title,
                    project.details,
                    "Research",
                    project.link,
                    true // Featured status
                ));
            });
        }
    } catch (e) {
        console.warn("Could not load research.json, skipping to GitHub fetch.");
    }

    // 3. Load GitHub Repositories
    try {
        // Adding a cache-buster or check to handle API limits gracefully
        const ghResponse = await fetch('https://api.github.com/search/issues?q=author:matviimykhailichenko+type:pr');

        if (!ghResponse.ok) {
            throw new Error('GitHub API Limit or Error');
        }

        const ghRepos = await ghResponse.json();
        ghRepos.forEach(repo => {
            if (!repo.fork) {
                container.appendChild(createGHRepoCard(
                    repo.name,
                    repo.description,
                    repo.language,
                    repo.html_url,
                    false
                ));
            }
        });
    } catch (error) {
        // Instead of a spinner, show a subtle notice if GitHub is down/limited
        const errorNotice = document.createElement('div');
        errorNotice.className = 'gh-limit-notice';
        errorNotice.innerHTML = `
            <p><i class="fa-solid fa-circle-info"></i> Note: Live GitHub repositories are temporarily unavailable due to API rate limits. Showing research archives only.</p>
        `;
        container.appendChild(errorNotice);
    }
}

// Refined card creator to match the GitHub style we built
function createGHRepoCard(title, desc, lang, link, isPinned) {
    const div = document.createElement('div');
    div.className = 'repo-item';

    // Language color mapping
    const colors = { 'Python': '#3572A5', 'R': '#198CE7', 'HTML': '#e34c26', 'Research': '#f78166' };
    const dotColor = colors[lang] || '#8b949e';

    div.innerHTML = `
        <div style="flex-grow: 1;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <a href="${link}" class="repo-title" target="_blank">${title}</a>
                <span class="gh-badge">${isPinned ? 'Featured' : 'Public'}</span>
            </div>
            <p class="repo-desc">${desc || "No description provided."}</p>
            <div class="repo-meta">
                <span><i class="fa-solid fa-circle" style="color: ${dotColor}; font-size: 10px;"></i> ${lang || 'Docs'}</span>
                ${isPinned ? '<span><i class="fa-regular fa-star"></i> Pinned</span>' : ''}
            </div>
        </div>
    `;
    return div;
}