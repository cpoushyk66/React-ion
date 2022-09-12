class CreatePockets < ActiveRecord::Migration[6.1]
  def change
    create_table :pockets do |t|
      t.integer :item_id
      t.integer :character_id
      t.integer :enemy_id
      t.datetime :picked_up_at
    end
  end
end
