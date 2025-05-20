import React from "react";
import * as THREE from "three";

function Circle({ color, meshPosition, geoArgs }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={meshPosition} receiveShadow>
      <circleGeometry args={geoArgs} />
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
}

export default Circle;
