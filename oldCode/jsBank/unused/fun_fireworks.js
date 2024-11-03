function triggerFireworks() {
    const container = document.body;
    const options = {
        maxRockets: 3,            // max # of rockets to spawn
        rocketSpawnInterval: 150, // millisends to check if new rockets should spawn
        numParticles: 100,        // number of particles to spawn when rocket explodes (+0-10)
        explosionMinHeight: 0.2,  // percentage. min height at which rockets can explode
        explosionMaxHeight: 0.9,  // percentage. max height before a particle is exploded
        explosionChance: 0.08     // chance in each tick the rocket will explode
    };
    const fireworks = new Fireworks(container, options);
    fireworks.start();
}