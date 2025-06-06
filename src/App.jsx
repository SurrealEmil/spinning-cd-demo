import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';

function CDModel({ rotationX, rotationY }) {
  const { scene } = useGLTF('/ps1_jewel_case.glb');
  const ref = useRef();

  if (ref.current) {
    ref.current.rotation.y = rotationY;
    ref.current.rotation.x = rotationX;
  }

  return <primitive ref={ref} object={scene} scale={1.5} />;
}

function App() {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const lastPos = useRef({ x: null, y: null });

  const handleMouseDown = (e) => {
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (lastPos.current.x !== null && lastPos.current.y !== null) {
      const deltaX = e.clientX - lastPos.current.x;
      const deltaY = e.clientY - lastPos.current.y;

      setRotationY((prev) => prev + deltaX * 0.01);
      setRotationX((prev) => prev + deltaY * 0.01);

      lastPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    lastPos.current = { x: null, y: null };
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    lastPos.current = { x: touch.clientX, y: touch.clientY };
  };
  
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (lastPos.current.x !== null && lastPos.current.y !== null) {
      const deltaX = touch.clientX - lastPos.current.x;
      const deltaY = touch.clientY - lastPos.current.y;
  
      setRotationY((prev) => prev + deltaX * 0.01);
      setRotationX((prev) => prev + deltaY * 0.01);
  
      lastPos.current = { x: touch.clientX, y: touch.clientY };
    }
  };
  
  const handleTouchEnd = () => {
    lastPos.current = { x: null, y: null };
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ width: '100vw', height: '100vh', cursor: 'grab', touchAction: 'none' }}
    >
    <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} />
      <CDModel rotationX={rotationX} rotationY={rotationY} />
      <OrbitControls
        enableRotate={false} // disable built-in rotation
        enableZoom={true}    // enable zoom with scroll or pinch
        minDistance={1}
        maxDistance={5}
      />
    </Canvas>
    </div>
  );
}

export default App;
