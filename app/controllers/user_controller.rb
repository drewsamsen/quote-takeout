class UserController < ApplicationController

  # before_filter :check_admin

  def index
    @users = User.all
    # respond_with(users: @users)
    respond_to do |format|
      format.json {
        render :json => {
          :users => @users
        }
      }
    end
  end

end
