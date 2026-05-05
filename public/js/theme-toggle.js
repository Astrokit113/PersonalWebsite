document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const root = document.documentElement;

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    htmlElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new CustomEvent('themechanged', { detail: { theme } }));

    if (theme === 'dark') {
      document.body.style.backgroundColor = '#1a1818';
      document.body.style.color = '#ecdddd';
      // Update blog CSS variables for dark theme
      root.style.setProperty('--post-bg', '#470a0a');
      root.style.setProperty('--post-text', '#ffffff');
      root.style.setProperty('--post-header-text', '#DA587E');
      root.style.setProperty('--border-color', '#b21c0e');
      root.style.setProperty('--border-shadow', '#470a0a');
      root.style.setProperty('--sidebar-text', '#ffffff');
      root.style.setProperty('--sidebar-bg', '#b21c0e');
      root.style.setProperty('--sidebar-button-bg', '#470a0a');
      root.style.setProperty('--sidebar-button-text', '#ffffff');
      root.style.setProperty('--pinned-text', '#ffffff');
      root.style.setProperty('--pinned-bg', '#c70e0e');
      root.style.setProperty('--button-text', '#ffffff');
    } else {
      document.body.style.backgroundColor = '#f7f3f3';
      document.body.style.color = '#1f1c1c';
      // Update blog CSS variables for light theme
      root.style.setProperty('--post-bg', '#FFE1C6');
      root.style.setProperty('--post-text', '#1f1c1c');
      root.style.setProperty('--post-header-text', '#b21c0e');
      root.style.setProperty('--border-color', '#DA587E');
      root.style.setProperty('--border-shadow', '#FFE1C6');
      root.style.setProperty('--sidebar-text', '#1f1c1c');
      root.style.setProperty('--sidebar-bg', '#FFE1C6');
      root.style.setProperty('--sidebar-button-bg', '#DA587E');
      root.style.setProperty('--sidebar-button-text', '#1f1c1c');
      root.style.setProperty('--pinned-text', '#1f1c1c');
      root.style.setProperty('--pinned-bg', '#FFE1C6');
      root.style.setProperty('--button-text', '#1f1c1c');
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      const currentTheme = htmlElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    });
  }

  initTheme();
});
