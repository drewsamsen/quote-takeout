class QuoteController < ApplicationController

  before_filter :get_book, except: [:tags, :index]
  before_filter :check_admin, only: [:create, :destroy]
  before_filter :get_quote, only: [:tags]

  # can accept search options. by book or by tag: params[:book_id], params[:tag]
  def index
    if params[:book_id]
      @quotes = Book.find(params[:book_id]).quotes
    elsif params[:tag]
      @quotes = Quote.tagged_with(params[:tag]).order(:created_at)
    else
      @quotes = Quote.order(:created_at).limit(50)
    end
    respond_with(quotes: @quotes)
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

    respond_with(quotes: @quotes, summary: summary)

  end

  def destroy
    @quote = @book.quotes.find(params[:quote_id])
    if @quote
      # In dev, some quotes didnt have a guid, so this ensures it is set here
      # TODO: remove this.
      guid = @quote.guid || @quote.body.gsub(/[^a-zA-Z]/,'').upcase.first(20)

      @quote.update(is_deleted: true, guid: guid)
    end

    respond_with(quote: @quote)
  end

  def tags
    if request.method == "POST" && current_user && current_user.admin?
      @quote.tag_list = params[:tags]
      @quote.save
      respond_to do |format|
        format.json {
          render :json => {
            :tags => @quote
          }
        }
      end
    else
      respond_with(tags: @quote.tag_list)
    end
  end

  private

  def get_book
    @book = Book.find(params[:id] || params[:book_id])
  end

  def get_quote
    @quote = Quote.find(params[:id])
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