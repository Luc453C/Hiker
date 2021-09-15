function drawMoon(x, y, scl) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scl, scl);
  ctx.beginPath();
  ctx.translate(65, -53);
  ctx.arc(0, 0, 139, 0.383 * Math.PI, 1.187 * Math.PI, 0);
  ctx.arc(-65, 53, 139, -0.617 * Math.PI, 0.187 * Math.PI, 1);
  ctx.closePath();
  ctx.fill();
  //ctx.stroke();
  ctx.restore();
}