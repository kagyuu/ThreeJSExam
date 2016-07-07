/**
 * ヒルベルト曲線が描かれた canvas を返します.
 * @param width width
 * @param height height
 * @param iteration 計算繰り返し数
 * @return canvas
 */
function hilbert(width, height, iteration, bg, fg) {

  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  var ctx = canvas.getContext('2d');
  
  var x = width;
  var y = 0;
  var dx = width / (2 * Math.pow(2, iteration) -1);
  var dy = height / (2 * Math.pow(2, iteration) -1);

  /**
   * A型の形状を描画する.
   *
   * ● 0 == step  のとき
   * ┌←─ (Start)
   * ↓
   * └→─ (End)
   *
   * ● 0 < step  のとき
   * Ａ←Ｄ (Start)
   * ↓
   * Ａ→Ｂ (End)
   */
  var drawA = function(step) {
     if (1 > step) {
         moveLeft();
         moveDown();
         moveRight();
     } else {
         drawD(step-1);  moveLeft();
         drawA(step-1);  moveDown();
         drawA(step-1);  moveRight();
         drawB(step-1);
     }
  };
  
  /**
   * B型の形状を描画する.
   *
   * ● 0 == step  のとき
   * ┌→┐
   * ↑　↓
   * │　│
   *(S) (E)
   *
   * ● 0 < step  のとき
   * Ｂ→Ｂ
   * ↑　↓
   * Ｃ　Ａ
   *(S) (E)
   */
  var drawB = function(step) {
     if (1 > step) {
         moveUp();
         moveRight();
         moveDown();
     } else {
         drawC(step-1);  moveUp();
         drawB(step-1);  moveRight();
         drawB(step-1);  moveDown();
         drawA(step-1);
     }
  };
  
  /**
   * C型の形状を描画する.
   *
   * ● 0 == step  のとき
   * (End)   ─←┐
   *         　　↑
   * (Start) ─→┘
   *
   * ● 0 < step  のとき
   * (End)   Ｄ←Ｃ
   *         　　↑
   * (Start) Ｂ→Ｃ
   */
  var drawC = function(step) {
     if (1 > step) {
         moveRight();
         moveUp();
         moveLeft();
     } else {
         drawB(step-1);  moveRight();
         drawC(step-1);  moveUp();
         drawC(step-1);  moveLeft();
         drawD(step-1);
     }
  };
  
  /**
   * D型の形状を描画する.
   *
   * ● 0 == step  のとき
   *(E) (S)
   * │　│
   * ↑　↓
   * └←┘
   *
   * ● 0 < step  のとき
   *(E) (S)
   * Ｃ　Ａ
   * ↑　↓
   * Ｄ←Ｄ
   */
  var drawD = function(step) {
     if (1 > step) {
         moveDown();
         moveLeft();
         moveUp();
     } else {
         drawA(step-1);  moveDown();
         drawD(step-1);  moveLeft();
         drawD(step-1);  moveUp();
         drawC(step-1);
     }
  };
  
  var moveUp = function() {
      y -= dy;
      move();
  }
  
  var moveDown = function() {
      y += dy;
      move();
  };
  
  var moveRight = function() {
      x += dx;
      move();
  };
  
  var moveLeft = function() {
      x -= dx;
      move();
  };
  
  var move = function() {
      ctx.lineTo(x, y);
  };
  
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,width,height);
  
  // Path開始
  ctx.beginPath();
  ctx.strokeStyle = fg;
  ctx.lineWidth = 4;
  ctx.moveTo(x, y);
  
  drawA(iteration);
  
  ctx.stroke();
  
  return canvas;
}

