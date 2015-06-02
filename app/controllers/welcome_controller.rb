class WelcomeController < ActionController::Base

  def index
    @book_count = Book.count
    @quote_count = Quote.count
  end

end
