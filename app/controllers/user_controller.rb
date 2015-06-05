class UserController < ApplicationController

  before_filter :check_admin

  def index
    @users = User.all
    respond_with(users: @users)
  end

end
