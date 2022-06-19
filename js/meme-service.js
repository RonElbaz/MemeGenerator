var gCanvas
var gCtx
var gStartPos


var gKeywordSearchCountMap = { funny: 0, cat: 0, baby: 0 }
var gImgs = [
  { id: 1, url: "img/1.jpg", keywords: ["funny", "cat"] },
  { id: 2, url: "img/2.jpg", keywords: ["funny", "dog"] },
  { id: 3, url: "img/3.jpg", keywords: ["funny", "cat"] },
  { id: 4, url: "img/4.jpg", keywords: ["funny", "cat"] },
  { id: 5, url: "img/5.jpg", keywords: ["funny", "cat"] },
  { id: 6, url: "img/6.jpg", keywords: ["funny", "cat"] },
  { id: 7, url: "img/7.jpg", keywords: ["funny", "cat"] },
  { id: 8, url: "img/8.jpg", keywords: ["funny", "cat"] },
  { id: 9, url: "img/9.jpg", keywords: ["funny", "horse"] },
  { id: 10, url: "img/10.jpg", keywords: ["funny", "cat"] },
  { id: 11, url: "img/11.jpg", keywords: ["funny", "cat"] },
  { id: 12, url: "img/12.jpg", keywords: ["funny", "cat"] },
  { id: 13, url: "img/13.jpg", keywords: ["sad", "cat"] },
  { id: 14, url: "img/14.jpg", keywords: ["sad", "cat"] },
  { id: 15, url: "img/15.jpg", keywords: ["pretty", "cat"] },
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
      txt: "I sometimes drink Falafel",
      size: 40,
      align: "left",
      color: "yellow",
      strokeColor: "black",
      font: " Impact",
      x: 40,
      y: 120,
      isDrag: false,
    },
  ],
}

function setDefaultMemeTextParameters() {
  gMeme.lines[1].y = gCanvas.height - 20
}

function getCanvas() {
  return gCanvas
}

function getImages() {
  return gImgs.filter((img) => {
    return img.keywords.find((str) => {
      if (str.includes(getFilter())) {
        // console.log("ok")
        return true
      }
    })
  })
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
  if(gMeme.lines.length === 0 ) return
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
  if (gMeme.lines.length === 0) return
  gMeme.lines.forEach(function (line, idx) {
    if (idx !== gMeme.selectedLineIdx) {
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
  var memeLine = getCurrMemeLine()
  memeLine.txt = line
  // console.log(gMeme)
}

function changeFont(value) {
  if (gMeme.lines.length === 0) return
  var line = getCurrMemeLine()
  line.size += value
}

function switchLine() {
  if (gMeme.lines.length === 0) return
  gMeme.selectedLineIdx + 2 > gMeme.lines.length ? (gMeme.selectedLineIdx = 0) : (gMeme.selectedLineIdx += 1)
  // console.log( gMeme.selectedLineIdx)
}

function removeLine() {
  if (gMeme.lines.length === 0) return
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  // console.log("trying to delete line:", gMeme.selectedLineIdx)
}

function currentLineText() {
  if (gMeme.lines.length === 0) return ""
  var memeLine = getCurrMemeLine()
  return memeLine.txt
}

function alignLeft() {
  if (gMeme.lines.length === 0) return
  var memeLine = getCurrMemeLine()
  memeLine.x = 10
  memeLine.align = "left"
}

function alignRight() {
  if (gMeme.lines.length === 0) return
  var memeLine = getCurrMemeLine()
  var factor = gCtx.measureText(memeLine.txt).width
  // console.log("factor", factor)
  memeLine.x = gCanvas.width - 10 - Math.ceil(factor) //500 - 10 - 400
  memeLine.align = "right"
}

//left and right len from sides is equal

function alignCenter() {
  if (gMeme.lines.length === 0) return
  var memeLine = getCurrMemeLine()
  memeLine.align = "center"
  var factor = gCtx.measureText(memeLine.txt).width
  var x = gCanvas.width / 2 - Math.ceil(factor) / 2
  // console.log(x)
  memeLine.x = x
}

function setProperty(key, value) {
  const line = getCurrMemeLine()
  line[key] = value
}

function downloadCanvas(elLink) {
  const data = gCanvas.toDataURL()
  elLink.href = data
  elLink.download = "my-meme.jpg"
}

function addLine() {
  gMeme.lines.push({
    txt: "I sometimes eat Falafel",
    size: 40,
    align: "left",
    color: "yellow",
    strokeColor: "black",
    font: " Impact",
    x: 40,
    y: gCanvas.height / 2,
    isDrag: false,
  })

  _sortLines()
}

function _sortLines() {
  gMeme.lines.sort((a, b) => a.y - b.y)
}

function drawRect(x, y, width, height) {
  // console.log(width)
  gCtx.beginPath()
  gCtx.rect(x, y, width, height)

  gCtx.strokeStyle = "black"
  gCtx.stroke()
}

function drawRectOnSelectedLine() {
  if (gMeme.lines.length === 0) return
  var memeLine = getCurrMemeLine()
  var lineX = memeLine.x
  var lineY = memeLine.y
  var textMes = gCtx.measureText(memeLine.txt).width
  // console.log("x:",lineX)
  // console.log("y:",lineY)
  // console.log("textMes:",textMes)
  // drawRect(lineX - 10,lineY - 40,textMes.width + 20,50)
  var heightFactor = memeLine.size
  drawRect(lineX - 10, lineY - heightFactor, textMes + 20, heightFactor + 10)
}

function upLine() {
  if (gMeme.lines.length === 0) return
  var memeLine = getCurrMemeLine()
  if (memeLine.y < memeLine.size) return
  memeLine.y -= 5
}

function downLine() {
  if (gMeme.lines.length === 0) return
  var memeLine = getCurrMemeLine()
  if (memeLine.y > gCanvas.height - 10) return
  memeLine.y += 5
}

function renderImgWithoutRect(image) {
  var img = new Image()
  img.onload = function () {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    renderMemeText()
    // drawRectOnSelectedLine()
  }

  img.src = image //loads image from server and trigger img.onload
  // console.log(img)
}

function moveText(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].x += dx
  gMeme.lines[gMeme.selectedLineIdx].y += dy
  // _sortLines()

}

function isTextClicked(clickedPos) {
  // console.log(clickedPos)
  var id
  gMeme.lines.forEach(function (line, idx) {
    var textWidth = Math.ceil(gCtx.measureText(line.txt).width)
    // console.log("IDX: ", idx)
    // console.log("line x:", line.x)
    // console.log("pos x:", clickedPos.x)
    // console.log("text width:", textWidth)
    // console.log("line y:", line.y)
    // console.log("pos y:", clickedPos.y)
    // console.log("height:", line.y + line.size)
    if (
      clickedPos.x >= line.x -20 &&
      clickedPos.x <= textWidth + line.x +20 &&
      clickedPos.y +40 >= line.y &&
      clickedPos.y <= line.y + line.size
    ) {
      // console.log("sfsfsdfs")
      id = idx
    }
  })
  return id
}


function setLineManually(lineIdx) {
  gMeme.selectedLineIdx = lineIdx
}

function setTextDrag(isDragging) {
  var line = getCurrMemeLine()
  line.isDrag = isDragging
}

function setStartPos(pos){
  gStartPos = pos
}

function setAllTextDragFalse(){
  var id;
  gMeme.lines.forEach(function(line, idx){
    if(line.isDrag === true)  id =idx
    line.isDrag = false
  })
  console.log("here")
  return id
}