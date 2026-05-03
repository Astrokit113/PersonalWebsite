document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const htmlElement = document.documentElement;

      if (htmlElement.style.colorScheme === 'dark') {
        htmlElement.style.colorScheme = 'light';
        localStorage.setItem('theme', 'light');
      } else {
        htmlElement.style.colorScheme = 'dark';
        localStorage.setItem('theme', 'dark');
      }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.style.colorScheme = savedTheme;
    }
  }
});
