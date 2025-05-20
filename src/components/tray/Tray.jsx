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

  const upward = 0.3;

  const bowlGeometry = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(2.5, -0.1)); // inner slope
    points.push(new THREE.Vector2(3.05, 0)); // inner slope
    points.push(new THREE.Vector2(3.1, 0.4)); // inner slope
    points.push(new THREE.Vector2(3.15, 0.5)); // inner slope
    points.push(new THREE.Vector2(3.2, 1)); // inner slope
    points.push(new THREE.Vector2(3.25, 0.5));

    return new THREE.LatheGeometry(points, 128);
  }, []);

  return (
    <RigidBody ref={trayRef} type="kinematicVelocity" colliders={false} ccd>
      <group>
        <group>
          <mesh castShadow geometry={bowlGeometry}>
            <meshStandardMaterial
              color="#6c7aa1"
              metalness={0.3}
              roughness={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>

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
                args={[0.15, 0.6, 0.3]} // thin walls
                position={[x, upward + 0.05, z]} // slightly raised to form a wall
                rotation={[0, rotation, 0]}
              />
            );
          })}
        </group>

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, upward, 0]}
          >
            <circleGeometry args={[3, 64]} />
            <meshStandardMaterial
              color="#6c7aa1"
              metalness={0.3}
              roughness={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          <CylinderCollider
            args={[0.3, 4]}
            position={(0, upward + 0.004, 0)}
            sensor={false}
          />

          <Circle
            meshPosition={[0, upward + 0.003, 0]}
            geoArgs={[1, 64]}
            color="#ff6666"
          />
          <Circle
            meshPosition={[0, upward + 0.002, 0]}
            geoArgs={[2, 64]}
            color="#FFB6C1"
          />
          <Plus />
        </group>
      </group>
    </RigidBody>
  );
}
