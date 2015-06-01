class BookController < ApplicationController

  before_filter :check_admin, only: [:create, :update]

  def index
    @books = Book.all.order(created_at: :asc)

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
