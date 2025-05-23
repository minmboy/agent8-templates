# Basic 3D First Person View (FPV) - FPS

## Project Summary

This project is a single-player First Person View (FPV) 3D FPS game built using Three.js and React Three Fiber.

## Implementation Strategy

This project uses a **Three.js-based 3D approach** because:

- It requires real-time 3D character animation and control
- Three.js provides efficient 3D rendering in web browsers
- React Three Fiber simplifies integration with React components
- The vibe-starter-3d library provides essential character rendering and animation tools

Key technologies:

- Three.js for 3D rendering
- React Three Fiber for React integration
- @react-three/rapier for physics simulation
- @react-three/drei for useful Three.js helpers
- vibe-starter-3d for character rendering and animation
- Tailwind CSS for styling

## Implemented Features

- Keyboard-controlled character movement (WASD/Arrow keys)
- Attack by clicking the left mouse button
- First person view camera that follows the character
- Physics-based character movement with collision detection
- 3D environment with floor
- Pointer lock for immersive control

## File Structure Overview

### `src/main.tsx`

- Entry point for the application.
- Sets up React rendering and mounts the `App` component.

### `src/App.tsx`

- Main application component.
- Configures the overall layout and includes the `GameScene` component.

### `src/App.css`

- Defines the main styles for the `App` component and its child UI elements.

### `src/index.css`

- Defines global base styles, Tailwind CSS directives, fonts, etc., applied throughout the application.

### `src/assets.json`

- File for managing asset metadata. (Currently empty)

### `src/constants/`

- Directory defining constant values used throughout the application.
  - **`character.ts`**: Defines character-related settings (e.g., movement speed, jump height).
  - **`controls.ts`**: Defines settings that map keyboard inputs (WASD, arrow keys, etc.) to corresponding actions (movement, firing, etc.).

### `src/components/`

- Directory managing React components categorized by function.

  - **`r3f/`**: Contains 3D components related to React Three Fiber.

    - **`EffectContainer.tsx`**: Groups and manages various visual effect components like bullets and muzzle flash.
    - **`Experience.tsx`**: Main component responsible for the primary 3D scene configuration. Includes the crucial `FirstPersonViewController`, `FollowLight`, lighting, environmental elements, and floor `Floor`.
    - **`Floor.tsx`**: Defines and visually represents the ground plane in the 3D space. Has physical properties.
    - **`Player.tsx`**: Component defining the player character model, animations, and basic physics interactions.
    - **`effects/`**: Sub-directory containing components related to visual effects.
      - **`Bullet.tsx`**: Component defining the visual representation and behavior of bullets fired from the player.
      - **`BulletEffectController.tsx`**: Manages the entire bullet effect system, including creation, state updates, and recycling (Object Pooling).
      - **`Explosion.tsx`**: Component that creates and manages explosion visual effects.
      - **`MuzzleFlash.tsx`**: Component that generates and manages the flash effect occurring at the muzzle when firing a gun.

  - **`scene/`**: Contains components related to 3D scene setup.
    - **`GameScene.tsx`**: Sets up the React Three Fiber `Canvas` component (implementing the Pointer Lock feature), utilizes `KeyboardControls` for handling keyboard inputs, configures the physics simulation using the `Physics` component from `@react-three/rapier`, includes the `EffectContainer`, and loads the `Experience` component with `Suspense` to initialize the 3D rendering environment.

### `src/stores/`

- Directory containing Zustand stores for application state management.
  - **`effectStore.ts`**: Store that manages the state of visual effects like bullets (e.g., creation, active/inactive).
  - **`playerStore.ts`**: Store that manages the player's state, such as health, ammo, etc.

### `src/types/`

- Directory containing TypeScript type definitions.
  - **`effect.ts`**: Defines types related to visual effects (Effect).
  - **`index.ts`**: Exports types from within the `types` directory.

### `src/utils/`

- Directory containing utility functions used throughout the application.
  - **`effectUtils.ts`**: Provides utility functions for creating effect configurations, such as bullet and explosion effects.
