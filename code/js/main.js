var canClick = false;
var open = false;

var touch = false;
var mobile = false;
var mobileMenu = false;
var smallScale = false;

var infoOpen = false;
var coverOpen = true;
var storyOpen = false;

var cover_img_count = 1;

$(document).ready(function(){

  if ("ontouchstart" in document.documentElement){
    $(".audio").hide();
    touch = true;
  }
  if (window.innerWidth <= 1300 || window.innerHeight < 800){
    smallScale = true;
  }
  if (window.innerWidth <= 1024){
    mobile = true;
  }
  if (window.innerWidth <= 650){
    mobileMenu = true;
  }

  initListeners();

});


function initListeners(){

  window.addEventListener("resize", resizeHandler);

  setInterval(barcodeTime, 1000);

  $(".info--spine").mousedown(function(){
    if(!mobileMenu){
      if(infoOpen){
        infoOpen = false;
        $(".wrapper").removeClass('info--open');
      } else {
        infoOpen = true;
        $(".wrapper").addClass('info--open');
      }
    }
  });

  $(".info--spine, .page--info").hover(function(){
    if(!mobileMenu && !infoOpen){
      $(".wrapper").addClass('info--hover');
    }
  }, function(){
      $(".wrapper").removeClass('info--hover');
  });

  $(".menu--info").mousedown(function(){
    if(infoOpen){
      infoOpen = false;
      $(".wrapper").removeClass('info--open');
    } else {
      infoOpen = true;
      $(".wrapper").addClass('info--open');
    }
  });

  $(".info--back, .menu--home").mousedown(function(){
    infoOpen = false;
    $(".wrapper").removeClass('info--open');
  });



  $(".page--home, .boook, .page--story").mouseover(function(){
    if(infoOpen){
      infoOpen = false;
      $(".wrapper").removeClass('info--open');
    }
  });

  $(".boook:not(.static) .spine").mousedown(function(){
      if($(this).parent().hasClass('open')){
        closeBook($(this).parent());
      } else {
        $(".boook.open").each(function(){
          closeBook($(this));
        });
        openBook($(this).parent());
      }
  });

  $(".menu--home").mousedown(function(){
    $(".boook.open").each(function(){
      closeBook($(this));
    });
  });

  if(!mobileMenu){
    // openBook($(".boook--speakingmachine"));
  } else {
    var w = window.innerHeight * -0.17;
    var h = window.innerHeight * 0.03;
    $(".boook--boookland").css({'transform': 'rotate(10deg) translate(' + w + 'px, ' + h + 'px)'});
  }

}

function openBook(boook){
  if(!mobileMenu){
    var w = boook.children('.spine').outerWidth() + boook.children('.page--cover').outerWidth();
    boook.css({'width': w + 'px'}).addClass('open');
  } else {
    var w = boook.offset().left - 46;
    boook.css({'transform': 'translate(-' + w + 'px, 0)'}).addClass('open');
    $(".boook:not(.open):not(.static)").each(function(){
      var w = window.innerWidth - $(this).offset().left;
      $(this).css({'transform': 'translate(' + w + 'px, 0)'});
    });
  }
}

function closeBook(boook){
  if(!mobileMenu){
    var w = boook.children('.spine').outerWidth();
    boook.css({'width': w + 'px'}).removeClass('open');
  } else {
    boook.css({'transform': ''}).removeClass('open');
    $(".boook:not(.open):not(.static)").each(function(){
      $(this).css({'transform': ''});
    });
  }
}

function resizeHandler(){

  if (window.innerWidth <= 1300 || window.innerHeight < 800){
    smallScale = true;
  } else {
    smallScale = false;
  }
  if (window.innerWidth <= 1024){
    mobile = true;
  } else{
    mobile = false;
  }
  if (window.innerWidth <= 650){
    mobileMenu = true;
  } else {
    mobileMenu = false;
  }

  $(".boook").each(function(){
    if($(this).hasClass('open')){
      openBook($(this));
    } else {
      closeBook($(this));
    }
  });


}

function barcodeTime() {
  var dt = new Date();
  var hours = dt.getHours()
  var minutes = dt.getMinutes()
  var seconds = dt.getSeconds()
  if (hours < 10){
    var hours = "0" + dt.getHours()
  }
  if (minutes < 10){
    var minutes = "0"+ dt.getMinutes()
  }
  if (seconds < 10){
    var seconds = "0" + dt.getSeconds()
  }
  $(".barcode--right").html(hours + '-' + minutes + '-' + seconds);
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}
