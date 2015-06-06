class BookController < ApplicationController

  before_filter :find_book, only: [:show, :update]
  before_filter :check_admin, only: [:create, :update]

  def index
    # Adds a 'quote_count' attribute
    @books = Book.joins(:quotes).select('books.*, COUNT(quotes.id) as quote_count').group('books.id')

    #
    # Decorate each book with array of its labels:
    #

    # TODO 'attributes' is an expensive method, I think...
    books_as_hashes = @books.to_a.map{ |v| v.attributes }
    @books.each_with_index { |b,i| books_as_hashes[i]['labels'] = b.label_list }

    respond_with(books: books_as_hashes)
  end

  def create
    @book = Book.create(
      name: params[:name],
      author: params[:author],
      asin: params[:asin]
    )
    # Cannot use respond_with here. Because it is a create
    respond_to do |format|
      format.json {
        render :json => {
          :book => @book
        }
      }
    end
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
    if params[:labels]
      @book.label_list = params[:labels] # eg: "tag1, tag 2, tag three"
      @book.save
    end

    # Blaaah. TODO: standard way to decorate book with label list. Model callback?
    book_as_hash = @book.attributes
    book_as_hash['labels'] = @book.label_list

    # Note that rails sends back a 204 with no content by detault.
    # http://stackoverflow.com/questions/9953887/simple-respond-with-in-rails-that-avoids-204-from-put
    # Cannot use respond_with here. Because it is an update
    respond_to do |format|
      format.json {
        render :json => {
          :book => book_as_hash
        }
      }
    end
  end

  def labels
    @labels = ActsAsTaggableOn::Tag.all.map { |t| t.name }
    respond_with(labels: @labels)
  end

  def book_params
    params.require(:book).permit(:name, :author, :asin, :label_list)
  end

  private

  def find_book
    @book = Book.find(params[:id])
  end

end
