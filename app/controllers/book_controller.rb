class BookController < ApplicationController

  before_filter :find_book, only: [:show, :update]
  before_filter :check_admin, only: [:create, :update]

  def index
    # Adds a 'quote_count' attribute
    @books = Book.order(name: :asc).joins(:quotes).select('books.*, COUNT(quotes.id) as quote_count').group('books.id')
    respond_with(books: @books)
  end

  def create
    @book = Book.create(
      name: params[:name],
      author: params[:author],
      asin: params[:asin]
    )
    respond_with(book: @book)
  end

  def show
    respond_with(book: @book, labels: @book.label_list)
  end

  def update
    @book.update(
      name: params[:name],
      author: params[:author],
      asin: params[:asin]
    )
    respond_with(book: @book)
  end

  def book_params
    params.require(:book).permit(:name, :author, :asin, :label_list)
  end

  private

  def find_book
    @book = Book.find(params[:id])
  end

end
