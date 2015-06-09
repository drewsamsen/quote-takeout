class Quote < ActiveRecord::Base
  belongs_to :book
  validates_uniqueness_of :guid
  acts_as_taggable_on :tags
  default_scope { where(is_deleted: false) }
  default_scope { order(location: :asc) }
end