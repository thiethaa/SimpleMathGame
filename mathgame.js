//selecting all the elements
var playing = false;
var startReset = document.getElementById('startreset');
var time = document.getElementById('time');  
var timeremaining = document.getElementById('timeremaining');
var gameover = document.getElementById('gameover');
var question = document.getElementById('boxmath');
var correctAns;
var wrongAns;
var corectbox = document.getElementById('correct');
var wrongbox = document.getElementById('wrong');

//if click start button
function playgame(){
    if(playing == true){
        location.reload();
    }else{
        playing = true;
//change button to reset game
        startReset.innerHTML= "Reset Game";
//show countdown box
        time.style.visibility="visible";
        timeremaining.innerHTML = 60;    
//start countdown
        startcountdown()
//hide game over box
        gameover.style.visibility= "hidden";
//generate Q&A
        generateQA()
    }  
}

//create countdown f()
function startcountdown(){
score=0;
    action = setInterval(() => {
        timeremaining.innerHTML -= 1;  
        if(timeremaining.innerHTML == 0){
//stop countdown when its reach 0
        stopcountdown()
//show game over box
        gameover.innerHTML =`
        <p>Game Over!</p><br>
        <p>your Score is: ${score}</p>
        `;
        gameover.style.visibility= "visible"; 
//hide countdown box
        time.style.visibility="hidden";
        playing = false;
//change button to start game
        startReset.innerHTML= "Start Game";   
        }
    }, 1000);
}

//create stopcountdown f()
function stopcountdown(){
    clearInterval(action);
}

//create Generate Q&A f()
function generateQA(){
    var x = 1+ Math.round (9* Math.random());
    var y = 1+ Math.round (9* Math.random());
    correctAns = x*y;
    question.innerHTML = `${x} x ${y}`;

//place correct answer
    var correctPosition = 1+ Math.round(3* Math.random()); 
    document.getElementById(`box${correctPosition}`).innerHTML= correctAns;

//place wrong answer
    //create an array to populate correctans and wrong ans(in the end with push method)
    var answer = [correctAns];
    for(i = 1; i < 5; i++){
        if(i !== correctPosition){
//make sure wrongAns != correctAns
            do{
                wrongAns = (1 +Math.round (9 *Math.random())) * (1 +Math.round (9 *Math.random()));
            }
            while(answer.indexOf(wrongAns)>-1)
                document.getElementById(`box${i}`).innerHTML = wrongAns;
 //push new array :wrongAns to anwer []               
                answer.push(wrongAns);
        }
    }
}

//show correct/wrong box for 1 sec = play game
for(i=1; i < 5; i++){
    document.getElementById(`box${i}`).onclick = function(){
        if (playing == true){
            if(this.innerHTML == correctAns){
                setTimeout(function(){
                   wrongbox.style.visibility="hidden" 
                })
                corectbox.style.visibility = "visible"
//change button to Next 
                startReset.innerHTML= "Next"; 
//hide game over box
                gameover.style.visibility= "hidden";
//generate Q&A
                generateQA()
//increase score by 1
                score++;
            }else{
                setTimeout(function(){
                    corectbox.style.visibility="hidden" 
                 })
                 wrongbox.style.visibility="visible"
//show game over
                gameover.innerHTML =`
                <p>Game Over!</p><br>
                <p>your Score is: ${score}</p>
                `;
                gameover.style.visibility= "visible"; 
//change button to reset game
                startReset.innerHTML= "Reset Game";
                time.style.visibility="hidden";
                playing = false;
            }
        }
    }
}