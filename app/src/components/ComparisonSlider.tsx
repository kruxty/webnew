import { useRef, useEffect, useCallback } from 'react';
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
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D disp;
uniform float progress;
uniform float angle;

vec2 getDirectionVector(float a) {
  float x = cos(a);
  float y = sin(a);
  return vec2(x, y) * 0.5 + 0.5;
}

void main() {
  vec2 direction = getDirectionVector(angle);
  vec4 displace = texture2D(disp, vUv);
  float displaceFactor = (displace.r * 2.0 - 1.0);
  float distanceFromCenter = length(vUv - vec2(0.5));
  float falloff = smoothstep(0.5, 0.0, distanceFromCenter);
  vec2 uvDisplaced = vUv + (direction * progress * displaceFactor * falloff);
  vec4 before = texture2D(texture1, vUv);
  vec4 after = texture2D(texture2, uvDisplaced);
  vec4 finalColor = mix(before, after, progress);
  gl_FragColor = finalColor;
}
`;

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  displacementMap: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function ComparisonSlider({
  beforeImage,
  afterImage,
  displacementMap,
}: ComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0.5);
  const targetProgressRef = useRef(0.5);
  const isDraggingRef = useRef(false);

  const initScene = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return null;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      texture1: { value: new THREE.Texture() },
      texture2: { value: new THREE.Texture() },
      disp: { value: new THREE.Texture() },
      progress: { value: 0.5 },
      angle: { value: 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const loader = new THREE.TextureLoader();

    loader.load(beforeImage, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      uniforms.texture1.value = tex;
    });
    loader.load(afterImage, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      uniforms.texture2.value = tex;
    });
    loader.load(displacementMap, (tex) => {
      uniforms.disp.value = tex;
    });

    function resize() {
      const rect = container!.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
    }

    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);
      progressRef.current += (targetProgressRef.current - progressRef.current) * 0.1;
      uniforms.progress.value = progressRef.current;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [beforeImage, afterImage, displacementMap]);

  useEffect(() => {
    const cleanup = initScene();

    const container = containerRef.current;
    if (!container) return;

    function handlePointerDown(e: PointerEvent) {
      isDraggingRef.current = true;
      updateProgress(e);
    }

    function handlePointerMove(e: PointerEvent) {
      if (!isDraggingRef.current) return;
      updateProgress(e);
    }

    function handlePointerUp() {
      isDraggingRef.current = false;
    }

    function updateProgress(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      targetProgressRef.current = Math.max(0, Math.min(1, x / rect.width));
    }

    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current + e.deltaY * 0.002));
    }

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      cleanup?.();
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [initScene]);

  const handlePosition = `${progressRef.current * 100}%`;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(10, 22, 40, 0.08)',
        cursor: 'ew-resize',
        touchAction: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* Labels */}
      <span
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          color: '#0A1628',
          padding: '6px 14px',
          borderRadius: 100,
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        ANTES
      </span>
      <span
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 2,
          background: '#FF6B5B',
          color: '#FFFFFF',
          padding: '6px 14px',
          borderRadius: 100,
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        DESPUÉS
      </span>

      {/* Handle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: handlePosition,
          width: 3,
          background: '#FFFFFF',
          transform: 'translateX(-50%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: handlePosition,
          transform: 'translate(-50%, -50%)',
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#FFFFFF',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 4,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 4L14 8L10 12" stroke="#0A1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4L2 8L6 12" stroke="#0A1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
