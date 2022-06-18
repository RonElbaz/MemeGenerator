var gFilter=""

function setFilter(filter){
    gFilter = filter
}

function getFilter(){
    return gFilter
}


function getOptions(){
    var imgs = getImages()
    var opts = []
    imgs.forEach(function(img){
        img.keywords.forEach(function(word){
            if (!opts.includes(word)) opts.push(word)
        })
    })
    // console.log(opts)
    return opts
}