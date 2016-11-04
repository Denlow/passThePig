var roll = 0;
var roundPoints = 0;
var playTo = 100;
 //initialize//
//business logic// Manipulate Data, action, not interacting with DOM

function Die() {
  this.pip = 1;
};

Die.prototype.roll = function() {
  return this.pip = Math.floor((Math.random() * 6) + 1);
};

function Player(){ //constructor of PLAYER OBJECT
  this.score = 0;
};

function updateScore(player, points){
  player.score += points;
  roundPoints = 0;
  return player.score;
};

function getPigValues(roll) {
  if(roll === 2) {
    return -1; //bacon
  } else if(roll === 3 || roll === 11) {
    return 25;
  } else if (roll === 4 || roll === 10) {
    if (die1.pip === 2 && die2.pip === 2 || die1.pip === 5 && die2.pip === 5){
      return 30;
    }
      return 25;
  } else if(roll === 5 || roll === 9) {
    return 15;
  } else if(roll === 6 || roll === 8) {
    return 10;
  } else if(roll === 7) {
    return 0;
  }
  return 60;
}

//user interface//
$(document).ready(function(){
  die1 = new Die();
  die2 = new Die();
  player1 = new Player(); //constructor call
  player2 = new Player();
  var pigValue = 0;

  function player1EndTurn() {
    $("#round-total").text(roundPoints);
    $("#player2-roll").prop("disabled", false);
    $("#player1-roll").prop("disabled", true);
    $("#player2-stop").prop("disabled", false);
    $("#player1-stop").prop("disabled", true);
    $("#player1-turn").hide();
    $("#player2-turn").show();
  };

  function player2EndTurn() {
    $("#player1-roll").prop("disabled", false);
    $("#player2-roll").prop("disabled", true);
    $("#player1-stop").prop("disabled", false);
    $("#player2-stop").prop("disabled", true);
    $("#player2-turn").hide();
    $("#player1-turn").show();
    $("#round-total").text(roundPoints);
  }

  $("#player1-roll").click(function(){
    $("#player1-stop").prop("disabled", false);
    $("#current-roll").text("");
    roll = die1.roll() + die2.roll();
    pigValue = getPigValues(roll);
    console.log(roll);
    console.log(pigValue);
    $("#round-total").text(roundPoints);
    $("#current-roll").append('<img src="img/' + die1.pip.toString() + '.png">' + '<img src="img/' + die2.pip.toString() + '.png">');
    if(pigValue === -1){
      roundPoints = 0;
      player1.score = 0;
      $("#player1").text("0");
      player1EndTurn();
    } else if(pigValue === 0) {
      roundPoints = 0;
      player1EndTurn();
    } else if(die1.pip === die2.pip){
      alert("Player 1 Bonus Roll!");
      $("#player1-stop").prop("disabled", true);
      roundPoints += pigValue;
    } else {
      roundPoints += pigValue;
    }
    $("#round-total").text(roundPoints);
  });

  $("#player1-stop").click(function(){
    $("#player1").text(updateScore(player1, roundPoints));
    player1EndTurn();
    roundPoints = 0; //reset or value for new player//
    if(player1.score >= playTo){
      $("#player2-roll").prop("disabled", true);
      $("#player2-stop").prop("disabled", true);
      $("#winner").text('Player 1 Wins!');
      $("#win").toggle();
    }
  });


  $("#player2-roll").click(function(){
    $("#player2-stop").prop("disabled", false);
    $("#current-roll").text("");
    roll = die1.roll() + die2.roll();
    pigValue = getPigValues(roll);
    $("#round-total").text(roundPoints);
    $("#current-roll").append('<img src="img/' + die1.pip.toString() + '.png">' + '<img src="img/' + die2.pip.toString() + '.png">');
    if(pigValue === -1){
      roundPoints = 0;
      player2.score = 0;
      $("#player2").text("0");
      player2EndTurn();
    } else if(pigValue === 0) {
      roundPoints = 0;
      player2EndTurn();
    } else if(die1.pip === die2.pip){
      alert("Player 2 Bonus Roll!");
      $("#player2-stop").prop("disabled", true);
      roundPoints += pigValue;
    } else {
      roundPoints += pigValue;
    }
    console.log(roll);
    $("#round-total").text(roundPoints);
  });

  $("#player2-stop").click(function(){
    $("#player2").text(updateScore(player2, roundPoints));
    player2EndTurn();
    roundPoints = 0;
    if(player2.score >= playTo){
      $("#player1-roll").prop("disabled", true);
      $("#player1-stop").prop("disabled", true);
      $("#winner").text('Player 2 Wins!');
      $("#win").toggle();
    }
  });

  $("#play-again").click(function(){
    alert("THANKS FOR PLAYING!");
    player1.score = 0;
    player2.score = 0;
    console.log(player1.score);
    console.log(player2.score);
    $("#player1").text("0");
    $("#player2").text("0");
    $("#player1-roll").prop("disabled", false);
    $("#player1-stop").prop("disabled", false);
    $("#player2-turn").hide();
    $("#player1-turn").show();
    roll = 0;
    roundPoints = 0;
    pigValue = 0;
    $("#round-total").text(roundPoints);
    $("#win").hide();
  });
});
