// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

// load the texture
// load in the cover texture
let fcg = new T.TextureLoader().load("../textures/book_cover.jpg");
fcg.flipY = false;

// size of the book in inches
const bookWidth = 6.8  / 12;
const bookLength = 9.8/ 12;
const bookHeight = 1.8/ 12; 
const overhang = .03;

export class Book extends GrObject {
    constructor(plain) {
        const positions = new Float32Array( [
            // bottom
            0,0,0, 
            bookWidth,0,0,
            bookWidth,0,bookLength,
            0,0,bookLength,
            // top
            0,bookHeight,0,
            bookWidth,bookHeight,0,
            bookWidth,bookHeight,bookLength,
            0,bookHeight,bookLength,
            // back spine (X=0)
            0,0,0,
            0,0,bookLength,
            0,bookHeight,bookLength,
            0,bookHeight,0,
            // front edge (Z=0)
            0,0,overhang,
            bookWidth-overhang,0,overhang,
            bookWidth-overhang,bookHeight,overhang,
            0,bookHeight,overhang,
            // side edge X=1
            bookWidth-overhang,0,overhang,
            bookWidth-overhang,0,bookLength-overhang,
            bookWidth-overhang,bookHeight,bookLength-overhang,
            bookWidth-overhang,bookHeight,overhang,
            // away edge (Z=1)
            0,0,bookLength-overhang,
            bookWidth-overhang,0,bookLength-overhang,
            bookWidth-overhang,bookHeight,bookLength-overhang,
            0,bookHeight,bookLength-overhang,

        ]);
        const normals = new Float32Array( [
            // bottom
            0,-1,0,
            0,-1,0,
            0,-1,0,
            0,-1,0,
            // top
            0,1,0,
            0,1,0,
            0,1,0,
            0,1,0,
            // back spine
            -1,0,0,
            -1,0,0,
            -1,0,0,
            -1,0,0,
            // front edge Z=0
            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
            // right edge x=1;
            1,0,0,
            1,0,0,
            1,0,0,
            1,0,0,
            // away edge z=1
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1
        ]);
        const uvs = new Float32Array( [
            // bottom (back of book)
            232/512,0,
            0      ,0,
            0,      1,
            232/512,1,
            // top (front of book)
            290/512, 0,
            1, 0,
            1,1,
            290/512,1,
            // back spine
            232/512,0,
            232/512,1,
            290/512,1,
            290/512,0,
            // front edge - arbitrary - in the white region
            0.8,0.8,
            0.8,0.8,
            0.8,0.8,
            0.8,0.8,
            // right edge - arbitrary - in the white region
            0.8,0.8,
            0.8,0.8,
            0.8,0.8,
            0.8,0.8,
            
            // away edge - arbitrary - in the white region
            0.8,0.8,
            0.8,0.8,
            0.8,0.8,
            0.8,0.8
        ]);


        let geometry = new T.BufferGeometry();
        geometry.setAttribute("position",new T.BufferAttribute(positions,3));
        geometry.setAttribute("normal",new T.BufferAttribute(normals,3));
        geometry.setAttribute("uv",new T.BufferAttribute(uvs,2));
        geometry.setIndex([
            0,1,2,  // bottom
            0,2,3,
            6,5,4,  // top
            7,6,4,
            8,10,9, // spine
            8,11,10,
            12,13,14, // front
            12,14,15,

            16,17,18,   // side
            16,18,19,
            20,22,21,
            20,23,22 
        ]);
        

        let mat = new T.MeshStandardMaterial(plain ? {color:"orange"} : {color:"white", roughness: 0.75,metalness: 0.5, map:fcg, side:T.DoubleSide});
        let mesh = new T.Mesh(geometry,mat);
        super("Book"+(plain?"-plane":"-texture"),mesh);
        this.bgeom = geometry;
        this.mat = mat;
    }

}

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
let book = new Book();
book.objects[0].translateY(.01); // make it float a little above the table
book.objects[0].scale.set(3,3,3);
world.add(book);
world.go();



