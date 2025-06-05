# Printwatch Card - Release Notes

## Version 1.0.2 (2025-01-19)

### Offline Mode Implementation

**Features:**
- ✅ **Complete Offline Mode:** Card now properly detects when printer is offline based on power switch state
- 🔧 **Smart Element Hiding:** When offline, only the power switch remains visible, all other controls are hidden
- 📱 **Improved UI:** Better visual feedback for offline vs online states
- 🎛️ **Enhanced Power Control:** Power button properly centered when printer is offline

**Technical Improvements:**
- Fixed `updateContent()` method to handle offline detection
- Added proper CSS class toggling for offline mode
- Prevented camera updates when printer is offline
- Maintained icon support for power and light buttons

## Version 1.0.1 (2025-01-19)

### Power Switch & Icon Enhancement

**Features:**
- ⚡ **Power Switch Integration:** Added configurable power switch entity for complete printer control
- 🎨 **Button Icons:** Added SVG icons to light and power buttons for better visual identification
- 🟢 **Dynamic Button Colors:** Power button changes color (green/red) based on on/off state
- 🔧 **Enhanced Configuration:** Updated configuration options and documentation for power switch

**Technical Improvements:**
- Added `togglePower()` method for power switch control
- Implemented proper icon rendering with SVG paths
- Updated button HTML structure with flexbox layout
- Enhanced CSS for icon styling and responsive design

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
