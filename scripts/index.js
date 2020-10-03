let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
let renderer = new THREE.WebGLRenderer();

camera.position.z = 5;

renderer.setClearColor("#F7F7F7");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 });
let box = new THREE.Mesh(geometry, material);

scene.add(box);

let light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

function render() {
  requestAnimationFrame(render);
  box.rotation.x += 0.1;
  box.rotation.y += 0.1;
  renderer.render(scene, camera);
}
render();
