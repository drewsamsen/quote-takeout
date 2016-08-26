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
    respond_with(user: @user)
    # respond_to do |format|
    #   format.json {
    #     render :json => {
    #       :users => @users
    #     }
    #   }
    # end
  rescue => e
    respond_with(error: e.message)
  end

end
