# Printwatch Card - Release Notes

## Version 1.0.0 (2025-06-05)

### Initial Release

**Features:**
- 🖨️ Real-time 3D printer status monitoring
- 📹 Live camera feed with configurable refresh rate
- 📊 Print progress tracking with visual progress bar
- 🌡️ Bed temperature monitoring (current and target)
- 🎮 Print control buttons (Pause, Resume, Stop)
- 💡 Chamber light toggle control
- 📱 Responsive design for mobile and desktop
- ⚙️ Visual configuration editor in Home Assistant UI

**Supported Entities:**
- Print status sensor
- Task/file name sensor
- Progress percentage sensor
- Current layer sensor
- Bed temperature sensors (current and target)
- Camera entity
- Control buttons (pause, resume, stop)
- Chamber light entity

**Compatibility:**
- Home Assistant 2024.1.0+
- Designed for Bambu Lab printers (P1P, P1S, X1C)
- Works with any 3D printer that exposes compatible entities

**Installation Methods:**
- Manual installation via www folder
- HACS integration ready
- Visual configuration editor included

**Technical Details:**
- Built with vanilla JavaScript and Web Components
- Uses Home Assistant's theming system
- Automatic camera refresh with configurable intervals
- Responsive CSS Grid layout
- Material Design inspired UI

### Known Issues
- None at initial release

### Future Enhancements
- Multi-printer support in single card
- Nozzle temperature monitoring
- Print time estimates
- Historical print statistics
- Custom color themes
