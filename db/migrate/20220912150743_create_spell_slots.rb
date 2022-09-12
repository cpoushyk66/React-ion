class CreateSpellSlots < ActiveRecord::Migration[6.1]
  def change
    create_table :spell_slots do |t|
      t.integer :spell_id
      t.integer :character_id
      t.integer :enemy_id
      t.datetime :learned_at
    end
  end
end
