class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  include DeviseTokenAuth::Concerns::SetUserByToken

  respond_to :json

  private

  def check_admin
    unless current_user && current_user.admin?
      return render :json => { :errors => 'Not authorized' }, :status => 401
    end
  end


end
