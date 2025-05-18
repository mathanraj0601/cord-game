import { useFrame } from "@react-three/fiber";
import { BallCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef } from "react";

function Ball() {
  const ballRef = useRef();
  const ballMessRef = useRef();

  useFrame(() => {
    if (!ballMessRef.current) return;

    console.log(ballMessRef.current);
  });
  useEffect(() => {
    const impulse = {
      x: (Math.random() - 0.5) * 5,
      y: 0,
      z: (Math.random() - 0.5) * 5,
    };

    if (ballRef.current) {
      setTimeout(() => {
        ballRef.current.applyImpulse(impulse, true);
      }, 300);
    }
  }, []);

  return (
    <RigidBody ref={ballRef} colliders="ball">
      <mesh ref={ballMessRef} position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
}

export default Ball;
