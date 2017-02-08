//the code loads all the images from a folder
//the code is from stackoverflow
//http://stackoverflow.com/questions/11144261/javascript-how-to-load-all-images-in-a-folder
var bCheckEnabled = true;
var bFinishCheck = false;

cat_menu=document.getElementsByClassName('scrollmenu')[0];
big_cat_img=document.getElementsByClassName('big_cat')[0];
click_counter=document.getElementById('counter');
var img;
var imgArray = new Array();
var imgClick = new Array();
var i = 0;
var GlobalIndex=0;

var myInterval = setInterval(loadImage, 1);

function loadImage() {

    if (bFinishCheck) {
        clearInterval(myInterval);
        console.log('Loaded ' + i + ' image(s)!)');
        // console.log(imgArray);
        return;
    }

    if (bCheckEnabled) {

        bCheckEnabled = false;

        img = new Image();
        img.src = 'images/cat' + i + '.jpg';
        img.onload = fExists;
        img.onerror = fDoesntExist;

    }

}

function CreateMenuCats(new_src)
{
  var newnode_div=document.createElement("div");
  newnode_div.className="pic";
  cat_menu.appendChild(newnode_div);

  var newnode_img=document.createElement("img");
  newnode_img.className="small_cat";
  newnode_img.src=new_src;
  newnode_div.appendChild(newnode_img);
  var cat_click=0;
  imgClick[i]=0;

  newnode_img.addEventListener('click', (function(index) {
    return function() {
        big_cat_img.src=newnode_img.src;
        GlobalIndex=index;
        click_counter.innerHTML=imgClick[GlobalIndex];
    };
  })(i));


}

function ClickCounterFunction()
{
  imgClick[GlobalIndex]++;
  click_counter.innerHTML=imgClick[GlobalIndex];
}

function fExists() {
    imgArray.push(img.src);
    CreateMenuCats(imgArray[i]);
    i++;
    bCheckEnabled = true;
}

function fDoesntExist() {
    bFinishCheck = true;
}
