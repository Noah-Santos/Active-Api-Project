$(function(){

    // refreshes the leaderboard
    fetchPeople();

    // jquery for the nav
    
    // when burger is clicked, open nav
    $("#burger").on('click', function(){
        console.log('click')
        document.getElementById("nav").style.transform = "translateX(0%)"
        $(".nav").delay(50).promise().done(function(){
            $(".x").css("display", "block");
            // $(".navLink").css("display", "flex");
        });
        $("section").css("filter", "blur(4px)");
        $("#pickedCard").css("filter", "blur(4px)");
    });

    // when x is clicked, close nav
    $(".x").on('click', function(){
        $(".x").css("display", "none");
        // $(".navLink").css("display", "none");
         document.getElementById("nav").style.transform = "translateX(-100%)"

         $("section").css("filter", "blur(0px)");
    });  
})

const fetchPeople = async() =>{
    let currentEmail = sessionStorage.getItem('currentUserEmail');
    console.log(currentEmail)
    try {
        const {data} = await axios.get('/users/getUser');
        let currentUser;
        let leaderBoardText = '';
        console.log(data);

        // going through the data array and getting the data that holds the value of data
        let leaderBoard = data.map((user)=>{
            let temp = [`${user.first_name} ${user.last_name}`, `${user.wins}`, `${user.games}`];
            // gets the data of the current email
            if(user.email == currentEmail){
                currentUser = user;
            }
            return temp;
        })

        // sorts the wins in numerical order
        let lowest = 999;
        let highest = -999;
        
        leaderBoard = leaderBoard.map(spot=>{
            spot[1] = Number(spot[1]);
            return spot
        })
        leaderBoard = leaderBoard.sort((spot1, spot2) => spot2[1]-spot1[1])
        console.log(leaderBoard)
        // sets the user info
        document.querySelector('#username').innerHTML = `${currentUser.first_name} ${currentUser.last_name}`;
        document.querySelector('#userGame').innerHTML = `Games: ${currentUser.games}`;
        document.querySelector('#userWins').innerHTML = `Wins: ${currentUser.wins}`;
        document.querySelector('#userLoses').innerHTML = `Loses: ${currentUser.loses}`;
        document.querySelector('#userTies').innerHTML = `Ties: ${currentUser.ties}`;

        // gets the top 3 users to put on the leaderboard
        for(let i = 0; i < 3; i++){
            leaderBoardText += `
                <li>${leaderBoard[i][0]}</li>
                <ul>
                    <li>Wins: ${leaderBoard[i][1]}</li>
                    <li>Games: ${leaderBoard[i][2]}</li>
                </ul>
            `;
        }

        document.getElementById('scoreBoard').innerHTML = leaderBoardText;

    }catch(e){
        // formAlert.textContent = e.response.data.msg;
        console.log(e);
    }
}