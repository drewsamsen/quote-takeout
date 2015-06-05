class Book < ActiveRecord::Base
  has_many :quotes
  default_scope { order(name: :asc) }
end