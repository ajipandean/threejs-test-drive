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
let x = -10;

for (let i = 0; i < 15; i++) {
  let box = new THREE.Mesh(geometry, material);
  box.position.x = (Math.random() - 0.5) * 10;
  box.position.y = (Math.random() - 0.5) * 10;
  box.position.z = (Math.random() - 0.5) * 10;
  scene.add(box);
  x++;
}

let light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

window.addEventListener('click', function (event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  let intersects = raycaster.intersectObjects(scene.children, true);

  for (let i = 0; i < intersects.length; i++) {
    let timeline = new TimelineMax();
    timeline.to(intersects[i].object.scale, 0.5, { x: 2, ease: Expo.easeOut });
    timeline.to(intersects[i].object.rotation, 0.5, { x: -2, ease: Expo.easeOut }, '= -0.5');
    timeline.to(intersects[i].object.scale, 0.5, { z: 2, ease: Expo.easeOut });
    timeline.to(intersects[i].object.scale, 0.5, { x: 1, ease: Expo.easeOut });
    timeline.to(intersects[i].object.scale, 0.5, { z: 1, ease: Expo.easeOut }, '= -0.5');
    timeline.to(intersects[i].object.position, 0.5, { x: 1, ease: Expo.easeOut });
    timeline.to(intersects[i].object.rotation, 0.5, { x: 5, ease: Expo.easeOut });
    timeline.to(intersects[i].object.scale, 0.5, { x: 4, ease: Expo.easeOut });
    timeline.to(intersects[i].object.rotation, 0.5, { x: 0, ease: Expo.easeOut });
    timeline.to(intersects[i].object.scale, 0.5, { x: 1, ease: Expo.easeOut }, '= -0.5');
  }
});
