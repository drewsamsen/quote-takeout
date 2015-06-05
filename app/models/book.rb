class Book < ActiveRecord::Base
  has_many :quotes
  acts_as_taggable_on :labels
  default_scope { order(name: :asc) }
end