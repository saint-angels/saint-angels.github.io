// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('cube-bg');
  if (!canvas) return;

  // Set canvas size to match parent container width and 300px height
  const width = canvas.offsetWidth;
  const height = 300;
  canvas.width = width;
  canvas.height = height;

  // Initialize Three.js renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(width, height);

  // Create scene
  const scene = new THREE.Scene();

  // Create camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 2;

  // Create wireframe cube sized to fit image
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const material = new THREE.MeshBasicMaterial({
    color: 0xFF99AA,
    wireframe: true,
    wireframeLinewidth: 1
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Load texture and create plane with duck image
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('/images/home_duck.png', function(texture) {
    // Create plane geometry - size it to maintain aspect ratio
    const planeGeometry = new THREE.PlaneGeometry(1, 1);
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // Position at center of cube, facing camera
    plane.position.set(0, 0, 0);
    scene.add(plane);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate cube slowly
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;

    renderer.render(scene, camera);
  }

  animate();
});
