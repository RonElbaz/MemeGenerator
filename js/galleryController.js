function init() {
  renderOptions()
  renderGallery()
}

function renderOptions(){
  var opts = getOptions()

  //render options
  var strHTML = ``
  var elDataList = document.querySelector(".filter-datalist")
  opts.forEach(function(opt){
    strHTML += `<option value="${opt}">`
  })
  console.log(strHTML )
  elDataList.innerHTML = strHTML
}

function renderGallery() {
  //render 2 pictures on screen

  //onclick send onimageselect
  
  var elMainContainer = document.querySelector(".image-cnt")
  var imgs = getImages()
  // console.log(imgs)
  var strHTML = ``
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i]
    strHTML += `<img class="gal-img" src="${img.url}" onclick="onImageSelect(this.src)">`

  }

  elMainContainer.innerHTML =  strHTML
}

function onImageSelect(imgSrc) {
//   var trimmedSrc = imgSrc.substring(22)
  var trimmedSrc = imgSrc.match('(img(.*)+(.jpg)$)')[0]
//   console.log(trimmedSrc)
  var elGal = document.querySelector(".gal")
  elGal.style.display="none";
  setImg(trimmedSrc)
  renderAll()
}

function renderAll() {
  renderCanvas()
  setCanvasParameters()
  setDefaultMemeTextParameters()
  addListeners()
  renderMeme()
  // addListeners()
}

function onSetFilter(filter){
setFilter(filter)
renderGallery()

}