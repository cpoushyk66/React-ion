class CreateCharacters < ActiveRecord::Migration[6.1]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :title
      t.integer :xp
      t.string :class
      t.integer :strength
      t.integer :dexterity
      t.integer :wisdom
      t.integer :constitution
      t.integer :intelligence
      t.integer :charisma
    end 
  end
end
