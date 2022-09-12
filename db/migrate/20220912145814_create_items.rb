class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.string :type
      t.integer :bonus
      t.string :bonus_type
      t.integer :value
      t.integer :rarity
      t.string :class_restrictions
      t.boolean :sellable
      t.string :flavor_text
    end
  end
end
