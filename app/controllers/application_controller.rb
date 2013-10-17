class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :update_session

  def update_session
    return unless params[:session_key]
    puts "GOT HERE " * 10
    p params
    @simple_session = SimpleSession.find_by_session_key(params[:session_key])
    unless @simple_session
      @simple_session = SimpleSession.create(session_key: params[:session_key])
    end
    if params[:question_id]
      puts " ==== " * 10
      @simple_session.last_answered_question_id = params[:question_id]
      p params
      @simple_session.save!
    end
  end
end
