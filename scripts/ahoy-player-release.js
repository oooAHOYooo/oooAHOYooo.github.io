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
      const version = release.tag_name;
      const releaseUrl = release.html_url || fallbackRelease;
      const assets = release.assets || [];
      const cliAsset = assets.find(({ name }) => /^ahoy-player-terminal-\d+(?:\.\d+)*\.tgz$/.test(name));
      const guiAssets = assets.filter(({ name }) => /^ahoy-player-v\d+(?:\.\d+)*-(?:linux-x86_64\.tar\.gz|mac-(?:arm64|x86_64)\.zip)$/.test(name));

      if (cliAsset) {
        const command = `npm install --global ${cliAsset.browser_download_url}`;
        const productVersion = document.getElementById("cli-current-version");
        if (productVersion) productVersion.textContent = version;
        const downloadVersion = document.getElementById("cli-latest-version");
        if (downloadVersion) downloadVersion.textContent = `Latest: ${version}`;
        for (const id of ["cli-command", "cli-curl-command", "cli-npm-command"]) {
          const commandElement = document.getElementById(id);
          if (commandElement) commandElement.textContent = command;
        }
        const packageStatus = document.getElementById("cli-package-status");
        if (packageStatus) packageStatus.textContent = `GitHub release · ${version}`;
        for (const link of document.querySelectorAll("#cli-release-link")) link.href = releaseUrl;
      }

      const guiVersion = document.getElementById("player-current-version");
      if (guiVersion) guiVersion.textContent = `${version} · Current`;
      const playerRows = document.getElementById("player-current-body");
      if (playerRows && guiAssets.length) {
        playerRows.replaceChildren();
        for (const asset of guiAssets) {
          const match = asset.name.match(/-(linux-x86_64\.tar\.gz|mac-arm64\.zip|mac-x86_64\.zip)$/);
          if (!match || !asset.browser_download_url?.startsWith("https://github.com/oooAHOYooo/ahoy-player/releases/download/")) continue;
          const target = match[1];
          const platform = target.startsWith("linux") ? ["Linux", "x86_64"] : ["macOS", target.startsWith("mac-arm64") ? "Apple Silicon" : "Intel"];
          const cells = [platform[0], platform[1], asset.name, version, new Date(release.published_at).toLocaleDateString(), `${(asset.size / 1024 / 1024).toFixed(1)} MB`];
          const row = document.createElement("tr");
          row.dataset.platform = platform[0] === "macOS" ? "mac" : platform[0].toLowerCase();
          for (const value of cells) { const cell = document.createElement("td"); cell.textContent = value; row.append(cell); }
          const actionCell = document.createElement("td");
          const link = document.createElement("a");
          link.className = "btn-download";
          link.href = asset.browser_download_url;
          link.textContent = "Download";
          actionCell.append(link);
          row.append(actionCell);
          playerRows.append(row);
        }
      }
      for (const link of document.querySelectorAll("#player-release-link")) link.href = releaseUrl;
    } catch {
      // Static fallback content remains usable when the GitHub API is unavailable.
    }
  }

  updatePlayerRelease();
})();
