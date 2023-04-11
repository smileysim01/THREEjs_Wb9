// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas, groundplane: false});

export class Tyre extends GrObject {
    constructor(plain) {
        let geometry = new T.TorusGeometry(1,0.5);
        let tl = new T.TextureLoader().load("../textures/tyre.jpg");

        let mat = new T.MeshStandardMaterial(plain ? {color:"grey"} : {color:"grey", roughness: 0.75, map:tl, side:T.DoubleSide});
        let mesh = new T.Mesh(geometry,mat);
        mesh.translateY(1.5);
        mesh.rotateY(Math.PI/2);
        super("Tyre"+(plain?"-plane":"-texture"),mesh);
    }

    stepWorld(delta) {
        this.objects[0].rotateOnWorldAxis(new T.Vector3(0,1,0), delta * 0.005);
      }
}

world.scene.background= new T.CubeTextureLoader().setPath("../textures/").load([
    'right.png',
    'left.png',
    'top.png',
    'bottom.png',
    'front.png',
    'back.png'
])

let tyre = new Tyre();
world.add(tyre);

world.go();