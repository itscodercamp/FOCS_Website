
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Use local constants for R3F elements to avoid global JSX pollution
// which was causing widespread "Property 'div' does not exist" errors in other files.
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const CylinderGeometry = 'cylinderGeometry' as any;
const Primitive = 'primitive' as any;
const BoxGeometry = 'boxGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const ConeGeometry = 'coneGeometry' as any;
const PlaneGeometry = 'planeGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const PointLight = 'pointLight' as any;
const AmbientLight = 'ambientLight' as any;
const DirectionalLight = 'directionalLight' as any;
const SpotLight = 'spotLight' as any;

// --- Detailed Rocket Parts ---

const EngineBlock = () => {
  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: "#334155", metalness: 0.9, roughness: 0.3 }), []);
  const inner = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0f172a", metalness: 0.5, roughness: 0.8 }), []);
  const nozzleColor = useMemo(() => new THREE.MeshStandardMaterial({ color: "#475569", metalness: 0.7, roughness: 0.4 }), []);
  
  return (
    <Group>
      {/* Octaweb Structure Base */}
      <Mesh position={[0, 0.2, 0]}>
         <CylinderGeometry args={[0.36, 0.3, 0.4, 32]} />
         <Primitive object={metal} />
      </Mesh>
      {/* 9 Engines Cluster */}
      {[...Array(9)].map((_, i) => {
         const angle = (i / 8) * Math.PI * 2;
         const r = i === 8 ? 0 : 0.20;
         const x = Math.cos(angle) * r;
         const z = Math.sin(angle) * r;
         return (
           <Group key={i} position={[x, -0.1, z]}>
              <Mesh position={[0, -0.15, 0]}>
                 <CylinderGeometry args={[0.07, 0.1, 0.35, 16]} />
                 <Primitive object={nozzleColor} />
              </Mesh>
              <Mesh position={[0, -0.32, 0]}>
                  <CylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
                  <Primitive object={inner} />
              </Mesh>
           </Group>
         )
      })}
    </Group>
  )
}

const BoosterBody = ({ height = 4.0 }: { height?: number }) => {
  const hull = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f1f5f9", metalness: 0.4, roughness: 0.4 }), []);
  const detail = useMemo(() => new THREE.MeshStandardMaterial({ color: "#94a3b8", metalness: 0.5, roughness: 0.5 }), []);
  const dark = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1e293b", metalness: 0.6, roughness: 0.7 }), []);
  
  return (
     <Group>
       {/* Main Tank */}
       <Mesh castShadow receiveShadow>
          <CylinderGeometry args={[0.38, 0.38, height, 32]} />
          <Primitive object={hull} />
       </Mesh>
       
       {/* Raceway (Cable Duct) */}
       <Mesh position={[0.4, 0, 0]}>
          <BoxGeometry args={[0.08, height * 0.95, 0.05]} />
          <Primitive object={detail} />
       </Mesh>
       
       {/* Top Detail / Interstage */}
       <Mesh position={[0, height/2 - 0.2, 0]}>
          <CylinderGeometry args={[0.39, 0.39, 0.1, 32]} />
          <Primitive object={dark} />
       </Mesh>
       
       {/* Bottom Heat Shield Area */}
       <Mesh position={[0, -height/2 + 0.1, 0]}>
          <CylinderGeometry args={[0.38, 0.38, 0.2, 32]} />
          <Primitive object={dark} />
       </Mesh>

       {/* Grid Fins (Top) */}
       {[0, Math.PI/2, Math.PI, -Math.PI/2].map((r, i) => (
           <Group key={i} rotation={[0, r, 0]} position={[0, height/2 - 0.6, 0]}>
               <Mesh position={[0.42, 0, 0]} rotation={[0, 0, -0.2]}>
                  <BoxGeometry args={[0.2, 0.3, 0.02]} />
                  <MeshStandardMaterial color="#334155" metalness={0.9} roughness={0.4} side={THREE.DoubleSide} />
               </Mesh>
           </Group>
       ))}
    </Group>
  );
};

const Payload = () => {
   const hull = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f1f5f9", metalness: 0.4, roughness: 0.4 }), []);
   const logoMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0ea5e9", metalness: 0.1, roughness: 0.2 }), []);
   
   return (
     <Group>
        {/* Fairing Body */}
        <Mesh position={[0, 0, 0]} castShadow>
            <CylinderGeometry args={[0.38, 0.38, 1.5, 32]} />
            <Primitive object={hull} />
        </Mesh>
        {/* Nose */}
        <Mesh position={[0, 1.3, 0]}>
             <ConeGeometry args={[0.38, 1.2, 32]} /> 
             <Primitive object={hull} />
        </Mesh>
        {/* Logo Band */}
        <Mesh position={[0, 0.2, 0.36]} rotation={[0,0,0]}>
            <PlaneGeometry args={[0.4, 0.4]} />
            <Primitive object={logoMat} />
        </Mesh>
     </Group>
   )
}

const RealisticRocket = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Parts Refs for individual assembly animation
  const coreBodyRef = useRef<THREE.Group>(null);
  const coreEngineRef = useRef<THREE.Group>(null);
  const boosterLRef = useRef<THREE.Group>(null);
  const boosterRRef = useRef<THREE.Group>(null);
  const payloadRef = useRef<THREE.Group>(null);
  
  // Fire Refs for detailed animation
  const fireGroupRef = useRef<THREE.Group>(null);
  const fireOuterRef = useRef<THREE.Mesh>(null);
  const fireInnerRef = useRef<THREE.Mesh>(null);
  const fireLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Loop duration 12s
    const t = state.clock.getElapsedTime() % 12; 

    // --- Animation Logic ---
    let coreBodyPos = new THREE.Vector3(0,0,0);
    let coreEnginePos = new THREE.Vector3(0, -2.2, 0); 

    let boostLPos = new THREE.Vector3(-0.9, -0.5, 0);
    let boostRPos = new THREE.Vector3(0.9, -0.5, 0);
    let payPos = new THREE.Vector3(0, 2.75, 0); 
    
    let rocketRotZ = 0;
    let rocketPos = new THREE.Vector3(0,0,0);
    let shake = 0;
    
    let isFireActive = false;
    let fireGrowth = 0;

    // 1. Assembly (0-4s)
    if (t < 4) {
       const p = t / 4;
       // Cubic ease out for snap effect
       const ease = 1 - Math.pow(1 - p, 3);
       
       coreBodyPos.y = THREE.MathUtils.lerp(-20, 0, ease);
       coreEnginePos.y = THREE.MathUtils.lerp(-20, -2.2, ease);
       boostLPos.x = THREE.MathUtils.lerp(-15, -0.9, ease);
       boostRPos.x = THREE.MathUtils.lerp(15, 0.9, ease);
       payPos.y = THREE.MathUtils.lerp(15, 2.75, ease);
       
       // Slow Spin only during assembly
       groupRef.current.rotation.y = t * 0.5;
    }
    // 2. Lock & Tilt (4-6s)
    else if (t < 6) {
       const p = (t - 4) / 2;
       
       // Target Tilt: 30 degrees to the Right.
       // Rotation -Z rotates Y towards X (Right Tilt).
       const targetTilt = -30 * (Math.PI / 180); 
       
       rocketRotZ = THREE.MathUtils.lerp(0, targetTilt, p);
       
       // Stabilize Y rotation
       groupRef.current.rotation.y = THREE.MathUtils.lerp(2, 0, p); 
    }
    // 3. Ignition & Launch (6-9s)
    else if (t < 9) {
       const launchT = t - 6;
       
       const tiltAngleDeg = 30;
       const tiltAngleRad = tiltAngleDeg * (Math.PI / 180);
       
       rocketRotZ = -tiltAngleRad; // -30 deg rotation (Tip Right)

       shake = 0.05 * (1 - Math.min(launchT * 0.5, 1)); 
       
       isFireActive = true;
       fireGrowth = Math.min(launchT * 4, 1.8);

       const speed = Math.pow(launchT, 2.2) * 5;
       
       rocketPos.x = Math.sin(tiltAngleRad) * speed; // +X (Right)
       rocketPos.y = Math.cos(tiltAngleRad) * speed; // +Y (Up)
    } 
    // 4. Away (9-12s)
    else {
       rocketPos.y = 200; // Hide off-screen
    }

    // Apply Transforms to Parts
    if (coreBodyRef.current) coreBodyRef.current.position.copy(coreBodyPos);
    if (coreEngineRef.current) coreEngineRef.current.position.copy(coreEnginePos);
    if (boosterLRef.current) boosterLRef.current.position.copy(boostLPos);
    if (boosterRRef.current) boosterRRef.current.position.copy(boostRPos);
    if (payloadRef.current) payloadRef.current.position.copy(payPos);

    // Apply Transforms to Main Group
    groupRef.current.rotation.z = rocketRotZ;
    groupRef.current.position.copy(rocketPos);
    
    // Add shake
    groupRef.current.position.x += (Math.random()-0.5) * shake;
    groupRef.current.position.y += (Math.random()-0.5) * shake;

    // --- Flame Animation ---
    if (fireGroupRef.current) {
        if (isFireActive && fireGrowth > 0.01) {
            fireGroupRef.current.visible = true;
            
            // Base vibration
            const baseScale = fireGrowth * (1 + (Math.random() - 0.5) * 0.1);
            fireGroupRef.current.scale.setScalar(baseScale);

            // Inner Flame Flicker (White/Hot) - Fast vibration
            if (fireInnerRef.current) {
                const innerPulse = 1 + (Math.random() - 0.5) * 0.3;
                fireInnerRef.current.scale.set(1, innerPulse, 1);
                (fireInnerRef.current.material as THREE.MeshBasicMaterial).opacity = 0.8 + Math.random() * 0.2;
            }

            // Outer Flame Flicker (Orange) - Slower, more turbulent
            if (fireOuterRef.current) {
                const outerPulseY = 1 + (Math.random() - 0.5) * 0.2;
                const outerPulseXZ = 1 + (Math.random() - 0.5) * 0.1;
                fireOuterRef.current.scale.set(outerPulseXZ, outerPulseY, outerPulseXZ);
                (fireOuterRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.random() * 0.3;
            }

            // Light Intensity Flicker
            if (fireLightRef.current) {
                fireLightRef.current.intensity = 6 + Math.random() * 4;
            }
        } else {
            fireGroupRef.current.visible = false;
        }
    }
  })

  return (
    <Group ref={groupRef}>
       {/* --- CORE --- */}
       <Group ref={coreBodyRef}>
          <BoosterBody height={4.0} />
       </Group>
       
       <Group ref={coreEngineRef}>
          <EngineBlock />
       </Group>

       {/* --- LEFT BOOSTER --- */}
       <Group ref={boosterLRef}>
          <BoosterBody height={4.0} />
          <Group position={[0, -2.2, 0]}>
             <EngineBlock />
          </Group>
          {/* Strut */}
          <Mesh position={[0.42, 1.5, 0]} rotation={[0,0,Math.PI/2]}>
              <CylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
              <MeshStandardMaterial color="#334155" />
          </Mesh>
       </Group>

       {/* --- RIGHT BOOSTER --- */}
       <Group ref={boosterRRef}>
          <BoosterBody height={4.0} />
          <Group position={[0, -2.2, 0]}>
             <EngineBlock />
          </Group>
          {/* Strut */}
          <Mesh position={[-0.42, 1.5, 0]} rotation={[0,0,Math.PI/2]}>
              <CylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
              <MeshStandardMaterial color="#334155" />
          </Mesh>
       </Group>

       {/* --- PAYLOAD --- */}
       <Group ref={payloadRef}>
          <Payload />
       </Group>

       {/* --- FLAMES --- */}
       <Group ref={fireGroupRef} position={[0, -2.55, 0]}>
            <Mesh ref={fireOuterRef} position={[0, -3, 0]} rotation={[Math.PI, 0, 0]}>
                <ConeGeometry args={[0.8, 6, 32, 1, true]} />
                <MeshBasicMaterial color="#f59e0b" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
            </Mesh>
            <Mesh ref={fireInnerRef} position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
                <ConeGeometry args={[0.5, 3, 32, 1, true]} />
                <MeshBasicMaterial color="#fffbeb" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
            </Mesh>
            <PointLight ref={fireLightRef} position={[0, -1, 0]} color="#f97316" intensity={8} distance={20} decay={2} />
       </Group>
    </Group>
  );
}

const HeroGlobe = () => {
  return (
    <div className="w-full h-[500px] lg:h-[600px] relative z-10 animate-fade-in cursor-move">
      <Canvas camera={{ position: [0, 2, 14], fov: 35 }} gl={{ antialias: true, alpha: true }} shadows>
        <AmbientLight intensity={0.8} />
        <DirectionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" castShadow />
        <SpotLight position={[-10, 5, 0]} intensity={2} color="#3b82f6" angle={0.5} />
        <PointLight position={[0, -10, 0]} intensity={1} color="#ef4444" />
        
        <Environment preset="city" />

        <RealisticRocket />
        
        <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default HeroGlobe;
