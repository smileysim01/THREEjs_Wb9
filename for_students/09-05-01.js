// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas, groundplane: false });

world.scene.background= new T.CubeTextureLoader().setPath("../textures/").load([
    'right.png',
    'left.png',
    'top.png',
    'bottom.png',
    'front.png',
    'back.png'
])

class mirror extends GrObject{
    constructor() {
        let geometry = new T.BoxGeometry(1,11,15);
        let tl = new T.TextureLoader().load("../textures/skybox.jpeg");
        let normal_tl = new T.TextureLoader().load("../textures/broken_mirror.jpg");

        let map_tl = new T.CubeTextureLoader().setPath("../textures/").load([
            'right.png',
            'left.png',
            'top.png',
            'bottom.png',
            'front.png',
            'back.png'
        ])

        let mat = new T.MeshBasicMaterial({
            envMap: map_tl,
            color: "white", 
            map:normal_tl
        });
        let mesh = new T.Mesh(geometry,mat);
        mesh.scale.set(0.5,0.5,0.5);
        mesh.translateY(3);
        mesh.rotateY(Math.PI/2);
        super("mirror",mesh);
    }

    stepWorld(delta) {
        this.objects[0].rotateOnWorldAxis(new T.Vector3(0,1,0), delta * 0.0005);
      }
}

let mirror_obj = new mirror();
world.add(mirror_obj);

world.go();

