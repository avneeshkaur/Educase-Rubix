export class RubiksCube {
  constructor() {
    this.faces = {
      U: this.createFace('W'),
      D: this.createFace('Y'),
      L: this.createFace('O'),
      R: this.createFace('R'),
      F: this.createFace('G'),
      B: this.createFace('B')
    };
    this.moveHistory = [];
    this.recordingEnabled = true; // Add recording flag
  }

  setRecording(enabled) {
    this.recordingEnabled = enabled;
  }

  createFace(color) {
    return Array(3).fill(null).map(() => Array(3).fill(color));
  }

  rotateFaceClockwise(face) {
    const original = this.faces[face];
    const rotated = [
      [original[2][0], original[1][0], original[0][0]],
      [original[2][1], original[1][1], original[0][1]],
      [original[2][2], original[1][2], original[0][2]]
    ];
    this.faces[face] = rotated;
  }

  rotateFaceCounterClockwise(face) {
    const original = this.faces[face];
    const rotated = [
      [original[0][2], original[1][2], original[2][2]],
      [original[0][1], original[1][1], original[2][1]],
      [original[0][0], original[1][0], original[2][0]]
    ];
    this.faces[face] = rotated;
  }

  rotateU() {
    this.rotateFaceClockwise('U');
    const temp = [...this.faces.F[0]];
    this.faces.F[0] = [...this.faces.R[0]];
    this.faces.R[0] = [...this.faces.B[0]];
    this.faces.B[0] = [...this.faces.L[0]];
    this.faces.L[0] = temp;
    if (this.recordingEnabled) {
      this.moveHistory.push({ face: 'U', direction: 'clockwise' });
    }
  }

  rotateD() {
    this.rotateFaceClockwise('D');
    const temp = [...this.faces.F[2]];
    this.faces.F[2] = [...this.faces.L[2]];
    this.faces.L[2] = [...this.faces.B[2]];
    this.faces.B[2] = [...this.faces.R[2]];
    this.faces.R[2] = temp;
    if (this.recordingEnabled) {
      this.moveHistory.push({ face: 'D', direction: 'clockwise' });
    }
  }

  rotateL() {
    this.rotateFaceClockwise('L');
    const temp = [this.faces.U[0][0], this.faces.U[1][0], this.faces.U[2][0]];
    for (let i = 0; i < 3; i++) {
      this.faces.U[i][0] = this.faces.B[2 - i][2];
      this.faces.B[2 - i][2] = this.faces.D[i][0];
      this.faces.D[i][0] = this.faces.F[i][0];
      this.faces.F[i][0] = temp[i];
    }
    if (this.recordingEnabled) {
      this.moveHistory.push({ face: 'L', direction: 'clockwise' });
    }
  }

  rotateR() {
    this.rotateFaceClockwise('R');
    const temp = [this.faces.U[0][2], this.faces.U[1][2], this.faces.U[2][2]];
    for (let i = 0; i < 3; i++) {
      this.faces.U[i][2] = this.faces.F[i][2];
      this.faces.F[i][2] = this.faces.D[i][2];
      this.faces.D[i][2] = this.faces.B[2 - i][0];
      this.faces.B[2 - i][0] = temp[i];
    }
    if (this.recordingEnabled) {
      this.moveHistory.push({ face: 'R', direction: 'clockwise' });
    }
  }

  rotateF() {
    this.rotateFaceClockwise('F');
    const temp = [...this.faces.U[2]];
    this.faces.U[2] = [this.faces.L[2][2], this.faces.L[1][2], this.faces.L[0][2]];
    for (let i = 0; i < 3; i++) {
      this.faces.L[i][2] = this.faces.D[0][i];
    }
    this.faces.D[0] = [this.faces.R[2][0], this.faces.R[1][0], this.faces.R[0][0]];
    for (let i = 0; i < 3; i++) {
      this.faces.R[i][0] = temp[2 - i];
    }
    if (this.recordingEnabled) {
      this.moveHistory.push({ face: 'F', direction: 'clockwise' });
    }
  }

  rotateB() {
    this.rotateFaceClockwise('B');
    const temp = [...this.faces.U[0]];
    this.faces.U[0] = [this.faces.R[0][2], this.faces.R[1][2], this.faces.R[2][2]];
    for (let i = 0; i < 3; i++) {
      this.faces.R[i][2] = this.faces.D[2][2 - i];
    }
    this.faces.D[2] = [this.faces.L[0][0], this.faces.L[1][0], this.faces.L[2][0]];
    for (let i = 0; i < 3; i++) {
      this.faces.L[i][0] = temp[2 - i];
    }
    if (this.recordingEnabled) {
      this.moveHistory.push({ face: 'B', direction: 'clockwise' });
    }
  }

  applyMove(move) {
    const { face, direction } = move;
  
    if (direction === 'clockwise') {
      this['rotate' + face](); // calls rotateF(), rotateU() etc
    } else {
      this.rotateFaceByNameCounterClockwise(face);
    }
  }

  scrambleCube(moves = 20) {
    const actions = ['rotateU', 'rotateD', 'rotateL', 'rotateR', 'rotateF', 'rotateB'];
    for (let i = 0; i < moves; i++) {
      const action = actions[Math.floor(Math.random() * actions.length)];
      this[action]();
    }
  }

  rotateFaceByNameCounterClockwise(face) {
    this.rotateFaceCounterClockwise(face);

    if (face === 'U') {
      const temp = [...this.faces.F[0]];
      this.faces.F[0] = [...this.faces.L[0]];
      this.faces.L[0] = [...this.faces.B[0]];
      this.faces.B[0] = [...this.faces.R[0]];
      this.faces.R[0] = temp;
    }

    if (face === 'D') {
      const temp = [...this.faces.F[2]];
      this.faces.F[2] = [...this.faces.R[2]];
      this.faces.R[2] = [...this.faces.B[2]];
      this.faces.B[2] = [...this.faces.L[2]];
      this.faces.L[2] = temp;
    }

    if (face === 'L') {
      const temp = [this.faces.U[0][0], this.faces.U[1][0], this.faces.U[2][0]];
      for (let i = 0; i < 3; i++) {
        this.faces.U[i][0] = this.faces.F[i][0];
        this.faces.F[i][0] = this.faces.D[i][0];
        this.faces.D[i][0] = this.faces.B[2 - i][2];
        this.faces.B[2 - i][2] = temp[i];
      }
    }

    if (face === 'R') {
      const temp = [this.faces.U[0][2], this.faces.U[1][2], this.faces.U[2][2]];
      for (let i = 0; i < 3; i++) {
        this.faces.U[i][2] = this.faces.B[2 - i][0];
        this.faces.B[2 - i][0] = this.faces.D[i][2];
        this.faces.D[i][2] = this.faces.F[i][2];
        this.faces.F[i][2] = temp[i];
      }
    }

    if (face === 'F') {
      const temp = [...this.faces.U[2]];
      this.faces.U[2] = [this.faces.R[2][0], this.faces.R[1][0], this.faces.R[0][0]];
      for (let i = 0; i < 3; i++) {
        this.faces.R[i][0] = this.faces.D[0][2 - i];
      }
      this.faces.D[0] = [this.faces.L[0][2], this.faces.L[1][2], this.faces.L[2][2]];
      for (let i = 0; i < 3; i++) {
        this.faces.L[i][2] = temp[2 - i];
      }
    }

    if (face === 'B') {
      const temp = [...this.faces.U[0]];
      this.faces.U[0] = [this.faces.L[2][0], this.faces.L[1][0], this.faces.L[0][0]];
      for (let i = 0; i < 3; i++) {
        this.faces.L[i][0] = this.faces.D[2][i];
      }
      this.faces.D[2] = [this.faces.R[2][2], this.faces.R[1][2], this.faces.R[0][2]];
      for (let i = 0; i < 3; i++) {
        this.faces.R[i][2] = temp[2 - i];
      }
    }

    if (this.recordingEnabled) {
      this.moveHistory.push({ face, direction: 'counterclockwise' });
    }
  }

  solve() {
    const reversedMoves = [...this.moveHistory].reverse().map(({ face, direction }) => ({
      face,
      direction: direction === 'clockwise' ? 'counterclockwise' : 'clockwise'
    }));
    return reversedMoves;
  }

  printCube() {
    console.log('Cube State:', JSON.stringify(this.faces, null, 2));
  }
}