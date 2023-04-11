// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import { SphereGeometry } from "../libs/CS559-Three/build/three.module.js";

class normal_Ball extends GrObject{
    constructor(plain){

        let geometry = new T.SphereGeometry(1);

        let map_tl = new T.TextureLoader().load("../textures/map_texture.jpeg");
        let bump_map = new T.TextureLoader().load("../textures/bump.jpeg");
        bump_map.wrapT = T.MirroredRepeatWrapping;
        bump_map.wrapS = T.MirroredRepeatWrapping;

        let mat = new T.MeshStandardMaterial({
            color: "#FF5F1F",
            roughness: 0.5,
            metalness: 0.2,
            side: T.DoubleSide,
            normalMap: bump_map,
            roughnessMap:map_tl,
        })

        let mesh = new T.Mesh(geometry, mat);

        super("normal_Ball"+(plain?"-plane":"-texture"),mesh);
    }
    stepWorld(delta) {
        this.objects[0].rotateOnWorldAxis(new T.Vector3(0,1,0), delta * 0.001);
      }
}

class bump_Ball extends GrObject{
    constructor(plain){

        let geometry = new T.SphereGeometry(1);

        let map_tl = new T.TextureLoader().load("../textures/map_texture.jpeg");
        let bump_map = new T.TextureLoader().load("../textures/bump.jpeg");
        bump_map.wrapT = T.MirroredRepeatWrapping;
        bump_map.wrapS = T.MirroredRepeatWrapping;

        let mat = new T.MeshStandardMaterial({
            color: "#FF5F1F",
            roughness: 0.5,
            metalness: 0.2,
            side: T.DoubleSide,
            bumpMap: bump_map,
            roughnessMap:map_tl,
        })

        let mesh = new T.Mesh(geometry, mat);

        super("bump_Ball"+(plain?"-plane":"-texture"),mesh);
    }
    stepWorld(delta) {
        this.objects[0].rotateOnWorldAxis(new T.Vector3(0,1,0), delta * 0.001);
      }
}

class color_normal_Ball extends GrObject{
    constructor(plain){

        let geometry = new T.SphereGeometry(1);

        let map_tl = new T.TextureLoader().load("../textures/map_texture.jpeg");
        let bump_map = new T.TextureLoader().load("../textures/bump.jpeg");
        bump_map.wrapT = T.MirroredRepeatWrapping;
        bump_map.wrapS = T.MirroredRepeatWrapping;

        let mat = new T.MeshStandardMaterial({
            color: "#FF5F1F",
            roughness: 0.5,
            metalness: 0.2,
            side: T.DoubleSide,
            normalMap: bump_map,
            roughnessMap:map_tl,
            map: map_tl
        })

        let mesh = new T.Mesh(geometry, mat);

        super("color_normal_Ball"+(plain?"-plane":"-texture"),mesh);
    }
    stepWorld(delta) {
        this.objects[0].rotateOnWorldAxis(new T.Vector3(0,1,0), delta * 0.001);
      }
}

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
let norm_ball = new normal_Ball();
norm_ball.objects[0].translateX(-1.5);
norm_ball.objects[0].translateY(1); // make it float a little above the table
norm_ball.objects[0].translateZ(-1);

let bump_ball = new bump_Ball();
bump_ball.objects[0].translateX(1.5);
bump_ball.objects[0].translateY(1); // make it float a little above the table
bump_ball.objects[0].translateZ(-1);

let colorNormal_ball = new color_normal_Ball();
colorNormal_ball.objects[0].translateX(2.5);
colorNormal_ball.objects[0].translateY(1); // make it float a little above the table
colorNormal_ball.objects[0].translateZ(1.5);

world.add(norm_ball);
world.add(bump_ball);
world.add(colorNormal_ball);

let spot = new T.SpotLight("yellow");
spot.angle = Math.PI / 3;
spot.target.position.set(0, 3, 0);
world.renderer.shadowMap.enabled = true;
world.scene.traverse( function(obj) {
    obj.receiveShadow = true;
    obj.castShadow = true;
  });


world.scene.add(spot);
world.go();

