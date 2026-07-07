"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { buildConstellation } from "./points";

export interface ConstellationProps {
  /** 0 = formed map, 1 = fully dispersed. Written by scroll choreography. */
  progressRef: MutableRefObject<number>;
  /** true → white points (for black sections). */
  inverted?: boolean;
  /** false pauses the render loop (offscreen). */
  active?: boolean;
}

const VERT = /* glsl */ `
  attribute vec3 aScatter;
  attribute float aSize;
  attribute float aPhase;
  uniform float uProgress;
  uniform float uTime;
  uniform float uScale;
  varying float vAlpha;
  varying float vNode;

  void main() {
    vNode = step(3.5, aSize);
    // Non-node points drift out slightly later than they fade — the map
    // dissolves from texture to dust.
    vec3 pos = mix(position, aScatter, uProgress);
    // Ambient breathing on the formed map.
    pos.x += sin(uTime * 0.4 + aPhase) * 0.004 * (1.0 - uProgress);
    pos.y += cos(uTime * 0.3 + aPhase * 1.7) * 0.004 * (1.0 - uProgress);

    float pulse = vNode * (0.3 + 0.3 * sin(uTime * 1.4 + aPhase));
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (1.0 + pulse) * uScale;

    float base = mix(0.62, 1.0, vNode);
    vAlpha = base * (1.0 - uProgress * 0.92) * (0.85 + 0.15 * sin(uTime * 0.9 + aPhase));
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  varying float vNode;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = 1.0 - smoothstep(0.38, 0.5, d);
    // Nodes get a soft halo beyond the disc.
    float halo = vNode * (1.0 - smoothstep(0.0, 0.5, d)) * 0.35;
    float a = max(disc, halo) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

function Points({ progressRef, inverted }: ConstellationProps) {
  const data = useMemo(() => buildConstellation(1), []);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    g.setAttribute("aScatter", new THREE.BufferAttribute(data.scatter, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(data.sizes, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(data.phases, 1));
    return g;
  }, [data]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uScale: { value: 1 },
          uColor: { value: new THREE.Color(inverted ? "#ffffff" : "#000000") },
        },
      }),
    [inverted]
  );

  useFrame((state) => {
    const mat = matRef.current;
    if (mat) {
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      mat.uniforms.uProgress.value = progressRef.current;
      // Point sizes track canvas resolution so density reads the same
      // at every viewport.
      mat.uniforms.uScale.value = (size.width / 640) * state.viewport.dpr;
    }
    // Mouse parallax: gentle group rotation, lerped.
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.05;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.05;
    if (groupRef.current) {
      groupRef.current.rotation.y = pointer.current.x * 0.09;
      groupRef.current.rotation.x = -pointer.current.y * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <primitive object={material} ref={matRef} attach="material" />
      </points>
    </group>
  );
}

function Rig() {
  const { camera, size } = useThree();
  // Orthographic frame: map x-range (±1) plus breathing room fills the canvas.
  const cam = camera as THREE.OrthographicCamera;
  cam.zoom = size.width / 2 / 1.12;
  cam.updateProjectionMatrix();
  return null;
}

export default function ConstellationGL(props: ConstellationProps) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 5], near: 0.1, far: 20 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={props.active === false ? "never" : "always"}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      aria-hidden="true"
    >
      <Rig />
      <Points {...props} />
    </Canvas>
  );
}
