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
      x: 40,
      y: 40,
    },
    {
      txt: "I sometimes eat Falafel",
      size: 40,
      align: "left",
      color: "yellow",
      strokeColor: "black",
      x: 40,
      y: 80,
    },
    {
      txt: "I sometimes eat Falafel",
      size: 40,
      align: "left",
      color: "yellow",
      strokeColor: "black",
      x: 40,
      y: 120,
    },
  ],
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
  }

  img.src = image //loads image from server and trigger img.onload
  // console.log(img)
}

function renderMemeText() {
  gMeme.lines.forEach(function (line) {
    drawText(line)
  })
}

function drawText(line) {
  // console.log(line)
  gCtx.lineWidth = 2
  gCtx.strokeStyle = line.strokeColor
  gCtx.fillStyle = line.color
  var font = line.size + "px" + " Arial"
  gCtx.font = font
  gCtx.textAlign = line.align
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
  gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width - 10
  gMeme.lines[gMeme.selectedLineIdx].align = "right"
}

//left and right len from sides is equal

function alignCenter() {
  if (gMeme.lines.length === 0) return
  gMeme.lines[gMeme.selectedLineIdx].align = "center"
  var x = gCanvas.width / 2
  console.log(x)
  gMeme.lines[gMeme.selectedLineIdx].x =x

}
