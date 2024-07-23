function drawLine(ctx, startX, startY, endX, endY, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.stroke();
  ctx.restore();
}

function drawPieSlice(
  ctx,
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  fillColor,
  strokeColor
) {
  ctx.save();
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawPieChart(party1, party2, party3, party4, party1color, party2color, party3color, party4color) {
  var pieChart = document.getElementById("pieChart");
  pieChart.width = 512;
  pieChart.height = 512;
  var ctx = pieChart.getContext("2d");

  var x = 175
  var y = 305
  var radius = 34
  var twoRad = Math.PI * 2

  var beginAngle = 0
  var endAngle = twoRad * party1 / 100
  drawPieSlice(ctx, x, y, radius, beginAngle, endAngle, party1color, party1color)
  var beginAngle = endAngle
  var endAngle = beginAngle + (twoRad * party2 / 100)
  drawPieSlice(ctx, x, y, radius, beginAngle, endAngle, party2color, party2color)
  var beginAngle = endAngle
  var endAngle = beginAngle + (twoRad * party3 / 100)
  drawPieSlice(ctx, x, y, radius, beginAngle, endAngle, party3color, party3color)
  var beginAngle = endAngle
  var endAngle = beginAngle + (twoRad * party4 / 100)
  drawPieSlice(ctx, x, y, radius, beginAngle, endAngle, party4color, party4color)
}

function UpdateChart() {
  var party1 = document.getElementById("party1").value
  var party1color = document.getElementById("party1color").value
  var party2 = document.getElementById("party2").value
  var party2color = document.getElementById("party2color").value
  var party3 = document.getElementById("party3").value
  var party3color = document.getElementById("party3color").value
  var party4 = document.getElementById("party4").value
  var party4color = document.getElementById("party4color").value
  drawPieChart(party1, party2, party3, party4, party1color, party2color, party3color, party4color)
}

//drawPieChart(75, 0, 25, 0, "#F00", "#FFF", "#0F0", "#00F")
//drawArc(ctx, x, y, radius, 0, Math.PI * 2, "#FFF");
//drawPieSlice(ctx, x, y, radius, 0, Math.PI / 2, "#F00", "#F00")