import { Matrix } from 'ml-matrix';
import Renderer from './renderer';
import Vec3 from './Vec3';

const canvas = document.getElementById('main-canvas');

const viewMatrix = new Matrix([
  [-0.114, 0.994, 0, -0.099],
  [0, 0, 1, -0.5],
  [0.994, 0.114, 0, -3.534],
  [0, 0, 0, 1]
]);

const projectionMatrix = new Matrix([
  [2.414, 0, 0, 0],
  [0, 2.414, 0, 0],
  [0, 0, -1.02, -2.02],
  [0, 0, -1, 0]
]);

let modelMatrix = Matrix.eye(4);

const renderer = new Renderer(canvas);
renderer.init(viewMatrix, projectionMatrix, modelMatrix);

const cubeEdges = [
  // Bottom
  [new Vec3(0, 0, 0), new Vec3(0, 1, 0)],
  [new Vec3(0, 1, 0), new Vec3(1, 1, 0)],
  [new Vec3(1, 1, 0), new Vec3(1, 0, 0)],
  [new Vec3(1, 0, 0), new Vec3(0, 0, 0)],

  // Top
  [new Vec3(0, 0, 1), new Vec3(0, 1, 1)],
  [new Vec3(0, 1, 1), new Vec3(1, 1, 1)],
  [new Vec3(1, 1, 1), new Vec3(1, 0, 1)],
  [new Vec3(1, 0, 1), new Vec3(0, 0, 1)],

  // Left
  [new Vec3(0, 0, 0), new Vec3(0, 0, 1)],
  [new Vec3(0, 0, 1), new Vec3(1, 0, 1)],
  [new Vec3(1, 0, 1), new Vec3(1, 0, 0)],

  // Right
  [new Vec3(0, 1, 0), new Vec3(0, 1, 1)],
  [new Vec3(0, 1, 1), new Vec3(1, 1, 1)],
  [new Vec3(1, 1, 1), new Vec3(1, 1, 0)],
];

function drawCube() {
  renderer.setModelMatrix(modelMatrix);
  renderer.clearCanvas();
  renderer.drawEdges(cubeEdges);
}

function calculateNewModelMatrix(angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const halfSin = sin / 2;

  modelMatrix = new Matrix([
    [cos, -sin, 0, halfSin],
    [sin, cos, 0, halfSin],
    [0, 0, 1, halfSin],
    [0, 0, 0, 1]
  ]);
}


let angle = 0;
let deltaAngle = 2 * Math.PI / 300;
const maxAngle = 2 * Math.PI;
const interval = 16;

drawCube();
setInterval(() => {
  angle = (angle + deltaAngle) % maxAngle;

  calculateNewModelMatrix(angle);
  drawCube();
}, interval);
