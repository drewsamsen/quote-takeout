class WelcomeController < ActionController::Base

  def index
    @book_count = Book.count
  end

end
