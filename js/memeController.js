function renderCanvas() {
  var elMainContainer = document.querySelector(".main-container")

  var strHTML = `<canvas class="meme-canvas" style="border: 5px solid black" onclick="" width="500" height="500"></canvas>
                 <div class="meme-edit">
                  <div class="input-div">
                    <input class="text-input" type="text" placeholder="enter top line text here" oninput="onSetLine(this.value)">
                  </div>
                  <div class="add-delete-div">
                    <button onclick="onSwitchLine()">⬆⬇</button>
                    <button>➕</button>
                    <button onclick="onRemoveLine()">🗑️</button>
                  </div>
                  <div class="font-div">
                    <button onclick="onChangeFont(1)">A+</button>
                    <button onclick="onChangeFont(-1)">A-</button>
                    <button onclick="onAlignLeft()">Align left</button>
                    <button onclick="onAlignCenter()">Align center</button>
                    <button onclick="onAlignRight()">Align right</button>
                    <select class="font-selector" onchange="onSetFont(value)">
                      <option value=" Impact">impact</option>
                      <option value=" Ariel">ariel</option>
                    </select>
                    <input class="Stroke-selector" type="color" value="#000000" onchange="onSetStrokeColor(this.value)">
                    <input class="color-selector" type="color" value="#ffff00" onchange="onSetColor(this.value)">
                  </div>
                  <div class="sticker-selector">
                  </div>
                  <div class="share-div">
                    <button onclick="onShare()">Share</button>
                    <a href="#" onclick="onDownloadCanvas(this)" download="" style="text-decoration: none;">Download</a>
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
  setColor(value)
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

}

function onRemoveLine(){
  removeLine()
  changeInput()
  renderMeme()
}

function changeInput(){
  var elInput = document.querySelector(".text-input")
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
  setFont(value)
  renderMeme()
}

function onSetStrokeColor(strokeColor){
  setStrokeColor(strokeColor)
  renderMeme()
}

function onDownloadCanvas(elLink){
  downloadCanvas(elLink)
}

function onShare(){
  uploadImg()
}
