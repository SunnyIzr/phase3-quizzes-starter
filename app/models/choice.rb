class Choice < ActiveRecord::Base
  belongs_to :question
  attr_accessible :choice, :is_correct

  def as_json(options={})
    {
      id: id,
      choice: choice,
      question: question_id
    }
  end
end
