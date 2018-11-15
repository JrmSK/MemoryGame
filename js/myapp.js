$(document).ready(function () {

});

var MemoryGame = {};
MemoryGame.images = ["pic0.jpg", "pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg", "pic6.jpg", "pic7.jpg", "pic8.jpg", "pic9.jpg",];    // if you want to add an image, add it here (keep same format, and try to keep ratio as well) 
MemoryGame.backCard = "";

MemoryGame.generateBoard = function () {
    var cardsByRow = 4;                 // change here when dealing with difficulty
    for (var i = 1; i <= 3; i++) {
        $("#board").append("<div class='row justify-content-center'>");
        for (var j = 1; j <= cardsByRow; j++) {
            $(`.row:nth-child(${i})`).append("<div class='col-xs-5 card'>");
        }
    }

}




MemoryGame.start = function () {
    MemoryGame.generateBoard();
}

MemoryGame.start();