# 3D Quarter View Game

## Project Summary

This project is a 3D game where players control a character from a quarter view perspective. The game features character animations, physics-based movement, and a 3D environment. Players can control the character using keyboard to perform various actions (idle, running, jumping, attacking, etc.). This project is intended for single-player gameplay with an emphasis on character control and animation.

## Implementation Strategy

This game uses a **Three.js-based 3D approach**:

- React Three Fiber for 3D rendering in a React environment
- @react-three/rapier for physics simulation
- vibe-starter-3d library for character rendering and animation
- Quarter view camera setup providing an angled top-down view of the game world

Key technologies:

- Three.js - 3D rendering
- React Three Fiber - React integration
- @react-three/rapier - Physics simulation
- @react-three/drei - Useful Three.js helpers
- vibe-starter-3d (v0.4.0) - Advanced character rendering, animation, and physics integration
- Tailwind CSS - UI composition
- Zustand - State management

## Core Features

- **Advanced Character System**: Comprehensive character rendering with physics-based rigid body integration
- **Animation Management**: Complete animation system supporting idle, run, sprint, jump, punch, kick, normal_attack, cast, and other character states
- **Physics Integration**: Full physics simulation with collision detection and rigid body object type definitions
- **Quarter View Camera**: Fixed quarter-view perspective with character following for optimal gameplay experience
- **Interactive Controls**: Keyboard-based navigation (WASD for movement, QERF for actions) with mouse interaction support
- **Visual Environment**: Interactive ground plane with environmental collision detection and debugging grid overlay
- **State Management**: Robust character state transitions and player reference tracking for multiplayer readiness
- **Asset Management**: Comprehensive preloading system with progress indication for smooth gameplay
- **3D Rendering**: High-quality 3D model rendering with smooth animation transitions
- **Environmental Lighting**: Dynamic lighting system with follow light for enhanced visual experience

## File Structure Overview

#### `src/main.tsx`

- Entry point for the application.
- Sets up React rendering and mounts the `App` component.

#### `src/App.tsx`

- Main application component.
- Configures the overall layout and includes the `GameScene` component.
- Manages loading state and switches between `PreloadScene` and `GameScene`.

### `src/App.css`

- Defines the main styles for the `App` component and its child UI elements.

### `src/index.css`

- Defines global base styles, Tailwind CSS directives, fonts, etc., applied throughout the application.

#### `src/assets.json`

- File for managing asset metadata. Includes character model and animation information.

### `src/constants/`

- Directory defining constant values used throughout the application.
  - **`controls.ts`**: Defines settings that map keyboard inputs (WASD, arrow keys, etc.) to corresponding actions (movement, jump, etc.).
  - **`character.ts`**: Defines character-related constants (animation states, speed, etc.).
  - **`rigidBodyObjectType.ts`**: Defines physics object types for collision detection and interaction systems.

### `src/stores/`

- Directory containing state management stores using Zustand.
  - **`gameStore.ts`**: Store that manages the overall game state. Tracks and controls the readiness state of the map physics system (`isMapPhysicsReady`). This state is used to determine physics simulation pause/resume and loading screen display.
  - **`localPlayerStore.ts`**: Store that manages the local player's state, such as position tracking.
  - **`multiPlayerStore.ts`**: Store that manages multiple connected players' rigid body references for multiplayer functionality, including registration, unregistration, and retrieval of player references.
  - **`playerActionStore.ts`**: Store that manages player action states including combat actions (punch, kick, meleeAttack, cast) with support for setting, getting, and resetting action states.

### `src/components/`

- Directory managing React components categorized by function.

  - **`r3f/`**: Contains 3D components related to React Three Fiber.

    - **`Experience.tsx`**: Main component responsible for the primary 3D scene configuration. Includes lighting `ambientLight`, environmental elements `Environment`, debugging grid overlay, the `Player` component, and the floor `Floor`. It renders the core visual and interactive elements within the physics simulation configured in `GameScene.tsx`.
    - **`Floor.tsx`**: Component defining and visually representing the ground plane in the 3D space. Has physical properties.
    - **`GameSceneCanvas.tsx`**: React Three Fiber Canvas component that renders the 3D game world with physics simulation and controller setup.
    - **`MapPhysicsReadyChecker.tsx`**: Component that checks if the map physics system is ready by performing raycasting from above downward to detect map geometry and ensures physics interactions are properly initialized before gameplay begins. Performs checks every frame until valid map geometry is detected, with a timeout after 180 frames to prevent infinite checking. Excludes Capsule shapes (likely characters/objects) and sensor colliders from the inspection.
    - **`Player.tsx`**: Advanced player component integrating RigidBodyPlayer with CharacterRenderer for comprehensive character management, physics interactions, and animation state management with collision detection capabilities.

  - **`scene/`**: Contains components related to scene setup.

    - **`GameScene.tsx`**: Main game scene component that serves as a layout container arranging the game UI and 3D Canvas. Contains critical performance warnings and guidelines to prevent re-rendering issues. Includes the `GameSceneCanvas` and `GameSceneUI` components in a proper layered structure where the Canvas renders the 3D world and UI components render as overlays.
    - **`PreloadScene.tsx`**: Manages asset preloading before the game starts. Loads all assets defined in assets.json (models, textures, etc.) and displays a loading progress bar. Ensures all assets are loaded before the game begins.

  - **`ui/`**: Contains UI components for the game interface.
    - **`GameSceneUI.tsx`**: Component that manages UI overlays for the game scene.
    - **`LoadingScreen.tsx`**: Loading screen component displayed during game loading.
    - **`InputController.tsx`**: Manages all input handling including keyboard, mouse, and touch controls with virtual joystick support for mobile devices and action buttons for combat actions (punch, kick, cast) and movement controls.

### Key Libraries & Components from External Sources

- **`vibe-starter-3d`**: A library providing foundational 3D game components and utilities.
  - **`QuarterViewController`**: Wraps the player character and manages quarter view navigation by implementing a character controller with physics. It handles character movement, rotation, and camera following with a fixed quarter-view perspective.
  - **`CharacterRenderer`**: Renders 3D character models with animations from glTF/GLB files. Manages animation states and transitions based on player actions.
  - **`useControllerState`**: A React hook that provides control state management for the character, including:
    - `setEnableInput`: Function to enable/disable player input controls
    - `rigidBody`: Reference to the physics body for the character
  - **`useMouseControls`**: A React hook that provides access to mouse input state (left/right buttons and positions).

### Quarter View System Implementation

The quarter view control system is implemented through a combination of components:

1. **Controller System**: `QuarterViewController` from the vibe-starter-3d library handles the physics-based movement of the character based on keyboard inputs, maintaining a fixed camera angle that provides the quarter view perspective with character following.

2. **Input Management**: Keyboard inputs are captured through React Three Fiber's `useKeyboardControls` hook, which maps WASD/arrow keys to movement, and additional keys (Q/E/R/F) to character actions, with mouse controls for additional interactions.

3. **State Management**: `useControllerState` hook provides shared state between components, allowing different parts of the application to access and modify the character's state. Additionally, `playerStore` manages physics body references for multiplayer support.

4. **Animation Management**: `Player` component with `RigidBodyPlayer` integration determines appropriate animations based on movement and action states, transitioning between idle, walking, running, and action animations as needed, with full collision detection capabilities.

5. **Asset Management**: `PreloadScene` component ensures all 3D models, textures, and other assets are preloaded before gameplay begins, providing a smooth user experience with a visual loading indicator.
