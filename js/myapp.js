/* Variables  */
var MemoryGame = {};
MemoryGame.nbImages = 12                                      // If you add pictures, keep same ratio, name it picX.jpg (x is number), and update Memorygame.nbImages
MemoryGame.images = [];
MemoryGame.selectedImages = [];
MemoryGame.selectedFirstCard = ``;
MemoryGame.selectedSecondCard = ``;
MemoryGame.maxCards = 0;                                     // By selecting difficulty on modal, this var will change 
MemoryGame.theme = "";
MemoryGame.wrongCounter = 0;

/* choose randomly pics from  MemoryGame.images + double + random store in array */
MemoryGame.pickRandomCards = function () {

    var arr1 = [];                                                           // arr1 et arr2 are test for random, make sure we get a number only once 
    var arr2 = [];
    while (arr1.length < (MemoryGame.maxCards * 2)) {                        // pick random num and store it twice. 
        var r = Math.floor(Math.random() * MemoryGame.images.length);        // This is pretty cool because it will select random pics from total array :)
        if (arr1.indexOf(r) === -1) {
            arr1.push(r);
            arr1.push(r);                                                    // push twice to get number in double 
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

/* Welcome modal */
MemoryGame.generateModal = function () {
    $('#startModal').modal({
        backdrop: 'static',
        keyboard: false
    })
    $(".radio-difficulty").click(function () {
        MemoryGame.maxCards = $(this).val();
    });

    $(".radio-theme").click(function () {
        MemoryGame.theme = $(this).val();
    });

    $("#submit").on("click", function () {
        if (MemoryGame.maxCards !== 0 && MemoryGame.theme !== "") {
            MemoryGame.start();
            $("#startModal").css("display", "none");
            $(".modal-backdrop").css("display", "none");
        } else {
            alert("Please select a difficulty & a theme!");
        }
    })
}

/* Winning modal */
MemoryGame.winning = function () {
    $('#winModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $("#modal-score").html(`You made ${MemoryGame.wrongCounter} mistakes `)
    $("#modal-gif").append($(`<img id="winImage" src="./img/${MemoryGame.theme}/win.gif" />`));
    $("#restart-button").on("click", function () {
        location.reload();
    })
}

/* Generate all the html besides modals */
MemoryGame.generateBoard = function () {

    $(`#board`).append(`<div id='header' class='row justify-content-center'>`);
    $('#header').append($('<input type="image" src="./img/newGameButton.png" id="new-game" />'));
    $('#header').append($('<img src="./img/mute.png" id="mute" />'));
    $("#mute").on("click", function () {
        if ($("#mute").hasClass("muted")) {
            document.getElementById("music-game").play();
            $("#mute").removeClass("muted");
        } else {
            $("#mute").addClass("muted");
            document.getElementById("music-game").pause();
        }
    })

    $('#new-game').on(`click`, function () {                          // refreshes the page, offering a new game to the user
        location.reload();
    })

    $('#board').append($('<div id="wrong-guesses" class="row justify-content-center">'));
    $(`#wrong-guesses`).html(`wrong guesses: ${MemoryGame.wrongCounter}`);

    var cardsByRow = (MemoryGame.maxCards * 2) / 3;                 // automatic number of cards per row depending on total
    for (var i = 1; i <= 3; i++) {
        $(`#board`).append(`<div class='row justify-content-center'>`);
        for (var j = 1; j <= cardsByRow; j++) {
            $(`.row:nth-child(${i + 2})`).append(`<div class='col-xs-5 card'>`);
            $(".card").css("backgroundImage", `url(./img/${MemoryGame.theme}/cardBack.jpg`);
        }
    }
    $(document.body).css("backgroundImage", `url(./img/${MemoryGame.theme}/background.jpg`);
    if (MemoryGame.theme !== "Casa") {
        $("#music-game").attr("src", "./audio/rickAudio.mp3");

    }
    document.getElementById("music-game").play();

}

/* generate images array's content from MemoryGame.nbImages */
MemoryGame.generateImagesArray = function () {
    for (var i = 0; i < MemoryGame.nbImages; i++) {
        MemoryGame.images.push(`pic${i}.jpg`);
    }
}

/* eventlistener on cards - main structure of gameplay */
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
        var that = e;
        MemoryGame.flip(that, index);
        if ($('.selected').length === 1) {
            MemoryGame.selectedFirstCard = MemoryGame.selectedImages[index];
        }
        if ($('.selected').length === 2) {
            MemoryGame.selectedSecondCard = MemoryGame.selectedImages[index];
            $(`.card`).css(`pointerEvents`, `none`);                         // user can't click on other cards while timeout
            MemoryGame.checkMatch();
            window.setTimeout(function () {
                $(`.selected`).css(`backgroundImage`, `url(./img/${MemoryGame.theme}/cardBack.jpg)`);
                $(`.card`).css(`pointerEvents`, `all`);                               // user can click again 
                $(`.guessed`).css(`pointerEvents`, `none`);
                MemoryGame.selectedFirstCard = ``;
                MemoryGame.selectedSecondCard = ``;
                $(`.selected`).removeClass(`selected`);
            }, [1000]);
        }
    });
}

/* changing cards image while animation */
MemoryGame.flip = function (that, index) {
    that.target.style.backgroundImage = `url('./img/${MemoryGame.theme}/${MemoryGame.selectedImages[index]}')`;
}

/* Check if cards are matching */
MemoryGame.checkMatch = function () {
    if (MemoryGame.selectedFirstCard === MemoryGame.selectedSecondCard) {
        $(`.selected`).addClass(`guessed`);
        $(`.selected`).removeClass(`selected`);
    } else {
        MemoryGame.wrongCounter++;
        $(`#wrong-guesses`).html(`wrong guesses: ${MemoryGame.wrongCounter}`);

    }
    if ($(".guessed").length === (MemoryGame.maxCards * 2)) {
        MemoryGame.winning();
    }

}

/* Functions initiating the game */
MemoryGame.start = function () {

    MemoryGame.generateImagesArray();
    MemoryGame.generateBoard();
    MemoryGame.pickRandomCards();
    MemoryGame.gameplay();

}

MemoryGame.generateModal();
