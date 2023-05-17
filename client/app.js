export function getRepos(button, username) {
  button.addEventListener('click', () => {
    fetch(`http://localhost:3000/repos/${username.value}`)
      .then((response) => response.json())
      .then((data) => {
        const repos = data.repos
          .map(
            (repo) => `
              <p>
                <a target="_blank" href="https://github.com/${repo.username}/${repo.repo}">
                  ${repo.repo}
                </a>
              </p>`
          )
          .join('');

        document.querySelector('#repos').innerHTML = `
          ${data.username}'s repos:
          ${repos}
        `;
      });
  });
}
