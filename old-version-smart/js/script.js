$(document).ready(function(){
    // Defaults Player's turn to X
    var turn = "X";
    // Array that stores the values that we will check later for a winner
    var turns = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
    // Default Computer turn to O
    var computersTurn = "O";
    // This keeps track if it is the computer's turn or not
    var gameOn = false;
    // Keep track of the computer's turn so there's no loop
    var count = 0;
    // Change player's turn to X & computer's to O
    $('#turnX').click(function(){
        turn = "O";
        computersTurn = "X";
        $('#turnX').removeClass('btn-secondary');
        $('#turnX').addClass('btn-primary');
        $('#turnO').removeClass('btn-primary');
        $('#turnO').addClass('btn-secondary');
        reset();
    })
    $('#turnO').click(function(){
        turn = "X";
        computersTurn = "O";
        $('#turnO').removeClass('btn-secondary');
        $('#turnO').addClass('btn-primary');
        $('#turnX').removeClass('btn-primary');
        $('#turnX').addClass('btn-secondary');
        reset();
    })

    function computerTurn(){
        // used to break while loop
        var taken = false;
        while(taken === false && count !== 5){
            // generate computer's random turn
            var computersMove = (Math.random() * 10).toFixed();
            var move = $('#'+computersMove).text();
            if (move === "#"){
                $("#" + computersMove).text(computersTurn);
                turns[computersMove] = computersTurn;
                taken = true;
            }
        }
    }

    function playerTurn(turn, id){
        var spotTaken = $("#" + id).text();
        if (spotTaken === "#" ){
            count++;
            turns[id] = turn;
            $("#" + id).text(turn);
            winCondition(turns, turn);
            if(gameOn === false){
                computerTurn();
                winCondition(turns, computersTurn);
            }
        }
    }

    function winCondition(turnArray, currentTurn){
            if (
                turnArray[0] == currentTurn &&
                turnArray[1] == currentTurn &&
                turnArray[2] == currentTurn
            ){
                reset();
                alert("Player " + currentTurn + " wins!");
            } else if (
                turnArray[3] == currentTurn &&
                turnArray[4] == currentTurn &&
                turnArray[5] == currentTurn
            ){
                reset();
                alert("Player " + currentTurn + " wins!");
            } else if (
                turnArray[6] == currentTurn &&
                turnArray[7] == currentTurn &&
                turnArray[8] == currentTurn
            ){
                reset();
                alert("Player " + currentTurn + " wins!");
            } else if (
                turnArray[0] == currentTurn &&
                turnArray[3] == currentTurn &&
                turnArray[6] == currentTurn
            ){
                reset();
                alert("Player " + currentTurn + " wins!");
            } else if (
                turnArray[1] == currentTurn &&
                turnArray[4] == currentTurn &&
                turnArray[7] == currentTurn
            ){
                reset();
                alert("Player " + currentTurn + " wins!");
            } else if (
                turnArray[2] == currentTurn &&
                turnArray[5] == currentTurn &&
                turnArray[8] == currentTurn
            ){
                reset();
                alert("Player " + currentTurn + " wins!");
            } else if (
                turnArray[0] == currentTurn &&
                turnArray[4] == currentTurn &&
                turnArray[8] == currentTurn
            ){
                reset();
                alert("Player " + currentTurn + " wins!");
            } else if (
                turnArray[2] == currentTurn &&
                turnArray[4] == currentTurn &&
                turnArray[6] == currentTurn
            ){
                reset();
                alert("Player " + currentTurn + " wins!");
            } else {
                gameOn = false;
            }
    }

    $(".tic").click(function(){
        var slot = $(this).attr("id");
        playerTurn(turn, slot);
    })

    function reset(){
        turns = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
        count = 0;
        $('.tic').text("#");
        gameOn = false;
    }
});
