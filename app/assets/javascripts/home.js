var Controller = {
  onQuizClick: function(e) {
    $(".quiz-list").slideUp();
    Controller.loadQuestion($(this).attr('data-id'),0);
  },

  onChoiceClick: function(e) {

    var questionId = $( this ).find("a").attr("data-question-id")
    var id = $( this ).find("a").attr("data-id")
    var url = "/questions/" + questionId + "/answers.json"
    var $choiceElement = $( this )

    var quizId = $choiceElement.parent().parent().attr('data-quiz-id')

    $.post(url, {session_key: 'a124f87dec55da23', choice_id: id}, function(response){
      if ( response.correct ) {
        Controller.loadQuestion(quizId,questionId)

      }
      else {
        $choiceElement.css('text-decoration','line-through')
      }
    })
  },

  clearQuestion: function(){
    $(".container .question-view").slideUp()

  },


  loadQuizzes: function() {
    $.getJSON('/quizzes.json', function(response) {
      var $quizList = Views.quizList();
      $(".container").append($quizList);
      $.each(response.quizzes, function(i, quiz) {
        $quizList.append(Views.quizItem(quiz));
      });
    });
  },

  loadQuestion: function(quizId,questionId) {

    Controller.clearQuestion()

    url = "/quizzes/" + quizId + "/questions/next.json?session_key='a124f87dec55da23'"

    $.getJSON(url,{question_id: questionId} ,function(question) {
      var $questionView = Views.questionView(quizId);
      $questionView.append(Views.questionQuizName(question.quiz_name));
      $questionView.append(Views.questionText(question.question))
      var $list = Views.choiceList();
      $.each(question.choices, function(i, choice){
        $list.append(Views.choice(choice))
      })
      $questionView.append($list)

      $(".container").append($questionView)
    });
  }
}


var Views = {
  quizList: function() {
    return $("#views .quiz-list").clone();
  },

  quizItem: function(quiz) {
    var $quizItem = $("#views .quiz-item").clone();
    var $quizLink = $quizItem.find('a').text(quiz.name).attr('data-id', quiz.id).attr('data-name', quiz.name);
    $quizLink.on('click', Controller.onQuizClick);
    return $quizItem;
  },

  questionView: function(id) {
    var view = $("#views .question-view").clone();
    view.attr('data-quiz-id',id)
    return view
  },

  questionQuizName: function(name) {
    var $quizName = $('#views .quiz-title').clone();
    $quizName.text(name);
    return $quizName
  },

  questionText: function(text) {
    var $questionText = $('#views .question-text').clone();
    $questionText.text(text);
    return $questionText
  },

  choice: function(choiceObj) {
    var $choice = $('#views .answer-item').clone();
    $choice.find('a').text(choiceObj.choice).attr('data-id', choiceObj.id).attr('data-question-id', choiceObj.question);
    $choice.on('click',Controller.onChoiceClick);
    return $choice
  },

  choiceList: function() {
    return $('#views .answer-list').clone();
  }





}



$(document).ready(function() {
  // $.getJSON('/quizzes.json', appendQuestions)
  Controller.loadQuizzes();
});
