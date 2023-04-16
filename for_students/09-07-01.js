/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";


class mirror extends GrObject{
  constructor(world) {
      let geometry = new T.SphereGeometry(4);
      // let tl = new T.TextureLoader().load("../textures/skybox.jpeg");
      // let normal_tl = new T.TextureLoader().load("../textures/broken_mirror.jpg");
      let mirror_group = new T.Group();
      super("mirror",mirror_group);
      this.world = world;
      let map_tl = new T.CubeTextureLoader().setPath("../textures/").load([
          'right.png',
          'left.png',
          'top.png',
          'bottom.png',
          'front.png',
          'back.png'
      ])

      const target_cube = new T.WebGLCubeRenderTarget(128,{generateMipmaps:true,minFilter:T.LinearMipMapLinearFilter});
      this.cubeCam = new T.CubeCamera(1.1,100000,target_cube);

      this.mat = new T.MeshStandardMaterial({
          envMap: this.cubeCam.renderTarget.texture,
          color: "white",
          roughness:0.1,
          metalness:1
      });

      

      let mesh = new T.Mesh(geometry,this.mat);
      mirror_group.add(this.cubeCam);
      mirror_group.add(mesh);
      mirror_group.scale.set(0.5,0.5,0.5);
      mirror_group.translateY(3);
      mirror_group.rotateY(Math.PI/2);
      
  }

  stepWorld(){
      this.cubeCam.update(this.world.renderer,this.world.scene);
  }
}

class Ball extends GrObject{
  constructor() {
    let geometry = new T.SphereGeometry(1);
    let mat = new T.MeshStandardMaterial({
      color: "red",
      metalness:0.8
     });
    let grp = new T.Group();
    super("Ball",grp);
    this.mesh = new T.Mesh(geometry,mat);
    

    this.mesh.scale.set(0.75,0.75,0.75);
    this.mesh.translateY(3);
    this.mesh.translateZ(3);
    this.mesh.rotateY(Math.PI/2);
    grp.add(this.mesh);
    this.f = 0;
  }
  
  stepWorld(delta) {
    this.f += delta;
    this.mesh.position.x = 3*Math.cos(this.f/1000),.5,3*Math.sin(this.f/1000);
  };
  
}

// function spinY(delta, obj, speed = 1) {
//   f += delta;

//   return obj;


// }

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

  let mirror_obj = new mirror(world);
  world.add(mirror_obj);

  let ball_obj = new Ball();
  // spinY(ball_obj);
  world.add(ball_obj);

  world.go();
}
test();


