objects=[]
status=""
img="";
function preload() {
    img=loadImage('dog_cat.jpg')
}
function setup() {
    canvas=createCanvas(640,420)
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,420)
    video.hide()

    
}
function start() {
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status -detecting objects"

}
function draw() {
    image(video,0,0,640,420);
    
   if(status !="") {
       r=random(255);
       g=random(255);
       b=random(255);
    objectDetector.detect(video,gotresults);
       for(a=0;a<objects.length;a++) {
           document.getElementById("status").innerHTML="status-objects detected"
           document.getElementById("objects").innerHTML="Number of objects detected are-"+objects.length;
           fill(r,g,b);
           percent=floor(objects[a].confidence*100)
           text(objects[a].label+" "+percent+"%",objects[a].x,objects[a].y);
           noFill();
           stroke(r,g,b);
           rect(objects[a].x,objects[a].y,objects[a].width,objects[a].height);
    
       }
   }
}
function gotresults(error,results) {
    if(error) {
        console.log(error)
    }
    else {
        console.log(results)
        objects=results;
    }
}
function modelloaded() {
    console.log("model is loaded");
    status=true;
   
   

}