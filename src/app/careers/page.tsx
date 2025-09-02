'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CareersAnimation = () => {
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

    const points = [];
    for (let i = 0; i < 5000; i++) {
        const x = THREE.MathUtils.randFloatSpread(20);
        const y = THREE.MathUtils.randFloatSpread(20);
        const z = THREE.MathUtils.randFloatSpread(20);
        points.push(x, y, z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    const material = new THREE.PointsMaterial({ color: 0xFF7043, size: 0.05 });
    const starfield = new THREE.Points(geometry, material);
    scene.add(starfield);

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
      starfield.rotation.y += 0.0005;
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


export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
         <div className="relative h-80 md:h-96">
            <CareersAnimation />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">Join Our Team</h1>
          <p className="text-lg text-muted-foreground mb-4">
            We are passionate about revolutionizing education. If you are driven, creative, and want to make an impact, Ubwenge is the place for you. Explore our open positions and help us build the future of learning.
          </p>
          <p className="text-muted-foreground">
            Currently, there are no open positions, but we are always looking for talented individuals. Send your resume to careers@ubwenge.com.
          </p>
        </div>
      </div>
    </div>
  );
}
