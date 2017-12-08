import { mat4 } from 'gl-matrix';

export default function bootstrap() {
  const canvas = document.getElementById('main-canvas');
  console.log(mat4);
  const matrix = mat4.fromValues(0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3);
  console.log(matrix);
}
