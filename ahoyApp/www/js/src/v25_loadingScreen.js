    // Initialize Three.js LoadingManager
    const loadingManager = new THREE.LoadingManager();

    // Set a minimum loading time of 3 seconds
    const minLoadingTime = 3000;
    const startTime = Date.now();

    loadingManager.onLoad = function () {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minLoadingTime - elapsedTime;

      setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
      }, Math.max(remainingTime, 0));
    };

    // Simulate loading assets
    const textureLoader = new THREE.TextureLoader(loadingManager);
    textureLoader.load('./img/assets/u_ahoy23.png');

    // Your existing Three.js initialization code
    // Example:
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    // function animate() {
    //   requestAnimationFrame(animate);
    //   renderer.render(scene, camera);
    // }
    // animate();