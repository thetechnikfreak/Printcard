# Printwatch Card

A custom Home Assistant card for monitoring 3D printer status, specifically designed for Bambu Lab printers.

## Features

- Real-time printer status monitoring
- Live camera feed with configurable refresh rate
- Print progress tracking with layer information
- Bed temperature monitoring (current and target)
- Print control buttons (pause, resume, stop)
- Chamber light control
- Task/file name display

## Installation

### HACS (Home Assistant Community Store)

1. Open HACS in your Home Assistant instance
2. Go to "Frontend" section
3. Click the "+" button and search for "Printwatch Card"
4. Install the card
5. Add the card to your dashboard

### Manual Installation

1. Download the latest release
2. Copy `printwatch-card.js` to your `config/www/` directory
3. Add the following to your `configuration.yaml`:

```yaml
lovelace:
  resources:
    - url: /local/printwatch-card.js
      type: module
```

4. Restart Home Assistant

## Configuration

Add the card to your dashboard with the following configuration:

```yaml
type: custom:printwatch-card
printer_name: P1S
camera_refresh_rate: 1000
print_status_entity: sensor.none_print_status
task_name_entity: sensor.none_file
progress_entity: sensor.none_job_percentage
current_layer_entity: sensor.none_print_layer
bed_temp_entity: sensor.drucker_bed_current
bed_target_temp_entity: sensor.drucker_bed_target
camera_entity: camera.192_168_188_88
pause_button_entity: button.none_pause
resume_button_entity: button.none_continue
stop_button_entity: button.none_abort
chamber_light_entity: light.p1s_chamber_light
power_switch_entity: switch.p1s_power
```

## Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `printer_name` | string | Yes | Display name for the printer |
| `camera_refresh_rate` | number | No | Camera refresh rate in milliseconds (default: 1000) |
| `print_status_entity` | string | Yes | Entity ID for print status |
| `task_name_entity` | string | Yes | Entity ID for current file/task name |
| `progress_entity` | string | Yes | Entity ID for print progress percentage |
| `current_layer_entity` | string | Yes | Entity ID for current layer |
| `bed_temp_entity` | string | Yes | Entity ID for bed current temperature |
| `bed_target_temp_entity` | string | Yes | Entity ID for bed target temperature |
| `camera_entity` | string | Yes | Entity ID for camera |
| `pause_button_entity` | string | Yes | Entity ID for pause button |
| `resume_button_entity` | string | Yes | Entity ID for resume button |
| `stop_button_entity` | string | Yes | Entity ID for stop button |
| `chamber_light_entity` | string | Yes | Entity ID for chamber light |
| `power_switch_entity` | string | Yes | Entity ID for printer power switch |

## License

MIT License
