/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";


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
}

class Ball extends GrObject{
  constructor() {
    let geometry = new T.SphereGeometry(1);
    let mat = new T.MeshStandardMaterial({
      color: "red",
      metalness:0.8
     });
    let mesh = new T.Mesh(geometry,mat);
      super("Ball",mesh);

      mesh.scale.set(0.75,0.75,0.75);
      mesh.translateY(3);
      mesh.translateZ(3);
      mesh.rotateY(Math.PI/2);
  }
  
  // stepWorld(delta) {
  // }
}

function test() {
  let parentOfCanvas = document.getElementById("div1");
  let world = new GrWorld({ where: parentOfCanvas });

  let tl = new T.CubeTextureLoader().setPath("../textures/").load([
    'right.png',
    'left.png',
    'top.png',
    'bottom.png',
    'front.png',
    'back.png'
  ])

  world.scene.background= tl;

  let mirror_obj = new mirror();
  world.add(mirror_obj);

  let ball_obj = new Ball();
  world.add(ball_obj);

  world.go();
}
test();


