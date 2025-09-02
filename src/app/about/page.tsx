'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AboutAnimation = () => {
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

    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0xff7043, roughness: 0.2, metalness: 0.5 });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

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
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.005;
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


export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
         <div className="relative h-80 md:h-96">
            <AboutAnimation />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">About Ubwenge</h1>
          <p className="text-lg text-muted-foreground mb-4">
            "Ubwenge" means "knowledge" or "wisdom" in Kinyarwanda. Our mission is to make learning more accessible, collaborative, and effective for students everywhere. We believe that by leveraging the power of AI and community, we can unlock new potentials in education.
          </p>
           <p className="text-lg text-muted-foreground">
            Founded in 2024, Ubwenge started as a small project to help students organize their study materials. It has since grown into a comprehensive platform that supports every step of the learning journey.
          </p>
        </div>
      </div>
    </div>
  );
}
