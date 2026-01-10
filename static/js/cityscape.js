// Cityscape visualization
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('cityscape');
  if (!canvas) return;

  // Set canvas size
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  // Initialize Three.js renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  // Create scene
  const scene = new THREE.Scene();

  // Create camera
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 3, 8);
  camera.lookAt(0, 0, 0);

  // Create buildings grid
  const buildingMaterial = new THREE.MeshBasicMaterial({
    color: 0x808080,
    wireframe: true
  });

  const buildings = [];
  const gridSize = 8; // 8x8 grid of buildings
  const spacing = 2;

  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      // Random height for each building
      const height = Math.random() * 3 + 0.5;
      const geometry = new THREE.BoxGeometry(0.8, height, 0.8);
      const building = new THREE.Mesh(geometry, buildingMaterial);

      // Position buildings in a grid
      building.position.x = (x - gridSize / 2) * spacing;
      building.position.y = height / 2;
      building.position.z = (z - gridSize / 2) * spacing;

      scene.add(building);
      buildings.push(building);
    }
  }

  // Add ground plane
  const groundGeometry = new THREE.PlaneGeometry(gridSize * spacing, gridSize * spacing);
  const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0x404040,
    wireframe: true
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Animation
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.005;

    // Slowly pan camera around the city
    camera.position.x = Math.sin(time * 0.3) * 10;
    camera.position.z = Math.cos(time * 0.3) * 10;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', function() {
    const newWidth = canvas.offsetWidth;
    const newHeight = canvas.offsetHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
});
