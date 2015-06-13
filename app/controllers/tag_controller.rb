class TagController < ApplicationController

  def index
    @tags = ActsAsTaggableOn::Tagging.includes(:tag).where(context: 'tags').map {|t| t.tag.name}
    @tags.uniq!
    respond_with(tags: @tags)
  end

end
