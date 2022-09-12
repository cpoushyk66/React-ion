class CreateSpells < ActiveRecord::Migration[6.1]
  def change
    create_table :spells do |t|
      t.string :name
      t.integer :value
      t.integer :mp_cost
      t.string :effect
      t.string :flavor_text
      t.string :school
    end
  end
end
