class QuoteController < ApplicationController

  before_filter :get_book
  before_filter :ensure_book_found, only: [:create]
  before_filter :check_admin, only: [:create]

  def index
    @quotes = @book ? @book.quotes : Quote.limit(20)
    respond_to do |format|
      format.json {
        render :json => {
          :quotes => @quotes
        }
      }
    end
  end

  def create
    @quote = @book.quote.create(body: params[:body])
    respond_to do |format|
      format.json {
        render :json => {
          :quote => @quote
        }
      }
    end
  end

  private

  def get_book
    @book = Book.find(params[:id])
  end

  def ensure_book_found
    raise ArgumentError.new('Cannot find book') unless @book
  end

end