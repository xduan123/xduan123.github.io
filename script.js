(function () {
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
                  <input type="${currentQuestion.choice_type}" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
                </label>`
        );
      }

      // add this question, image, answers and explanation to the output
      output.push(
        ` <div class="w3-padding-16 w3-border w3-container">
        <picture>
              <img
              src="${currentQuestion.img_url}"
              class="thumbnail"
              alt=""
              width="284"
              height="182"
              />
              </picture>
            <div class="question"> ${questionNumber + 1}. ${
          currentQuestion.question
        } </div>
             
              <div class="answers"> ${answers.join("")} </div>
              <div class="explain" id="correct_explain"> ${
                currentQuestion.correctExplain
              } </div>
              <div class="explain" id="wrong_explain"> ${
                currentQuestion.wrongExplain
              } </div>
              </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // gather explanation containers from quiz
    var showCorrectExplains = document.querySelectorAll("#correct_explain");
    var showWrongExplains = document.querySelectorAll("#wrong_explain");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      var result = "";
      const answerContainer = answerContainers[questionNumber];
      var choices = document.getElementsByName(`question${questionNumber}`);
      for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
          result += choices[i].value;
        }
      }
      const userAnswer = result || {};

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";

        // show correct answer explanation, hide worry answer explanation
        showCorrectExplains[questionNumber].style.display = "block";
        showWrongExplains[questionNumber].style.display = "none";
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = "red";

        // show wrong answer explanation, hide correct anwer exlanation
        showCorrectExplains[questionNumber].style.display = "none";
        showWrongExplains[questionNumber].style.display = "block";
      }
    });

    // show number of correct answers out of total.
    // if correct answer great or equal to 5, show code for following script
    // set code
    if (numCorrect >= 7) {
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}, Code: Crack!123`;
      resultsContainer.style.color = "green";
      resultsContainer.style.fontSize = "x-large";
      $(function () {
        $(`<div id="dialog_correct" title="Quiz Result" >
        <p class="dialog_correct">${numCorrect} out of ${myQuestions.length}, Code: Crack!123</p>
      </div>`).dialog();
      });
    } else {
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}, please try again`;
      resultsContainer.style.color = "red";
      resultsContainer.style.fontSize = "x-large";
      $(function () {
        $(`<div id="dialog_wrong" title="Quiz Result" >
        <p class="dialog_wrong">${numCorrect} out of ${myQuestions.length}, please try again</p>
      </div>`).dialog();
      });
    }
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // question content
  const myQuestions = [
    {
      question:
        "Should the above image be accepted or rejected according to the quality guidelines (If rejected, select all rejection reasons)? ",
      answers: {
        a: "Accepted - this image contains a hairline crack ",
        b: "Accepted - this image contains a small pothole ",
        c: "Rejected - this image contains a brick is obstructing the damage ",
        d: "Rejected - this image contains shadows",
        e: "Rejected – this image does not contain any eligible damage",
      },
      correctAnswer: "cde",
      correctExplain: "Well Done!",
      wrongExplain:
        "Hints:image should contain eligible damage, but should not contain shadows, patched cracks or objects obstructing the damage",
      choice_type: "checkbox",
      img_url:
        "https://s3.us-west-2.amazonaws.com/training.appen.com/Training+Videos/Orkney_other+object_shadow.jpg",
    },
    {
      question:
        "Should the above image be accepted or rejected according to the quality guidelines?",
      answers: {
        a: "Accepted – this image contains a small pothole ",
        b: "Rejected - this image contains a small pothole, but it is too close to the crack ",
      },
      correctAnswer: "b",
      correctExplain: "Well Done!",
      wrongExplain:
        "Hints: all photos must be landscape and should be above chest height and at a 45-degree angle. Slight adjustments to the height and angle can be made to avoid any background objects if needed",
      choice_type: "radio",
      img_url:
        "https://s3.us-west-2.amazonaws.com/training.appen.com/Training+Videos/Orkney_small+pothole_too+close.jpg",
    },
    {
      question:
        "Should the above image be accepted or rejected according to the quality guidelines?",
      answers: {
        a: "Accepted – this image contains hairline cracks ",
        b: "Rejected – pavement type in this image is ineligible ",
        c: "Rejected – the image is captured too close to the crack",
      },
      correctAnswer: "bc",
      correctExplain: "Well Done!",
      wrongExplain:
        " Hints: poorly maintained concrete is ineligible. Images should be taken above chest height and at a 45-degree angle.  ",
      choice_type: "checkbox",
      img_url:
        "https://s3.us-west-2.amazonaws.com/training.appen.com/Training+Videos/Orkney_poorly+maintained+concrete_too+close.jpg",
    },
    {
      question: "Select the correct crack type based on the image above",
      answers: {
        a: "Dry - Alligator crack asphalt ",
        b: "Dry - Alligator crack concrete ",
        c: "Dry -Block crack asphalt ",
        d: "Dry -Block crack concrete ",
        e: "Dry - Hairline crack asphalt",
        f: "Dry - Hairline crack concrete ",
      },
      correctAnswer: "a",
      correctExplain: "Well Done!",
      wrongExplain:
        "Hints: review “types of damage” and “type of pavement texture” section in the guidelines",
      choice_type: "radio",
      img_url:
        "https://s3.us-west-2.amazonaws.com/training.appen.com/Training+Videos/Orkney_client+accepted_alligator_asphalt_dry_front.jpg",
    },
    {
      question: "Select the correct crack type based on the image above",
      answers: {
        a: "Dry - Alligator crack asphalt",
        b: "Dry - Alligator crack concrete ",
        c: "Dry -Block crack asphalt ",
        d: "Dry -Block crack concrete ",
        e: "Dry - Hairline crack asphalt",
        f: "Dry - Hairline crack concrete ",
      },
      correctAnswer: "c",
      correctExplain: "Well Done!",
      wrongExplain:
        "Hints: review “types of pavement damage” and “type of pavement texture” section in the guidelines",
      choice_type: "radio",
      img_url:
        "https://s3.us-west-2.amazonaws.com/training.appen.com/Training+Videos/Orkney_good+example_block+cracks.png",
    },
    {
      question: "Select the correct crack type based on the image above",
      answers: {
        a: "Dry - hairline asphalt ",
        b: "Dry - hairline concrete ",
        c: "Wet - hairline asphalt ",
        d: "Wet - hairline concrete ",
      },
      correctAnswer: "b",
      correctExplain: "Well Done!",
      wrongExplain:
        "Hints: review “types of pavement damage” and “type of pavement texture” section in the guidelines",
      choice_type: "radio",
      img_url:
        "https://s3.us-west-2.amazonaws.com/training.appen.com/Training+Videos/Orkney_client+accepted_hairline_front.jpg",
    },
    {
      question:
        "Should the above image be accepted or rejected according to the quality guidelines? ",
      answers: {
        a: "Accepted - this image contains a hairline crack in dry conditions ",
        b: "Accepted - this image contains a hairline crack in wet conditions ",
        c: "Accepted - this image contains small potholes in dry conditions ",
        d: "Accepted - this image contains small potholes in wet conditions ",
        e: "Rejected – this image does not contain any eligible damage",
      },
      correctAnswer: "e",
      correctExplain: "Well Done!",
      wrongExplain:
        "Hints: hairline cracks are significantly thinner and visually appear to be flat. However, the image shows the normal cracks where a certain depth is noticeable because of the larger width. ",
      choice_type: "radio",
      img_url:
        "https://s3.us-west-2.amazonaws.com/training.appen.com/Training+Videos/Orkney_ineligible+hairline.jpg",
    },
    {
      question: "Select the correct category based on the image above",
      answers: {
        a: "Dry – small pothole asphalt ",
        b: "Dry – small pothole concrete ",
        c: "Wet – small pothole asphalt ",
        d: "Wet – small pothole concrete ",
      },
      correctAnswer: "c",
      correctExplain: "Well Done!",
      wrongExplain:
        "Hints: review “types of pavement damage” and “type of pavement texture” section in the guidelines",
      choice_type: "radio",
      img_url:
        "https://s3.us-west-2.amazonaws.com/training.appen.com/Training+Videos/Orkney_client+accepted_wet_small+pothole_asphalt.jpg",
    },
    {
      question:
        "Should the above image be accepted or rejected according to the quality guidelines (If rejected, select all rejection reasons)?",
      answers: {
        a: "Accepted – this image contains a small pothole ",
        b: "Rejected – this image contains a medium-big size pothole instead of a small pothole",
        c: "Rejected - too close to the crack ",
      },
      correctAnswer: "bc",
      correctExplain: "Well Done!",
      wrongExplain:
        "Hints: review “types of pavement damage” and “type of pavement texture” section in the guidelines. Images should be taken above chest height and at a 45-degree angle. ",
      choice_type: "checkbox",
      img_url:
        "https://s3.us-west-2.amazonaws.com/training.appen.com/Training+Videos/Orkney_big+pothole_too+close.jpg",
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener("click", showResults);
})();
