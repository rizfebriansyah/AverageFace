var imgs = [];
var avgImg;
var img;
var numOfImages = 30;
var t = 0;
var imageLoadCounter;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    
    imageLoadCounter = 0;
    for(var i =0 ; i<numOfImages; i++)
        {
         var img = loadImage("assets/" + i + ".jpg", imageloadSuccess);
          imgs.push(img);
        }
}

function imageloadSuccess()
{
    imageLoadCounter++;
}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(2 * imgs[0].width,imgs[0].height);
        pixelDensity(1);
     
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
        avgImg.loadPixels();
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgs[t], 0, 0);
    if (imageLoadCounter == numOfImages) {
     img = averageFace(imgs);
        translate(img.width, 0);
        image(img, 0, 0);
        noLoop();
    }

}

function averageFace(imgs){

    for(var i = 0; i<imgs.length; i++){
        imgs[i].loadPixels();
    }
    
    for(var y = 0; y<avgImg.height; y++)
    {
        for(var x = 0; x<avgImg.width; x++)
        {
            
            
            var pixelIndex=((avgImg.width * y) + x) *4;
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;
            
            for(var i = 0; i<imgs.length; i++){
                img = imgs[i];
                sumR += img.pixels[pixelIndex + 0];
                sumG += img.pixels[pixelIndex + 1];
                sumB += img.pixels[pixelIndex + 2];   
            }
             
            avgImg.pixels[pixelIndex + 0] = sumR/imgs.length;
            avgImg.pixels[pixelIndex + 1] = sumG/imgs.length;
            avgImg.pixels[pixelIndex + 2] = sumB/imgs.length;
            avgImg.pixels[pixelIndex + 3] = 255;
            
           
        }
    }
    avgImg.updatePixels();
    return avgImg;
}


function mouseMoved()
{
    loop();
}

function keyPressed()
{
    t = int(random(0, 30));
    loop(); 
}