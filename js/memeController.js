function renderCanvas() {
  var elMainContainer = document.querySelector(".main-container")

  var strHTML = `<canvas class="meme-canvas" style="border: 5px solid black" onclick="" width="500" height="500"></canvas>
                <input type="text" placeholder="enter top line text here" oninput="onSetLine(this.value)">
                <input class="color-selector" type="color" value="#000000" onchange="onSetColor(this.value)">
                <button onclick="onChangeFont(1)">Increse</button>
                <button onclick="onChangeFont(-1)">Decrease</button>
                <button onclick="onSwitchLine()">Switch</button>`
  elMainContainer.innerHTML = strHTML
  
}

function setCanvasParameters() {
  var canvas = document.querySelector(".meme-canvas")
  setCanvas(canvas)
  var ctx = canvas.getContext("2d")
  setCtx(ctx)
}

function renderMeme() {
  var intro = "../"
  var { url } = getCurrImgData()
  var fullUrl = intro + url
  //   console.log(fullUrl)
  renderImg(fullUrl)
}

function onSetLine(line) {
  // console.log(line)
  setLine(line)
  renderMeme()
}

function onSetColor(value){
    setColor(value)
    renderMeme()
}

function onChangeFont(value){
    changeFont(value)
    renderMeme()
}

function onSwitchLine(){
    switchLine()
    renderMeme()
}