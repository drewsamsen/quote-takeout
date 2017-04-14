class ExploreController < ActionController::Base

  layout 'application'

  def index
    if params[:book]
      @book = Book.find(params[:book])
      count = @book.quotes.count
      @quote = @book.quotes.offset(rand(count)).first
    else
      @quote = Quote.offset(rand(Quote.count)).first
      @book = @quote.book
    end
  end

end
