(() => {
  const repository = "oooAHOYooo/ahoy-player";
  const fallbackRelease = "https://github.com/oooAHOYooo/ahoy-player/releases/latest";

  async function updatePlayerRelease() {
    try {
      const response = await fetch(`https://api.github.com/repos/${repository}/releases/latest`, {
        headers: { Accept: "application/vnd.github+json" },
        cache: "no-store",
      });
      if (!response.ok) return;
      const release = await response.json();
      const asset = release.assets?.find(({ name }) => /^ahoy-player-terminal-\d+(?:\.\d+)*\.tgz$/.test(name));
      if (!asset) return;

      const version = release.tag_name;
      const command = `npm install --global ${asset.browser_download_url}`;
      const versionLabel = `Latest: ${version}`;

      const productVersion = document.getElementById("cli-current-version");
      if (productVersion) productVersion.textContent = version;

      const downloadVersion = document.getElementById("cli-latest-version");
      if (downloadVersion) downloadVersion.textContent = versionLabel;

      for (const id of ["cli-command", "cli-curl-command", "cli-npm-command"]) {
        const commandElement = document.getElementById(id);
        if (commandElement) commandElement.textContent = command;
      }

      const packageStatus = document.getElementById("cli-package-status");
      if (packageStatus) packageStatus.textContent = `GitHub release · ${version}`;

      for (const link of document.querySelectorAll("#cli-release-link")) {
        link.href = release.html_url || fallbackRelease;
      }
    } catch {
      // Static fallback content remains usable when the GitHub API is unavailable.
    }
  }

  updatePlayerRelease();
})();
