var gCanvas
var gCtx

var gKeywordSearchCountMap = { funny: 0, cat: 0, baby: 0 }
var gImgs = [
  { id: 1, url: "img/1.jpg", keywords: ["funny", "cat"] },
  { id: 2, url: "img/2.jpg", keywords: ["funny", "cat"] },
  { id: 3, url: "img/3.jpg", keywords: ["funny", "cat"] },
  { id: 4, url: "img/4.jpg", keywords: ["funny", "cat"] },
  { id: 5, url: "img/5.jpg", keywords: ["funny", "cat"] },
  { id: 6, url: "img/6.jpg", keywords: ["funny", "cat"] },
  { id: 7, url: "img/7.jpg", keywords: ["funny", "cat"] },
  { id: 8, url: "img/8.jpg", keywords: ["funny", "cat"] },
  { id: 9, url: "img/9.jpg", keywords: ["funny", "cat"] },
  { id: 10, url: "img/10.jpg", keywords: ["funny", "cat"] },
  { id: 11, url: "img/11.jpg", keywords: ["funny", "cat"] },
  { id: 12, url: "img/12.jpg", keywords: ["funny", "cat"] },
  { id: 13, url: "img/13.jpg", keywords: ["funny", "cat"] },
  { id: 14, url: "img/14.jpg", keywords: ["funny", "cat"] },
  { id: 15, url: "img/15.jpg", keywords: ["funny", "cat"] },
  { id: 16, url: "img/16.jpg", keywords: ["funny", "cat"] },
  { id: 17, url: "img/17.jpg", keywords: ["funny", "cat"] },
  { id: 18, url: "img/18.jpg", keywords: ["funny", "cat"] },
]
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "I sometimes eat Falafel",
      size: 40,
      align: "left",
      color: "yellow",
      strokeColor: "black",
      font: " Impact",
      x: 40,
      y: 50,
      isDrag: false,
    },
    {
      txt: "I sometimes eat Falafel",
      size: 40,
      align: "left",
      color: "yellow",
      strokeColor: "black",
      font: " Impact",
      x: 40,
      y: 120,
      isDrag:false,
    },
  ],
}

function setDefaultMemeTextParameters(){
  gMeme.lines[1].y = gCanvas.height - 20
}

function getImages() {
  return gImgs
}

function setImg(imgSrc) {
  var img = gImgs.find((img) => imgSrc === img.url)
  // console.log(img)
  gMeme.selectedImgId = img.id
}

function getCurrImgData() {
  return gImgs.find((img) => gMeme.selectedImgId === img.id)
}

function getCurrMeme() {
  return gMeme
}

function getCurrMemeLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}


function setCanvas(canvas) {
  gCanvas = canvas
}

function setCtx(ctx) {
  gCtx = ctx
}

function renderImg(image) {
  var img = new Image()
  img.onload = function () {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    renderMemeText()
    drawRectOnSelectedLine()
  }

  img.src = image //loads image from server and trigger img.onload
  // console.log(img)
}


function renderMemeText() {
  gMeme.lines.forEach(function (line, idx) {
    if(idx !== gMeme.selectedLineIdx) {
      // console.log("here", idx)
      drawText(line)
    }
  })
  drawText(getCurrMemeLine())
  
}

function drawText(line) {
  // console.log(line)
  gCtx.lineWidth = 2
  gCtx.strokeStyle = line.strokeColor
  gCtx.fillStyle = line.color
  var font = line.size + "px" + line.font
  gCtx.font = font
  // gCtx.textAlign = line.align
  // console.log(gCtx)
  gCtx.fillText(line.txt, line.x, line.y, gCanvas.width) //Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(line.txt, line.x, line.y, gCanvas.width) //Draws (strokes) a given text at the given (x, y) position.
}

function setLine(line) {
  if (gMeme.lines.length === 0) return
  gMeme.lines[gMeme.selectedLineIdx].txt = line
  // console.log(gMeme)
}

function setColor(color) {
  if (gMeme.lines.length === 0) return
  gMeme.lines[gMeme.selectedLineIdx].color = color
}
function changeFont(value) {
  if (gMeme.lines.length === 0) return
  gMeme.lines[gMeme.selectedLineIdx].size += value
}

function switchLine() {
  gMeme.selectedLineIdx + 2 > gMeme.lines.length
    ? (gMeme.selectedLineIdx = 0)
    : (gMeme.selectedLineIdx += 1)
  // console.log( gMeme.selectedLineIdx)
}

function removeLine() {
  if (gMeme.lines.length === 0) return
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  console.log("trying to delete line:", gMeme.selectedLineIdx)
}

function currentLineText() {
  if (gMeme.lines.length === 0) return ""
  return gMeme.lines[gMeme.selectedLineIdx].txt
}

function alignLeft() {
  if (gMeme.lines.length === 0) return
  gMeme.lines[gMeme.selectedLineIdx].x = 10
  gMeme.lines[gMeme.selectedLineIdx].align = "left"
}

function alignRight() {
  if (gMeme.lines.length === 0) return
  var factor = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
  // console.log("factor", factor)
  gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width - 10 - Math.ceil(factor) //500 - 10 - 400 
  gMeme.lines[gMeme.selectedLineIdx].align = "right"
}

//left and right len from sides is equal

function alignCenter() {
  if (gMeme.lines.length === 0) return
  gMeme.lines[gMeme.selectedLineIdx].align = "center"
  var factor = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
  var x = gCanvas.width / 2 - Math.ceil(factor) /2
  // console.log(x)
  gMeme.lines[gMeme.selectedLineIdx].x = x
}

function setFont(newFont) {
  gMeme.lines[gMeme.selectedLineIdx].font = newFont
}

function setStrokeColor(newStrokeColor) {
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = newStrokeColor
}

function downloadCanvas(elLink) {
  const data = gCanvas.toDataURL()
  elLink.href = data
  elLink.download = "my-meme.jpg"
}

function addLine(){
  var newLine = 
  {
    txt: "I sometimes eat Falafel",
    size: 40,
    align: "left",
    color: "yellow",
    strokeColor: "black",
    font: " Impact",
    x: 40,
    y: gCanvas.height/2,
    isDrag: false,
  }

  gMeme.lines.push(newLine)
  _sortLines()
}

function _sortLines(){
  gMeme.lines.sort((a,b)=> a.y - b.y)
}

function drawRect(x, y, width, height) {
  // console.log(width)
  gCtx.beginPath()
  gCtx.rect(x, y, width, height)
  
  gCtx.strokeStyle = 'black'
  gCtx.stroke()
}

function drawRectOnSelectedLine(){
  var lineX = gMeme.lines[gMeme.selectedLineIdx].x
  var lineY = gMeme.lines[gMeme.selectedLineIdx].y
  var textMes = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
  // console.log("x:",lineX)
  // console.log("y:",lineY)
  // console.log("textMes:",textMes)
  // drawRect(lineX - 10,lineY - 40,textMes.width + 20,50)
  var heightFactor = gMeme.lines[gMeme.selectedLineIdx].size
  drawRect(lineX -10,lineY -heightFactor,textMes + 20,heightFactor + 10)
}

function upLine(){
  if(gMeme.lines[gMeme.selectedLineIdx].y < gMeme.lines[gMeme.selectedLineIdx].size) return 
  gMeme.lines[gMeme.selectedLineIdx].y -= 5
}

function downLine(){
  if(gMeme.lines[gMeme.selectedLineIdx].y > gCanvas.height - 10) return 
  gMeme.lines[gMeme.selectedLineIdx].y += 5
}
// function moveText(dx, dy) {
//   gMeme.lines[gMeme.selectedLineIdx].x += dx
//   gMeme.lines[gMeme.selectedLineIdx].y += dy
// }

// function isTextClicked(clickedPos) {
//   const memeX = gMeme.lines[gMeme.selectedLineIdx].x
//   const memeY = gMeme.lines[gMeme.selectedLineIdx].y
//   // Calc the distance between two dots
//   const distance = Math.sqrt((memeX- clickedPos.x) ** 2 + (memeY - clickedPos.y) ** 2)
//   //If its smaller then the radius of the circle we are inside
//   return distance <= getCurrMemeLine().height
// }

// function setTextDrag(isDrag) {
//   getCurrMemeLine().isDrag = isDrag
// }