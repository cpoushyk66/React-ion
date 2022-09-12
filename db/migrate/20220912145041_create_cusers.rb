class CreateCusers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :img_url
      t.datetime :last_logged_in
      t.boolean :dark_mode?
      t.integer :last_character_used
    end
  end
end
