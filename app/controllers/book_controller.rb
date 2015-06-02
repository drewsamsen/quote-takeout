class BookController < ApplicationController

  before_filter :check_admin, only: [:create, :update]

  def index
    # Adds a 'quote_count' attribute
    @books = Book.order(name: :asc).joins(:quotes).select('books.*, COUNT(quotes.id) as quote_count').group('books.id')

    respond_to do |format|
      format.json {
        render :json => {
          :books => @books
        }
      }
    end
  end

  def create
    @book = Book.create(
      name: params[:name],
      author: params[:author],
      asin: params[:asin]
    )
    respond_to do |format|
      format.json {
        render :json => {
          :book => @book
        }
      }
    end
  end

  def show
    @book = Book.find(params[:id])
    respond_to do |format|
      format.json {
        render :json => {
          :book => @book
        }
      }
    end
  end

  def update
    @book = Book.find(params[:id])
    @book.update(
      name: params[:name],
      author: params[:author],
      asin: params[:asin]
    )
    respond_to do |format|
      format.json {
        render :json => {
          :book => @book
        }
      }
    end
  end

end
