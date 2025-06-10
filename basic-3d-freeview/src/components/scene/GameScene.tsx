import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import { keyboardMap } from '../../constants/controls';
import { Physics } from '@react-three/rapier';
import Experience from '../r3f/Experience';
import { FollowLight, FreeViewController } from 'vibe-starter-3d';
import { useGameStore } from '../../stores/gameStore';
import LoadingScreen from '../ui/LoadingScreen';
import MapPhysicsReadyChecker from '../r3f/MapPhysicsReadyChecker';

/**
 * Main game scene component
 *
 * This component is responsible for setting up the 3D environment
 * including physics, lighting, and scene elements.
 */
const GameScene = () => {
  // ⚠️ MUST CHECK: Map physics system ready state
  // Physics paused and loading screen displayed while this value is false
  const { isMapPhysicsReady } = useGameStore();

  return (
    <div className="relative w-full h-screen">
      {/* Loading screen overlay */}
      {!isMapPhysicsReady && <LoadingScreen />}

      {/* Keyboard preset */}
      <KeyboardControls map={keyboardMap}>
        {/* Single Canvas for the 3D scene */}
        <Canvas
          shadows
          onPointerDown={(e) => {
            (e.target as HTMLCanvasElement).requestPointerLock();
          }}
        >
          <Physics paused={!isMapPhysicsReady}>
            <Suspense fallback={null}>
              {/* ⚠️ MUST INCLUDE: Essential checker for map physics initialization */}
              {!isMapPhysicsReady && <MapPhysicsReadyChecker />}
              <FollowLight />
              <FreeViewController />
              <Experience />
            </Suspense>
          </Physics>
        </Canvas>
      </KeyboardControls>
    </div>
  );
};

export default GameScene;
