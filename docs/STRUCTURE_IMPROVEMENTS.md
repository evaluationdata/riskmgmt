# Code Structure Improvement Plan
## Healthcare Claims Management System (Gestione Sinistri Sanitari)

### Current State
- **Single HTML file (~1000 lines)** with inline styles and JavaScript
- **Mixed concerns**: presentation, styling, business logic all in one file
- **Code duplication**: repeated form fields, validation patterns
- **Maintenance challenges**: difficult to test, extend, and debug
- **Performance**: large initial bundle, no code splitting

---

## Recommended Architecture

### 📁 Directory Structure
```
riskmgmt/
├── index.html                    # Main entry point
├── css/
│   ├── variables.css            # Design tokens (colors, spacing)
│   ├── base.css                 # Base styles, reset
│   ├── components.css           # Reusable component styles
│   ├── forms.css                # Form-specific styles
│   ├── modals.css               # Modal styles
│   └── responsive.css           # Media queries
├── js/
│   ├── config.js                # Application configuration
│   ├── constants.js             # Constants (departments, status, etc.)
│   ├── modules/
│   │   ├── auth.js              # Login/authentication
│   │   ├── storage.js           # LocalStorage/Google Sheets sync
│   │   ├── claims.js            # Claims management (CRUD)
│   │   ├── cvs.js               # CVS committee management
│   │   ├── calendar.js          # Meeting calendar
│   │   ├── reports.js           # Reporting and statistics
│   │   ├── users.js             # User management (admin)
│   │   ├── ui.js                # UI utilities and helpers
│   │   └── validation.js        # Form validation
│   ├── services/
│   │   ├── googleSheets.js      # Google Sheets API integration
│   │   ├── dataService.js       # Data operations
│   │   └── syncService.js       # Offline/online sync
│   └── main.js                  # Application bootstrap
├── components/
│   ├── forms/
│   │   ├── claimForm.html       # New claim form template
│   │   ├── cvsCForm.html        # CVS form template
│   │   └── userForm.html        # User management form
│   ├── modals/
│   │   ├── confirmDialog.html   # Generic confirmation modal
│   │   ├── structureModal.html  # Structure creation modal
│   │   └── searchModal.html     # Advanced search modal
│   └── layouts/
│       ├── header.html          # Header component
│       ├── sidebar.html         # Navigation component
│       └── footer.html          # Footer component
└── docs/
    ├── API_SPECIFICATION.md     # Data structure definitions
    ├── DATABASE_SCHEMA.md       # Google Sheets schema
    └── USER_GUIDE.md            # User documentation
```

---

## 1. CSS Organization

### ✅ Benefits
- **Maintainability**: Easy to find and update styles
- **Reusability**: Shared design tokens
- **Performance**: Load only needed stylesheets
- **Scalability**: Clear separation by feature

### CSS Variables (variables.css)
```css
:root {
  /* Colors */
  --color-primary: #3498db;
  --color-secondary: #2980b9;
  --color-success: #27ae60;
  --color-danger: #e74c3c;
  --color-warning: #f39c12;
  --color-text: #2c3e50;
  --color-text-light: #7f8c8d;
  --color-bg: #f8f9fa;
  
  /* Typography */
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --font-size-base: 14px;
  --font-weight-regular: 400;
  --font-weight-bold: 600;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 15px;
  --spacing-lg: 20px;
  --spacing-xl: 30px;
  
  /* Sizing */
  --border-radius-sm: 5px;
  --border-radius-md: 8px;
  --border-radius-lg: 10px;
  --shadow-sm: 0 2px 10px rgba(0,0,0,0.05);
  --shadow-md: 0 5px 15px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.2);
}
```

---

## 2. JavaScript Modularization

### Module Pattern Example

#### config.js
```javascript
export const CONFIG = {
  GOOGLE_SHEETS_API_KEY: 'YOUR_API_KEY',
  SHEET_ID: 'YOUR_SHEET_ID',
  SYNC_INTERVAL: 5 * 60 * 1000, // 5 minutes
  MAX_RETRIES: 3,
  DEBUG: true,
};
```

#### constants.js
```javascript
export const DEPARTMENTS = [
  'Pronto Soccorso (DEA)',
  'Medicina interna',
  'Cardiologia con UTIC',
  // ... extracted from HTML
];

export const CLAIM_TYPES = {
  DAMAGE: 'danno',
  RISK: 'rischio',
  COMPLAINT: 'reclamo',
};

export const CLAIM_STATUS = {
  OPEN: 'in_corso',
  CLOSED: 'chiuso',
};

export const SEVERITY_LEVELS = {
  LIGHT: 'lieve',
  MODERATE: 'moderata',
  SERIOUS: 'grave',
  CRITICAL: 'gravissima',
};
```

#### modules/claims.js
```javascript
import { CONFIG } from '../config.js';
import { DEPARTMENTS, CLAIM_STATUS } from '../constants.js';
import { dataService } from '../services/dataService.js';

export class ClaimsManager {
  constructor() {
    this.claims = [];
    this.selectedClaim = null;
  }

  async loadClaims(structureId) {
    try {
      this.claims = await dataService.getClaims(structureId);
      return this.claims;
    } catch (error) {
      console.error('Error loading claims:', error);
      throw error;
    }
  }

  async createClaim(claimData) {
    const newClaim = {
      id: this.generateId(),
      protocol: this.generateProtocol(),
      createdAt: new Date().toISOString(),
      ...claimData,
    };
    return await dataService.createClaim(newClaim);
  }

  async updateClaim(claimId, updates) {
    return await dataService.updateClaim(claimId, updates);
  }

  generateProtocol() {
    return `PROTO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  generateId() {
    return `claim-${Date.now()}`;
  }
}

export const claimsManager = new ClaimsManager();
```

#### modules/ui.js
```javascript
export const UIUtils = {
  /**
   * Show a modal dialog
   * @param {string} modalId - The ID of the modal element
   */
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  },

  /**
   * Hide a modal dialog
   * @param {string} modalId - The ID of the modal element
   */
  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  },

  /**
   * Display a notification message
   * @param {string} message - The message to display
   * @param {string} type - 'success', 'error', 'warning', or 'info'
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
  },

  /**
   * Update form fields from an object
   * @param {Object} data - Key-value pairs matching form field IDs
   */
  populateForm(data) {
    Object.entries(data).forEach(([key, value]) => {
      const field = document.getElementById(key);
      if (field) field.value = value;
    });
  },

  /**
   * Extract form data into an object
   * @param {string} formId - The ID of the form element
   * @returns {Object} Form data
   */
  getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return {};
    return new FormData(form);
  },
};
```

---

## 3. Component-Based Templates

### components/forms/claimForm.html
```html
<template id="claimFormTemplate">
  <div class="claim-form">
    <h3>➕ New Claim</h3>
    
    <div class="form-section">
      <h4>Basic Information</h4>
      <div class="form-group">
        <label for="claimDate">Event Date *</label>
        <input type="date" id="claimDate" required>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="patientName">Name *</label>
          <input type="text" id="patientName" required>
        </div>
        <div class="form-group">
          <label for="patientSurname">Surname *</label>
          <input type="text" id="patientSurname" required>
        </div>
      </div>
    </div>
    
    <div class="form-section">
      <h4>Department & Description</h4>
      <div class="form-group">
        <label for="department">Department *</label>
        <select id="department" required>
          <option value="">-- Select Department --</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="description">Description *</label>
        <textarea id="description" rows="3" required></textarea>
      </div>
    </div>
    
    <div class="form-actions">
      <button type="submit" class="btn btn-success">Create Claim</button>
      <button type="reset" class="btn btn-secondary">Clear</button>
    </div>
  </div>
</template>
```

---

## 4. Service Layer Pattern

### services/dataService.js
```javascript
import { CONFIG } from '../config.js';
import { googleSheetsService } from './googleSheets.js';

class DataService {
  constructor() {
    this.cache = new Map();
    this.syncQueue = [];
  }

  /**
   * Get all structures for the current user
   */
  async getStructures(userId) {
    const cacheKey = `structures-${userId}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const structures = await googleSheetsService.query('Structures', 
      { owner_id: userId }
    );
    
    this.cache.set(cacheKey, structures);
    return structures;
  }

  /**
   * Create a new claim
   */
  async createClaim(claim) {
    try {
      const result = await googleSheetsService.append('Claims', claim);
      this.invalidateCache('claims');
      return result;
    } catch (error) {
      this.syncQueue.push({ operation: 'create', data: claim });
      console.warn('Queued claim for sync:', claim);
      throw error;
    }
  }

  /**
   * Invalidate cache for a specific resource
   */
  invalidateCache(pattern) {
    [...this.cache.keys()]
      .filter(key => key.includes(pattern))
      .forEach(key => this.cache.delete(key));
  }
}

export const dataService = new DataService();
```

---

## 5. Main Bootstrap (main.js)

```javascript
import { CONFIG } from './config.js';
import { authManager } from './modules/auth.js';
import { claimsManager } from './modules/claims.js';
import { calendarManager } from './modules/calendar.js';
import { UIUtils } from './modules/ui.js';

class Application {
  constructor() {
    this.isInitialized = false;
    this.currentUser = null;
    this.currentStructure = null;
  }

  async init() {
    try {
      console.log('Initializing application...');
      
      // Check authentication
      this.currentUser = await authManager.checkSession();
      
      if (!this.currentUser) {
        this.showLoginScreen();
        return;
      }

      await this.initializeApp();
      this.isInitialized = true;
      
    } catch (error) {
      console.error('Initialization error:', error);
      UIUtils.showNotification('Error initializing application', 'error');
    }
  }

  async initializeApp() {
    // Load structures
    const structures = await claimsManager.loadStructures(this.currentUser.id);
    this.populateStructureSelector(structures);
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Start sync service
    this.startAutoSync();
  }

  showLoginScreen() {
    document.getElementById('loginOverlay').style.display = 'flex';
  }

  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('loginBtn').addEventListener('click', () => {
        authManager.login();
      });
    });
  }

  startAutoSync() {
    setInterval(() => {
      if (navigator.onLine) {
        claimsManager.syncOfflineData();
      }
    }, CONFIG.SYNC_INTERVAL);
  }
}

const app = new Application();
app.init();
```

---

## 6. Validation Module

### modules/validation.js
```javascript
export const ValidationRules = {
  required: (value) => {
    return value && value.trim() !== '' ? null : 'This field is required';
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email address';
  },

  phone: (value) => {
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    return phoneRegex.test(value) ? null : 'Invalid phone number';
  },

  taxCode: (value) => {
    return value.length === 16 ? null : 'Tax code must be 16 characters';
  },

  currency: (value) => {
    return /^\d+(\.\d{2})?$/.test(value) ? null : 'Invalid currency format';
  },
};

export class FormValidator {
  constructor(formId, rules) {
    this.form = document.getElementById(formId);
    this.rules = rules;
    this.errors = new Map();
  }

  validate() {
    this.errors.clear();
    
    for (const [fieldId, fieldRules] of Object.entries(this.rules)) {
      const field = document.getElementById(fieldId);
      if (!field) continue;

      for (const rule of fieldRules) {
        const error = rule(field.value);
        if (error) {
          this.errors.set(fieldId, error);
          break;
        }
      }
    }

    return this.errors.size === 0;
  }

  getErrors() {
    return Object.fromEntries(this.errors);
  }
}
```

---

## 7. Benefits Summary

### ✅ Maintainability
- Smaller, focused files
- Clear separation of concerns
- Easier to locate bugs

### ✅ Reusability
- Shared components
- Utility functions
- Configuration centralization

### ✅ Testability
- Isolated modules
- Pure functions
- Mockable dependencies

### ✅ Performance
- Code splitting
- Lazy loading
- Efficient caching

### ✅ Scalability
- Easy to add features
- Module pattern
- Clear interfaces

---

## 8. Migration Path

1. **Phase 1**: Extract CSS into separate files
2. **Phase 2**: Create module structure
3. **Phase 3**: Implement service layer
4. **Phase 4**: Refactor JavaScript into modules
5. **Phase 5**: Create reusable components
6. **Phase 6**: Add build process (webpack/vite)

---

## 9. Tools & Best Practices

### Recommended
- **Bundler**: Vite or Webpack
- **Linter**: ESLint
- **Formatter**: Prettier
- **Testing**: Jest or Vitest
- **Package Manager**: npm or pnpm

### package.json Example
```json
{
  "name": "gestione-sinistri-sanitari",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --fix",
    "format": "prettier . --write",
    "test": "vitest"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0",
    "eslint": "^8.50.0",
    "prettier": "^3.0.0"
  }
}
```

---

## References
- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [CSS Best Practices](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Design Systems](https://www.smashingmagazine.com/design-systems/)
