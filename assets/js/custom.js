// AJBRS Website Custom JavaScript
// Adds modern dynamic elements and interactions

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all custom functionality
  initAnimatedCounters();
  initSmoothScroll();
  initDarkMode();
  initBackToTop();
  initHoverEffects();
  initTimelineAnimation();
  initPublicationFilter();
});

// Animated Statistics Counter
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length === 0) return;
  
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.innerText.replace(/[^\d]/g, ''));
        let count = 0;
        const duration = 2000; // 2 seconds
        const interval = duration / countTo;
        
        const counter = setInterval(() => {
          count++;
          // If the stat has a currency symbol, preserve it
          if (target.innerText.includes('₹')) {
            target.innerText = '₹' + count + 'K';
          } else {
            target.innerText = count;
          }
          
          if (count >= countTo) {
            clearInterval(counter);
          }
        }, interval);
        
        observer.unobserve(target);
      }
    });
  }, options);
  
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    });
  });
}

// Dark Mode Toggle
function initDarkMode() {
  // Create dark mode toggle button
  const darkModeToggle = document.createElement('button');
  darkModeToggle.id = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
  darkModeToggle.classList.add('dark-mode-toggle');
  
  // Add to the navbar
  const navbar = document.querySelector('.navbar-custom .container-fluid');
  if (navbar) {
    navbar.appendChild(darkModeToggle);
  }
  
  // Check for saved user preference
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedMode = localStorage.getItem('darkMode');
  
  // Apply dark mode if saved or preferred
  if (savedMode === 'dark' || (savedMode === null && prefersDarkMode)) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Toggle dark mode on click
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'dark');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem('darkMode', 'light');
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
}

// Back to Top Button
function initBackToTop() {
  // Create back to top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'back-to-top';
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.setAttribute('aria-label', 'Back to Top');
  backToTopBtn.classList.add('back-to-top');
  
  document.body.appendChild(backToTopBtn);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  // Scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Hover Effects for Links and Buttons
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
}

// Timeline Animation for Past Recipients
function initTimelineAnimation() {
  const recipientsPage = document.querySelector('body.page-past_recipients');
  if (!recipientsPage) return;
  
  // Convert the existing content to a timeline
  const headings = document.querySelectorAll('h2');
  const lists = document.querySelectorAll('ul');
  
  if (headings.length === 0 || lists.length === 0) return;
  
  // Create timeline container
  const timelineContainer = document.createElement('div');
  timelineContainer.classList.add('timeline-container');
  
  // For each year, create a timeline entry
  for (let i = 0; i < headings.length; i++) {
    const year = headings[i].textContent;
    const recipients = lists[i];
    
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
  
  // Replace the original content with the timeline
  const content = document.querySelector('.container .row .col-xl-8');
  if (content) {
    // Remove original headings and lists
    headings.forEach(heading => heading.remove());
    lists.forEach(list => list.remove());
    
    // Add the timeline
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

// Publication Filter/Search
function initPublicationFilter() {
  const publicationsPage = document.querySelector('body.page-publications');
  if (!publicationsPage) return;
  
  // Create filter container
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
  
  // Get all years from headings
  const years = [];
  document.querySelectorAll('h2').forEach(heading => {
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
  
  // Add filter container to page
  const content = document.querySelector('.container .row .col-xl-8');
  if (content) {
    content.insertBefore(filterContainer, content.firstChild);
  }
  
  // Search functionality
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const publications = document.querySelectorAll('li');
    
    publications.forEach(pub => {
      const text = pub.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        pub.style.display = '';
      } else {
        pub.style.display = 'none';
      }
    });
    
    // Show/hide headings based on visible publications
    document.querySelectorAll('h2').forEach(heading => {
      const nextElement = heading.nextElementSibling;
      if (nextElement && nextElement.tagName === 'UL') {
        const visibleItems = nextElement.querySelectorAll('li:not([style*="display: none"])');
        heading.style.display = visibleItems.length > 0 ? '' : 'none';
      }
    });
  });
  
  // Filter functionality
  function filterPublications(filter) {
    // Update active button
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === filter || (filter === 'all' && btn.textContent === 'All'));
    });
    
    // Show/hide publications based on filter
    if (filter === 'all') {
      document.querySelectorAll('h2, li').forEach(el => {
        el.style.display = '';
      });
    } else {
      document.querySelectorAll('h2').forEach(heading => {
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
}
