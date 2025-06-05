class PrintwatchCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    this.config = config;
    this.render();
  }

  configChanged(newConfig) {
    const event = new Event('config-changed', {
      bubbles: true,
      composed: true
    });
    event.detail = { config: newConfig };
    this.dispatchEvent(event);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .card-config {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 16px;
        }
        
        .config-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .config-group label {
          font-weight: 500;
          color: var(--primary-text-color);
        }
        
        .config-group input, .config-group select {
          padding: 8px 12px;
          border: 1px solid var(--divider-color);
          border-radius: 4px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
        }
        
        .config-group input:focus, .config-group select:focus {
          outline: none;
          border-color: var(--primary-color);
        }
        
        .section-title {
          font-size: 1.2em;
          font-weight: bold;
          margin-top: 16px;
          margin-bottom: 8px;
          color: var(--primary-text-color);
          border-bottom: 1px solid var(--divider-color);
          padding-bottom: 4px;
        }
      </style>
      
      <div class="card-config">
        <div class="config-group">
          <label for="printer_name">Printer Name *</label>
          <input 
            type="text" 
            id="printer_name" 
            value="${this.config?.printer_name || ''}"
            placeholder="e.g., P1S"
          />
        </div>
        
        <div class="config-group">
          <label for="camera_refresh_rate">Camera Refresh Rate (ms)</label>
          <input 
            type="number" 
            id="camera_refresh_rate" 
            value="${this.config?.camera_refresh_rate || 1000}"
            placeholder="1000"
          />
        </div>
        
        <div class="section-title">Sensor Entities</div>
        
        <div class="config-group">
          <label for="print_status_entity">Print Status Entity *</label>
          <input 
            type="text" 
            id="print_status_entity" 
            value="${this.config?.print_status_entity || ''}"
            placeholder="sensor.none_print_status"
          />
        </div>
        
        <div class="config-group">
          <label for="task_name_entity">Task Name Entity *</label>
          <input 
            type="text" 
            id="task_name_entity" 
            value="${this.config?.task_name_entity || ''}"
            placeholder="sensor.none_file"
          />
        </div>
        
        <div class="config-group">
          <label for="progress_entity">Progress Entity *</label>
          <input 
            type="text" 
            id="progress_entity" 
            value="${this.config?.progress_entity || ''}"
            placeholder="sensor.none_job_percentage"
          />
        </div>
        
        <div class="config-group">
          <label for="current_layer_entity">Current Layer Entity *</label>
          <input 
            type="text" 
            id="current_layer_entity" 
            value="${this.config?.current_layer_entity || ''}"
            placeholder="sensor.none_print_layer"
          />
        </div>
        
        <div class="config-group">
          <label for="bed_temp_entity">Bed Temperature Entity *</label>
          <input 
            type="text" 
            id="bed_temp_entity" 
            value="${this.config?.bed_temp_entity || ''}"
            placeholder="sensor.drucker_bed_current"
          />
        </div>
        
        <div class="config-group">
          <label for="bed_target_temp_entity">Bed Target Temperature Entity *</label>
          <input 
            type="text" 
            id="bed_target_temp_entity" 
            value="${this.config?.bed_target_temp_entity || ''}"
            placeholder="sensor.drucker_bed_target"
          />
        </div>
        
        <div class="config-group">
          <label for="camera_entity">Camera Entity *</label>
          <input 
            type="text" 
            id="camera_entity" 
            value="${this.config?.camera_entity || ''}"
            placeholder="camera.192_168_188_88"
          />
        </div>
        
        <div class="section-title">Control Entities</div>
        
        <div class="config-group">
          <label for="pause_button_entity">Pause Button Entity *</label>
          <input 
            type="text" 
            id="pause_button_entity" 
            value="${this.config?.pause_button_entity || ''}"
            placeholder="button.none_pause"
          />
        </div>
        
        <div class="config-group">
          <label for="resume_button_entity">Resume Button Entity *</label>
          <input 
            type="text" 
            id="resume_button_entity" 
            value="${this.config?.resume_button_entity || ''}"
            placeholder="button.none_continue"
          />
        </div>
        
        <div class="config-group">
          <label for="stop_button_entity">Stop Button Entity *</label>
          <input 
            type="text" 
            id="stop_button_entity" 
            value="${this.config?.stop_button_entity || ''}"
            placeholder="button.none_abort"
          />
        </div>
        
        <div class="config-group">
          <label for="chamber_light_entity">Chamber Light Entity *</label>
          <input 
            type="text" 
            id="chamber_light_entity" 
            value="${this.config?.chamber_light_entity || ''}"
            placeholder="light.p1s_chamber_light"
          />
        </div>
      </div>
    `;
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    const inputs = this.shadowRoot.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const newConfig = { ...this.config };
        const key = e.target.id;
        let value = e.target.value;
        
        // Convert numeric values
        if (key === 'camera_refresh_rate') {
          value = parseInt(value) || 1000;
        }
        
        newConfig[key] = value;
        this.configChanged(newConfig);
      });
    });
  }
}

customElements.define('printwatch-card-editor', PrintwatchCardEditor);
