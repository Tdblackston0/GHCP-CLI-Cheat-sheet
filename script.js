/**
 * GitHub Copilot CLI Cheat Sheet - Interactive Features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initSearch();
    initCollapsibleSections();
    initCopyToClipboard();
    initBackToTop();
    initActiveNavHighlight();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('open');
            const isOpen = navList.classList.contains('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close nav when clicking a link (mobile)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav') && navList.classList.contains('open')) {
                navList.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/**
 * Search Functionality
 */
function initSearch() {
    const searchInput = document.getElementById('search');
    const clearBtn = document.getElementById('clear-search');
    const sections = document.querySelectorAll('.section');

    if (!searchInput || !clearBtn) return;

    let debounceTimer;

    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = this.value.toLowerCase().trim();
            filterContent(query, sections);
            clearBtn.classList.toggle('visible', query.length > 0);
        }, 200);
    });

    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        clearBtn.classList.remove('visible');
        filterContent('', sections);
        searchInput.focus();
    });

    // Handle keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Cmd/Ctrl + K to focus search
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
        // Escape to clear search
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            clearBtn.classList.remove('visible');
            filterContent('', sections);
            searchInput.blur();
        }
    });
}

function filterContent(query, sections) {
    let hasResults = false;
    let noResultsMsg = document.querySelector('.no-results');

    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        const sectionHeader = section.querySelector('.section-header');
        const sectionContent = section.querySelector('.section-content');

        if (query === '' || content.includes(query)) {
            section.style.display = 'block';
            hasResults = true;

            // Expand section if it matches and has content matching
            if (query !== '' && sectionContent && sectionHeader) {
                sectionContent.classList.remove('collapsed');
                sectionHeader.setAttribute('aria-expanded', 'true');
                sectionHeader.querySelector('.toggle-icon').textContent = '−';
            }

            // Highlight matching section
            if (query !== '') {
                section.classList.add('highlight');
            } else {
                section.classList.remove('highlight');
            }

            // Highlight matching text within tables
            highlightMatches(section, query);
        } else {
            section.style.display = 'none';
            section.classList.remove('highlight');
        }
    });

    // Show/hide no results message
    if (!hasResults && query !== '') {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results';
            noResultsMsg.innerHTML = `
                <div class="no-results-icon">🔍</div>
                <h3>No results found</h3>
                <p>Try a different search term</p>
            `;
            document.querySelector('.main-content').appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

function highlightMatches(section, query) {
    // Remove existing highlights
    section.querySelectorAll('.search-highlight').forEach(el => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
    });

    if (query === '') return;

    // Highlight matches in table cells (but not in code blocks)
    const tableCells = section.querySelectorAll('td');
    tableCells.forEach(cell => {
        // Skip cells that only contain code elements
        if (cell.children.length === 1 && cell.children[0].tagName === 'CODE') return;
        
        highlightTextNode(cell, query);
    });
}

function highlightTextNode(element, query) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    
    while (walker.nextNode()) {
        if (walker.currentNode.parentElement.tagName !== 'CODE' &&
            walker.currentNode.parentElement.tagName !== 'KBD') {
            textNodes.push(walker.currentNode);
        }
    }

    textNodes.forEach(node => {
        const text = node.textContent;
        const lowerText = text.toLowerCase();
        const index = lowerText.indexOf(query);
        
        if (index !== -1) {
            const before = text.substring(0, index);
            const match = text.substring(index, index + query.length);
            const after = text.substring(index + query.length);
            
            const fragment = document.createDocumentFragment();
            if (before) fragment.appendChild(document.createTextNode(before));
            
            const highlight = document.createElement('span');
            highlight.className = 'search-highlight';
            highlight.style.backgroundColor = 'rgba(56, 139, 253, 0.4)';
            highlight.style.borderRadius = '2px';
            highlight.style.padding = '0 2px';
            highlight.textContent = match;
            fragment.appendChild(highlight);
            
            if (after) fragment.appendChild(document.createTextNode(after));
            
            node.parentNode.replaceChild(fragment, node);
        }
    });
}

/**
 * Collapsible Sections
 */
function initCollapsibleSections() {
    const sectionHeaders = document.querySelectorAll('.section-header');

    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            toggleSection(this);
        });

        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSection(this);
            }
        });
    });
}

function toggleSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    const isExpanded = header.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
        content.classList.add('collapsed');
        header.setAttribute('aria-expanded', 'false');
        icon.textContent = '+';
    } else {
        content.classList.remove('collapsed');
        header.setAttribute('aria-expanded', 'true');
        icon.textContent = '−';
    }
}

/**
 * Copy to Clipboard
 */
function initCopyToClipboard() {
    const copyableElements = document.querySelectorAll('.copyable');
    const toast = document.getElementById('copy-toast');

    copyableElements.forEach(element => {
        element.addEventListener('click', async function(e) {
            e.stopPropagation();
            const text = this.textContent.trim();
            
            try {
                await navigator.clipboard.writeText(text);
                showCopyFeedback(this, toast);
            } catch (err) {
                // Fallback for older browsers
                fallbackCopy(text);
                showCopyFeedback(this, toast);
            }
        });

        // Add keyboard support
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        element.setAttribute('aria-label', 'Click to copy: ' + element.textContent.trim());
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

function showCopyFeedback(element, toast) {
    // Visual feedback on the element
    element.classList.add('copied');
    setTimeout(() => element.classList.remove('copied'), 1000);

    // Show toast notification
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Active Navigation Highlight
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveNav(id, navLinks);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

function updateActiveNav(activeId, navLinks) {
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#' + activeId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Keyboard Navigation Enhancements
 */
document.addEventListener('keydown', function(e) {
    // Arrow key navigation between sections
    if (e.altKey) {
        const sections = Array.from(document.querySelectorAll('.section'));
        const currentSection = document.querySelector('.section.highlight') || 
                             sections.find(s => s.getBoundingClientRect().top > 0);
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const currentIndex = sections.indexOf(currentSection);
            const nextSection = sections[Math.min(currentIndex + 1, sections.length - 1)];
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const currentIndex = sections.indexOf(currentSection);
            const prevSection = sections[Math.max(currentIndex - 1, 0)];
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
});
