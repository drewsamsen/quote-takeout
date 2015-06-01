class DropValues < ActiveRecord::Migration
  def change
    drop_table :values
  end
end
