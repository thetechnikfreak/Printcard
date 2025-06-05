class PrintwatchCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.cameraRefreshInterval = null;
  }

  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  setConfig(config) {
    if (!config.printer_name) {
      throw new Error('printer_name is required');
    }
    
    this.config = {
      camera_refresh_rate: 1000,
      ...config
    };
    
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.updateContent();
  }

  get hass() {
    return this._hass;
  }

  connectedCallback() {
    this.startCameraRefresh();
  }

  disconnectedCallback() {
    this.stopCameraRefresh();
  }

  startCameraRefresh() {
    if (this.config?.camera_entity && this.config?.camera_refresh_rate) {
      this.stopCameraRefresh();
      this.cameraRefreshInterval = setInterval(() => {
        this.updateCameraImage();
      }, this.config.camera_refresh_rate);
    }
  }

  stopCameraRefresh() {
    if (this.cameraRefreshInterval) {
      clearInterval(this.cameraRefreshInterval);
      this.cameraRefreshInterval = null;
    }
  }

  updateCameraImage() {
    const cameraImg = this.shadowRoot.querySelector('.camera-image');
    if (cameraImg && this.hass && this.config.camera_entity) {
      const entity = this.hass.states[this.config.camera_entity];
      if (entity && entity.attributes.entity_picture) {
        cameraImg.src = this.hass.hassUrl(entity.attributes.entity_picture) + '&' + new Date().getTime();
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: var(--ha-card-background, var(--card-background-color, white));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, var(--shadow-elevation-2dp));
          padding: 16px;
          font-family: var(--ha-card-font-family, inherit);
        }
        
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        
        .printer-name {
          font-size: 1.5em;
          font-weight: bold;
          color: var(--primary-text-color);
        }
        
        .status {
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 0.9em;
          font-weight: 500;
          text-transform: uppercase;
        }
        
        .status.printing {
          background: var(--success-color, #4caf50);
          color: white;
        }
        
        .status.idle {
          background: var(--info-color, #2196f3);
          color: white;
        }
        
        .status.error {
          background: var(--error-color, #f44336);
          color: white;
        }
        
        .content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .camera-section {
          grid-column: span 2;
        }
        
        .camera-container {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
          aspect-ratio: 16/9;
        }
        
        .camera-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 16px;
        }
        
        .info-item {
          background: var(--secondary-background-color, #f1f1f1);
          padding: 12px;
          border-radius: 8px;
        }
        
        .info-label {
          font-size: 0.8em;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }
        
        .info-value {
          font-size: 1.1em;
          font-weight: 500;
          color: var(--primary-text-color);
        }
        
        .progress-container {
          grid-column: span 2;
          margin-top: 16px;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background: var(--secondary-background-color, #f1f1f1);
          border-radius: 4px;
          overflow: hidden;
          margin: 8px 0;
        }
        
        .progress-fill {
          height: 100%;
          background: var(--primary-color, #2196f3);
          transition: width 0.3s ease;
        }
        
        .controls {
          display: flex;
          gap: 8px;
          margin-top: 16px;
          grid-column: span 2;
        }
        
        .control-button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 0.9em;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .control-button.pause {
          background: var(--warning-color, #ff9800);
          color: white;
        }
        
        .control-button.resume {
          background: var(--success-color, #4caf50);
          color: white;
        }
        
        .control-button.stop {
          background: var(--error-color, #f44336);
          color: white;
        }
        
        .control-button.light {
          background: var(--info-color, #2196f3);
          color: white;
        }
        
        .control-button:hover {
          opacity: 0.8;
        }
        
        .control-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @media (max-width: 600px) {
          .content {
            grid-template-columns: 1fr;
          }
          
          .camera-section {
            grid-column: span 1;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
          
          .progress-container {
            grid-column: span 1;
          }
          
          .controls {
            grid-column: span 1;
            flex-direction: column;
          }
        }
      </style>
      
      <div class="card">
        <div class="header">
          <div class="printer-name">${this.config.printer_name}</div>
          <div class="status" id="status">--</div>
        </div>
        
        <div class="content">
          <div class="camera-section">
            <div class="camera-container">
              <img class="camera-image" alt="Printer Camera" />
            </div>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Current File</div>
              <div class="info-value" id="task-name">--</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">Current Layer</div>
              <div class="info-value" id="current-layer">--</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">Bed Temperature</div>
              <div class="info-value" id="bed-temp">--</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">Bed Target</div>
              <div class="info-value" id="bed-target">--</div>
            </div>
          </div>
          
          <div class="progress-container">
            <div class="info-label">Print Progress</div>
            <div class="progress-bar">
              <div class="progress-fill" id="progress-fill"></div>
            </div>
            <div class="info-value" id="progress-text">0%</div>
          </div>
          
          <div class="controls">
            <button class="control-button pause" id="pause-btn">Pause</button>
            <button class="control-button resume" id="resume-btn">Resume</button>
            <button class="control-button stop" id="stop-btn">Stop</button>
            <button class="control-button light" id="light-btn">Light</button>
          </div>
        </div>
      </div>
    `;
    
    this.setupEventListeners();
    this.updateContent();
  }

  setupEventListeners() {
    const pauseBtn = this.shadowRoot.getElementById('pause-btn');
    const resumeBtn = this.shadowRoot.getElementById('resume-btn');
    const stopBtn = this.shadowRoot.getElementById('stop-btn');
    const lightBtn = this.shadowRoot.getElementById('light-btn');

    pauseBtn?.addEventListener('click', () => {
      this.callService('button', 'press', this.config.pause_button_entity);
    });

    resumeBtn?.addEventListener('click', () => {
      this.callService('button', 'press', this.config.resume_button_entity);
    });

    stopBtn?.addEventListener('click', () => {
      this.callService('button', 'press', this.config.stop_button_entity);
    });

    lightBtn?.addEventListener('click', () => {
      this.toggleLight();
    });
  }

  callService(domain, service, entityId) {
    if (this.hass && entityId) {
      this.hass.callService(domain, service, {
        entity_id: entityId
      });
    }
  }

  toggleLight() {
    if (this.hass && this.config.chamber_light_entity) {
      const entity = this.hass.states[this.config.chamber_light_entity];
      const service = entity?.state === 'on' ? 'turn_off' : 'turn_on';
      this.hass.callService('light', service, {
        entity_id: this.config.chamber_light_entity
      });
    }
  }

  updateContent() {
    if (!this.hass || !this.config) return;

    // Update status
    const statusEl = this.shadowRoot.getElementById('status');
    const printStatusEntity = this.hass.states[this.config.print_status_entity];
    if (printStatusEntity && statusEl) {
      const status = printStatusEntity.state.toLowerCase();
      statusEl.textContent = printStatusEntity.state;
      statusEl.className = `status ${status}`;
    }

    // Update task name
    const taskNameEl = this.shadowRoot.getElementById('task-name');
    const taskNameEntity = this.hass.states[this.config.task_name_entity];
    if (taskNameEntity && taskNameEl) {
      taskNameEl.textContent = taskNameEntity.state || '--';
    }

    // Update progress
    const progressFillEl = this.shadowRoot.getElementById('progress-fill');
    const progressTextEl = this.shadowRoot.getElementById('progress-text');
    const progressEntity = this.hass.states[this.config.progress_entity];
    if (progressEntity && progressFillEl && progressTextEl) {
      const progress = parseFloat(progressEntity.state) || 0;
      progressFillEl.style.width = `${progress}%`;
      progressTextEl.textContent = `${progress.toFixed(1)}%`;
    }

    // Update current layer
    const currentLayerEl = this.shadowRoot.getElementById('current-layer');
    const currentLayerEntity = this.hass.states[this.config.current_layer_entity];
    if (currentLayerEntity && currentLayerEl) {
      currentLayerEl.textContent = currentLayerEntity.state || '--';
    }

    // Update bed temperature
    const bedTempEl = this.shadowRoot.getElementById('bed-temp');
    const bedTempEntity = this.hass.states[this.config.bed_temp_entity];
    if (bedTempEntity && bedTempEl) {
      bedTempEl.textContent = `${bedTempEntity.state}°C`;
    }

    // Update bed target temperature
    const bedTargetEl = this.shadowRoot.getElementById('bed-target');
    const bedTargetEntity = this.hass.states[this.config.bed_target_temp_entity];
    if (bedTargetEntity && bedTargetEl) {
      bedTargetEl.textContent = `${bedTargetEntity.state}°C`;
    }

    // Update camera
    this.updateCameraImage();

    // Update light button state
    const lightBtn = this.shadowRoot.getElementById('light-btn');
    const lightEntity = this.hass.states[this.config.chamber_light_entity];
    if (lightEntity && lightBtn) {
      lightBtn.textContent = lightEntity.state === 'on' ? 'Light Off' : 'Light On';
    }
  }

  static getConfigElement() {
    return document.createElement('printwatch-card-editor');
  }

  static getStubConfig() {
    return {
      printer_name: 'P1S',
      camera_refresh_rate: 1000,
      print_status_entity: 'sensor.none_print_status',
      task_name_entity: 'sensor.none_file',
      progress_entity: 'sensor.none_job_percentage',
      current_layer_entity: 'sensor.none_print_layer',
      bed_temp_entity: 'sensor.drucker_bed_current',
      bed_target_temp_entity: 'sensor.drucker_bed_target',
      camera_entity: 'camera.192_168_188_88',
      pause_button_entity: 'button.none_pause',
      resume_button_entity: 'button.none_continue',
      stop_button_entity: 'button.none_abort',
      chamber_light_entity: 'light.p1s_chamber_light'
    };
  }
}

customElements.define('printwatch-card', PrintwatchCard);

// Register the card with Home Assistant
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'printwatch-card',
  name: 'Printwatch Card',
  description: 'A custom card for monitoring 3D printer status'
});

// Console info for debugging
console.info(
  `%c PRINTWATCH-CARD %c Version 1.0.0 `,
  'color: white; background: #2196f3; font-weight: 700;',
  'color: #2196f3; background: white; font-weight: 700;'
);
