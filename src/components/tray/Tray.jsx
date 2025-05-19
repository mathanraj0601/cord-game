import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import useRadarpad from "../../utils/useRadar";
import Plus from "../plus/Plus.jsx";
import Circle from "../Circles/Circle.jsx";

export default function Tray() {
  const trayRef = useRef();
  const { axes } = useRadarpad();

  const rotationRef = useRef({ x: 0, z: 0 });

  useFrame((_, delta) => {
    if (!trayRef.current) return;

    const maxTilt = 0.5;
    const speed = 8; // higher = faster response
    const damping = 1 - Math.exp(-speed * delta);

    const targetX = -axes[1] * maxTilt;
    const targetZ = axes[0] * maxTilt;

    rotationRef.current.x = THREE.MathUtils.lerp(
      rotationRef.current.x,
      targetX,
      damping
    );
    rotationRef.current.z = THREE.MathUtils.lerp(
      rotationRef.current.z,
      targetZ,
      damping
    );

    const euler = new THREE.Euler(
      rotationRef.current.x,
      0,
      rotationRef.current.z
    );
    const quaternion = new THREE.Quaternion().setFromEuler(euler);

    trayRef.current.setRotation(quaternion, true);
  });

  const bowlGeometry = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(2.9, -0.1)); // inner slope
    points.push(new THREE.Vector2(3.1, 0)); // inner slope
    points.push(new THREE.Vector2(3.2, 0.4)); // inner slope
    points.push(new THREE.Vector2(3.3, 0.5)); // inner slope
    points.push(new THREE.Vector2(3.4, 0.6)); // inner slope
    points.push(new THREE.Vector2(3.5, 0.5)); // inner slope

    return new THREE.LatheGeometry(points, 128);
  }, []);

  return (
    <RigidBody ref={trayRef} type="fixed" colliders={false}>
      <group>
        <mesh castShadow geometry={bowlGeometry}>
          <meshStandardMaterial
            color="#506577"
            metalness={0.3}
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        <group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[3, 64]} />
            <meshStandardMaterial
              color="#506577"
              metalness={0.3}
              roughness={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          <CylinderCollider args={[0.01, 3]} position={[0, 0.001, 0]} />

          {/* Ring of CuboidColliders to restrict ball within circle */}
          {[...Array(120)].map((_, i) => {
            const angle = (i / 120) * Math.PI * 2; // full circle
            const radius = 3.3; // slightly smaller than outermost ring
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const rotation = angle + Math.PI / 4; // rotate to face inward

            return (
              <CuboidCollider
                key={i}
                args={[0.05, 0.2, 0.3]} // thin walls
                position={[x, 0.15, z]} // slightly raised to form a wall
                rotation={[0, rotation, 0]}
              />
            );
          })}

          <Circle
            meshPosition={[0, 0.003, 0]}
            geoArgs={[1, 64]}
            color="#ff6666"
          />
          <Circle
            meshPosition={[0, 0.002, 0]}
            geoArgs={[2, 64]}
            color="#FFB6C1"
          />
          <Plus />
        </group>
      </group>
    </RigidBody>
  );
}
