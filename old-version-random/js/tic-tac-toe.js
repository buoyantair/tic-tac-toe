var gameboard = document.getElementById("game");
var boxes = document.getElementsByClassName("box");
var dash = document.getElementById("dash")
var trigger = document.getElementById("playTrigger");

var heads = {
    obj: null,
    checked: false
};

heads.obj = document.getElementById("heads");
var tails = {
    obj: null,
    checked: false
};
tails.obj = document.getElementById("tails");
var colors = {
    defSelCol: "rgba(50, 48, 49, 0.2)",
    red: "#E3655B",
    green: "#8CB369",
    player: "#1F9E7C",
    playerHover: "#109370",
    computer: "#B244ED",
    computerHover: "#6E2594"
}
var player = {
    coin: "",
    color: ""
};

var numChecked = 0;

var coinSelected = false;

var rowVal = 0;
var boxVal = 0;
var objects = [[],[],[]];
var gameRunning = false;


heads.obj.addEventListener("click", function(e) {
    if (!heads.checked) {
        coinSelected = true;
        heads.checked = true;
        player.color = colors.red;
        player.coin = "heads";
        heads.obj.style.background = colors.red;
        tails.obj.style.background = colors.defSelCol;
        gameRunning = true;
    } else if (heads.checked) {
        coinSelected = false;
        heads.checked = false;
        heads.obj.style.background = colors.defSelCol;
    }
    e.target.removeEventListener("click", check)
})

tails.obj.addEventListener("click", function(e) {
    if (!tails.checked) {
        coinSelected = true;
        tails.checked = true;
        player.coin = "tails";
        player.color = colors.green;
        tails.obj.style.background = colors.green;
        heads.obj.style.background = colors.defSelCol;
        gameRunning = true;
    } else if (tails.checked) {
        coinSelected = false;
        tails.checked = false;
        tails.obj.style.background = colors.defSelCol;;
    }
    e.target.removeEventListener("click", check)
})

function who(a,b){
    return objects[a][b].dataset.human == "true";
}

function com(a,b){
    return objects[a][b].dataset.human == "false";
}

function Match() {
  if(
      who(0,0) && who(0,1) && who(0,2) && gameRunning ||
      who(1,0) && who(1,1) && who(1,2) && gameRunning ||
      who(2,0) && who(2,1) && who(2,2) && gameRunning ||
      who(0,0) && who(1,1) && who(2,2) && gameRunning ||
      who(2,0) && who(1,1) && who(0,2) && gameRunning
  ){
      gameRunning = false;
      $("#userWin").modal();
      console.log("WON!!");
      setTimeout(function(){
           window.location.reload(true);
      }, 2000)
  } else if (
      com(0,0) && com(0,1) && com(0,2) && gameRunning ||
      com(1,0) && com(1,1) && com(1,2) && gameRunning ||
      com(2,0) && com(2,1) && com(2,2) && gameRunning ||
      com(0,0) && com(1,1) && com(2,2) && gameRunning ||
      com(2,0) && com(1,1) && com(0,2) && gameRunning
  ){
      gameRunning = false;
      $("#userLose").modal();
      setTimeout(function(){
           window.location.reload(true);
      }, 2000)
  }
}


function compCheck(){
    Match();
    var randomBox = boxes[Math.floor(Math.random() * 9)];
    if (!randomBox.dataset.checked && gameRunning){
        setTimeout(function(){
            randomBox.dataset.human = false;
            randomBox.dataset.checked = true;
            if(player.color == colors.red && player.coin == "heads"){
                randomBox.classList.add("ion-ios-flower", "checked");
                randomBox.style.background = colors.green;
            } else if(player.color == colors.green && player.coin == "tails"){
                randomBox.classList.add("ion-ios-medical", "checked");
                randomBox.style.background = colors.red;
            }
            numChecked++;
        }, 100)
    } else if (gameRunning) {
        compCheck();
    }
}

function check(e){
    if(!e.target.dataset.checked && numChecked < 9 && gameRunning){
        e.target.removeEventListener("click", check);
        e.target.dataset.checked = true;
        numChecked++;
        e.target.style.background = player.color;
        e.target.dataset.human = true;
        if(player.coin == "heads"){
            e.target.classList.add("ion-ios-medical", "checked");
        } else if (player.coin == "tails"){
            e.target.classList.add("ion-ios-flower", "checked");
        }
        if(numChecked < 9 && gameRunning){
            compCheck();
        }
    }
}


for (box in boxes) {
    if (typeof boxes[box] == "object") {
        boxes[box].addEventListener("mouseenter", function(e) {
            if(!e.target.dataset.checked){
                e.target.style.background = colors.playerHover;
            }
        });
        boxes[box].addEventListener("mouseleave", function(e) {
            if(!e.target.dataset.checked){
                e.target.style.background = "white";
            }
        });

        if(boxVal == 2 || boxVal == 5 || boxVal == 8){
            boxes[box].addEventListener("click", check);
            objects[rowVal][boxVal] = boxes[box];
            rowVal++;
            boxVal = 0;
        } else {
            boxes[box].addEventListener("click", check);
            objects[rowVal][boxVal] = boxes[box];
            boxVal++;
        }
    }
}

console.log(objects);

trigger.addEventListener("click", function(){
    if(coinSelected){
        dash.style.display = "none";
    } else{
        $('#coinCheck').modal();
    }
})
