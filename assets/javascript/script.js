//INITIALIZE FIREBASE
var config = {
    apiKey: "AIzaSyDVzbuxjjHYKSaLu9hA4Gr3dQF9VHYosow",
    authDomain: "rockpaperscissorsonline-6aac9.firebaseapp.com",
    databaseURL: "https://rockpaperscissorsonline-6aac9.firebaseio.com",
    projectId: "rockpaperscissorsonline-6aac9",
    storageBucket: "rockpaperscissorsonline-6aac9.appspot.com",
    messagingSenderId: "289811778360"
};

firebase.initializeApp(config);

var database = firebase.database();

//INITIALIZE VARIABLES
var name1 = "";
var name2 = "";
var choice1 = "";
var choice2 = "";
var wins1 = 0;
var wins2 = 0;
var ties = 0;

//check to see if players are in game
var player1InGame = false;
var player2InGame = false;

//check to see if a player has made their choice
var player1Chose = false;
var player2Chose = false;

//establish variable to set the player for the session
var player;

//establish game message variable
var gameMessage;

//HIDING DIVS NOT IN USE
$("#player1choices").hide();
$("#player2choices").hide();

//SHOWING DIVS YOU'LL NEED
$("#player1login").show();
$("#player2login").show();

$(document).ready(function(){

function checkForChoices() {
    // check to see if players have made their choice
database.ref().on("value", function(snapshot) {
    player1Chose = snapshot.val().player1Chose;
    player2Chose = snapshot.val().player2Chose;
    
    //compare player1's choice to player2's choice
    if (player1Chose === false && player2Chose === false) {
            $("#gameMessages").text(snapshot.val().gameMessage);
    } else if (player1Chose === true && player2Chose === false) {
            gameMessage = "Waiting on Player 2...";

            database.ref().update({
                gameMessage: gameMessage
            });

            $("#gameMessages").text(gameMessage);
    } else if (player1Chose === false && player2Chose === true) {
            gameMessage = "Waiting on Player 1...";

            database.ref().update({
                gameMessage: gameMessage
            });

            $("#gameMessages").text(gameMessage);
    } else {
        //compare player1's choice to player2's choice
        
    
        if (snapshot.val().choice1 === snapshot.val().choice2) {
            //if both players selected the same thing!
            ties = snapshot.val().ties;
    
            ties++;

            gameMessage = "It's a tie!";
    
            database.ref().update({
                ties: ties,
                player1Chose: false,
                player2Chose: false,
                gameMessage: gameMessage
            });

            $("#ties").text("Ties: " + ties);
            $("gameMessages").text(gameMessage);

            return;
    
        } else if (snapshot.val().choice1 === "Rock!" && snapshot.val().choice2 === "Scissors!" || snapshot.val().choice1 === "Scissors!" && snapshot.val().choice2 === "Paper!" || snapshot.val().choice1 === "Paper!" && snapshot.val().choice2 === "Rock!") {
            //player 1 wins
            wins1 = snapshot.val().wins1;
    
            wins1++;

            gameMessage = "Player 1 chose: " + snapshot.val().choice1 + " Player 2 chose: " + snapshot.val().choice2 + " Player 1 wins!";
    
            database.ref().update({
                wins1: wins1,
                player1Chose: false,
                player2Chose: false,
                gameMessage: gameMessage
            });

            $("#wins1").text("Wins: " + wins1);
            $("#gameMessages").text(gameMessage);

            return;
    
        } else {
            //player 2 wins
            wins2 = snapshot.val().wins2;
    
            wins2++;

            gameMessage = "Player 1 chose: " + snapshot.val().choice1 + " Player 2 chose: " + snapshot.val().choice2 + " Player 2 wins!";
    
            database.ref().update({
                wins2: wins2,
                player1Chose: false,
                player2Chose: false,
                gameMessage: gameMessage
            });

            $("#wins2").text("Wins: " + wins2);
            $("#gameMessages").text(gameMessage);

            return;
        }
    }
});
};

//LOGIN AND START FOR PLAYER1
$("#submit1").on("click", function(event) {
    event.preventDefault();

    player = 1;

    name1 = $("#username1").val().trim();

    database.ref().update({
        name1: name1,
        player1InGame: true
    });

    console.log(name1);

    $("#player1login").hide();
    $("#name1").text(name1);
    $("#player1choices").show();
    $("#player2choices").hide();
});

//LOGIN AND START FOR PLAYER2
$("#submit2").on("click", function(event) {
    event.preventDefault();

    player = 2;

    name2 = $("#username2").val().trim();

    database.ref().update({
        name2: name2,
        player2InGame: true
    });

    console.log(name2);

    $("#player2login").hide();
    $("#name2").text(name2);
    $("#player2choices").show();
    $("#player1choices").hide();
});

//PLAYER ONE CHOOSES, SAVES CHOICE TO FIREBASE
$(".choice1").on("click", function(event) {
    event.preventDefault();

    choice1 = $(this).val().trim();

    database.ref().update({
        choice1: choice1,
        player1Chose: true
    });

    $("#gameMessages").text("You chose " + choice1);

    $("#player1choices").show();

    checkForChoices();
});

//PLAYER TWO CHOOSES, SAVES CHOICE TO FIREBASE
$(".choice2").on("click", function(event) {
    event.preventDefault();

    choice2 = $(this).val().trim();

    database.ref().update({
        choice2: choice2,
        player2Chose: true
    });

    $("#gameMessages").text("You chose " + choice2);

    $("#player2choices").show();

    checkForChoices();
});

//PLAYER 1 LEAVES THE GAME, UPDATES FIREBASE
$("#leave1").on("click", function(event) {
    var name1 = "";
    var choice1 = "";
    var choice2 = "";

    database.ref().update({
        player1InGame: false,
        name1: name1,
        choice1: choice1,
        choice2: choice2,
        wins1: 0,
        wins2: 0,
        ties: 0
    });

    $("#player1login").show();
    $("#name1").text(" ");
    $("#player1choices").hide();

});

//PLAYER 2 LEAVES THE GAME
$("#leave2").on("click", function(event) {
    var name2 = "";
    var choice1 = "";
    var choice2 = "";

    database.ref().update({
        player2InGame: false,
        name2: name2,
        choice1: choice1,
        choice2: choice2,
        wins1: 0,
        wins2: 0,
        ties: 0
    });

    $("#player2login").show();
    $("#name2").text(" ");
    $("#player2choices").hide();
});


//WATCH FIREBASE FOR CHANGES
database.ref().on("value", function(snapshot) {
    event.preventDefault();
    
    //set variables to check
    player1InGame = snapshot.val().player1InGame;
    player2InGame = snapshot.val().player2InGame;

    //check to see if there are two players actively playing, then display names and hide logins
    if (player1InGame === true && player2InGame === true) {
        // $("#gameMessages").text("Game already in session.");
        $("#player1login").hide();
        $("#player2login").hide();
        $("#name1").text(snapshot.val().name1);
        $("#name2").text(snapshot.val().name2);
        $("#wins1").text("Wins: " + snapshot.val().wins1);
        $("#wins2").text("Wins: " + snapshot.val().wins2);
        $("#ties").text("Ties: " + snapshot.val().ties);
    } else if (player1InGame === true && player2InGame === false) {
        gameMessage = "Waiting for a Player 2.";

        database.ref().update({
            gameMessage: gameMessage
        });

        $("#gameMessages").text(gameMessage);
        $("#player1login").hide();
        $("#player2login").show();
        $("#name1").text(snapshot.val().name1);
        $("#name2").text(" ");
    } else if (player1InGame === false && player2InGame === true) {
        gameMessage = "Waiting for a Player 1.";

        database.ref().update({
            gameMessage: gameMessage
        });

        $("#gameMessages").text(gameMessage);
        $("#player1login").show();
        $("#player2login").hide();
        $("#name1").text(" ");
        $("#name2").text(snapshot.val().name2);
    } else {
        gameMessage = "Brand new game! Bring a friend!";

        database.ref().update({
            gameMessage: gameMessage
        });

        $("#player1login").show();
        $("#player2login").show();
        $("#name1").text(" ");
        $("#name2").text(" ");
        $("#gameMessages").text(gameMessage);
    }


    // if (player === 1) {
    //     database.ref("player1InGame").onDisconnect.update({
    //         player1InGame: false,
    //         name1: ""
    //     });
    // } else if (player === 2) {
    //     database.ref("player2InGame").onDisconnect.update({
    //         player2InGame: false,
    //         name2: ""
    //     });
    // }

}, function(errorObject) {
    console.log("Error: " + errorObject.code);
});



//PULL PAST MESSAGES FROM FIREBASE, USING THE ADDCHILD METHOD AND A FOR LOOP TO GO THROUGH EACH CHAT MESSAGE AND APPENDING THEM TO THE (#chatMessages) DIVS
//USE database.ref().on("value", function(){ // MORE CODE }) HERE TO TRACK WHEN MESSAGES ARE UPDATED

database.ref().child("messages").on("value", function(snapshot) {
    $("#chatBox").empty();

    $.each(snapshot.val(), function(i, value) {

        var message = value.message;

        var chatMessage = $("<p class='messages'>").text(message);

        //we're prepending instead of appending because we're using a CSS Flexbox trick to auto-scroll the chatbox to the bottom, which displays the messages in reverse. By prepending, the messages display chronologically!
        $("#chatBox").prepend(chatMessage);

    });
});

//CREATE A CLICK EVENT FOR WHEN THE SUBMIT BUTTON FOR THE CHAT IS CLICKED (#submitChat)
//PULL VALUE FROM THE (#chatInput) TEXT FIELD IN THE HTML, USE .val().trim()
//PUSH THE (#chatInput) TO FIREBASE USING '.SET'
//SINCE WE HAVE A DATABASE REF ABOVE CHECKING FOR CHANGES TO THE VALUES, THE CHAT SHOULD BE UPDATED WITHOUT ADJUSTING THE TEXT OR HTML HERE

$("#chatSubmit").on("click", function(event) {
    event.preventDefault();

    //set up variable for messages
    message = $("#chatMessage").val().trim();

    database.ref().child("messages").push({
        message: message
    });

    $("#chatMessage").val("");
});

});