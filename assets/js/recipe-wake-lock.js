---
# Front matter required for Jekyll processing
---

// Screen Wake Lock for Recipe Pages
// Keeps the screen on while viewing recipe posts

class RecipeWakeLock {
  constructor() {
    this.wakeLock = null;
    this.isActive = false;
    this.button = null;
    this.init();
  }

  async init() {
    // Only run on recipe/post pages
    if (!this.isRecipePage()) return;

    // Check if Wake Lock API is supported
    if (!('wakeLock' in navigator)) {
      console.log('Screen Wake Lock API not supported');
      return;
    }

    this.createToggleButton();
    this.setupEventListeners();
    
    // Auto-enable wake lock on recipe pages
    this.requestWakeLock();
  }

  isRecipePage() {
    // Check if we're on a post page (recipe page)
    return document.body.classList.contains('post-template') || 
           document.querySelector('.post-content') !== null ||
           window.location.pathname.includes('/20') || // Posts have dates in URL
           document.querySelector('article.post') !== null;
  }

  createToggleButton() {
    // Create a floating button to toggle wake lock
    this.button = document.createElement('button');
    this.button.innerHTML = '📱';
    this.button.title = 'Toggle screen wake lock';
    this.button.id = 'wake-lock-toggle';
    this.button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      border: 2px solid #2a7ae2;
      background: #ffffff;
      color: #2a7ae2;
      font-size: 20px;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 1000;
      transition: all 0.3s ease;
      opacity: 0.8;
    `;

    // Dark mode styles
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeQuery.matches) {
      this.button.style.background = '#1a1a1a';
      this.button.style.color = '#6bb6ff';
      this.button.style.borderColor = '#6bb6ff';
    }

    // Update styles when dark mode changes
    darkModeQuery.addListener((e) => {
      if (e.matches) {
        this.button.style.background = '#1a1a1a';
        this.button.style.color = '#6bb6ff';
        this.button.style.borderColor = '#6bb6ff';
      } else {
        this.button.style.background = '#ffffff';
        this.button.style.color = '#2a7ae2';
        this.button.style.borderColor = '#2a7ae2';
      }
    });

    document.body.appendChild(this.button);
  }

  setupEventListeners() {
    // Button click handler
    this.button.addEventListener('click', () => {
      if (this.isActive) {
        this.releaseWakeLock();
      } else {
        this.requestWakeLock();
      }
    });

    // Handle visibility change (when user switches tabs/apps)
    document.addEventListener('visibilitychange', () => {
      if (this.wakeLock !== null && document.visibilityState === 'visible') {
        // Re-request wake lock when returning to the page
        this.requestWakeLock();
      }
    });

    // Handle page unload
    window.addEventListener('beforeunload', () => {
      this.releaseWakeLock();
    });

    // Handle mobile orientation change
    window.addEventListener('orientationchange', () => {
      if (this.isActive) {
        // Re-request wake lock after orientation change
        setTimeout(() => {
          this.requestWakeLock();
        }, 100);
      }
    });
  }

  async requestWakeLock() {
    try {
      this.wakeLock = await navigator.wakeLock.request('screen');
      this.isActive = true;
      this.updateButtonState();
      
      console.log('Screen wake lock activated');
      
      // Listen for wake lock release
      this.wakeLock.addEventListener('release', () => {
        console.log('Screen wake lock released');
        this.isActive = false;
        this.updateButtonState();
      });

    } catch (err) {
      console.error('Failed to request screen wake lock:', err);
      this.showToast('Could not keep screen on');
    }
  }

  releaseWakeLock() {
    if (this.wakeLock) {
      this.wakeLock.release();
      this.wakeLock = null;
      this.isActive = false;
      this.updateButtonState();
    }
  }

  updateButtonState() {
    if (!this.button) return;

    if (this.isActive) {
      this.button.innerHTML = '📱✓';
      this.button.title = 'Screen will stay on - Click to disable';
      this.button.style.background = '#2a7ae2';
      this.button.style.color = '#ffffff';
      this.button.style.opacity = '1';
    } else {
      this.button.innerHTML = '📱';
      this.button.title = 'Click to keep screen on';
      
      // Reset to appropriate colors based on theme
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (darkModeQuery.matches) {
        this.button.style.background = '#1a1a1a';
        this.button.style.color = '#6bb6ff';
      } else {
        this.button.style.background = '#ffffff';
        this.button.style.color = '#2a7ae2';
      }
      this.button.style.opacity = '0.8';
    }
  }

  showToast(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      background: #333;
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      z-index: 1001;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Fade in
    setTimeout(() => toast.style.opacity = '1', 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new RecipeWakeLock());
} else {
  new RecipeWakeLock();
}