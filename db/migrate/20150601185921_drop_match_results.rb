class DropMatchResults < ActiveRecord::Migration
  def change
    drop_table :match_results
  end
end
