import * as THREE from 'three';

// Initialize WebGL Scene
let scene, camera, renderer, material, mesh;
function initBackgroundEffect() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    let geometry = new THREE.PlaneGeometry(2, 2);
    let texture = new THREE.TextureLoader().load("/assets/data/transition1.png");

    material = new THREE.ShaderMaterial({
        uniforms: {
            texture: { value: texture },
            time: { value: 0 },
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D texture;
            uniform float time;
            varying vec2 vUv;

            void main() {
                vec2 uv = vUv;
                uv.x += sin(uv.y * 10.0 + time) * 0.02;
                uv.y += cos(uv.x * 10.0 + time) * 0.02;

                vec4 texColor = texture2D(texture, uv);
                gl_FragColor = vec4(texColor.rgb, 1.0);
            }
        `
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value += 0.05;
    renderer.render(scene, camera);
}

initBackgroundEffect();
