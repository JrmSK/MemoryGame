$(document).ready(function () {

});

/* Variables  */
var MemoryGame = {};
MemoryGame.images = ["pic0.jpg", "pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg", "pic6.jpg", "pic7.jpg", "pic8.jpg", ];    // if you want to add an image, add it here (keep same format, and try to keep ratio as well) 
MemoryGame.selectedImages = [];
MemoryGame.selectedFirstCard = -1;
MemoryGame.selectedSecondCard = -1;
MemoryGame.maxCards = 6;                                                     // change here for difficulty 

MemoryGame.pickRandomCards = function () {

    var arr1 = [];      // arr1 et arr2 are test for random, make sure we get a number only once 
    var arr2 = [];
    while (arr1.length < (MemoryGame.maxCards * 2)) {                        // pick random num and store it twice. 
        var r = Math.floor(Math.random() * MemoryGame.images.length);        // This is pretty cool because it will select random pics from total array :)
        if (arr1.indexOf(r) === -1) {
            arr1.push(r);
            arr1.push(r);       // push twice to get number in double 
        }
    }
    while (arr2.length < arr1.length) {                                       // Randomize again, to separate doubles.
        var r = Math.floor(Math.random() * MemoryGame.maxCards * 2);
        if (arr2.indexOf(r) === -1) {
            arr2.push(r);
            var pushMe = arr1[r];
            MemoryGame.selectedImages.push(MemoryGame.images[pushMe]);
        }
    }
}

MemoryGame.generateBoard = function () {

    var cardsByRow = 4;                 // change here when dealing with difficulty
    var count = 0;                      // give proper id to each generated card
    for (var i = 1; i <= 3; i++) {
        $(`#board`).append(`<div class='row justify-content-center'>`);
        for (var j = 1; j <= cardsByRow; j++) {
            $(`.row:nth-child(${i})`).append(`<div class='col-xs-5 card'>`);
            count++;
        }
    }
}

MemoryGame.flip = function(that, index) {

    that.target.style.backgroundImage = `url('./img/${MemoryGame.selectedImages[index]}')`;

}

MemoryGame.gameplay = function () {

    $(`.card`).on(`mouseover`, function () {
        $(this).addClass(`hovered`);
        $(`.hovered`).on(`mouseout`, function () {
            $(this).removeClass(`hovered`);
        });
    });
    $(`.card`).on(`click`, function (e) {
        var index = $(`.card`).index(this);         // get selected card's index (0 -> total cols)
        $(this).addClass(`selected`);
        console.log($('.selected').length);
        var that = e;
        MemoryGame.flip(that, index);
        if ($('.selected').length === 1) {
            MemoryGame.selectedFirstCard = MemoryGame.selectedImages[index];
            console.log(MemoryGame.selectedFirstCard);                  //To delete
        }
        if ($('.selected').length === 2) {
            MemoryGame.selectedSecondCard = MemoryGame.selectedImages[index];
            console.log(MemoryGame.selectedSecondCard);                  //To delete

            $(`.selected`).removeClass(`selected`);     //  mettre dans la derniere fonction
            // MemoryGame.selectedFirstCard = -1;
            // MemoryGame.selectedSecondCard = -1;
        }
    });
}



MemoryGame.start = function () {

    MemoryGame.generateBoard();
    MemoryGame.pickRandomCards();
    MemoryGame.gameplay();
}

MemoryGame.start();