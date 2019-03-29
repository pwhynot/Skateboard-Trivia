
const questions = {
    "gameQuestions":
        [
            {
                question: "Which pro skater jumped over the Great Wall of China?",
                answers: ['Danny Way', 'Chad Muska', 'Tony Hawk', 'Danny Supa'],
                correctAnswer: 0
            },
            {
                question: "What was the first team Tony Hawk rode for?",
                answers: ['Toy Machine', 'Bones Brigade', 'Birdhouse', 'Baker'],
                correctAnswer: 1
            },
            {
                question: "What skateboard company was founded by Rick Howard and Mike Carroll?",
                answers: ['Enjoi', 'DGK', 'Girl', 'World Industries'],
                correctAnswer: 2
            },
            {
                question: "Philadelphia is home to what famous skate spot?",
                answers: ['Carlsbad Gap', 'Love Park', 'Hollywood High', 'EZ 7'],
                correctAnswer: 1
            },
            {
                question: "Guy Mariano made his video debut in what classic skate video?",
                answers: ['Sight Unseen', 'Fullfill the Dream', 'Video Days', 'Fully Flared'],
                correctAnswer: 2
            },
            {
                question: "Which skateboard magazine coined the popular phrase Skate and Destroy?",
                answers: ['Transworld', 'Big Brother', 'Skateboard Mag', 'Thrasher'],
                correctAnswer: 3
            },
            {
                question: "In what year did Tony Hawk do the first 900 in competition?",
                answers: ['1999', '2001', '1995', '2008'],
                correctAnswer: 0
            },
            {
                question: "Which skateboarder has the nickname The Gonz?",
                answers: ['Bob Burnquist', 'Chris Roberts', 'Josh Kalis', 'Mark Gonzales'],
                correctAnswer: 3
            },
            {
                question: "Finish this phrase All Hail...?",
                answers: ['Skateboarding', 'Hawk', 'Cardiel', 'Grinds'],
                correctAnswer: 2
            },
            {
                question: "John Cardiel rode for which skateboard company?",
                answers: ['Anti Hero', 'Foundation', 'Shortys', 'Alien Workshop'],
                correctAnswer: 0
            },
            {
                question: "The trick Half Cab was named after which pro skater?",
                answers: ['Tony Alva', 'Steve Caballero', 'Ray Barbee', 'Rodney Mullen'],
                correctAnswer: 1
            },
            {
                question: "Which pro skater invented the kickflip?",
                answers: ['Tony Hawk', 'Stevie Williams', 'Rob Dyrdek', 'Rodney Mullen'],
                correctAnswer: 3 //Question 12
            },
            {
                question: "Keenan Milton rode for which skateboard compnay?",
                answers: ['Chocolate', 'Birdhouse', 'Shortys', 'Baker'],
                correctAnswer: 0
            },
            {
                question: "Who was the famous editor for Thrasher Magazine?",
                answers: ['Stacy Peralta', 'Jake Phelps', 'Tony Alva', 'Jay Adams'],
                correctAnswer: 1
            },
            {
                question: "Which skate video did Guy Mariano make his comeback debut in?",
                answers: ['IE', 'We Are Blood', 'Yeah Right', 'Fully Flared'],
                correctAnswer: 3
            },
            {
                question: "Who is the only pro skater to actually skate inside the White House?",
                answers: ['Chad Muska', 'Tony Hawk', 'Danny Way', 'Eric Koston'],
                correctAnswer: 1
            },
            {
                question: "Which skate video put P.J. Ladd on the map?",
                answers: ['Yeah Right', 'Wonderful Horrible Life', 'Tricolor', 'Guilty'],
                correctAnswer: 1
            }
        ]
}

function startGame() {

    $("#endResults").hide();
    $(".points").hide();
    correctChoice = 0;
    incorrectChoice = 0;
    questionNumber = 0;
    questionUnanswered = 0;

    var counter;
    var timer = {
        time: 60,
        reset: function () {
            timer.time = 60;
        },
        stop: function () {
            clearInterval(counter);
        },
        start: function () {
            counter = setInterval(timer.count, 1000);
        },
        count: function () {
            timer.time--;
            $("#timer").css("color", "#fff");
            $("#timerColor").css("color", "#fff");
            $("#timer").html('Time Remaining: <span id="timerColor">' + timer.time + '</span>');
            if (timer.time <= 5) {
                $("#timerColor").css("color", "#d72027");
            } else {
                $("#timerColor").css("color", "#fff");
            }
            if (timer.time == 0) {
                answerPage(5, false);
            }
        }
    }

    $("#timer").css({ "font-size": "36px", "text-align": "left" });
    $("#startButton").on("click", function () {
        $(".gameLogo").hide();
        $("#startButton").hide();
        $("#title").hide();
        newQuestion();
    });

    function newQuestion() {
        timer.reset();
        $("#timer").html("Time Remaining: " + timer.time);
        $("#showAnswer").empty();
        $("#endResult").empty();
        $("#question").html('<span id="questionFontWeight"> Question </span>' +
            (questionNumber + 1) + ":<br>" + questions.gameQuestions[questionNumber].question);
        for (i = 0; i < 4; i++) {
            $("#choices").append("<button class='answerChoice' data-val='" + i + "'>" +
                questions.gameQuestions[questionNumber].answers[i] + "</button><br>");
        }

        $("#timer").css("margin-top", "20px");
        $("#question").css("font-weight", "bold");
        $("#question").css("color", "#fff");
        $("#question").css("margin-top", "60px");
        $("#question").css("margin-bottom", "20px");
        $(".answerChoice").css("backgroundColor", "#d72027");
        $(".answerChoice").css("margin", "5px");
        $(".answerChoice").css("border", "none");
        $(".answerChoice").css("color", "#fff");
        $(".answerChoice").css("padding", "10px");
        $(".answerChoice").css("borderRadius", "5px");
        $(".answerChoice").css("width", "200px");
        $(".answerChoice").hover(function () {
            $(this).css({ "backgroundColor": "#fff", "color": "#132748" });
        }, function () {
            $(this).css({ "backgroundColor": "#d72027", "color": "#fff" });
        });

        $("#showAnswer").css({ "font-size": "18px", "font-weight": "bold" });
        $("#showAnswer").css("text-align", "center");


        timer.start();
        $(".answerChoice").on("click", function () {
            var answerIndex = $(this).data('val');
            answerPage(answerIndex, true);
        });
    }

    function answerPage(answerIndex, answered) {
        $("#question").empty();
        $("#choices").empty();
        timer.stop();
        if (answerIndex == questions.gameQuestions[questionNumber].correctAnswer) {
            $("#timer").css("text-align", "center");
            $("#showAnswer").html("Correct!");
            $("#showAnswer").css("text-align", "center");
            $("#showAnswer").css({ "color": "#000000", "font-size": "42px", });
            $(".points").show(3).delay(3000).hide(3);
            correctChoice++;
        }
        else if (answered == false) {
            $("#showAnswer").html("Time's Up!<br>The correct answer was: " +
                questions.gameQuestions[questionNumber].answers[(questions.gameQuestions[questionNumber].correctAnswer)]);
            $("#showAnswer").css("text-align", "center");
            $("#timer").css("text-align", "center");
            $("#showAnswer").css({ "color": "#f90606", "font-size": "42px" });
            questionUnanswered++;
        }
        else {
            $("#showAnswer").html("Incorrect!<br>The correct answer was: " +
                questions.gameQuestions[questionNumber].answers[(questions.gameQuestions[questionNumber].correctAnswer)]);
            $("showAnswer").css("text-align", "center");
            $("#timer").css("text-align", "center");
            $("#showAnswer").css({ "color": "#f90606", "font-size": "42px" });
            incorrectChoice++;
        }
        questionNumber++;
        if (questionNumber < 17) {
            var nextQuestion = setTimeout(newQuestion, 3000);
        }
        else {
            var nextQuestion = setTimeout(resultsPage, 3000);
        }
    }

    function resultsPage() {
        $("#showAnswer").empty();
        $("#endResults").empty();
        $("#final-stats").css({ "color": "#fff", "font-size": "32px", "text-align": "center" });
        $("#endResults").css({ "font-weight": "bold", "margin-bottom": "20px" });
        $("#final-result").css({ "font-size": "32px", "color": "#fff" });
        $("#final-stats").html("Points: " + correctChoice + "<br>Incorrect answers: " + incorrectChoice +
            "<br>Unanswered questions: " + questionUnanswered);
        $("#play-again").html("<button id='newGame' class='btn btn-custom2'>Play Again</button>");
        $("#play-again").css("margin-top", "20px");
        $("#newGame").on("click", function () {
            $("#final-result").empty();
            $("#final-stats").empty();
            $("#play-again").empty();
            correctChoice = 0;
            incorrectChoice = 0;
            questionUnanswered = 0;
            questionNumber = 0;
            newQuestion();
        });
    }
}

startGame();
