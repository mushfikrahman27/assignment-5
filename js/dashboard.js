// Dashboard functionality
let allIssues = [];
let currentFilter = 'all';

// Authentication functions (needed since login.js is not included)
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!checkAuth()) {
        console.log('User not authenticated, redirecting to login...');
        window.location.href = 'index.html';
        return;
    }

    console.log('User authenticated, initializing dashboard...');
    // Initialize dashboard
    initializeDashboard();
});

// Initialize dashboard
function initializeDashboard() {
    console.log('Initializing dashboard...');
    // Load all issues
    loadAllIssues();
    
    // Setup event listeners
    setupEventListeners();
    console.log('Dashboard initialized');
}

// Setup event listeners
function setupEventListeners() {
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const status = this.dataset.status;
            filterIssues(status);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', logoutUser);

    // Modal close
    const modal = document.getElementById('issueModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Load all issues
async function loadAllIssues() {
    try {
        console.log('Starting to load all issues...');
        showLoader();
        allIssues = await fetchAllIssues();
        console.log('Fetched issues:', allIssues);
        console.log('Number of issues:', allIssues.length);
        renderIssues(allIssues);
        updateIssueCount(allIssues.length);
    } catch (error) {
        console.error('Error loading issues:', error);
        showError('Failed to load issues. Please try again.');
    } finally {
        hideLoader();
    }
}

// Render issues
function renderIssues(issues) {
    console.log('Rendering issues:', issues);
    console.log('Number of issues to render:', issues.length);
    
    const container = document.getElementById('issuesContainer');
    const noResults = document.getElementById('noResults');
    
    if (issues.length === 0) {
        console.log('No issues to display');
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    const issuesHTML = issues.map(issue => createIssueCard(issue)).join('');
    console.log('Generated HTML length:', issuesHTML.length);
    container.innerHTML = issuesHTML;
    
    // Add click listeners to issue cards
    container.querySelectorAll('.issue-card').forEach(card => {
        card.addEventListener('click', function() {
            const issueId = this.dataset.issueId;
            openIssueModal(issueId);
        });
    });
    
    console.log('Issues rendered successfully');
}

// Create issue card HTML
function createIssueCard(issue) {
    const statusClass = issue.status?.toLowerCase() === 'open' ? 'open' : 'closed';
    const priorityBadge = getPriorityBadge(issue.priority);
    const labelsHTML = issue.labels && issue.labels.length > 0 ? 
        issue.labels.map(label => `<span class="label-badge">${escapeHtml(label)}</span>`).join('') : '';
    
    return `
        <div class="issue-card ${statusClass}" data-issue-id="${issue.id}">
            <div class="priority-top-right">
                <span class="priority-badge">${priorityBadge}</span>
            </div>
            <h3 class="issue-title">${escapeHtml(issue.title || 'No title')}</h3>
            <p class="issue-description">${escapeHtml(issue.description || 'No description')}</p>
            ${labelsHTML ? `<div class="issue-labels">${labelsHTML}</div>` : ''}
            <div class="issue-meta">
                <span class="issue-status">${issue.status}</span>
                <span class="issue-author">by ${escapeHtml(issue.author || 'Unknown')}</span>
            </div>
            <div class="issue-date">
                Created: ${formatDate(issue.createdAt)}
            </div>
        </div>
    `;
}

// Get priority badge HTML
function getPriorityBadge(priority) {
    const priorityColors = {
        'high': '#ff4444',
        'medium': '#ffaa00',
        'low': '#00aa00'
    };
    
    const color = priorityColors[priority?.toLowerCase()] || '#666666';
    return `<span class="priority-badge" style="background-color: ${color}">${priority || 'Medium'}</span>`;
}

// Filter issues by status
function filterIssues(status) {
    currentFilter = status;
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.status === status) {
            btn.classList.add('active');
        }
    });
    
    // Filter issues
    let filteredIssues = allIssues;
    
    if (status === 'open') {
        filteredIssues = allIssues.filter(issue => issue.status?.toLowerCase() === 'open');
    } else if (status === 'closed') {
        filteredIssues = allIssues.filter(issue => issue.status?.toLowerCase() === 'closed');
    }
    // For 'all', keep allIssues as is
    
    renderIssues(filteredIssues);
    updateIssueCount(filteredIssues.length);
}

// Perform search
async function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (!query) {
        // If search is empty, restore the current tab filter
        filterIssues(currentFilter);
        return;
    }
    
    try {
        showLoader();
        const searchResults = await searchIssues(query);
        
        // Reset active tab to All during search
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.status === 'all') {
                btn.classList.add('active');
            }
        });
        
        renderIssues(searchResults);
        updateIssueCount(searchResults.length);
    } catch (error) {
        console.error('Error searching issues:', error);
        showError('Search failed. Please try again.');
    } finally {
        hideLoader();
    }
}

// Open issue modal
async function openIssueModal(issueId) {
    try {
        showLoader();
        const issue = await fetchIssueById(issueId);
        showIssueModal(issue);
    } catch (error) {
        console.error('Error fetching issue details:', error);
        showError('Failed to load issue details.');
    } finally {
        hideLoader();
    }
}

// Show issue modal
function showIssueModal(issue) {
    if (!issue) {
        showError('Issue not found.');
        return;
    }
    
    const modal = document.getElementById('issueModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalIssueDetails');
    
    modalTitle.textContent = issue.title || 'Issue Details';
    
    const labelsHTML = issue.labels ? issue.labels.map(label => 
        `<span class="label">${label}</span>`
    ).join('') : '';
    
    modalDetails.innerHTML = `
        <div class="issue-detail-item">
            <strong>Title:</strong> ${escapeHtml(issue.title || 'No title')}
        </div>
        <div class="issue-detail-item">
            <strong>Description:</strong> ${escapeHtml(issue.description || 'No description')}
        </div>
        <div class="issue-detail-item">
            <strong>Status:</strong> ${issue.status || 'Unknown'}
        </div>
        <div class="issue-detail-item">
            <strong>Author:</strong> ${escapeHtml(issue.author || 'Unknown')}
        </div>
        <div class="issue-detail-item">
            <strong>Priority:</strong> ${issue.priority || 'Medium'}
        </div>
        <div class="issue-detail-item">
            <strong>Labels:</strong> ${labelsHTML || 'None'}
        </div>
        <div class="issue-detail-item">
            <strong>Created:</strong> ${formatDate(issue.createdAt)}
        </div>
        <div class="issue-detail-item">
            <strong>ID:</strong> ${issue.id}
        </div>
        ${issue.assignee ? `
        <div class="issue-detail-item">
            <strong>Assignee:</strong> ${escapeHtml(issue.assignee)}
        </div>
        ` : ''}
        ${issue.updatedAt ? `
        <div class="issue-detail-item">
            <strong>Updated:</strong> ${formatDate(issue.updatedAt)}
        </div>
        ` : ''}
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('issueModal');
    modal.style.display = 'none';
}

// Update issue count
function updateIssueCount(count) {
    const issueCount = document.getElementById('issueCount');
    issueCount.textContent = `${count} issue${count !== 1 ? 's' : ''}`;
}

// Show loader
function showLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';
}

// Hide loader
function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}

// Show error message
function showError(message) {
    const container = document.getElementById('issuesContainer');
    container.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <button onclick="loadAllIssues()" class="retry-btn">Retry</button>
        </div>
    `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
