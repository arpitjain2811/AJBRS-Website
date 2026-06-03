// AJBRS Website Custom JavaScript
// Modern implementation with enhanced interactions and animations

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initSmoothScroll();
  initDarkMode();
  initHoverEffects();
  initTimelineAnimation();
  initPublicationFilter();
  initLazyLoading();
  initMobileNavigation();
  initAccessibility();
});


// REMOVED: Duplicate animated counter function
// Using modern-interactions.js counter instead to avoid conflicts

// Enhanced Smooth Scrolling for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Calculate header height for accurate scrolling
      const headerHeight = document.querySelector('.navbar-custom').offsetHeight;
      
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight - 20,
        behavior: 'smooth'
      });
      
      // Update URL without page reload
      history.pushState(null, null, targetId);
    });
  });
}

// Modern Dark Mode Toggle with System Preference Detection
function initDarkMode() {
  // Create dark mode toggle button if it doesn't exist
  if (!document.getElementById('dark-mode-toggle')) {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    darkModeToggle.classList.add('dark-mode-toggle');

    // Add to the navbar nav list as a proper nav item
    const navList = document.querySelector('.navbar-custom .navbar-nav');
    if (navList) {
      const li = document.createElement('li');
      li.className = 'nav-item';
      li.appendChild(darkModeToggle);
      navList.appendChild(li);
    } else {
      const navEl = document.querySelector('.navbar-custom');
      if (navEl) navEl.appendChild(darkModeToggle);
    }
  }
  
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Check for saved user preference and system preference
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedMode = localStorage.getItem('darkMode');
  
  // Force navbar link visibility function
  function forceNavbarVisibility() {
    const currentSavedMode = localStorage.getItem('darkMode');
    const isDark = currentSavedMode === 'dark' ||
      (currentSavedMode === null && prefersDarkMode);
    const navLinks = document.querySelectorAll('.navbar .nav-link, .navbar-custom .nav-link');
    navLinks.forEach(link => {
      if (isDark) {
        link.style.setProperty('color', '#ffffff', 'important');
        link.style.setProperty('opacity', '1', 'important');
        link.style.setProperty('visibility', 'visible', 'important');
        link.style.setProperty('text-shadow', '0 0 1px rgba(255, 255, 255, 0.5)', 'important');
      } else {
        link.style.removeProperty('color');
        link.style.removeProperty('opacity');
        link.style.removeProperty('visibility');
        link.style.removeProperty('text-shadow');
      }
    });
  }
  
  // Initialize mode based on preference hierarchy:
  // 1. Saved user preference (highest priority)
  // 2. System preference (if no saved preference)
  // 3. Light mode default (if no system preference)
  
  if (savedMode === 'dark') {
    // User explicitly chose dark mode
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    darkModeToggle.setAttribute('aria-label', 'Switch to Light Mode');
  } else if (savedMode === 'light') {
    // User explicitly chose light mode
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
  } else {
    // No saved preference - respect system preference
    document.body.classList.remove('dark-mode', 'light-mode');
    if (prefersDarkMode) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      darkModeToggle.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      darkModeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
    }
  }
  
  // Force navbar visibility after initial setup
  setTimeout(forceNavbarVisibility, 100);
  
  // Toggle dark mode on click
  darkModeToggle.addEventListener('click', () => {
    const hasLightMode = document.body.classList.contains('light-mode');
    const hasDarkMode = document.body.classList.contains('dark-mode');
    
    if (hasLightMode || (!hasDarkMode && !prefersDarkMode)) {
      // Switch to dark mode
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'dark');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      darkModeToggle.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      // Switch to light mode
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('darkMode', 'light');
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      darkModeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
    }
    
    // Force navbar visibility after mode change
    setTimeout(forceNavbarVisibility, 50);
  });
  
  // Listen for system preference changes (only if no manual override)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === null) {
      // Only respond to system changes if user hasn't set a preference
      document.body.classList.remove('dark-mode', 'light-mode');
      if (e.matches) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeToggle.setAttribute('aria-label', 'Switch to Light Mode');
      } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
      }
      
      // Force navbar visibility after system preference change
      setTimeout(forceNavbarVisibility, 50);
    }
  });
}


// Enhanced Hover Effects
function initHoverEffects() {
  // Add hover effect to navbar links
  const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
  navLinks.forEach(link => {
    link.classList.add('hover-effect');
  });
  
  // Add hover effect to stat boxes
  const statBoxes = document.querySelectorAll('.stat-box');
  statBoxes.forEach(box => {
    box.classList.add('hover-effect');
  });
  
  // Add subtle hover animations to images
  document.querySelectorAll('img:not(.avatar-img)').forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.3s ease';
      this.style.transform = 'scale(1.02)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// Timeline Animation with Intersection Observer
function initTimelineAnimation() {
  const recipientsPage = document.querySelector('body.page-past_recipients');
  if (!recipientsPage) return;

  // The page content lives inside `<main class="container-md"><div class="row">
  // <div class="col-...">`. Scope ALL queries to this container so we never pick
  // up the navbar's or footer's <ul>/<h2> elements.
  const content = document.querySelector('main .row > div') ||
                  document.querySelector('main');
  if (!content) return;

  // Convert the existing content to a timeline if not already converted
  if (!content.querySelector('.timeline-container')) {
    const headings = content.querySelectorAll('h2');
    const lists = content.querySelectorAll('ul');

    if (headings.length === 0 || lists.length === 0) return;

    // Create timeline container
    const timelineContainer = document.createElement('div');
    timelineContainer.classList.add('timeline-container');

    // For each year, create a timeline entry
    for (let i = 0; i < headings.length; i++) {
      const year = headings[i].textContent;
      const recipients = lists[i];
      if (!recipients) continue;

      const timelineEntry = document.createElement('div');
      timelineEntry.classList.add('timeline-entry');

      const timelineYear = document.createElement('div');
      timelineYear.classList.add('timeline-year');
      timelineYear.textContent = year;

      const timelineContent = document.createElement('div');
      timelineContent.classList.add('timeline-content');
      timelineContent.appendChild(recipients.cloneNode(true));

      timelineEntry.appendChild(timelineYear);
      timelineEntry.appendChild(timelineContent);
      timelineContainer.appendChild(timelineEntry);
    }

    // Remove the original headings and lists, then add the timeline
    headings.forEach(heading => heading.remove());
    lists.forEach(list => list.remove());
    content.appendChild(timelineContainer);
  }

  // Add animation with Intersection Observer
  const timelineEntries = document.querySelectorAll('.timeline-entry');
  
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  timelineEntries.forEach(item => {
    observer.observe(item);
  });
}

// Enhanced Publication Filter/Search
function initPublicationFilter() {
  const publicationsPage = document.querySelector('body.page-publications');
  if (!publicationsPage) return;

  // Scope every query to the content column so the navbar/footer <ul>/<li>/<h2>
  // are never treated as publications (see note in initTimelineAnimation).
  const content = document.querySelector('main .row > div') ||
                  document.querySelector('main');
  if (!content) return;

  // Create filter container if it doesn't exist
  if (!content.querySelector('.publications-filter')) {
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('publications-filter');

    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search publications...';
    searchInput.classList.add('publication-search');

    // Create filter buttons
    const filterButtons = document.createElement('div');
    filterButtons.classList.add('filter-buttons');

    // Get all years from headings (content-scoped)
    const years = [];
    content.querySelectorAll('h2').forEach(heading => {
      years.push(heading.textContent.trim());
    });

    // Add "All" button
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.classList.add('active');
    allButton.addEventListener('click', () => filterPublications('all'));
    filterButtons.appendChild(allButton);

    // Add year buttons
    years.forEach(year => {
      const button = document.createElement('button');
      button.textContent = year;
      button.addEventListener('click', () => filterPublications(year));
      filterButtons.appendChild(button);
    });

    // Add search and filter to container
    filterContainer.appendChild(searchInput);
    filterContainer.appendChild(filterButtons);

    content.insertBefore(filterContainer, content.firstChild);
  }

  const searchInput = content.querySelector('.publication-search');
  if (!searchInput) return;

  // Enhanced search functionality with debounce
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = searchInput.value.toLowerCase();
      const publications = content.querySelectorAll('li');

      publications.forEach(pub => {
        const text = pub.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          pub.style.display = '';
          // Highlight matching text
          if (searchTerm.length > 0) {
            highlightText(pub, searchTerm);
          } else {
            // Remove highlights if search is cleared
            pub.innerHTML = pub.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/gi, '$1');
          }
        } else {
          pub.style.display = 'none';
        }
      });

      // Show/hide headings based on visible publications
      content.querySelectorAll('h2').forEach(heading => {
        const nextElement = heading.nextElementSibling;
        if (nextElement && nextElement.tagName === 'UL') {
          const visibleItems = nextElement.querySelectorAll('li:not([style*="display: none"])');
          heading.style.display = visibleItems.length > 0 ? '' : 'none';
        }
      });
    }, 300); // Debounce for 300ms
  });

  // Filter functionality
  function filterPublications(filter) {
    // Update active button
    content.querySelectorAll('.filter-buttons button').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === filter || (filter === 'all' && btn.textContent === 'All'));
    });

    // Clear search when filtering
    searchInput.value = '';

    // Remove any existing highlights
    content.querySelectorAll('mark.search-highlight').forEach(mark => {
      const parent = mark.parentNode;
      parent.innerHTML = parent.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/gi, '$1');
    });

    // Show/hide publications based on filter
    if (filter === 'all') {
      // Reset every element the year filter may have hidden — including the <ul>
      // wrappers (the year filter hides the <ul>, not just the <li>, so resetting
      // only h2/li would leave the lists' <ul> parents display:none).
      content.querySelectorAll('h2, ul, li').forEach(el => {
        el.style.display = '';
      });
    } else {
      content.querySelectorAll('h2').forEach(heading => {
        const isVisible = heading.textContent.trim() === filter;
        heading.style.display = isVisible ? '' : 'none';

        // Show/hide publications under this heading
        let nextElement = heading.nextElementSibling;
        while (nextElement && nextElement.tagName !== 'H2') {
          nextElement.style.display = isVisible ? '' : 'none';
          nextElement = nextElement.nextElementSibling;
        }
      });
    }
  }
  
  // Helper function to highlight search terms
  function highlightText(element, searchTerm) {
    // Remove existing highlights first
    const content = element.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/gi, '$1');

    // Escape special regex characters to prevent injection
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');

    element.innerHTML = content.replace(regex, '<mark class="search-highlight">$1</mark>');
  }
}

// Lazy Loading for Images
function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    document.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img:not([loading])');
    
    if (lazyImages.length === 0) return;
    
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.removeAttribute('data-src');
          }
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(lazyImage => {
      // Store original src in data-src and set a placeholder
      if (!lazyImage.dataset.src && lazyImage.src) {
        lazyImage.dataset.src = lazyImage.src;
        lazyImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3C/svg%3E';
      }
      lazyImageObserver.observe(lazyImage);
    });
  }
}

// Mobile Navigation Enhancements
// NOTE: Let Bootstrap own the show/hide of the collapse. We only add UX niceties
// (close on outside click, close after choosing a link). Earlier versions injected
// a global `.navbar-collapse { opacity: 0 }` rule which hid the entire navbar on
// desktop, because an expanded (navbar-expand-xl) menu never receives `.show`.
function initMobileNavigation() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (!navbarToggler || !navbarCollapse) return;

  // Only collapse if the toggler is actually visible (i.e. we're at a mobile width)
  const togglerVisible = () => navbarToggler.offsetParent !== null;

  // Close mobile menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (navbarCollapse.classList.contains('show') &&
        !navbarCollapse.contains(e.target) &&
        !navbarToggler.contains(e.target)) {
      navbarToggler.click();
    }
  });

  // Close mobile menu after a navigation link is chosen
  navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (togglerVisible() && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
  });
}

// Accessibility Improvements
function initAccessibility() {
  // Add skip to content link for keyboard users
  const skipLink = document.createElement('a');
  skipLink.href = '#content';
  skipLink.className = 'skip-to-content';
  skipLink.textContent = 'Skip to content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: white;
    padding: 8px 16px;
    z-index: 10000;
    transition: top 0.3s ease;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content ID if it doesn't exist
  const mainContent = document.querySelector('main') || document.querySelector('.container');
  if (mainContent && !mainContent.id) {
    mainContent.id = 'content';
  }
  
  // Links, buttons, and form fields are natively keyboard-focusable, so we do NOT
  // force tabindex on them (that only disrupts the natural tab order). We only
  // promote genuinely non-focusable interactive elements that opt in via [role].
  document.querySelectorAll('[role="button"]:not(a):not(button), [role="link"]:not(a)').forEach(el => {
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '0');
    }
  });
  
  // Add appropriate ARIA labels to elements that need them
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (!anchor.getAttribute('aria-label') && !anchor.textContent.trim()) {
      anchor.setAttribute('aria-label', 'Jump to ' + anchor.getAttribute('href').substring(1) + ' section');
    }
  });
}
