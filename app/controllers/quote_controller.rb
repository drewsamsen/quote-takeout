class QuoteController < ApplicationController

  before_filter :get_book
  before_filter :ensure_book_found, only: [:index, :create]
  before_filter :check_admin, only: [:create]

  def index
    @quotes = @book.quotes.all.order(location: :asc)
    @total = @book.quotes.count
    respond_to do |format|
      format.json {
        render :json => {
          :quotes => @quotes,
          :count => @total
        }
      }
    end
  end

  def create
    if is_valid_json?(params[:body])

      @quotes = []

      payload = JSON.parse(params[:body])
      asin = payload['asin']
      if @book && @book.asin != asin
        raise "ASIN does not match book"
      end

      summary = {
        total: 0,
        success: 0,
        duplicate: 0,
        failure: 0
      }

      highlights = payload['highlights']
      summary[:total] = highlights.length

      # Get all existing highlights
      existing_quotes = @book.quotes.to_a
      # Convert to array of hashes
      existing_quotes.map!(&:attributes)

      highlights.each do |highlight|

        # Make a guid. only a-zA-Z, uppercase, 20 length for GUID
        # We use this to prevent adding duplicate quotes
        guid = highlight['text'].gsub(/[^a-zA-Z]/,'').upcase.first(20)

        # Does this quote already exist?
        if existing_quotes.select {|q| q['guid'] === guid }.length > 0
          summary[:duplicate] += 1
          next
        end

        location = begin
          highlight['location']['value'].to_i
        rescue
          nil
        end

        new_quote_params = {
          body: highlight['text'],
          location: location,
          guid: guid
        }

        if new_quote = @book.quotes.create(new_quote_params)
          summary[:success] += 1
          @quotes << new_quote
        else
          summary[:failure] += 1
        end

      end # loop through posted highlights

    else
      # adding single
      @quotes = [@book.quotes.create(body: params[:body])]
    end

    respond_to do |format|
      format.json {
        render :json => {
          :quotes => @quotes,
          :summary => summary
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

  def is_valid_json?(str)
    begin
      parsed = JSON.parse(str)
      return true
    rescue
      false
    end
  end

end