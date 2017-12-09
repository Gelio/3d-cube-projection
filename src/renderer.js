import { Matrix } from 'ml-matrix';
import Vec3 from './Vec3';

export default class Renderer {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
  }

  /**
   * @param {Matrix} viewMatrix
   * @param {Matrix} projectionMatrix
   * @param {Matrix} modelMatrix
   */
  init(viewMatrix, projectionMatrix, modelMatrix = Matrix.eye(4)) {
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = 'black';
    this.context.strokeStyle = 'black';

    this.transformationMatrix = projectionMatrix.mmul(viewMatrix.mmul(modelMatrix));
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Matrix}
   */
  transformPoint(x, y, z) {
    const vector = Matrix.columnVector([x, y, z, 1]);

    const transformedVector = this.transformationMatrix.mmul(vector);
    transformedVector.mulColumn(0, 1 / transformedVector.get(3, 0));

    return transformedVector;
  }

  /**
   * @param {Vec3} vec
   * @returns {Matrix}
   */
  transformVec3(vec) {
    return this.transformPoint(vec.x, vec.y, vec.z);
  }

  /**
   * @param {Vec3} p1
   * @param {Vec3} p2
   */
  drawLine(p1, p2) {
    const p1Result = this.transformVec3(p1);
    const p2Result = this.transformVec3(p2);

    this.scaleToCanvasSize(p1Result);
    this.scaleToCanvasSize(p2Result);

    this.context.moveTo(p1Result.get(0, 0), p1Result.get(1, 0));
    this.context.lineTo(p2Result.get(0, 0), p2Result.get(1, 0));
    this.context.stroke();
    this.context.closePath();
  }

  /**
   * @param {Matrix} vector
   */
  scaleToCanvasSize(vector) {
    // Transform [-1; 1] to [0; 1]
    vector.addRowVector([1]).divRowVector([2]);

    // Transform to canvas size
    vector.set(0, 0, vector.get(0, 0) * this.canvas.width);
    vector.set(1, 0, vector.get(1, 0) * this.canvas.height);
  }
}
