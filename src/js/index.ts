import HumanMeat from "./objects/HumanMeat";
import Stats from "stats-js";
import Beam from "./objects/Beam";
import {AmbientLight, AxesHelper, Color, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import KeyboardState from "./KeyboardState";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";

const renderer = new WebGLRenderer({antialias: true, powerPreference: 'high-performance'});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const stats = new Stats();
document.body.appendChild(stats.dom);


const scene = new Scene();
scene.background = new Color(0x111111);
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const keyboard = new KeyboardState();
const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new AmbientLight(0x404040, 1.0));

const light = new DirectionalLight(0xffffff, 1);
light.position.set(1, 10, 1).normalize();
scene.add(light);

const meat = new HumanMeat();
scene.add(meat);

const beam = new Beam();
scene.add(beam);

scene.add(new AxesHelper());

camera.position.z = 5;

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onWindowResize, false);

const animate = () => {
    requestAnimationFrame(animate);
    stats.begin();

    controls.update();
    composer.render();
    beam.update(keyboard, null);

    stats.end();
};

animate();


