import { useEffect, useRef } from "react";
import stats from "stats.js";

const StatsProvider = ({ children, disable = false }) => {
  const statsRef = useRef(null);

  useEffect(() => {
    if (import.meta.env.MODE === "production" || disable) return;

    statsRef.current = new stats();
    statsRef.current.showPanel(1);
    document.body.appendChild(statsRef.current.dom);

    const loop = () => {
      statsRef.current?.update();
      requestAnimationFrame(loop);
    };

    loop();
  }, [disable]);

  return <>{children}</>;
};

export default StatsProvider;
