# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# quiz = Quiz.create(name: "Dev Bootcamp Questions")
# question = quiz.questions.create(question: "Who is your favorite teacher?")
# choiceA = question.choices.create(choice: "Matt", is_correct: false)
# choiceB = question.choices.create(choice: "Strand", is_correct: false)
# choiceC = question.choices.create(choice: "Jeffrey", is_correct: false)
# choiceD = question.choices.create(choice: "None of the Above", is_correct: true)



10.times do
  quiz = Quiz.create(name: Faker::Company.name)
  5.times do
    question = quiz.questions.create(question: Faker::Company.catch_phrase)
    3.times { question.choices.create(choice: Faker::Company.bs, is_correct: false) }
    question.choices.create(choice: 'THIS IS THE BRUNO ONE', is_correct: true)
  end
end