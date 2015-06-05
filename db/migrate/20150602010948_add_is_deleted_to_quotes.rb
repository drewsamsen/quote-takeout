class AddIsDeletedToQuotes < ActiveRecord::Migration
  def change
    add_column :quotes, :is_deleted, :boolean, :default => false
  end
end
