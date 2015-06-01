class AddLocationToQuotes < ActiveRecord::Migration
  def change
    add_column :quotes, :location, :integer
  end
end
