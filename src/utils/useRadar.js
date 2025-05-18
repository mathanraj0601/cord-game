import { useEffect, useState } from "react";
import { Round } from "./Round";

const useRadarpad = () => {
  const [connected, setConnected] = useState(false);
  const [axes, setAxes] = useState([0, 0]); // Example: 2 axes (left/right, up/down)

  useEffect(() => {
    function onGamepadConnected(e) {
      setConnected(true);
      console.log("Gamepad connected:", e.gamepad);
    }

    function onGamepadDisconnected(e) {
      setConnected(false);
      console.log("Gamepad disconnected:", e.gamepad);
    }

    window.addEventListener("gamepadconnected", onGamepadConnected);
    window.addEventListener("gamepaddisconnected", onGamepadDisconnected);

    let animationFrameId;

    function update() {
      const gamepads = navigator.getGamepads();
      if (gamepads[0]) {
        const gp = gamepads[0];
        setAxes((prev) => [prev[0], Round(gp.axes[1])]); // update axes values
      }
      if (gamepads[1]) {
        const radar = gamepads[1];
        if (radar.axes[0] === 1) setAxes((prev) => [1, prev[1]]);
        else if (radar.axes[1] === 1) setAxes((prev) => [-1, prev[1]]);
        else setAxes((prev) => [0, prev[1]]);
      }
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(update);
      }, 1000);
    }

    update();

    return () => {
      window.removeEventListener("gamepadconnected", onGamepadConnected);
      window.removeEventListener("gamepaddisconnected", onGamepadDisconnected);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return { connected, axes };
};

export default useRadarpad;
