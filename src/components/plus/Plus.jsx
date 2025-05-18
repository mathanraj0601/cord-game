import React from "react";

export default function Plus() {
  const plusGeometry = [0.1, 0.5, 0.01];

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={plusGeometry} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <boxGeometry args={plusGeometry} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}
