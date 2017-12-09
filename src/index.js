import { Matrix } from 'ml-matrix';
import Renderer from './renderer';
import Vec3 from './Vec3';

const canvas = document.getElementById('main-canvas');

const viewMatrix = new Matrix([
  [0.1, 0.995, 3e-18, -0.498],
  [-0.066, 0.007, 0.998, -0.502],
  [0.993, -0.099, 0.066, -3.005],
  [0, 0, 0, 1]
]);

const projectionMatrix = new Matrix([
  [2.414, 0, 0, 0],
  [0, 2.414, 0, 0],
  [0, 0, -1.02, -2.02],
  [0, 0, -1, 0]
]);

const renderer = new Renderer(canvas);
renderer.init(viewMatrix, projectionMatrix);

const cubeEdges = [
  // Top
  [new Vec3(0, 0, 0), new Vec3(0, 1, 0)],
  [new Vec3(0, 1, 0), new Vec3(1, 1, 0)],
  [new Vec3(1, 1, 0), new Vec3(1, 0, 0)],
  [new Vec3(1, 0, 0), new Vec3(0, 0, 0)],

  // Bottom
  [new Vec3(0, 0, 1), new Vec3(0, 1, 1)],
  [new Vec3(0, 1, 1), new Vec3(1, 1, 1)],
  [new Vec3(1, 1, 1), new Vec3(1, 0, 1)],
  [new Vec3(1, 0, 1), new Vec3(0, 0, 1)],

  // Left
  [new Vec3(0, 0, 0), new Vec3(0, 0, 1)],
  [new Vec3(0, 0, 1), new Vec3(1, 0, 1)],
  [new Vec3(1, 0, 1), new Vec3(1, 0, 0)],
  [new Vec3(1, 0, 0), new Vec3(0, 0, 0)],

  // Right
  [new Vec3(0, 1, 0), new Vec3(0, 1, 1)],
  [new Vec3(0, 1, 1), new Vec3(1, 1, 1)],
  [new Vec3(1, 1, 1), new Vec3(1, 1, 0)],
  [new Vec3(1, 1, 0), new Vec3(0, 1, 0)],
];

cubeEdges.forEach(cubeEdge => {
  renderer.drawLine(cubeEdge[0], cubeEdge[1]);
});
