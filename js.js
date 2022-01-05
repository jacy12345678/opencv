var imgSrcElement=document.getElementById('imageSrc');
var imageInput=document.getElementById('fileInput');
var canvas=document.getElementById("imageSrc2");
var trackbar=document.getElementById("trackbar");
var resizetrackbar=document.getElementById("resizetrackbar");
var percent=document.getElementById("percent");
var srcwidth,srcheight;
var key;
document.getElementById("percent").innerHTML=trackbar.value;
trackbar.addEventListener("input",event=>{
  document.getElementById("percent").innerHTML=trackbar.value;
})
resizetrackbar.addEventListener("input",event=>{
  document.getElementById("resizepercent").innerHTML=resizetrackbar.value+"%";
})
imageInput.addEventListener('change',(e)=>{
  imgSrcElement.src=URL.createObjectURL(e.target.files[0]);
  setTimeout(function(){
    let src = cv.imread('imageSrc');
    cv.imshow("imageSrc2", src);
  },500)
  
})
imageInput.addEventListener("click",function(){
  srcwidth=null;
  srcheight=null;
  imgSrcElement.removeAttribute("width");
  imgSrcElement.removeAttribute("height");
})

// 因为是异步操作，所以需要onload等图像加载完毕后执行，也是回调
function gary(){
  trackbar.style.display="none";
  percent.style.display="none";
  let src = cv.imread('imageSrc');
  let dst = new cv.Mat();
  // To distinguish the input and output, we graying the image.
  // You can try different conversions.
  cv.cvtColor(src, dst, cv.COLOR_BGR2GRAY)
  cv.imshow("imageSrc2", dst);
  src.delete();
  dst.delete();
}
function rotate()
{
    key="rotate";
    trackbar.style.display="block";
    percent.style.display="block";
    trackbar.max="360";
    trackbar.min="0";
    let rad=3.14 * document.getElementById("trackbar").value / 180.0;
    let src = cv.imread('imageSrc');
    let dst = new cv.Mat();
    let dsize = new cv.Size(src.cols*2, src.rows*2);
    let center = new cv.Point(src.cols / 2, src.rows / 2);
    let rotCenter=new cv.Point(center.x * Math.cos(rad) - center.y * Math.sin(rad), center.x * Math.sin(rad) + center.y * Math.cos(rad));
    let newcenter=new cv.Point(center.x*2-rotCenter.x,center.y*2-rotCenter.y);
    // You can try more different parameters
    let M=cv.matFromArray(2, 3, cv.CV_64FC1, [Math.cos(rad),-Math.sin(rad), newcenter.x, Math.sin(rad), Math.cos(rad), newcenter.y]);
    //let M = cv.getRotationMatrix2D(newcenter, document.getElementById("trackbar").value*1.0, 1);
    cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    cv.imshow('imageSrc2', dst);
    src.delete(); dst.delete(); M.delete();
}
function HShear(){
  key="HShear";
  trackbar.style.display="block";
  percent.style.display="block";
  trackbar.max="100";
  trackbar.min="-100";
  let src = cv.imread('imageSrc');
  let dst = new cv.Mat();
  let dsize = new cv.Size(src.cols*2, src.rows*2);
  let center = new cv.Point(src.cols / 2, src.rows / 2);
  let rotCenter=new cv.Point(center.x  + center.y*trackbar.value*0.01, center.y );
  let newcenter=new cv.Point(center.x*2-rotCenter.x,center.y*2-rotCenter.y);
  // You can try more different parameters
  let M=cv.matFromArray(2, 3, cv.CV_64FC1, [1,trackbar.value*0.01, newcenter.x, 0, 1, newcenter.y]);
  //let M = cv.getRotationMatrix2D(newcenter, document.getElementById("trackbar").value*1.0, 1);
  cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
  cv.imshow('imageSrc2', dst);
  src.delete(); dst.delete(); M.delete();
}
function VShear(){
  key="VShear";
  trackbar.style.display="block";
  percent.style.display="block";
  trackbar.max="100";
  trackbar.min="-100";
  let src = cv.imread('imageSrc');
  let dst = new cv.Mat();
  let dsize = new cv.Size(src.cols*2, src.rows*2);
  let center = new cv.Point(src.cols / 2, src.rows / 2);
  let rotCenter=new cv.Point(center.x ,trackbar.value*0.01*center.x+ center.y );
  let newcenter=new cv.Point(center.x*2-rotCenter.x,center.y*2-rotCenter.y);
  // You can try more different parameters
  let M=cv.matFromArray(2, 3, cv.CV_64FC1, [1,0, newcenter.x, trackbar.value*0.01, 1, newcenter.y]);
  cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
  cv.imshow('imageSrc2', dst);
  src.delete(); dst.delete(); M.delete();
}
function rex(){
  trackbar.style.display="none";
  percent.style.display="none";
  let src = cv.imread('imageSrc2');
  let dst = new cv.Mat();
  let dsize = new cv.Size(src.cols, src.rows);
  // You can try more different parameters
  let M=cv.matFromArray(2, 3, cv.CV_64FC1, [-1,0, src.cols, 0, 1, 0]);
  cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
  cv.imshow('imageSrc2', dst);
  src.delete(); dst.delete(); M.delete();
}
function Re(){
  trackbar.style.display="none";
  percent.style.display="none";
  let src = cv.imread('imageSrc');
  cv.imshow('imageSrc2', src);
  src.delete();
  list.forEach((item)=>
  item.classList.remove('hovered'));
}
function rey(){
  trackbar.style.display="none";
  percent.style.display="none";
  let src = cv.imread('imageSrc2');
  let dst = new cv.Mat();
  let dsize = new cv.Size(src.cols, src.rows);
  // You can try more different parameters
  let M=cv.matFromArray(2, 3, cv.CV_64FC1, [1,0, 0, 0, -1, src.rows]);
  cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
  cv.imshow('imageSrc2', dst);
  src.delete(); dst.delete(); M.delete();
}
document.getElementById("trackbar").addEventListener("input",function(){
  if(key=="rotate"){
    rotate();
  }
  if(key=="HShear"){
    HShear();
  }
  if(key=="VShear"){
    VShear();
  }

})
resizetrackbar.addEventListener("input",function(){
  if(srcwidth==null){
    srcwidth=imgSrcElement.width;
    srcheight=imgSrcElement.height;
  }
  imgSrcElement.width=srcwidth*resizetrackbar.value*0.01;
  imgSrcElement.height=srcheight*resizetrackbar.value*0.01;

})
document.getElementById("save").addEventListener("click",save);
function save(){
  let name=prompt("name");
  if(name){
      let canvas=document.getElementById("imageSrc2");
      var a = document.createElement("a");
      a.href = canvas.toDataURL();
      a.download = name;
      a.click();
    }
  }
var opencvLoad=function(){
  document.getElementById('status').innerHTML='加載完成';//回调函数，用来显示opencv.js加载完成
}
var list=document.querySelectorAll(".select input");
function activeLink(){
  list.forEach(event=>{
    if(event.value=="旋轉"||event.value=="水平剪型"||event.value=="垂直剪型")
    {
      event.classList.remove('hovered');
    }
  })
  if(this.classList=="hovered"&&this.value!="黑白"){
    this.classList.remove('hovered');
  }else if(this.value!="黑白"){
    this.classList.add('hovered');
  }
}
list.forEach((item)=>
item.addEventListener('click',activeLink));