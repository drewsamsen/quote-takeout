class ApiController < ApplicationController

  # before_filter :check_admin
  skip_before_action :verify_authenticity_token

  def login
    email = params[:email]
    password = params[:password]
    if email.blank? || password.blank?
      raise "Invalid params"
    end
    user = User.find_by_email(email)
    raise "User not found" unless user
    if user.valid_password?(password)
      @user = user
    else
      raise "Invalid password"
    end
    render :json => {:user => @user}
  rescue => e
    render :json => {:error => e.message}
  end

  def books
    render :json => {:books => Book.all}
  rescue => e
    render :json => {:error => e.message}
  end

  def book_quotes
    quotes = Book.find(params[:id]).quotes
    render :json => {:quotes => quotes}
  rescue => e
    render :json => {:error => e.message}
  end

  def tags
    tags = ActsAsTaggableOn::Tagging.includes(:tag).where(context: 'tags').map {|t| t.tag}
    tags.uniq! {|t| t.name }
    render :json => {tags: tags}
  rescue => e
    render :json => {:error => e.message}
  end

  # Get quotes and decorate them with the title and author of their source book
  def quotes
    quotes = Quote.tagged_with(params[:tag]).order(:created_at).map(&:attributes)
    quotes = Quote.tagged_with(t).order(:created_at).map(&:attributes)
    book_ids = quotes.collect{|q| q['book_id'] }.uniq
    books = Book.where('id in (?)', book_ids)
    book_data = {}
    books.each {|b| book_data[b.id] = b }
    quotes.each do |q|
      book_id = q['book_id'].to_i
      book = book_data[book_id]
      q['book_name'] = book.name
      q['book_author'] = book.author
    end
    render :json => {quotes: quotes}
  rescue => e
    render :json => {:error => e.message}
  end

  def api_params
    params.permit(:email, :password, :tag)
  end

end
