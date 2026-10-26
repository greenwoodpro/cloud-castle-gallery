import assert from 'node:assert/strict';
import * as THREE from 'three';
import { buildLandscape } from '../src/landscape.js';
import { buildCastle } from '../src/castle.js';
import { buildLife } from '../src/life.js';

// Exercises the real builders without a browser. It cannot establish WebGL
// rendering, visual quality, visibility, shadows, or camera framing.
const scene = new THREE.Scene();
const landscape = buildLandscape(scene);
const castle = buildCastle(scene);
const life = buildLife(scene);
function finite(values, label) {
  assert.ok(values.every(Number.isFinite), `${label} contains NaN or Infinity`);
}
function metadata(items, label) {
  assert.ok(Array.isArray(items) && items.length > 0, `${label} must be a nonempty array`);
  const ids = new Set();
  for (const item of items) {
    assert.equal(typeof item.id, 'string', `${label} requires a string id`);
    assert.ok(!ids.has(item.id), `duplicate ${label} id: ${item.id}`);
    ids.add(item.id);
    assert.ok(Array.isArray(item.position) && item.position.length === 3, `${label}/${item.id} needs a 3D position`);
    finite(item.position, `${label}/${item.id} position`);
    assert.ok(item.title || item.name, `${label}/${item.id} needs a display name`);
  }
}
metadata(landscape.landmarks, 'landmarks');
metadata(castle.rooms, 'rooms');
metadata(life.characters, 'characters');
assert.ok(castle.rooms.length >= 4, 'the castle should contain at least four described rooms');
for (const [key, objects] of Object.entries({ cutawayObjects: castle.cutawayObjects, roofs: castle.roofs })) {
  assert.ok(Array.isArray(objects) && objects.length > 0, `${key} must expose removable outer structures`);
  for (const object of objects) {
    assert.ok(object instanceof THREE.Object3D, `${key} contains a value that is not Object3D`);
    let ancestor = object;
    while (ancestor && ancestor !== scene) ancestor = ancestor.parent;
    assert.equal(ancestor, scene, `${key} object is not attached to the scene`);
  }
}
const seenGeometry = new Set();
let meshes = 0, instances = 0, renderedTriangles = 0;
const box = new THREE.Box3();
const instanceMatrix = new THREE.Matrix4();
function checkScene(time, count = false) {
  for (const [name, system] of Object.entries({ landscape, castle, life })) {
    assert.ok(system.group instanceof THREE.Object3D, `${name} must return its group`);
    assert.equal(typeof system.update, 'function', `${name} must expose update(time)`);
    system.update(time);
  }
  scene.updateMatrixWorld(true);
  scene.traverse(object => {
    const label = object.name || object.type;
    finite(object.position.toArray(), `${label} position at t=${time}`);
    finite(object.quaternion.toArray(), `${label} quaternion at t=${time}`);
    finite(object.scale.toArray(), `${label} scale at t=${time}`);
    finite(object.matrixWorld.elements, `${label} world matrix at t=${time}`);
    if (!object.isMesh) return;
    if (count) meshes++;
    const geometry = object.geometry;
    assert.ok(geometry instanceof THREE.BufferGeometry, `${label} must have BufferGeometry`);
    const positions = geometry.getAttribute('position');
    assert.ok(positions && positions.itemSize === 3 && positions.count > 0, `${label} needs finite vertex positions`);
    if (!seenGeometry.has(geometry)) {
      finite(Array.from(positions.array), `${label} geometry`);
      if (geometry.index) {
        assert.ok(Array.from(geometry.index.array).every(index => Number.isInteger(index) && index >= 0 && index < positions.count), `${label} has invalid vertex indices`);
      }
      geometry.computeBoundingBox();
      assert.ok(!geometry.boundingBox.isEmpty(), `${label} geometry has an empty bounding box`);
      finite([...geometry.boundingBox.min.toArray(), ...geometry.boundingBox.max.toArray()], `${label} geometry bounds`);
      seenGeometry.add(geometry);
    }
    if (object.isInstancedMesh) {
      if (count) instances += object.count;
      for (let i = 0; i < object.count; i++) {
        object.getMatrixAt(i, instanceMatrix);
        finite(instanceMatrix.elements, `${label} instance ${i}`);
      }
    }
    if (count) renderedTriangles += ((geometry.index?.count ?? positions.count) / 3) * (object.isInstancedMesh ? object.count : 1);
    box.setFromObject(object);
    assert.ok(!box.isEmpty(), `${label} object has an empty world bounding box`);
    finite([...box.min.toArray(), ...box.max.toArray()], `${label} object bounds at t=${time}`);
  });
}
for (const time of [0, 10, 100]) checkScene(time, time === 0);
// Exercise the same exposed objects consumed by the UI's cutaway action.
const outerObjects = [...new Set([...castle.cutawayObjects, ...castle.roofs])];
const oldVisibility = outerObjects.map(object => object.visible);
outerObjects.forEach(object => { object.visible = false; });
checkScene(100);
outerObjects.forEach((object, i) => { object.visible = oldVisibility[i]; });
console.log(`Scene geometry verified: ${meshes} meshes; ${instances} instances; ${Math.round(renderedTriangles).toLocaleString('en-US')} triangles; ${castle.rooms.length} rooms; ${life.characters.length} people.`);
console.log(`Validated t=0,10,100; ${seenGeometry.size} shared geometries; ${outerObjects.length} cutaway structures; finite transforms, vertices, instance matrices and bounds.`);
console.log('Limit: no WebGL rendering or visual visibility check was performed by this Node script.');
