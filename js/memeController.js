const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function renderCanvas() {
  var elMainContainer = document.querySelector(".main-container")

  var strHTML = `<canvas class="meme-canvas" style="border: 5px solid black" width="500" height="500"></canvas>
                 <div class="meme-edit">
                  <div class="input-div">
                    <input class="text-input" type="text" placeholder="enter top line text here" oninput="onSetLine(this.value)">
                  </div>
                  <div class="add-delete-div flex align-center">
                  <button class="up-line" onclick="onUpLine()">⬆</button>
                  <button class="down-line" onclick="onDownLine()">⬇</button>
                    <button class="switch-lines" onclick="onSwitchLine()">⬆⬇</button>
                    <button class="add-line" onclick="onAddLine()"><i class="fa-solid fa-plus"></i></button>
                    <button class="remove-line" onclick="onRemoveLine()"><i class="fa-solid fa-trash-can"></i></button>
                  </div>
                  <div class="font-div">
                    <button class="inc" onclick="onChangeFont(1)">A+</button>
                    <button class="dec" onclick="onChangeFont(-1)">A-</button>
                    <button class="lft" onclick="onAlignLeft()">Left</button>
                    <button class="cnt" onclick="onAlignCenter()">Center</button>
                    <button class="rgt" onclick="onAlignRight()">Right</button>
                    <select class="font-selector" onchange="onSetFont(value)">
                      <option value=" Impact">impact</option>
                      <option value=" Ariel">ariel</option>
                    </select>
                    <div class="color-div">
                      <button><i class="fa-solid fa-palette"></i></button>
                      <input class="color-selector" type="color" value="#ffff00" onchange="onSetColor(this.value)">
                    </div>
                    <div class="stroke-div">
                      <button style="text-decoration:underline;">S</button>
                      <input class="stroke-selector" type="color" value="#000000" onchange="onSetStrokeColor(this.value)">
                    </div>
                  </div>
                  <div class="sticker-selector">
                  </div>
                  <div class="share-div">
                    <button class="share-button" onclick="onShare()">Share</button>
                    <button class="download-button"><a href="#" onclick="onDownloadCanvas(this)" download="" style="text-decoration: none;">Download</a></button>
                  </div>
                </div>`

  elMainContainer.innerHTML = strHTML
}

function setCanvasParameters() {
  var canvas = document.querySelector(".meme-canvas")
  setCanvas(canvas)
  var ctx = canvas.getContext("2d")
  setCtx(ctx)
}



function renderMeme() {
  // var intro = "../"
  var { url } = getCurrImgData()
  // var fullUrl = intro + url
  //   console.log(fullUrl)
  renderImg(url)
}

function onSetLine(line) {
  // console.log(line)
  setLine(line)
  renderMeme()
  
}

function onSetColor(value) {
  // setColor(value)
  setProperty("color", value)
  renderMeme()
}

function onChangeFont(value) {
  changeFont(value)
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  changeInput()
  renderMeme()
  // drawRectOnSelectedLine()

}

function onRemoveLine(){
  removeLine()
  switchLine()
  changeInput()
  renderMeme()
}

function changeInput(){
  var elInput = document.querySelector(".text-input")
  // console.log(currentLineText())
  elInput.value = currentLineText()
}

function onAlignLeft(){
  alignLeft()
  renderMeme()
}


function onAlignRight(){
  alignRight()
  renderMeme()
}

function onAlignCenter(){
  alignCenter()
  renderMeme()
}

function onSetFont(value){
  // setFont(value)
  setProperty("font", value)
  renderMeme()
}

function onSetStrokeColor(strokeColor){
  // setStrokeColor(strokeColor)
  setProperty("strokeColor", strokeColor)
  renderMeme()
}

function onDownloadCanvas(elLink){
  downloadCanvas(elLink)
}

function onShare(){
  uploadImg()
}

function onAddLine(){
  addLine()
  switchLine()
  changeInput()
  renderMeme()
}

function onUpLine(){
  upLine()
  renderMeme()
}
function onDownLine(){
  downLine()
  renderMeme()
}

//Handle the listeners
function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  var canvas = getCanvas()
  canvas.addEventListener('mousemove', onMove)
  canvas.addEventListener('mousedown', onDown)
  canvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  var canvas = getCanvas()
  canvas.addEventListener('touchmove', onMove)
  canvas.addEventListener('touchstart', onDown)
  canvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  //Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  var lineIdx = isTextClicked(pos) 
  console.log("line ix", lineIdx)
  if (lineIdx === undefined) return
  setLineManually(lineIdx)
  // console.log("im here")
  renderMeme()
  changeInput()
  setTextDrag(true)
  
  //Save the pos we start from 
  setStartPos(pos)
  document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
  const currMeme = getCurrMemeLine()
  if (currMeme.isDrag) {
      const pos = getEvPos(ev)
      //Calc the delta , the diff we moved
      const dx = pos.x - gStartPos.x
      const dy = pos.y - gStartPos.y
      moveText(dx, dy)
      //Save the last pos , we remember where we`ve been and move accordingly
      setStartPos(pos)
      //The canvas is render again after every move
      renderMeme()
  }
}

function onUp() {
  _sortLines()
  var id = setAllTextDragFalse()
  if (!id) return
  setLineManually(id)
  // setTextDrag(false)
  document.body.style.cursor = 'grab'
}

// function resizeCanvas() {
//   const elContainer = document.querySelector('.main-container')
//   var gElCanvas = document.querySelector(".meme-canvas")
//   gElCanvas.width = elContainer.offsetWidth
//   gElCanvas.height = elContainer.offsetHeight
//   renderCanvas()
// }

function getEvPos(ev) {

  //Gets the offset pos , the default pos
  var pos = {
      x: ev.offsetX,
      y: ev.offsetY
  }
  // Check if its a touch ev
  if (gTouchEvs.includes(ev.type)) {
      //soo we will not trigger the mouse ev
      ev.preventDefault()
      //Gets the first touch point
      ev = ev.changedTouches[0]
      //Calc the right pos according to the touch screen
      pos = {
          x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
          y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
      }
  }
  return pos
}
