import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ThreeAvatarProps {
  mousePosition: { x: number; y: number };
  onWave?: () => void;
  isHovered?: boolean;
}

const ThreeAvatar: React.FC<ThreeAvatarProps> = ({ mousePosition, onWave, isHovered = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const avatarRef = useRef<THREE.Group>();
  const mixerRef = useRef<THREE.AnimationMixer>();
  const clockRef = useRef<THREE.Clock>();
  const frameRef = useRef<number>();
  const waveActionRef = useRef<THREE.AnimationAction>(); // Ref to store the wave action
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      30,
      400 / 400, // Square aspect ratio for the avatar container
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 3);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(2, 5, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.4);
    fillLight.position.set(-2, 2, 2);
    scene.add(fillLight);

    // Clock for animations
    const clock = new THREE.Clock();
    clockRef.current = clock;

    // Add a subtle circle around the model
    const circleGeometry = new THREE.CircleGeometry(1.0, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xaaaaaa, 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15
    });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.rotation.x = -Math.PI / 2;
    circle.position.y = -0.5;
    scene.add(circle);

    // Load avatar
    const loader = new GLTFLoader();
    const avatarUrl = '/Animated_RPM_Wave.glb';
    loader.load(avatarUrl,
      (gltf) => {
        const avatar = gltf.scene;
        avatarRef.current = avatar;
        
        // **MODIFIED**: Scale and position the avatar to bring it "in front"
        avatar.scale.setScalar(0.75);
        avatar.position.set(-0.19, 0.7, 0.5); // Increased Z value to move closer to the camera
        
        avatar.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(mat => {
                  if (mat instanceof THREE.MeshStandardMaterial) {
                    mat.metalness = 0.1;
                    mat.roughness = 0.8;
                  }
                });
              } else if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.metalness = 0.1;
                child.material.roughness = 0.8;
              }
            }
          }
        });
        
        scene.add(avatar);
        
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(avatar);
          mixerRef.current = mixer;
          
          const waveAnimation = gltf.animations.find(clip => 
            clip.name.toLowerCase().includes('wave') || 
            clip.name.toLowerCase().includes('hello') ||
            gltf.animations.indexOf(clip) === 0
          );
          
          if (waveAnimation) {
            const waveAction = mixer.clipAction(waveAnimation);
            waveAction.setLoop(THREE.LoopOnce);
            waveAction.clampWhenFinished = true;
            waveActionRef.current = waveAction; // Store action in ref

            // **MODIFIED**: Use event listener for more reliable state updates
            mixer.addEventListener('finished', (e) => {
                if (e.action === waveActionRef.current) {
                    setIsWaving(false);
                    if (!isInteractive) {
                        setIsInteractive(true); // Enable interaction after the first wave
                    }
                }
            });

            // Auto-play wave animation on load
            waveAction.reset().play();
            setIsWaving(true);
          }
        }
        
        setIsLoaded(true);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading avatar:', error);
        createFallbackCharacter(scene);
        setIsLoaded(true);
        setIsInteractive(true);
      }
    );

    mountRef.current.appendChild(renderer.domElement);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
      
      if (avatarRef.current && isLoaded && isInteractive) {
        const headRotationX = (mousePosition.y - 50) * 0.002;
        const headRotationY = (mousePosition.x - 50) * 0.002;
        
        avatarRef.current.traverse((child) => {
          if (child.name.toLowerCase().includes('head') || child.name.toLowerCase().includes('neck')) {
            child.rotation.x = THREE.MathUtils.lerp(child.rotation.x, headRotationX, 0.15);
            child.rotation.y = THREE.MathUtils.lerp(child.rotation.y, headRotationY, 0.15);
          }
        });

        if (isHovered) {
          const bodyRotationY = (mousePosition.x - 50) * 0.0005;
          avatarRef.current.rotation.y = THREE.MathUtils.lerp(avatarRef.current.rotation.y, bodyRotationY, 0.1);
        } else {
          avatarRef.current.rotation.y = THREE.MathUtils.lerp(avatarRef.current.rotation.y, 0, 0.1);
        }
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {}, [mousePosition, isHovered]);

  // **MODIFIED**: Simplified and more reliable wave trigger
  const triggerWave = () => {
    if (!isInteractive || isWaving || !waveActionRef.current) return;
    
    // Chain .stop() before .reset() and .play()
    waveActionRef.current.stop().reset().play();
    setIsWaving(true);
    
    if (onWave) onWave();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerWave();
    }
  };

  const createFallbackCharacter = (scene: THREE.Scene) => {
    // ... (fallback character code remains the same)
  };

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full">
        <div 
          ref={mountRef} 
          className={`w-full h-full transition-all duration-1000 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
          } ${isInteractive && isHovered ? 'scale-105' : ''} ${
            isInteractive ? 'cursor-pointer' : 'cursor-default'
          }`}
          style={{ filter: isLoaded ? 'none' : 'blur(2px)' }}
          onClick={isInteractive ? triggerWave : undefined}
          onKeyDown={isInteractive ? handleKeyDown : undefined}
          tabIndex={isInteractive ? 0 : -1}
          role={isInteractive ? "button" : undefined}
          aria-label={isInteractive ? "Click to make the avatar wave" : "Loading avatar"}
        >
        </div>
        
        {isInteractive && !isWaving && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/60 opacity-70 animate-pulse bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
            Click to wave!
          </div>
        )}
      </div>
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/60 text-sm animate-pulse bg-black/20 px-3 py-2 rounded backdrop-blur-sm">Loading...</div>
        </div>
      )}

      {isWaving && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce">
          👋
        </div>
      )}
    </div>
  );
};

export default ThreeAvatar;