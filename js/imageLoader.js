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
var imgRank = new Array();
var i = 0;
var GlobalIndex=0;
var catName;
var catNameDisplayed=document.getElementById('cat_name');
var catRankDisplayed=document.getElementById('cat_rank');

//this function is called immediatelly after loading the frame and loads cats names
function readCatsNames() {
var names=document.getElementById('myframe').contentDocument.body.firstChild.innerHTML;
catName = names.split("\n");
catNameDisplayed.innerHTML=catName[0];
}

var myInterval = setInterval(loadImage, 1); //this is the image loading start
//set interval is used because there is no info on the number of files to load

function loadImage() {

    if (bFinishCheck) {
        clearInterval(myInterval);
        console.log('Loaded ' + i + ' image(s)!)');
        return;
    }

    if (bCheckEnabled) {

        bCheckEnabled = false;

        img = new Image();
        img.src = 'images/cat' + i + '.jpg';
        img.onload = fExists; //here is the call to fExists() function
        img.onerror = fDoesntExist;
    }
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


function CreateMenuCats(new_src)
{
  var newnode_div=document.createElement("div");
  newnode_div.className="pic";
  cat_menu.appendChild(newnode_div);

  var newnode_img=document.createElement("img");
  newnode_img.className="small_cat";
  newnode_img.src=new_src;
  newnode_div.appendChild(newnode_img);
  // var cat_click=0;
  imgClick[i]=0;
  imgRank[i]="newborn";

  newnode_img.addEventListener('click', (function(index) {
    return function() {
      GlobalIndex=index;
        big_cat_img.src=newnode_img.src;
        catNameDisplayed.innerHTML=catName[index];
        click_counter.innerHTML=imgClick[GlobalIndex];
    };
  })(i));


}

function ClickCounterFunction()
{
    switch (true) {
    case (imgClick[GlobalIndex]<10): catRankDisplayed.innerHTML="newborn"; break;
    case (imgClick[GlobalIndex]>=10)&&((imgClick[GlobalIndex]<=20)):catRankDisplayed.innerHTML="infant"; break;
    case (imgClick[GlobalIndex]>20): catRankDisplayed.innerHTML="teen"; break;
            };
  imgClick[GlobalIndex]++;
  click_counter.innerHTML=imgClick[GlobalIndex];
}
