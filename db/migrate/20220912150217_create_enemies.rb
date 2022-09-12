class CreateEnemies < ActiveRecord::Migration[6.1]
  def change
    create_table :enemies do |t|
      t.string :name
      t.string :race
      t.integer :level
      t.string :class
      t.integer :strength
      t.integer :dexterity
      t.integer :wisdom
      t.integer :constitution
      t.integer :intelligence
      t.integer :charisma
      t.integer :rarity
    end
  end
end
