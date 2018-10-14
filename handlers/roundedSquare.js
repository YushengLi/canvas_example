const { createCanvas, loadImage } = require('canvas')

module.exports.roundedSquare = async (event, cxt, callback) => {
  cxt.callbackWaitsForEmptyEventLoop = false;

  console.info(event);

  // 宣告一個 570 x 480 的畫布
  const canvas = createCanvas(570, 480)
  const context = canvas.getContext('2d')
  const radius = 5
  const padding = 10
  const squareWidth  = 570 - 2 * padding
  const squareHeight = 480 - 2 * padding

  context.beginPath()
  // 將線條顏色設定為 #aaa
  context.strokeStyle = "#F00"
  context.moveTo(padding + radius, padding)

  // 計算四頂點座標
  const upperLeft =  { x: padding,               y: padding }
  const upperRight = { x: padding + squareWidth, y: padding }
  const lowerRight = { x: padding + squareWidth, y: padding + squareHeight }
  const lowerLeft =  { x: padding,               y: padding + squareHeight }

  context.arcTo(
    upperRight.x,
    upperRight.y,
    upperRight.x,
    upperRight.y + radius,
    radius
  )

  context.arcTo(
    lowerRight.x,
    lowerRight.y,
    lowerRight.x - radius,
    lowerRight.y,
    radius
  )

  context.arcTo(
    lowerLeft.x,
    lowerLeft.y,
    lowerLeft.x,
    lowerLeft.y - radius,
    radius
  )

  context.arcTo(
    upperLeft.x,
    upperLeft.y,
    upperLeft.x + radius,
    upperLeft.y,
    radius
  )

  context.lineWidth = 1
  context.stroke()


  callback(null, {
    statusCode: 200,
    headers: { 'Content-Type': 'image/png' },
    body: canvas.toBuffer().toString('base64'),
    isBase64Encoded: true
  });
};
