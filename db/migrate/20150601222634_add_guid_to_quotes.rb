class AddGuidToQuotes < ActiveRecord::Migration
  def change
    add_column :quotes, :guid, :string
  end
end
