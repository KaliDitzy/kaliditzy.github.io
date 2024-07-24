const colorShade = (col, amt) => {
  col = col.replace(/^#/, '')
  if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]

  let [r, g, b] = col.match(/.{2}/g);
  ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])

  r = Math.max(Math.min(255, r), 0).toString(16)
  g = Math.max(Math.min(255, g), 0).toString(16)
  b = Math.max(Math.min(255, b), 0).toString(16)

  const rr = (r.length < 2 ? '0' : '') + r
  const gg = (g.length < 2 ? '0' : '') + g
  const bb = (b.length < 2 ? '0' : '') + b

  return `#${rr}${gg}${bb}`
}


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

function drawPieChart(parties, partycolors) {
  var pieChart = document.getElementById("pieChart");
  pieChart.width = 68;
  pieChart.height = 68;
  var ctx = pieChart.getContext("2d");

  var x = 34
  var y = 34
  var radius = 34
  var twoRad = Math.PI * 2
  
  parties = parties.split(",")
  partycolors = partycolors.split(",")
  var beginAngle = 0
  var endAngle = 0
	for (let i = 0; i < parties.length; i++) {
		endAngle += twoRad * parties[i] / 100
		drawPieSlice(ctx, x, y, radius, beginAngle, endAngle, partycolors[i], partycolors[i])
		beginAngle = endAngle
	}
}

function UpdateChart() {
  var parties = document.getElementById("parties").value
  var partycolors = document.getElementById("partycolors").value
  drawPieChart(parties,partycolors)
}

//drawPieChart(75, 0, 25, 0, "#F00", "#FFF", "#0F0", "#00F")
//drawArc(ctx, x, y, radius, 0, Math.PI * 2, "#FFF");
//drawPieSlice(ctx, x, y, radius, 0, Math.PI / 2, "#F00", "#F00")