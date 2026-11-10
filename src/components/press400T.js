import * as THREE from 'three';
import { createGauge } from '../utils/textures.js';

export function createPress400T(scene, xPos, zPos) {
  const group = new THREE.Group();
  group.position.set(xPos, 0, zPos);

  const whiteMat = new THREE.MeshStandardMaterial({ 
    color: 0xeef1f4, roughness: 0.35, metalness: 0.15, transparent: true, opacity: 1.0 
  });
  const orangeMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.25 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.95 });

  // 베이스 & 기둥
  const base = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.4, 3.0), whiteMat);
  base.position.y = 0.7;
  group.add(base);

  // 상형 슬라이드 & 중앙 피스톤
  const slideGroup = new THREE.Group();
  const ram = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.0, 2.2), whiteMat);
  ram.position.y = 0.5;
  slideGroup.add(ram);

  const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 2.4, 32), chromeMat);
  piston.position.y = 2.2;
  slideGroup.add(piston);

  const die = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.35, 2.0), orangeMat);
  die.position.y = -0.18;
  slideGroup.add(die);

  const baseY = 3.2;
  slideGroup.position.set(0, baseY, 0);
  group.add(slideGroup);

  const { gGroup, needlePivot } = createGauge();
  gGroup.position.set(0, 5.0, 1.52);
  group.add(gGroup);

  scene.add(group);

  // 애니메이션 업데이트 함수 반환
  return {
    group,
    bodyMat: whiteMat,
    update: (cycleProg) => {
      const rad = cycleProg * Math.PI * 2;
      needlePivot.rotation.z = -rad;
      const disp = -(Math.cos(rad) - 1) / 2 * 0.8;
      slideGroup.position.y = baseY - disp;
    }
  };
}
