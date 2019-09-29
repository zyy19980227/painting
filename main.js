var yyy = document.getElementById('xxx');
lineWidth=3
var context = yyy.getContext('2d');
autoset(yyy)
listenToUser(yyy)

//改变classname函数
function add(color){
  return color.classList.add('active')
}
function re(color){
  return color.classList.remove('active')
}

function autoset(canvas){    //页面函数
  setsize()
  window.onresize=function(){   //设置窗口大小
    setsize()
  }
  function setsize(){    //获取页面大小函数
    var pagew=document.documentElement.clientWidth
    var pageh=document.documentElement.clientHeight //获取页面宽高
    yyy.width=pagew
    yyy.height=pageh
  }  
}
/***********/
function drawc(x,y,radius){   //画圆函数
  context.beginPath()
  context.arc(x,y,radius,0,Math.PI*2)
  context.fill()
}

function drawl(x1,y1,x2,y2){   //两个圆之间用线连接
  context.beginPath()
  context.moveTo(x1,y1)
  context.lineWidth=lineWidth
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath()
}



function listenToUser(canvas){    //事件监听函数
  var ifpaint=false   //判断是否画画
  var lastpoint={x:undefined,y:undefined}
//特性检测
if(document.body.ontouchstart!==undefined){
  //触屏设备
  canvas.ontouchstart=function(a){  //开始触摸 
    var x=a.touches[0].clientX
    var y=a.touches[0].clientY
    ifpaint=true
    if(ifremove){
      context.clearRect(x-10,y-10,20,20)
    }else{
      lastpoint={"x":x,"y":y}
    }
  }
  
  canvas.ontouchmove=function(a){ //移动  
      var x=a.touches[0].clientX
      var y=a.touches[0].clientY
      if(!ifpaint){return}
      if(ifremove){
        context.clearRect(x-10,y-10,20,20)
      }else{
        if(ifpaint){
        var newpoint={"x":x,"y":y}
        drawc(x,y,1)
        drawl(lastpoint.x,lastpoint.y,newpoint.x,newpoint.y)
        lastpoint=newpoint
      }
    }
  }
  canvas.ontouchend=function(a){ //停止触摸   
    ifpaint=false
  }
}else{
  //非触屏设备
  canvas.onmousedown=function(a){    //鼠标点击
    var x=a.clientX
    var y=a.clientY
    ifpaint=true
    if(ifremove){
      context.clearRect(x-10,y-10,20,20)
    }else{
      lastpoint={"x":x,"y":y}
    }
  }
  
  canvas.onmousemove=function(a){    //鼠标移动
      var x=a.clientX
      var y=a.clientY
      if(!ifpaint){return}
      if(ifremove){
        context.clearRect(x-10,y-10,20,20)
      }else{
        if(ifpaint){
        var newpoint={"x":x,"y":y}
        drawc(x,y,1)
        drawl(lastpoint.x,lastpoint.y,newpoint.x,newpoint.y)
        lastpoint=newpoint
      }
    }
  }
  canvas.onmouseup=function(a){     //鼠标离开
    ifpaint=false
  }
}

  
}

/********/
var ifremove = false     //判断是否用橡皮擦
pen.onclick = function(){
  ifremove=false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  ifremove=true
  eraser.classList.add('active')
  pen.classList.remove('active')
}



red.onclick=function(){
  context.strokeStyle='red'
  context.fileStyle='red'
  add(red)
  re(green)
  re(blue)
  re(yellow)
  re(black)
}
green.onclick=function(){
  context.strokeStyle='green'
  context.fillStyle='green'
  add(green)
  re(red)
  re(blue)
  re(yellow)
  re(black)
}
blue.onclick=function(){
  context.strokeStyle='blue'
  context.fillStyle='blue'
  add(blue)
  re(green)
  re(red)
  re(yellow)
  re(black)
}
yellow.onclick=function(){
  context.strokeStyle='yellow'
  context.fillStyle='yellow'
  add(yellow)
  re(green)
  re(blue)
  re(red)
  re(black)
}
black.onclick=function(){
  context.strokeStyle='black'
  context.fillStyle='black'
  add(black)
  re(green)
  re(blue)
  re(red)
  re(yellow)
}

//设置线的粗细
thin.onclick=function(){
  lineWidth=3
}
thick.onclick=function(){
  lineWidth=5
}

//清除页面
clear.onclick=function(){
  context.clearRect(0, 0 , yyy.width , yyy.height);
}
//下载图画
download.onclick=function(){
  var url=yyy.toDataURL("image/png")
  var a=document.createElement('a')
  document.body.appendChild(a)
  a.href=url
  a.download='image'
  a.target='_blank'
  a.click()
}