# Installation Guide for Printwatch Card

## Method 1: Manual Installation (Recommended for testing)

1. **Copy the card file to Home Assistant:**
   - Copy `printwatch-card.js` to your Home Assistant's `config/www/` directory
   - If the `www` folder doesn't exist, create it

2. **Add the resource to Home Assistant:**
   - Go to Settings → Dashboards → Resources
   - Click "Add Resource"
   - Set URL to: `/local/printwatch-card.js`
   - Set Resource type to: "JavaScript Module"
   - Click "Create"

3. **Alternative: Add via configuration.yaml:**
   ```yaml
   lovelace:
     resources:
       - url: /local/printwatch-card.js
         type: module
   ```

4. **Restart Home Assistant**

## Method 2: HACS Installation (When published)

1. Open HACS in Home Assistant
2. Go to "Frontend"
3. Click "Explore & Download Repositories"
4. Search for "Printwatch Card"
5. Click "Download"
6. Restart Home Assistant

## Adding the Card to Your Dashboard

1. **Edit your dashboard**
2. **Add a new card**
3. **Select "Manual" card type**
4. **Paste your configuration:**

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
```

5. **Save the card**

## Troubleshooting

### Card doesn't appear
- Check browser console for errors (F12)
- Verify the resource is properly loaded
- Make sure all entity IDs exist in your Home Assistant

### Entities show as "unavailable"
- Verify your 3D printer integration is working
- Check that entity IDs match your actual entities
- Use Developer Tools → States to find correct entity IDs

### Camera not updating
- Check if camera entity provides `entity_picture` attribute
- Verify camera integration is working
- Try adjusting `camera_refresh_rate`

## Finding Your Entity IDs

1. Go to Developer Tools → States
2. Search for your printer entities
3. Copy the exact entity IDs to your card configuration

Common entity patterns:
- `sensor.{printer_name}_print_status`
- `sensor.{printer_name}_file`
- `sensor.{printer_name}_job_percentage`
- `button.{printer_name}_pause`
- `camera.{printer_ip_address}`
