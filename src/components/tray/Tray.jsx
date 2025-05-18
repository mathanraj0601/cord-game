import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import useRadarpad from "../../utils/useRadar";
import Plus from "../plus/Plus.jsx";
import Circle from "../Circles/Circle.jsx";

export default function Tray() {
  const trayRef = useRef();
  const [rotation, setRotation] = useState({ x: 0, z: 0 });
  const { axes } = useRadarpad();

  useFrame(() => {
    if (!trayRef.current) return;

    const maxTilt = 0.5;
    const sensitivity = 0.01;

    // Update rotation based on joystick axes
    const targetX = -axes[1] * maxTilt;
    const targetZ = axes[0] * maxTilt;

    // Smooth transition
    setRotation((prev) => {
      const smoothX = THREE.MathUtils.lerp(prev.x, targetX, sensitivity);
      const smoothZ = THREE.MathUtils.lerp(prev.z, targetZ, sensitivity);
      return { x: smoothX, z: smoothZ };
    });

    // Apply rotation
    const euler = new THREE.Euler(rotation.x, 0, rotation.z);
    const quaternion = new THREE.Quaternion().setFromEuler(euler);
    trayRef.current.setRotation(quaternion, true);
  });

  return (
    <RigidBody ref={trayRef} type="fixed" colliders="trimesh">
      <group>
        <mesh castShadow>
          <cylinderGeometry args={[3, 3, 1.5, 64, 1, true]} />
          <meshStandardMaterial color="lightblue" side={THREE.DoubleSide} />
        </mesh>
        <group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[3, 32]} />
            <meshStandardMaterial color="lightblue" side={THREE.DoubleSide} />
          </mesh>
          <Circle
            meshPosition={[0, 0.002, 0]}
            geoArgs={[1, 64]}
            color="#ff6666"
          />
          <Circle
            meshPosition={[0, 0.001, 0]}
            geoArgs={[2, 64]}
            color="#FFB6C1"
          />
          <Plus />
        </group>
      </group>
    </RigidBody>
  );
}
