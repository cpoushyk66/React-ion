class AddGoldToCharactersAndEnemies < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :gold, :integer
    add_column :enemies, :gold, :integer
  end
end
