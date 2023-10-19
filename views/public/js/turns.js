$(async function(){
    await getDeck();
    let deckId = sessionStorage.getItem('deck');
    let started = false;
    let picked = false;
    let moves = 0;
    let finished = false;
    let firstTurns = false;
    let firstMove = false;
    let turns;
    let draw;
    let replace;
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let playerOne =[
        ['x','x','x'],['x','x','x'],['x','x','x']
    ];
    let playerTwo =[
        ['x','x','x'],['x','x','x'],['x','x','x']
    ];
    let playerOneImg =[
        ['x','x','x'],['x','x','x'],['x','x','x']
    ];
    let playerTwoImg =[
        ['x','x','x'],['x','x','x'],['x','x','x']
    ];
    let discard = ['x','https://www.deckofcardsapi.com/static/img/back.png'];
    let cards1 = [["card1.1", "card1.2", "card1.3"], ["card1.4", "card1.5", "card1.6"], ["card1.7", "card1.8", "card1.9"]];
    let cards2 = [["card2.1", "card2.2", "card2.3"], ["card2.4", "card2.5", "card2.6"], ["card2.7", "card2.8", "card2.9"]];


     // when burger is clicked, open nav
    $("#burger").on('click', function(){
        console.log('click')
        document.getElementById("nav").style.transform = "translateX(0%)"
        $(".nav").delay(50).promise().done(function(){
            $(".x").css("display", "block");
        });
        $("section").css("filter", "blur(4px)");
        $("#pickedCard").css("filter", "blur(4px)");
    });

    // when x is clicked, close nav
    $(".x").on('click', function(){
        $(".x").css("display", "none");
         document.getElementById("nav").style.transform = "translateX(-100%)"

        //  prevents everything from unblurring until the game starts
         if(started){
            $("section").css("filter", "blur(0px)");
            $("#pickedCard").css("filter", "blur(0px)");
        }
        $('#btnDiv').css("filter", "blur(0px)");
    }); 


    // blurs the screen until the start button is clicked
    // also makes sure that the nav doesn't unblur everything until game starts
    $('#btnDiv').css('display','flex');
    $('section').css("filter", "blur(4px)");
    $('#btnDiv').css("filter", "blur(0px)");
    $('#btnDiv').on('click', function(){
        $('section').css("filter", "blur(0px)"); 
        started = true; 
        turns = 1;
    })  

    // keeps track of which cards have been clicked already
    let chosenCards = [];
    // keeps track of turn every click
    $('.playArea').on('click', async function(){
        console.log($(this).attr('src'))
        replace = $(this).attr('src');
        $('#discardPile').css('pointer-events', 'auto');
        if(started){
            // if no card was selected from the deck, then draw a new card
            if(!picked){
                draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(response =>{return response.json()});
            }

            // if it is the first turn, let player flip three cards
            if(turns == 1 && sessionStorage.getItem('start')){
                let inArr = false;
                // makes sure that the same card can't be clicked twice during the first turn
                for(let i = 0; i < chosenCards.length; i++){
                    if($(this).attr('id') == chosenCards[i]){
                        inArr = true;
                    }
                }
                if(!inArr){
                    // if the card has not been clicked, change the image to a new card
                    moves++;
                    $(this).attr('src', draw.cards[0].image).animate({opacity:1}, 100);
                    chosenCards.push($(this).attr('id'));
                    // gets the location of the card and updates the array
                    for(let i = 0; i < cards1.length; i++){
                        for(let j = 0; j < cards1[i].length; j++){
                            if($(this).attr('id') == cards1[i][j]){
                                cardUpdate(i,j,1,false);
                            }
                        }
                    }
                }
                
                // if they flipped three cards on first turn, end the turn
                if(moves == 3){
                    moves = 0;
                    turns++;

                    // slides screen over to player 2
                    setTimeout(function(){
                        document.getElementById("boards").style.transform = "translate(-50vw,0px)";
                    }, 500);
                }

            // makes sure that a card is picked
            }else if(turns %2 == 1 && picked && sessionStorage.getItem('start')){
                $('#deck').css('pointer-events', 'auto');
                moves = 0;
                turns++;
                // gets the location of the card and updates the array
                for(let i = 0; i < cards1.length; i++){
                    for(let j = 0; j < cards1[i].length; j++){
                        if($(this).attr('id') == cards1[i][j]){
                            cardUpdate(i,j,1,true);
                        }
                    }
                }
                
                // set image to the drawn card and hides drawn card
                $(this).attr('src', $('#pickedCard').attr('src')).animate({opacity:1}, 100);
                $('#pickedCard').css('display', 'none');

                // slides screen over to player 2
                setTimeout(function(){
                    document.getElementById("boards").style.transform = "translate(-50vw,0px)";
                }, 500);
                picked = false;
                firstMove = false;

            // if it is the second turn, let player flip three cards
            }else if(turns == 2 && sessionStorage.getItem('start')){
                let inArr = false;
                // makes sure that the same card can't be clicked twice during the first turn
                for(let i = 0; i < chosenCards.length; i++){
                    if($(this).attr('id') == chosenCards[i]){
                        inArr = true;
                    }
                }
                if(!inArr){
                    // if the card has not been clicked, change the image to a new card
                    moves++;
                    $(this).attr('src', draw.cards[0].image).animate({opacity:1}, 100);
                    chosenCards.push($(this).attr('id'));
                    // gets the location of the card and updates the array
                    for(let i = 0; i < cards2.length; i++){
                        for(let j = 0; j < cards2[i].length; j++){
                            if($(this).attr('id') == cards2[i][j]){
                                cardUpdate(i,j,2,false);
                            }
                        }
                    }
                }
                
                // if they flipped three cards on first turn, end the turn
                if(moves == 3){
                    moves = 0;
                    turns++;

                    // slides screen over to player 1
                    setTimeout(function(){
                        document.getElementById("boards").style.transform = "translate(00vw,0px)";
                    }, 500);
                    firstTurns = true;
                }

            // makes sure that a card is picked
            }else if(turns %2 == 0 && picked && sessionStorage.getItem('start')){
                $('#deck').css('pointer-events', 'auto');
                moves = 0;
                turns++;
    
                // set image to the drawn card and hides drawn card
                $(this).attr('src', $('#pickedCard').attr('src')).animate({opacity:1}, 100);
                $('#pickedCard').css('display', 'none');
                // gets the location of the card and updates the array
                for(let i = 0; i < cards2.length; i++){
                    for(let j = 0; j < cards2[i].length; j++){
                        if($(this).attr('id') == cards2[i][j]){
                            cardUpdate(i,j,2, true);
                        }
                    }
                }

                // slides screen over to player 1
                setTimeout(function(){
                    document.getElementById("boards").style.transform = "translate(0vw,0px)";
                }, 500);
                picked = false;
                firstMove = false;
            }
        }

        // checks to see if the game is over or not every turn
        checkWinner();

        if(finished){
            // zooms board back to normal
            setTimeout(function(){
                document.getElementById("boards").style.transform = "translate(0vw,0px)";
                document.getElementById("boards").style.width = "100%";
            }, 1000);
        }
        
    });

    
    // makes the card follow the mouse at all times
    document.addEventListener("mousemove", card);
    $('#deck').on('click', async function(e){
        // makes sure the first opening moves are done first
        if(firstTurns && !firstMove){
            // sets variable to true, indicating that a card is selected
            picked = true;
            // sets pciked card image to a drawn card image
            draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(response =>{return response.json()});
            $('#pickedCard').attr('src', draw.cards[0].image);
            $('#pickedCard').css({display: 'block', filter: 'blur(0px)'});
            firstMove = true;
        }else if(firstMove){
            $('#deck').css('pointer-events', 'none');
        }
    })

    $('#discardPile').on('click', async function(){
        // lets player discard the card they drew and switch turns
        if(picked){
            $('#discardPile').attr('src', $('#pickedCard').attr('src'));
            $('#pickedCard').css({display: 'none'});
            if(turns % 2 == 1){
                turns++;
                setTimeout(function(){
                    document.getElementById("boards").style.transform = "translate(-50vw,0px)";
                }, 500);
            }else if(turns % 2 == 0){
                turns++;
                setTimeout(function(){
                    document.getElementById("boards").style.transform = "translate(0vw,0px)";
                }, 500);
            }
            firstMove = false;
            picked = false;
            $(this).animate({opacity:1}, 50);
            discard[0] = draw.cards[0].value;
            discard[1] = draw.cards[0].image;

        }else if(firstTurns && !firstMove && turns > 3){
            // set the picled card to the card that is on top
            $('#pickedCard').attr('src', $(this).attr('src'));
            $('#pickedCard').css({display: 'block'});
            $(this).attr('src', 'https://www.deckofcardsapi.com/static/img/back.png');
            draw.cards[0].image = discard[1];
            draw.cards[0].value = discard[0];
            console.log(draw.cards[0]);

            // displays the card
            $(this).css('pointer-events', 'none');
            firstMove = true;
            picked = true;
        }else{
        }
    })

    // indicates what the user is hovering over when the card is selected
    $('.card').on( "mouseenter", function(){
        if(picked){
            $(this).animate({opacity:.5}, 100);
        }
    }).on( "mouseleave", function(){
        if(picked){
            $(this).animate({opacity:1}, 100);
        }
    })
    
    // updates the grids of both players
    function cardUpdate(row, col, player, run){
        // if the card replaced is not blank, set the discard pile value to the value and image of the replaced card
        console.log(replace)
        if(replace != 'https://www.deckofcardsapi.com/static/img/back.png'){
            if(player == 1){
                discard[0] = playerOne[row][col];
                discard[1] = playerOneImg[row][col];
            }else{
                discard[0] = playerTwo[row][col];
                discard[1] = playerTwoImg[row][col];
            }
        }

        // updates the players grid
        if(player == 1){
            playerOne[row][col] = draw.cards[0].value;
            playerOneImg[row][col] = draw.cards[0].image;
        }else{
            playerTwo[row][col] = draw.cards[0].value;
            playerTwoImg[row][col] = draw.cards[0].image;
        }
        console.log(playerOne)
        console.log(playerTwo);

        // determines if the discard pile needs to be updated or not
        if(run){
            discardPileUpdate();
        }
    }

    // updates the discard pile
    async function discardPileUpdate(){
        // if the card replaced has no value yet, draw new card to replace the discard pile
        if(replace == 'https://www.deckofcardsapi.com/static/img/back.png' || replace == undefined){
            console.log('true');
            draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(response =>{return response.json()});
            discard[0] = draw.cards[0].value;
            discard[1] = draw.cards[0].image;
        }

        if(discard[1] == 'x'){
            $('#discardPile').attr('src', 'https://www.deckofcardsapi.com/static/img/back.png');
        }else{
            $('#discardPile').attr('src', discard[1]);
        }
        
        firstMove = false;
    }

    function card(e){
        // sets position to the client x and y positon
        $('#pickedCard').css({
            left:  e.pageX - 90,
            top:   e.pageY - 123
        });
    }

    // checks to see if the game is over
    function checkWinner(){
        let countOne = 0;
        let countTwo = 0;
        // checks if the grid spot is filled, add one to the count
        for(let i = 0; i < playerOne.length; i++){
            for(let j = 0; j < playerOne[i].length; j++){
                if(playerOne[i][j] != 'x'){
                    countOne++;
                }
                if(playerTwo[i][j] != 'x'){
                    countTwo++;
                }
            }
        }
        // if the grid is full, sum the scores and determines who wins
        if(countOne == 9 || countTwo == 9){
            console.log('Game over')
            sumScore();
            finished = true;
        }
    }

    // sums the score of the boards
    async function sumScore(){
        // prevents the game from continuing
        $('#deck').css('pointer-events', 'none');
        $('#discardPile').css('pointer-events', 'none');

        let rowEqual = 0;
        let rowEqual2 = 0;

        // fills in any missing grid spots
        for(let row = 0; row < cards1.length; row++){
            for(let col = 0; col < cards1[row].length; col++){
                // if spot is empty, fill it in with a drawn card
                if(playerOne[row][col] == 'x'){
                    draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(response =>{return response.json()});
                    // changes both the array and the actual page
                    document.getElementById(`${cards1[row][col]}`).src = draw.cards[0].image;
                    playerOne[row][col] = draw.cards[0].value;

                }
                if(playerTwo[row][col] == 'x'){
                    draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(response =>{return response.json()});
                    // changes both the array and the actual page
                    document.getElementById(`${cards2[row][col]}`).src = draw.cards[0].image;
                    playerTwo[row][col] = draw.cards[0].value;
                }
            }
        }

        for(let i = 0; i < cards1.length; i++){
            // determines if the row or column has matching numbers
            if(playerOne[i][0] == playerOne[i][1] && playerOne[i][0] == playerOne[i][2]){
                rowEqual++;
            }
            if(playerTwo[i][0] == playerTwo[i][1] && playerTwo[i][0] == playerTwo[i][2]){
                rowEqual2++;
            }
        }

        // determines which sum method to use
        if(rowEqual >= 1){
                playerOneScore += rowSum(playerOne);
            }else{
                playerOneScore += colSum(playerOne);
            }
            if(rowEqual2 >= 1){
                playerTwoScore += rowSum(playerTwo);
            }else{
                playerTwoScore += colSum(playerTwo);
            }

        // determines who has the lower score and updates mongodb
        let currentEmail = sessionStorage.getItem('currentUserEmail');
        if(playerOneScore < playerTwoScore){
            document.getElementById(`winner`).innerHTML = 'Player wins';
            console.log(currentEmail);

            fetch(`/users/${currentEmail}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({status:'won'}),
            })
        }else if(playerOneScore > playerTwoScore){
            document.getElementById(`winner`).innerHTML = 'Guest wins';

            fetch(`/users/${currentEmail}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({status:'loss'}),
            })
        }else{
            document.getElementById(`winner`).innerHTML = 'Tie';

            fetch(`/users/${currentEmail}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({status:'tie'}),
            })
        }
        console.log(`Player one score: ${playerOneScore}`)
        console.log(`Player two score: ${playerTwoScore}`)
    }

    // gets the sums of the rows
    function rowSum(player){
        let playerScore = 0;
        for(let row = 0; row < cards1.length; row++){
            // if the row contains the same values, the sum of that row is zero
            if(player[row][0] == player[row][1] && player[row][0] == player[row][2]){
                playerScore += 0;
            }else{
                for(let col = 0; col < player[row].length; col++){
                    if(player[row][col] == 'JACK' || player[row][col] == 'QUEEN' || player[row][col] == 'KING'){
                        player[row][col] = 10;
                    }else if(player[row][col] == 'ACE'){
                        player[row][col] = 1;
                    }
                }
                playerScore += Number(player[row][0]) + Number(player[row][1]) + Number(player[row][2]);
            }
            // console.log('this is the row score' + playerScore);
        }

        return playerScore;
    }

    // gets the sums of the columns
    function colSum(player){
        let playerScore = 0;
        for(let col = 0; col < cards1.length; col++){
            // if the col contains the same values, the sum of that row is zero
            if(player[0][col] == player[1][col] && player[0][col] == player[2][col]){
                playerScore += 0;
            }else{
                for(let row = 0; row < cards1[col].length; row++){
                    if(player[row][col] == 'JACK' || player[row][col] == 'QUEEN' || player[row][col] == 'KING'){
                        player[row][col] = 10;
                    }else if(player[row][col] == 'ACE'){
                        player[row][col] = 1;
                    }
                }
                playerScore += Number(player[0][col]) + Number(player[1][col]) + Number(player[2][col]);
            }
        }

        return playerScore;
    }
    
});

// function to get a new deck
async function getDeck(){
    // get new shuffled deck
    let deck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response =>{return response.json()});

    // get deck id
    let deck_id = deck.deck_id;

    sessionStorage.setItem('deck', deck_id);
}

// resets the turn to one if the game is started
function newGame(){
    sessionStorage.setItem('turn', 1);
}

// onclick for the main start button
function btnChange(){
    document.getElementById("btnDiv").style.display = "none";
    document.getElementById("boards").style.width = "150%";
    sessionStorage.setItem('start', true);
}

// reloads the page to restart
function restart(){
    location.reload();
}