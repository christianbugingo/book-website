'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TermsAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);
    
    // Representing rules/structure with a geometric solid
    const geometry = new THREE.DodecahedronGeometry(1.5);
    const material = new THREE.MeshPhongMaterial({ color: 0xFF7043, flatShading: true });
    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(2, 3, 4);
    scene.add(light);
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      shape.rotation.x += 0.002;
      shape.rotation.y -= 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};


export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
         <div className="relative h-80 md:h-96">
            <TermsAnimation />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">Terms of Service</h1>
          <div className="prose dark:prose-invert text-muted-foreground">
              <p>By accessing the website at Ubwenge, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
              <p>Permission is granted to temporarily download one copy of the materials on Ubwenge's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
              <p>The materials on Ubwenge's website are provided on an 'as is' basis. Ubwenge makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
