function generateWinningNumber(){
    return Math.floor(100*Math.random()+1);
}

function shuffle(arr){
    var m = arr.length, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
}

function Game(){
    this.playersGuess=null;
    this.pastGuesses=[];
    this.winningNumber=generateWinningNumber();
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
    return (this.playersGuess < this.winningNumber) ? true:false;
}

Game.prototype.playersGuessSubmission = function(num){
    this.playersGuess=num;
    if(num <1 || num >100 || (isNaN(num))) {
        throw "That is an invalid guess.";
    }else{
        return this.checkGuess();
    }

}

Game.prototype.checkGuess = function(){
    if(this.playersGuess == this.winningNumber){
        this.pastGuesses.push(this.playersGuess);
        return "YOU WIN!";
    }else if(this.pastGuesses.indexOf(this.playersGuess) !== -1){
        return "You have already guessed that number.";
    }else{
        this.pastGuesses.push(this.playersGuess);
        if(this.pastGuesses.length === 5) return "You Lose.";
    }

    let diff = this.difference();
    if(diff < 10){
        return "You're burning up!";
    }else if(diff < 25){
        return "You're lukewarm.";
    }else if(diff < 50){
        return "You're a bit chilly.";
    }else if(diff < 100){
        return "You're ice cold!";
    }
}

function newGame(){
    return (new Game());
}

Game.prototype.provideHint=function(){
    return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
}

$(document).ready(function(){
    let game = newGame();
    $('#submit').click(function(){
        let guess = $('#player-guess').val();
        let status=game.playersGuessSubmission(guess);
        if(!!(status) && (status !== "You have already guessed that number.")){
            let position = game.pastGuesses.length;
            $(`li:nth-child(${position})`).text(guess);
        };
        $("#status").text(status);
        if(status == "YOU WIN!" || status === "You Lose.") {
            $('#submit').attr('disabled', 'disabled');
        }

    });

    $('#reset').click(function(){
        if (confirm('Are you sure you want to reset? Any unsaved progress will be lost')) {
            game = newGame();
            $('li').text('-');
            $("h3").remove('#hint');
            $('#player-guess').val('');
            $("#status").text('');
            $("#hintContent").text('');
            $('#submit').removeAttr('disabled');
            $('#hint').removeAttr('disabled');
        }
    });

    $('#hint').click(function(){
        const hint = game.provideHint();
        $("#hintContent").text(hint);
        $('#hint').attr('disabled', 'disabled')
    });
});







