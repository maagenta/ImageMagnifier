# Image Magnifier - Technical Documentation

## Overview
Image Magnifier is a Chrome extension that allows users to view enlarged images on any website using a simple key combination (z + click). The extension creates a modal that displays the selected image in a larger size while maintaining original proportions and enabling optimal viewing.

## Project Structure

```
image-magnifier/
├── manifest.json
├── constants.js
├── states.js
├── content.js
├── start.js
└── icons/
    ├── 16.png
    ├── 32.png
    ├── 48.png
    └── 128.png
```

## Main Components

### manifest.json
- **Purpose**: Defines extension configuration and permissions
- **Version**: Manifest V3
- **Permissions**: `activeTab`
- **Content Scripts**:
  - Execute in the following order:
    1. constants.js
    2. states.js
    3. content.js
    4. start.js
  - Match all URLs (`<all_urls>`)

### constants.js
Defines style constants used in the extension:
- `MODAL_STYLE`: CSS styles for the modal containing the enlarged image
  - Fixed positioning
  - Semi-transparent background
  - Vertical and horizontal centering
  - Maximum z-index to ensure visibility
- `IMAGE_STYLE`: CSS styles for the enlarged image
  - Maximum dimensions relative to viewport
  - Maintains proportions with `object-fit: contain`

### states.js
Maintains the extension's global state:
- `states.zPressed`: Boolean indicating if the 'z' key is pressed

### content.js
Contains the main extension logic:

#### Main Functions

##### `show_larger(img)`
- **Purpose**: Creates and displays the modal with the enlarged image
- **Parameters**: 
  - `img`: HTML image element to enlarge
- **Behavior**:
  - Creates a modal div
  - Applies styles defined in `MODAL_STYLE`
  - Creates an enlarged image within the modal
  - Closes on click anywhere

##### `handle_key_z_press()`
- **Purpose**: Manages keyboard events for the 'z' key
- **Behavior**:
  - Updates `states.zPressed` when 'z' key is pressed/released

##### `add_event_listener_to_img(img)`
- **Purpose**: Adds necessary event handlers to images
- **Parameters**:
  - `img`: HTML image element
- **Behavior**:
  - Adds click event that shows enlarged image if 'z' is pressed
  - Prevents navigation in links containing images when 'z' is pressed

##### `add_click_handlers_to_imgs()`
- **Purpose**: Applies event handlers to all images on the page
- **Behavior**:
  - Selects all images without handlers
  - Marks processed images with `dataset.handlerAdded`

##### `observer()`
- **Purpose**: Observes DOM changes to process new images
- **Behavior**:
  - Uses MutationObserver to detect DOM changes
  - Implements 250ms throttling for performance optimization
  - Automatically processes new images added dynamically

### start.js
Initializes the extension:
1. Sets up 'z' key detector
2. Adds handlers to existing images
3. Starts the DOM change observer

## Execution Flow
1. Extension loads when accessing any webpage
2. States and constants are initialized
3. Event handlers are added to existing images
4. Observer starts to detect new images
5. When user:
   - Holds the 'z' key
   - Clicks an image
   - Enlarged image is shown in modal
   - Modal closes on click anywhere

## Development Considerations
1. **Performance**:
   - Observer uses throttling to prevent overload
   - Handlers are added only once per image
   - Styles are optimized for performance

2. **Maintainability**:
   - Modular code separated into specific files
   - Centralized states in `states.js`
   - Style constants separated in `constants.js`

3. **Compatibility**:
   - Uses Manifest V3 for future compatibility
   - Implements safe event handling
   - Prevents conflicts with normal navigation

## Modification Guide

### Adding New Features
1. To add new keyboard shortcuts:
   - Add new state in `states.js`
   - Create new handler in `content.js`
   - Initialize in `start.js`

2. To modify styles:
   - Update constants in `constants.js`
   - Styles are independent of content

3. To add new features:
   - Create new functions in `content.js`
   - Maintain existing modularity
   - Update observer if necessary

### Debugging
- Use `dataset.handlerAdded` to verify image processing
- Monitor `states.zPressed` for keyboard shortcut issues
- Check console for observer errors

## Security Considerations
1. Extension only requires `activeTab` for minimal functionality
2. Implements safe DOM event handling
3. Prevents unwanted navigation in links with images
4. Uses strict mode in all JavaScript files