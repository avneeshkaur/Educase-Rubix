import React, { useState, useEffect } from 'react';
import { RubiksCube } from '../utils/cubeUtils';
import './cube.css';

const cube = new RubiksCube();

const Cube = () => {
  const [faces, setFaces] = useState(cube.faces);
  const [moveCount, setMoveCount] = useState(0);

  const handleMove = (move) => {
    cube[move]();
    setFaces({ ...cube.faces });
    if (move !== 'scrambleCube') setMoveCount((prev) => prev + 1);
  };

  const handleReset = () => {
    const fresh = new RubiksCube();
    cube.faces = fresh.faces;
    cube.moveHistory = [];
    setFaces({ ...fresh.faces });
    setMoveCount(0);
  };

  const handleSolve = () => {
    // Disable recording during solve
    cube.setRecording(false);
    
    const reversedMoves = cube.solve();
    let i = 0;

    const interval = setInterval(() => {
      if (i >= reversedMoves.length) {
        // Clear history and reset after solve
        cube.moveHistory = [];
        cube.setRecording(true);
        setMoveCount(0);
        clearInterval(interval);
        return;
      }

      cube.applyMove(reversedMoves[i]);
      setFaces({ ...cube.faces });
      i++;
    }, 500);
  };

  const renderFace = (faceKey) => (
    <div className="face-wrap">
      <div className="grid">
        {faces[faceKey].flat().map((color, idx) => (
          <div key={idx} className={`cell ${color}`}></div>
        ))}
      </div>
      <div className="face-label">{faceKey}</div>
    </div>
  );

  useEffect(() => {
    const keyMap = {
      U: 'rotateU',
      D: 'rotateD',
      L: 'rotateL',
      R: 'rotateR',
      F: 'rotateF',
      B: 'rotateB'
    };

    const handleKeyDown = (e) => {
      const move = keyMap[e.key.toUpperCase()];
      if (move) handleMove(move);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="cube-container">
      <h2>Rubik’s Cube (Educase India)</h2>
      <h3>Moves: {moveCount}</h3>

      {/* Flat Net Layout */}
      <div className="net-layout">
        <div className="row">
          <div className="face-wrap empty" />
          {renderFace('U')}
          <div className="face-wrap empty" />
          <div className="face-wrap empty" />
        </div>
        <div className="row">
          {renderFace('L')}
          {renderFace('F')}
          {renderFace('R')}
          {renderFace('B')}
        </div>
        <div className="row">
          <div className="face-wrap empty" />
          {renderFace('D')}
          <div className="face-wrap empty" />
          <div className="face-wrap empty" />
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button onClick={() => handleMove('rotateU')}>U</button>
        <button onClick={() => handleMove('rotateD')}>D</button>
        <button onClick={() => handleMove('rotateL')}>L</button>
        <button onClick={() => handleMove('rotateR')}>R</button>
        <button onClick={() => handleMove('rotateF')}>F</button>
        <button onClick={() => handleMove('rotateB')}>B</button>
        <button onClick={() => handleMove('scrambleCube')}>🎲 Scramble</button>
        <button onClick={handleReset}>🔁 Reset</button>
        <button onClick={handleSolve}>🧠 Solve</button>
      </div>
    </div>
  );
};

export default Cube;