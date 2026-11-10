import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createPress400T } from './components/press400T.js';
import { createPress650TLine } from './components/press650T.js';
import { createForklift } from './components/forklift.js';

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0c12);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 600);
camera.position.set(22, 26, 44);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 조명 세팅
scene.add(new THREE.AmbientLight(0xffffff, 0.9));
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(20, 50, 30);
scene.add(dirLight);

// 바닥 에폭시
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(120, 70),
  new THREE.MeshStandardMaterial({ color: 0x133625, roughness: 0.3 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// 각 모듈 인스턴스 생성
const press400 = createPress400T(scene, 12.0, 4.5);
// const press650 = createPress650TLine(scene, ...);
// const forklift = createForklift(scene, ...);

const clock = new THREE.Clock();
let blankCycle = 0;

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  blankCycle = (blankCycle + delta * (24 / 60)) % 1.0;
  press400.update(blankCycle);

  controls.update();
  renderer.render(scene, camera);
}
animate();
