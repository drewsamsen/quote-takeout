class UserController < ApplicationController

  before_filter :check_admin

  def index
    @users = User.all.order(created_at: :asc)
    respond_with(users: @users)
  end

end
