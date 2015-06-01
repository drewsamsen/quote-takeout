class CreateQuotes < ActiveRecord::Migration
  def change
    create_table :quotes do |t|
      t.string :body
      t.integer :book_id

      t.timestamps
    end
  end
end
