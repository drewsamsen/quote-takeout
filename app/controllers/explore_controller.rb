class ExploreController < ActionController::Base

  def index
    @quote = Quote.offset(rand(Quote.count)).first
    @book = @quote.book
  end

end
