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

//HIDING DIVS NOT IN USE
$("#player1choices").hide();
$("#player2choices").hide();

$(document).ready(function(){
//LOGIN FOR PLAYERS
$("#submit1").on("click", function(event) {
    event.preventDefault();

    name1 = $("#username1").val().trim();

    database.ref().update({
        name1: name1
    });

    console.log(name1);

    $("#player1login").hide();
    $("#player1choices").show();
});

$("#submit2").on("click", function(event) {
    event.preventDefault();

    name2 = $("#username2").val().trim();

    database.ref().update({
        name2: name2
    });

    console.log(name2);

    $("#player2login").hide();
    $("#player2choices").show();
});

//PLAYER ONE CHOOSES, SAVES CHOICE TO FIREBASE
$(".choice1").on("click", function(event) {

    choice1 = $(this).val().trim();

    database.ref().update({
        choice1: choice1
    });

    console.log(choice1);
});

//PLAYER TWO CHOOSES, SAVES CHOICE TO FIREBASE

$(".choice2").on("click", function(event) {

    choice2 = $(this).val().trim();

    database.ref().update({
        choice2: choice2
    });

    console.log(choice2);
});

//ONCE BOTH PLAYERS CHOOSE

//PULL PLAYER1 CHOICE

//PULL PLAYER2 CHOICE

//COMPARE PLAYER1 CHOICE TO PLAYER2 CHOICE

//IF CHOICES MATCH, MARK TIE AND SCORE IN FIREBASE
//IF CHOICES DO NOT MATCH, GO THROUGH COMPARISIONS TO SEE WHO WON AND WHO LOST
//LOG WINS AND LOSSES FOR EACH PLAYER

//CREATE CHAT
//CHECK FOR PLAYER NAME FROM FIREBASE (SHOULD HAVE BEEN SAVED TO FIREBASE FROM PLAYER SET-UPS)
//POST BOTH NAME AND MESSAGE FROM PLAYER TO CHAT, SAVE CHAT IN FIREBASE

});