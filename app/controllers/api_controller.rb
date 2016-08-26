class ApiController < ApplicationController

  # before_filter :check_admin
  skip_before_action :verify_authenticity_token

  def login
    email = params[:email]
    password = params[:password]
    if email.blank? || password.blank?
      raise "Invalid params"
    end
    user = User.find_by_email(email)
    raise "User not found" unless user
    if user.valid_password?(password)
      @user = user
    else
      raise "Invalid password"
    end
    render :json => {:user => @user}
  rescue => e
    render :json => {:error => e.message}
  end

end
