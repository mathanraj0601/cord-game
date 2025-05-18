import { Canvas } from "@react-three/fiber";
import "./App.css";
import Ball from "./components/ball/ball";
import { OrbitControls } from "@react-three/drei";
import Tray from "./components/tray/tray";
import { Physics } from "@react-three/rapier";

// camera={{ position: [0, 5, 0], fov: 100 }}>
function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 5, 0], fov: 80 }}>
        <ambientLight castShadow />
        <directionalLight
          color="white"
          position={[0, 10, 0]}
          intensity={1.5}
          castShadow
        />
        <Physics>
          <Ball />
          <Tray />
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
