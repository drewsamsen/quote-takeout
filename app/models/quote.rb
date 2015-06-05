class Quote < ActiveRecord::Base
  belongs_to :book
  validates_uniqueness_of :guid
  default_scope { where(is_deleted: false) }
end