import { useFrame } from "@react-three/fiber";
import { BallCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef } from "react";

function Ball() {
  const ballRef = useRef();
  const ballMessRef = useRef();

  useFrame(() => {
    if (!ballRef.current) return;

    if (ballRef.current) {
      // const position = ballRef.current.translation();
      // if (position.z < 3 || position.z < -3) {
      //   setReload(false);
      // } else {
      //   setReload(true);
      //   ballRef.current.setTranslation({ x: 0, y: 1, z: 0 }, true);
      // }
    }
  });
  useEffect(() => {
    const impulse = {
      x: (Math.random() - 0.5) * 0.21, // small impulse between -0.1 and +0.1
      y: 0,
      z: (Math.random() - 0.5) * 0.21,
    };

    if (ballRef.current) {
      setTimeout(() => {
        ballRef.current.applyImpulse(impulse, true);
      }, 300);
    }
  }, []);

  return (
    <RigidBody ref={ballRef} colliders="ball">
      <mesh ref={ballMessRef} position={[0, 3, 0]} castShadow>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial
          color="#d04bcb"
          metalness={0.4}
          roughness={0.2} // lower = more shiny
        />
      </mesh>
    </RigidBody>
  );
}

export default Ball;
