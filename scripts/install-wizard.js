(() => {
  const dialog = document.getElementById('install-wizard');
  const open = document.getElementById('install-wizard-open');
  if (!dialog || !open || typeof dialog.showModal !== 'function') return;

  const platform = dialog.querySelector('#wizard-platform');
  const terminalHelp = dialog.querySelector('#wizard-terminal-help');
  const install = dialog.querySelector('#wizard-install-command');
  const launch = dialog.querySelector('#wizard-launch-command');
  const status = dialog.querySelector('#wizard-status');
  const help = {
    mac: 'Press Command + Space, type Terminal, then press Return.',
    windows: 'Press Windows + X and choose Terminal, or search for PowerShell from Start.',
    linux: 'Press Ctrl + Alt + T, or open Terminal from your applications menu.',
  };

  function commands() {
    const source = document.querySelector(`[data-wizard-option="${platform.value}"]`) || document.querySelector('[data-wizard-option="all"]');
    if (!source) return { install: '', launch: '' };
    if (source.dataset.launch) return { install: source.textContent.trim(), launch: source.dataset.launch };
    const lines = source.textContent.trim().split('\n');
    const launchCommand = lines.pop();
    return { install: lines.join('\n'), launch: launchCommand };
  }

  function update() {
    const selected = commands();
    terminalHelp.textContent = help[platform.value];
    install.textContent = selected.install;
    launch.textContent = selected.launch;
    status.textContent = '';
  }

  async function copy(value, success) {
    try {
      await navigator.clipboard.writeText(value);
      status.textContent = success;
    } catch {
      status.textContent = 'Clipboard access was blocked. Select and copy the command shown above.';
    }
  }

  open.addEventListener('click', () => {
    const userPlatform = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase();
    platform.value = userPlatform.includes('win') ? 'windows' : userPlatform.includes('mac') ? 'mac' : 'linux';
    update();
    dialog.showModal();
    copy(install.textContent, 'Install command copied. Open your terminal and paste it.');
  });
  platform.addEventListener('change', update);
  dialog.querySelector('#wizard-copy-install').addEventListener('click', () => copy(install.textContent, 'Install command copied.'));
  dialog.querySelector('#wizard-copy-launch').addEventListener('click', () => copy(launch.textContent, 'Launch command copied.'));
  dialog.querySelector('#wizard-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
})();
