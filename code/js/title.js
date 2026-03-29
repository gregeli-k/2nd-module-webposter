var graphic;
var mic;
var img;
var imgMobile;
var imgDesktop;

var vol = 0;
var volLerp = 0;
var t = 0;
var maxVal = 0;
var tNoise = 0;
var maxVol = 0.01;
var isSafari;
var micAccess = false;
var micTried = false;
var sinT = 0;
var limit = 0.2;

var titleW = $(".page--cover").width();
var titleH = $(".page--cover").height();

function preload () {
  imgDesktop = loadImage('assets/BLxFU_Development.png');
  imgMobile = loadImage('assets/BLxFU_Wordmark_mobile.png');
  isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if(window.innerWidth < 650){
    titleH = $(".page--cover").height() * 0.94;
  }
  if(isSafari){
    limit = 0.3;
  }
}

function setup () {
  var cnv = createCanvas(titleW, titleH);
  cnv.parent("page--cover");

  $(".audio").click(function(){
    $(".audio").fadeOut();
    if(!micTried && !touch){
      userStartAudio();
      mic = new p5.AudioIn();
      mic.start();
      micAccess = true;
      micTried = true;
    }
  });
  
  graphic = createGraphics(titleW, titleH);
  
  if(window.innerWidth < 950){
    img = imgMobile;
  } else {
    img = imgDesktop;
  }

  var ratio = img.width/img.height;
  var padding = 100;
  if(window.innerWidth < 950){
    padding = titleW * 0.05;
  }
  var imgW = titleW - padding * 2;
  var imgH = imgW / ratio;

  graphic.image(img, padding, (titleH - imgH) / 2, imgW, imgH);

  image(img, padding, (titleH - imgH) / 2, imgW, imgH);
}

function draw () {
  if(coverOpen){

    clear();
    
    var volRaw = noise(tNoise) / 1;
    if(micAccess){
      maxVol -= 0.0001;
      if(maxVol < 0.05){
        maxVol = 0.05;
      }
      volRaw = mic.getLevel();
      if(volRaw > limit){
        volRaw = limit;
      }
      if(volRaw > maxVol){
        maxVol = volRaw;
      }
      volRaw = map(volRaw, 0, maxVol, 0, 1);
    }
    vol = pow(volRaw, 3);
    if(vol < 0.3){
      vol = 0;
    }
    if(vol > 0.5){
      vol = 0.5;
    }
    volLerp += (vol - volLerp) / 20;
    var tileSize = titleH / 30;
    if(window.innerWidth < 950){
      tileSize = titleW / 20;
    }

    for (var y = 0; y < graphic.height / tileSize; y++) {
      for (var x = 0; x < graphic.width / tileSize; x++) {
          
        var position = 1 / (1 + volLerp);
        var tileX = tileSize + noise(t + ((y / 50) + (x * 0))) * 100;
        var sx = (x * tileX * position);
        var sy = (y * tileSize * position);
        var sw = (tileX * position + (titleH - tileX) * (1 - position));
        var sh = (tileSize * position + (titleW - tileSize) * (1 - position));
        
        var dx = x * tileX;
        var dy = y * tileSize;
        var dw = tileX;
        var dh = tileSize;
        
        image(graphic, dx, dy, dw, dh, sx, sy, sw, sh);
      }
    }

    t += 0.5 * volLerp;
    sinT += 0.01;
    tNoise += 0.1;

  } else {

    clear();

    var ratio = img.width/img.height;
    var padding = 100;
    if(window.innerWidth < 950){
      padding = titleW * 0.05;
    }
    var imgW = titleW - padding * 2;
    var imgH = imgW / ratio;

    image(img, padding, (titleH - imgH) / 2, imgW, imgH);
  }
  
}

function windowResized() {
  titleW = $(".page--cover").width();
  titleH = $(".page--cover").height();
  if(window.innerWidth < 650){
    titleH = $(".page--cover").height() * 0.94;
  }
  resizeCanvas(titleW, titleH);

  graphic = createGraphics(titleW, titleH);

  if(window.innerWidth < 950){
    img = imgMobile;
  } else {
    img = imgDesktop;
  }
  
  var ratio = img.width/img.height;
  var padding = 100;
  if(window.innerWidth < 950){
    padding = titleW * 0.05;
  }
  var imgW = titleW - padding * 2;
  var imgH = imgW / ratio;

  graphic.image(img, padding, (titleH - imgH) / 2, imgW, imgH);

}


