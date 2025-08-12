// Embeddable 1RM Calculator Widget
// This creates a small, self-contained calculator that can be embedded on other sites

import { calculateOneRM, formatOneRM } from '../utils/formulas';
import { convertWeight, type Unit } from '../utils/units';

interface WidgetConfig {
  containerId?: string;
  defaultUnit?: Unit;
  showBranding?: boolean;
  theme?: 'light' | 'dark';
}

class OneRMWidget {
  private container: HTMLElement;
  private shadowRoot: ShadowRoot;
  private config: WidgetConfig;
  private currentUnit: Unit = 'kg';

  constructor(container: HTMLElement, config: WidgetConfig = {}) {
    this.container = container;
    this.config = { showBranding: true, theme: 'light', ...config };
    this.currentUnit = config.defaultUnit || 'kg';
    
    // Create shadow DOM for style isolation
    this.shadowRoot = container.attachShadow({ mode: 'open' });
    this.render();
    this.attachEventListeners();
  }

  private render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 400px;
        }
        
        .widget {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          background: ${this.config.theme === 'dark' ? '#1f2937' : 'white'};
          color: ${this.config.theme === 'dark' ? 'white' : '#111827'};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          text-align: center;
        }
        
        .input-group {
          margin-bottom: 12px;
        }
        
        .label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
          color: ${this.config.theme === 'dark' ? '#d1d5db' : '#374151'};
        }
        
        .input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          box-sizing: border-box;
          background: ${this.config.theme === 'dark' ? '#374151' : 'white'};
          color: ${this.config.theme === 'dark' ? 'white' : '#111827'};
        }
        
        .input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 1px #3b82f6;
        }
        
        .unit-toggle {
          display: flex;
          gap: 4px;
          margin-bottom: 12px;
        }
        
        .unit-btn {
          flex: 1;
          padding: 6px 12px;
          border: 1px solid #d1d5db;
          background: #f9fafb;
          color: #374151;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .unit-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
        
        .result {
          text-align: center;
          padding: 16px;
          background: ${this.config.theme === 'dark' ? '#374151' : '#f3f4f6'};
          border-radius: 6px;
          margin-bottom: 12px;
        }
        
        .result-value {
          font-size: 24px;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 4px;
        }
        
        .result-label {
          font-size: 12px;
          color: ${this.config.theme === 'dark' ? '#9ca3af' : '#6b7280'};
        }
        
        .range {
          font-size: 11px;
          color: ${this.config.theme === 'dark' ? '#9ca3af' : '#6b7280'};
          margin-top: 4px;
        }
        
        .error {
          color: #ef4444;
          font-size: 12px;
          margin-top: 4px;
        }
        
        .branding {
          text-align: center;
          margin-top: 12px;
          font-size: 11px;
          color: ${this.config.theme === 'dark' ? '#9ca3af' : '#6b7280'};
        }
        
        .branding a {
          color: #3b82f6;
          text-decoration: none;
        }
        
        .hidden {
          display: none;
        }
      </style>
      
      <div class="widget">
        <div class="title">1RM Calculator</div>
        
        <div class="unit-toggle">
          <button class="unit-btn kg-btn ${this.currentUnit === 'kg' ? 'active' : ''}">kg</button>
          <button class="unit-btn lb-btn ${this.currentUnit === 'lb' ? 'active' : ''}">lb</button>
        </div>
        
        <div class="input-group">
          <label class="label">Weight</label>
          <input type="number" class="input weight-input" placeholder="Enter weight" min="0" step="0.5">
        </div>
        
        <div class="input-group">
          <label class="label">Reps</label>
          <input type="number" class="input reps-input" placeholder="1-12" min="1" max="12">
        </div>
        
        <div class="error error-message hidden"></div>
        
        <div class="result result-section hidden">
          <div class="result-value result-median">--</div>
          <div class="result-label">Estimated 1RM</div>
          <div class="range result-range"></div>
        </div>
        
        ${this.config.showBranding ? `
          <div class="branding">
            Powered by <a href="https://1rmcalculator.com" target="_blank">1RM Calculator</a>
          </div>
        ` : ''}
      </div>
    `;
  }

  private attachEventListeners() {
    const weightInput = this.shadowRoot.querySelector('.weight-input') as HTMLInputElement;
    const repsInput = this.shadowRoot.querySelector('.reps-input') as HTMLInputElement;
    const kgBtn = this.shadowRoot.querySelector('.kg-btn') as HTMLButtonElement;
    const lbBtn = this.shadowRoot.querySelector('.lb-btn') as HTMLButtonElement;

    weightInput.addEventListener('input', () => this.calculate());
    repsInput.addEventListener('input', () => this.calculate());
    
    kgBtn.addEventListener('click', () => this.switchUnits('kg'));
    lbBtn.addEventListener('click', () => this.switchUnits('lb'));
  }

  private switchUnits(newUnit: Unit) {
    if (this.currentUnit === newUnit) return;

    const weightInput = this.shadowRoot.querySelector('.weight-input') as HTMLInputElement;
    const currentWeight = parseFloat(weightInput.value);
    
    if (!isNaN(currentWeight)) {
      const convertedWeight = convertWeight(currentWeight, this.currentUnit, newUnit);
      weightInput.value = convertedWeight.toFixed(newUnit === 'kg' ? 1 : 0);
    }

    this.currentUnit = newUnit;
    this.updateUnitButtons();
    this.calculate();
  }

  private updateUnitButtons() {
    const kgBtn = this.shadowRoot.querySelector('.kg-btn') as HTMLButtonElement;
    const lbBtn = this.shadowRoot.querySelector('.lb-btn') as HTMLButtonElement;

    kgBtn.classList.toggle('active', this.currentUnit === 'kg');
    lbBtn.classList.toggle('active', this.currentUnit === 'lb');
  }

  private calculate() {
    const weightInput = this.shadowRoot.querySelector('.weight-input') as HTMLInputElement;
    const repsInput = this.shadowRoot.querySelector('.reps-input') as HTMLInputElement;
    const errorElement = this.shadowRoot.querySelector('.error-message') as HTMLElement;
    const resultSection = this.shadowRoot.querySelector('.result-section') as HTMLElement;

    const weight = parseFloat(weightInput.value);
    const reps = parseInt(repsInput.value);

    // Clear previous errors
    errorElement.classList.add('hidden');
    errorElement.textContent = '';

    // Validate inputs
    if (isNaN(weight) || weight <= 0) {
      if (weightInput.value) {
        errorElement.textContent = 'Please enter a valid weight';
        errorElement.classList.remove('hidden');
      }
      resultSection.classList.add('hidden');
      return;
    }

    if (isNaN(reps) || reps < 1 || reps > 12) {
      if (repsInput.value) {
        errorElement.textContent = 'Reps must be between 1 and 12';
        errorElement.classList.remove('hidden');
      }
      resultSection.classList.add('hidden');
      return;
    }

    try {
      const results = calculateOneRM(weight, reps);
      this.displayResults(results);
    } catch (error) {
      errorElement.textContent = 'Error calculating 1RM';
      errorElement.classList.remove('hidden');
      resultSection.classList.add('hidden');
    }
  }

  private displayResults(results: any) {
    const resultSection = this.shadowRoot.querySelector('.result-section') as HTMLElement;
    const medianElement = this.shadowRoot.querySelector('.result-median') as HTMLElement;
    const rangeElement = this.shadowRoot.querySelector('.result-range') as HTMLElement;

    const isKg = this.currentUnit === 'kg';
    
    medianElement.textContent = formatOneRM(results.median, isKg);
    rangeElement.textContent = `Range: ${formatOneRM(results.min, isKg)} - ${formatOneRM(results.max, isKg)}`;
    
    resultSection.classList.remove('hidden');
  }
}

// Auto-initialize widgets on page load
function initializeWidgets() {
  const widgets = document.querySelectorAll('[data-1rm-widget]');
  
  widgets.forEach((element) => {
    const config: WidgetConfig = {
      defaultUnit: (element.getAttribute('data-unit') as Unit) || 'kg',
      showBranding: element.getAttribute('data-branding') !== 'false',
      theme: (element.getAttribute('data-theme') as 'light' | 'dark') || 'light'
    };
    
    new OneRMWidget(element as HTMLElement, config);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWidgets);
} else {
  initializeWidgets();
}

// Export for manual initialization
(window as any).OneRMWidget = OneRMWidget;