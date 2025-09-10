// DOM Elements
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteCard = document.getElementById('quoteCard');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const copyQuoteBtn = document.getElementById('copyQuoteBtn');
const shareQuoteBtn = document.getElementById('shareQuoteBtn');
const loading = document.getElementById('loading');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const totalQuotesElement = document.getElementById('totalQuotes');
const quotesViewedElement = document.getElementById('quotesViewed');

// State variables
let currentQuote = null;
let quotesViewed = parseInt(localStorage.getItem('quotesViewed')) || 0;
let totalQuotes = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    updateQuotesViewedDisplay();
    fetchTotalQuotes();
    
    // Add event listeners
    newQuoteBtn.addEventListener('click', fetchRandomQuote);
    copyQuoteBtn.addEventListener('click', copyQuoteToClipboard);
    shareQuoteBtn.addEventListener('click', shareQuote);
    
    // Load first quote automatically after a short delay
    setTimeout(fetchRandomQuote, 1000);
});

// Fetch total quotes count
async function fetchTotalQuotes() {
    try {
        const response = await fetch('/quotes/count');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success) {
            totalQuotes = data.count;
            totalQuotesElement.textContent = totalQuotes;
        } else {
            throw new Error(data.error || 'Failed to fetch total quotes');
        }
    } catch (error) {
        console.error('Error fetching total quotes:', error);
        totalQuotesElement.textContent = 'Error';
        showToast('Failed to load quote count', 'error');
    }
}

// Fetch random quote from API
async function fetchRandomQuote() {
    try {
        showLoading(true);
        
        // Add loading state to button
        const originalText = newQuoteBtn.innerHTML;
        newQuoteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        newQuoteBtn.disabled = true;
        
        const response = await fetch('/quote');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success && data.quote) {
            displayQuote(data.quote);
            incrementQuotesViewed();
        } else {
            throw new Error(data.error || 'Failed to fetch quote');
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        showToast('Failed to load new quote. Please try again.', 'error');
        
        // Show fallback quote
        displayQuote({
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        });
    } finally {
        showLoading(false);
        
        // Restore button
        newQuoteBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Get New Quote';
        newQuoteBtn.disabled = false;
    }
}

// Display quote with animation
function displayQuote(quote) {
    currentQuote = quote;
    
    // Add animation class
    quoteCard.classList.add('quote-changing');
    
    setTimeout(() => {
        // Update text content
        quoteText.textContent = quote.text || quote.quote || "No quote text available";
        quoteAuthor.textContent = quote.author ? `- ${quote.author}` : '- Unknown';
        
        // Remove animation class
        quoteCard.classList.remove('quote-changing');
    }, 300);
}

// Copy quote to clipboard
async function copyQuoteToClipboard() {
    if (!currentQuote) {
        showToast('No quote to copy!', 'error');
        return;
    }
    
    const quoteText = currentQuote.text || currentQuote.quote || '';
    const author = currentQuote.author || 'Unknown';
    const textToCopy = `"${quoteText}" - ${author}`;
    
    try {
        // Modern clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
        }
        
        showToast('Quote copied to clipboard!', 'success');
        
        // Add visual feedback to button
        const originalText = copyQuoteBtn.innerHTML;
        copyQuoteBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyQuoteBtn.style.background = '#27ae60';
        
        setTimeout(() => {
            copyQuoteBtn.innerHTML = originalText;
            copyQuoteBtn.style.background = '';
        }, 2000);
        
    } catch (error) {
        console.error('Failed to copy quote:', error);
        showToast('Failed to copy quote', 'error');
    }
}

// Share quote
function shareQuote() {
    if (!currentQuote) {
        showToast('No quote to share!', 'error');
        return;
    }
    
    const quoteText = currentQuote.text || currentQuote.quote || '';
    const author = currentQuote.author || 'Unknown';
    const shareText = `"${quoteText}" - ${author}`;
    const shareUrl = window.location.href;
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Random Quote',
            text: shareText,
            url: shareUrl,
        }).then(() => {
            showToast('Quote shared successfully!', 'success');
        }).catch((error) => {
            console.error('Error sharing:', error);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

// Fallback share method
function fallbackShare(text) {
    // Create share options
    const shareOptions = [
        {
            name: 'Twitter',
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
            icon: 'fab fa-twitter'
        },
        {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`,
            icon: 'fab fa-facebook'
        },
        {
            name: 'WhatsApp',
            url: `https://wa.me/?text=${encodeURIComponent(text)}`,
            icon: 'fab fa-whatsapp'
        }
    ];
    
    // Create modal for share options
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <h3>Share this quote</h3>
            <div class="share-options">
                ${shareOptions.map(option => `
                    <a href="${option.url}" target="_blank" class="share-option">
                        <i class="${option.icon}"></i>
                        ${option.name}
                    </a>
                `).join('')}
            </div>
            <button class="close-modal">Close</button>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .share-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .share-modal-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 400px;
            width: 90%;
            text-align: center;
        }
        .share-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        .share-option {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 10px;
            text-decoration: none;
            color: #333;
            transition: background 0.3s ease;
        }
        .share-option:hover {
            background: #e9ecef;
        }
        .close-modal {
            background: #667eea;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
        }
    `;
    
    // Add styles to head if not already present
    if (!document.querySelector('#share-modal-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'share-modal-styles';
        styleElement.textContent = modalStyles;
        document.head.appendChild(styleElement);
    }
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Add click tracking for share options
    modal.querySelectorAll('.share-option').forEach(option => {
        option.addEventListener('click', () => {
            setTimeout(() => {
                modal.remove();
                showToast('Opening share option...', 'success');
            }, 1000);
        });
    });
}

// Increment quotes viewed counter
function incrementQuotesViewed() {
    quotesViewed++;
    localStorage.setItem('quotesViewed', quotesViewed);
    updateQuotesViewedDisplay();
}

// Update quotes viewed display
function updateQuotesViewedDisplay() {
    quotesViewedElement.textContent = quotesViewed;
}

// Show/hide loading spinner
function showLoading(show) {
    if (show) {
        loading.classList.add('show');
    } else {
        loading.classList.remove('show');
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    // Update toast style based on type
    if (type === 'error') {
        toast.style.background = '#e74c3c';
        toast.querySelector('i').className = 'fas fa-exclamation-circle';
    } else {
        toast.style.background = '#27ae60';
        toast.querySelector('i').className = 'fas fa-check-circle';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Space or Enter for new quote
    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        fetchRandomQuote();
    }
    
    // Ctrl+C to copy quote
    if (e.ctrlKey && e.code === 'KeyC' && !e.shiftKey) {
        if (currentQuote && !window.getSelection().toString()) {
            e.preventDefault();
            copyQuoteToClipboard();
        }
    }
    
    // Ctrl+S to share quote
    if (e.ctrlKey && e.code === 'KeyS') {
        e.preventDefault();
        shareQuote();
    }
});

// Add some easter eggs and fun features
let clickCount = 0;
quoteCard.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        showToast('🎉 You found the secret! Keep exploring quotes!', 'success');
        clickCount = 0;
    }
});

// Auto-refresh feature (optional)
let autoRefreshInterval = null;

function toggleAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
        showToast('Auto-refresh disabled', 'success');
    } else {
        autoRefreshInterval = setInterval(fetchRandomQuote, 10000); // Every 10 seconds
        showToast('Auto-refresh enabled (every 10s)', 'success');
    }
}

// Add auto-refresh button (optional feature)
document.addEventListener('DOMContentLoaded', function() {
    const autoRefreshBtn = document.createElement('button');
    autoRefreshBtn.className = 'btn btn-secondary';
    autoRefreshBtn.innerHTML = '<i class="fas fa-clock"></i> Auto-refresh';
    autoRefreshBtn.style.marginTop = '1rem';
    autoRefreshBtn.addEventListener('click', toggleAutoRefresh);
    
    // Add to quote actions if desired
    // document.querySelector('.quote-actions').appendChild(autoRefreshBtn);
});

// Handle online/offline status
window.addEventListener('online', function() {
    showToast('Connection restored!', 'success');
});

window.addEventListener('offline', function() {
    showToast('You are offline. Some features may not work.', 'error');
});
