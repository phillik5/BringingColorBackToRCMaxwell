
//
//
// Paint Canvas JS
//
//

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
 
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = 542;
canvas.height = 403;

var mouse = {x: 0, y: 0};
 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

var img = new Image();
img.src = "Coke_Sign.png";
img.onload = function() {
    ctx.drawImage(img, 0, 0);
}

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#00CC99';
ctx.globalCompositionOperation = "destination-out";
 
canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);
 
var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

//
//
// Color Picker JS
//
//

var $picked = $("#picked"); // Just to preview picked colors
var canvas2 = $('#canvas_picker')[0];
var context = canvas2.getContext('2d');


$("#file_upload").change(function (e) {
  var F = this.files[0];
  var reader = new FileReader();
  reader.onload = imageIsLoaded;
  reader.readAsDataURL(F);  
});

function imageIsLoaded(e) {
  var img = new Image();
  img.onload = function(){
    canvas2.width  = this.width;    // If needed? adjust canvas size
    canvas2.height = this.height;   // respective to image size
    context.drawImage(this, 0, 0); // Draw image at 0, 0, not at 10, 10
  };
  img.src = e.target.result;
}

$('#canvas_picker').click(function(event){
  var x = event.pageX - $(this).offset().left; // Fixed coordinates
  var y = event.pageY - $(this).offset().top; // respective to canvas offs.
  var img_data = context.getImageData(x,y , 1, 1).data;
  var R = img_data[0];
  var G = img_data[1];
  var B = img_data[2]; 
  var rgb = R + ',' + G + ',' + B ;
  var hex = rgbToHex(R,G,B);
  ctx.strokeStyle = '#' + hex;
  $('#rgb input').val( rgb );
  $('#hex input').val('#' + hex);
  $picked.append("<span style='background:#"+hex+"'>#"+hex+"</span>");
});

function rgbToHex(R, G, B) {
  return toHex(R) + toHex(G) + toHex(B);
}

function toHex(n) {
  n = parseInt(n, 10);
  if (isNaN(n))  return "00";
  n = Math.max(0, Math.min(n, 255));
  return "0123456789ABCDEF".charAt((n - n % 16) / 16)  + "0123456789ABCDEF".charAt(n % 16);
}