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
     * Updates stat elements
     */
    function updateStatElement(selector, value) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.textContent = value;
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

            // Update the DOM elements
            updateStatElement('[data-stat="scholarships"]', formatCurrency(totalScholarships));
            updateStatElement('[data-stat="recipients"]', recipientsCount);
            updateStatElement('[data-stat="publications"]', publicationsCount);

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