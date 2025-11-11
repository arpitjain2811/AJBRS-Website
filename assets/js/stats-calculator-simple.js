/**
 * Simplified Stats Calculator for AJBRS Website
 * GitHub Pages compatible version
 */

(function() {
    'use strict';

    const SCHOLARSHIP_AMOUNT = 10000; // ₹10,000 per scholarship

    /**
     * Fetches content from a URL
     */
    async function fetchContent(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            return null;
        }
    }

    /**
     * Counts list items in HTML content
     */
    function countListItems(htmlContent) {
        if (!htmlContent) return 0;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        
        // Look for the main content area
        const main = tempDiv.querySelector('main') || tempDiv.querySelector('.container-md') || tempDiv;
        const listItems = main.querySelectorAll('li');
        
        return listItems.length;
    }

    /**
     * Formats currency in Indian Rupee format
     */
    function formatCurrency(amount) {
        if (amount >= 100000) {
            return '₹' + (amount / 1000).toFixed(0) + 'K';
        }
        return '₹' + amount.toLocaleString('en-IN');
    }

    /**
     * Animates a number counter with enhanced effects
     */
    function animateCounterWithEffects(element, targetValue) {
        // Store the original target value
        element.dataset.target = targetValue;
        
        // Extract numeric value and format components
        const numericValue = parseInt(String(targetValue).replace(/[^0-9]/g, '')) || 0;
        const prefix = String(targetValue).match(/^[^\d]*/) ? String(targetValue).match(/^[^\d]*/)[0] : '';
        const suffix = String(targetValue).match(/\d+(.*)$/) ? String(targetValue).match(/\d+(.*)$/)[1] : '';
        
        // Animation parameters
        const duration = 2500; // 2.5 seconds
        const fps = 60;
        const totalFrames = Math.floor(duration / 1000 * fps);
        const easeOutQuart = t => 1 - Math.pow(1 - t, 4); // Smooth easing function
        
        let currentFrame = 0;
        element.textContent = prefix + '0' + suffix; // Start from 0
        
        const animate = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.floor(easedProgress * numericValue);
            
            // Add some visual flair
            element.style.transform = `scale(${1 + Math.sin(progress * Math.PI) * 0.05})`;
            element.textContent = prefix + currentValue.toLocaleString() + suffix;
            
            if (currentFrame < totalFrames) {
                requestAnimationFrame(animate);
            } else {
                // Final cleanup
                element.textContent = targetValue;
                element.style.transform = 'scale(1)';
                element.classList.add('counter-complete');
            }
        };
        
        // Add loading class for visual feedback
        element.classList.add('counter-animating');
        
        // Start animation
        requestAnimationFrame(animate);
    }

    /**
     * Updates stat elements with optional animation
     */
    function updateStatElement(selector, value, animate = false) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (animate) {
                // Use intersection observer to trigger animation when visible
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                            entry.target.classList.add('counted');
                            animateCounterWithEffects(entry.target, value);
                            observer.unobserve(entry.target); // Only animate once
                        }
                    });
                }, { 
                    threshold: 0.3,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                observer.observe(element);
            } else {
                element.textContent = value;
            }
        });
    }

    /**
     * Main function to calculate and update stats
     */
    async function calculateStats() {
        try {
            // Determine base URL - works for both local development and GitHub Pages
            const isGitHubPages = window.location.hostname.includes('github.io');
            const baseUrl = isGitHubPages 
                ? window.location.origin + '/AJBRS-Website'  // GitHub Pages format
                : window.location.origin;  // Local development
            
            // Fetch both pages
            const [recipientsContent, publicationsContent] = await Promise.all([
                fetchContent(`${baseUrl}/past_recipients/`),
                fetchContent(`${baseUrl}/publications/`)
            ]);

            // Calculate stats
            const recipientsCount = countListItems(recipientsContent);
            const publicationsCount = countListItems(publicationsContent);
            const totalScholarships = publicationsCount * SCHOLARSHIP_AMOUNT;

            // Update the DOM elements with animations
            updateStatElement('[data-stat="scholarships"]', formatCurrency(totalScholarships), true);
            updateStatElement('[data-stat="recipients"]', recipientsCount, true);
            updateStatElement('[data-stat="publications"]', publicationsCount, true);

            console.log('Stats updated:', {
                recipients: recipientsCount,
                publications: publicationsCount,
                scholarships: formatCurrency(totalScholarships)
            });

        } catch (error) {
            console.error('Error calculating stats:', error);
            
            // Fallback to hardcoded values
            updateStatElement('[data-stat="scholarships"]', '₹100K');
            updateStatElement('[data-stat="recipients"]', '13');
            updateStatElement('[data-stat="publications"]', '10');
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', calculateStats);
    } else {
        calculateStats();
    }
})();