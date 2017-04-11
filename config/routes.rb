Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  root 'welcome#index'

  get 'users' => 'user#index'

  get 'books' => 'book#index'
  get 'books/labels' => 'book#labels'
  get 'books/:id' => 'book#show'
  put 'books/:id' => 'book#update'
  post 'books' => 'book#create'

  post 'books/:id/quotes' => 'quote#create'
  delete 'books/:book_id/quotes/:quote_id' => 'quote#destroy'

  get 'quotes' => 'quote#index'
  get 'quotes/:id/tags' => 'quote#tags'
  post 'quotes/:id/tags' => 'quote#tags'

  get 'tags' => 'tag#index'

  # ----------- API -------------

  post 'api/login' => 'api#login'
  get 'api/books' => 'api#books'
  get 'api/books/:id/quotes' => 'api#book_quotes'
  get 'api/tags' => 'api#tags'
  get 'api/quotes/:tag' => 'api#quotes'

  # ----------- Rails UI -------------

  get 'explore' => 'explore#index'

end
