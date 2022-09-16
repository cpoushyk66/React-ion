class ChangeClassToKlassEnemy < ActiveRecord::Migration[6.1]
  def change
    rename_column :enemies, :class, :klass
  end
end
