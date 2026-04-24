import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision mediump float;
varying vec2 vUv;
uniform float uAspect;
uniform float uBlobRadius;
uniform float uMotionIntensity;
uniform float uTime;
uniform vec2 uPointer;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float sdCircle(vec2 p, vec2 center, float radius) {
  return length(p - center) - radius;
}

float smoothMin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

void main() {
  vec2 p = vUv;
  p.x *= uAspect;
  float t = uTime;

  vec2 c0 = vec2(uPointer.x * uAspect, 1.0 - uPointer.y);
  vec2 c1 = vec2(0.5 * uAspect + sin(t * 0.7) * uMotionIntensity, 0.5 + cos(t * 0.5) * uMotionIntensity * 0.5);
  vec2 c2 = vec2(0.3 * uAspect + cos(t * 0.6 + 1.0) * uMotionIntensity, 0.4 + sin(t * 0.8 + 2.0) * uMotionIntensity * 0.5);
  vec2 c3 = vec2(0.7 * uAspect + sin(t * 0.5 + 3.0) * uMotionIntensity, 0.6 + cos(t * 0.7 + 1.5) * uMotionIntensity * 0.5);
  vec2 c4 = vec2(0.5 * uAspect + cos(t * 0.4 + 2.0) * uMotionIntensity * 0.8, 0.3 + sin(t * 0.6 + 4.0) * uMotionIntensity * 0.5);

  float r = uBlobRadius;
  float d0 = sdCircle(p, c0, r);
  float d1 = sdCircle(p, c1, r);
  float d2 = sdCircle(p, c2, r);
  float d3 = sdCircle(p, c3, r);
  float d4 = sdCircle(p, c4, r);

  float d = smoothMin(d0, d1, 0.1);
  d = smoothMin(d, d2, 0.1);
  d = smoothMin(d, d3, 0.1);
  d = smoothMin(d, d4, 0.1);

  float circle = 1.0 - smoothstep(-0.01, 0.01, d);

  vec3 bg = vec3(0.039, 0.086, 0.157);
  vec3 red = vec3(1.0, 0.42, 0.36);
  vec3 green = vec3(0.48, 0.56, 0.49);
  float gradientPos = vUv.x;
  vec3 blobColor = mix(red, green, gradientPos);

  float noise = (random(vUv * 100.0 + t) - 0.5) * 0.02;

  vec3 finalColor = mix(bg, blobColor, circle);
  finalColor += noise;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function MetaballField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
    });
    // Force pixel ratio to 1 for smoother performance across all devices
    renderer.setPixelRatio(1);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1, 1);
    camera.position.z = 1;

    const uniforms = {
      uAspect: { value: 1.0 },
      uBlobRadius: { value: isMobile ? 0.08 : 0.12 },
      uMotionIntensity: { value: 0.5 },
      uTime: { value: 0.0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const pointer = { x: 0.5, y: 0.5 };

    function onResize() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.uAspect.value = w / h;
    }

    window.addEventListener('resize', onResize);
    onResize();

    // Smoother mouse tracking with higher lerp factor
    function onMouseMove(e: MouseEvent) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      pointer.x += (x - pointer.x) * 0.08;
      pointer.y += (y - pointer.y) * 0.08;
    }

    window.addEventListener('mousemove', onMouseMove);

    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        const x = e.touches[0].clientX / window.innerWidth;
        const y = e.touches[0].clientY / window.innerHeight;
        pointer.x += (x - pointer.x) * 0.15;
        pointer.y += (y - pointer.y) * 0.15;
      }
    }

    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const baseRadius = isMobile ? 0.08 : 0.12;

    function onClick() {
      uniforms.uBlobRadius.value = baseRadius * 1.3;
      setTimeout(() => {
        uniforms.uBlobRadius.value = baseRadius;
        material.needsUpdate = true;
      }, 300);
    }

    window.addEventListener('click', onClick);
    window.addEventListener('touchstart', onClick, { passive: true });

    let animationId: number;
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    function animate(currentTime: number) {
      animationId = requestAnimationFrame(animate);
      
      // Frame skip for smoother perceived motion on slower devices
      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);
      
      uniforms.uTime.value += 0.008;
      uniforms.uPointer.value.x = pointer.x;
      uniforms.uPointer.value.y = pointer.y;
      renderer.render(scene, camera);
    }

    animate(0);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchstart', onClick);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="metaball-canvas"
      role="presentation"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
      }}
    />
  );
}
