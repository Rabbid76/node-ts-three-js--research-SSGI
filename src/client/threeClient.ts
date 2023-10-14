import {
    AmbientLight,
    BoxGeometry,
    Color,
    Mesh,
    MeshPhysicalMaterial,
    PerspectiveCamera,
    PCFSoftShadowMap,
    PlaneGeometry,
    PMREMGenerator,
    Scene,
    Texture,
    WebGLRenderer,
    FrontSide,
    PointLight,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// @ts-ignore
import Stats from 'three/examples/jsm/libs/stats.module' 
import { GUI } from 'dat.gui'
import { EffectComposer, EffectPass, RenderPass } from "postprocessing";
// @ts-ignore -- TS7016: Could not find declaration file
import { SSGIEffect } from 'realism-effects/src/ssgi/SSGIEffect.js';
// @ts-ignore -- TS7016: Could not find declaration file
import { VelocityDepthNormalPass } from 'realism-effects/src/temporal-reproject/pass/VelocityDepthNormalPass.js';
import EnvironmentMapResource from './../../resource/rooitou_park_1k.hdr'

export const helloCube = (canvas: any) => {
    const renderer = new WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.toneMapping = NoToneMapping;
    //renderer.outputEncoding = sRGBEncoding;
    //renderer.toneMapping = ACESFilmicToneMapping;

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 4;
    camera.position.z = 8;
    const controls = new OrbitControls(camera, renderer.domElement);

    const scene = new Scene();
    scene.background = new Color(0xc0c0c0);
    //const pmremGenerator = new PMREMGenerator(renderer);
    //const roomEnvironment = new RoomEnvironment();
    //const roomEnvironmentAmbientLight = new AmbientLight(0xffffff, 20.0);
    //roomEnvironment.add(roomEnvironmentAmbientLight);
    //const environmentTexture = pmremGenerator.fromScene(roomEnvironment, 0.04).texture;
    
    //scene.environment = environmentTexture;
    //scene.background = environmentTexture;
    scene.background = new Color(0xffffff);
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(EnvironmentMapResource, (texture: Texture, _textureData: any) => {
        scene.environment = texture;
        scene.background = texture;
    });

    //const ambientLight = new AmbientLight(0xffffff, 0.2);
    //scene.add(ambientLight);
    //const pointLight = new PointLight(0xffffff, 100);
    //pointLight.position.set(0, 4, 0);
    //pointLight.castShadow = true;
    //scene.add(pointLight);

    //const gridHelper = new GridHelper(10, 10);
    //scene.add(gridHelper);
    //const axesHelper = new AxesHelper(2);
    //scene.add(axesHelper);
    
    const groundMesh = new Mesh(new PlaneGeometry(10, 10), new MeshPhysicalMaterial({color: 0x808080, side:FrontSide}));
    groundMesh.rotation.set(-Math.PI / 2, 0, 0);
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    const backMesh = new Mesh(new PlaneGeometry(5, 3), new MeshPhysicalMaterial({color: 0xffff00, side:FrontSide}));
    backMesh.position.set(0, 1.5, -2.5);
    backMesh.rotation.set(0, 0, 0);
    backMesh.receiveShadow = true;
    scene.add(backMesh);

    const frontMesh = new Mesh(new PlaneGeometry(5, 3), new MeshPhysicalMaterial({color: 0x00ff00, side:FrontSide}));
    frontMesh.position.set(0, 1.5, 2.5);
    frontMesh.rotation.set(0, Math.PI, 0);
    frontMesh.receiveShadow = true;
    scene.add(frontMesh);

    const leftMesh = new Mesh(new PlaneGeometry(5, 3), new MeshPhysicalMaterial({color: 0xff0000, side:FrontSide}));
    leftMesh.position.set(-2.5, 1.5, 0);
    leftMesh.rotation.set(0, Math.PI / 2, 0);
    leftMesh.receiveShadow = true;
    scene.add(leftMesh);

    const rightMesh = new Mesh(new PlaneGeometry(5, 3), new MeshPhysicalMaterial({color: 0x000ff, side:FrontSide}));
    rightMesh.position.set(2.5, 1.5, 0);
    rightMesh.rotation.set(0, -Math.PI / 2, 0);
    rightMesh.receiveShadow = true;
    scene.add(rightMesh);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshPhysicalMaterial({color: 0xc0c0c0});
    const mesh = new Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.y = 0.5;
    scene.add(mesh);
    const meshTransformControl = new TransformControls(camera, renderer.domElement);
    meshTransformControl.addEventListener( 'dragging-changed', (event: any) => {
        controls.enabled = !event.value;
    });
    meshTransformControl.attach(mesh);
    meshTransformControl.visible = false;
    scene.add(meshTransformControl);

    // @ts-ignore
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    const gui = new GUI();
    const uiProperties = {
        'mesh transform control': meshTransformControl.visible,
    }
    gui.add(uiProperties, 'mesh transform control').onChange((value: any) => meshTransformControl.visible = value);

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }, false);

    let previousTimeStamp: number | undefined;
    const animate = (timestamp: number) => {
        const deltaTimeMs = timestamp - (previousTimeStamp ?? timestamp);
        previousTimeStamp = timestamp;
        requestAnimationFrame(animate);
        //mesh.rotation.y += 45 * Math.PI / 180 * deltaTimeMs / 1000;
        controls.update();
        render();
        stats.update()
    }

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    
    const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera)
    composer.addPass(velocityDepthNormalPass)
    const ssgiEffect = new SSGIEffect(scene, camera, velocityDepthNormalPass)
    const effectPass = new EffectPass(camera, ssgiEffect)
    composer.addPass(effectPass)

    const render = () => {
        //renderer.render(scene, camera);
        composer.render();
    }
    requestAnimationFrame(animate);
}

// @ts-ignore
helloCube(three_canvas);
