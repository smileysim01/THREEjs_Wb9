// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

// load the texture
// load in the cover texture
let fcg = new T.TextureLoader().load("../textures/tyre.jpg");
fcg.flipY = false;


export class Tyre extends GrObject {
    constructor(plain) {
        let geometry = new T.TorusGeometry(1,0.5);

        let mat = new T.MeshStandardMaterial(plain ? {color:"grey"} : {color:"grey", roughness: 0.75, map:fcg, side:T.DoubleSide});
        let mesh = new T.Mesh(geometry,mat);
        mesh.rotateY(Math.PI/2);
        super("Tyre"+(plain?"-plane":"-texture"),mesh);
        this.tgeom = geometry;
        this.mat = mat;
    }

    stepWorld(delta) {
        this.objects[0].rotateOnWorldAxis(new T.Vector3(0,1,0), delta * 0.005);
      }
    

}

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas, background:"blue"});
let wheel = new Tyre();
wheel.objects[0].translateY(1.5); // make it float a little above the table

let spot = new T.SpotLight("yellow");
spot.angle = Math.PI / 8; // narrow (5 degrees)
spot.position.set(0, 4, 0);
spot.target.position.set(wheel.objects[0].position.x, 1.5, wheel.objects[0].position.z);


world.add(wheel);
world.scene.add(spot);

world.go();


