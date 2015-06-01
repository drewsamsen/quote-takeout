class Quote < ActiveRecord::Base
  belongs_to :book
  validates_uniqueness_of :guid
end