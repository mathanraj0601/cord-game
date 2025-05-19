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
      <Canvas camera={{ position: [0, 6, 0], fov: 80 }}>
        <ambientLight castShadow />
        <OrbitControls />
        <directionalLight
          color="white"
          position={[0, 100, 0]}
          intensity={2}
          castShadow
        />
        <Physics
          gravity={[0, -9.81, 0]}
          timeStep={1 / 120} // smaller timestep for better accuracy
          maxSubSteps={5} // increase physics substeps
          solverIterations={16}
        >
          <Ball />
          <Tray />
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
