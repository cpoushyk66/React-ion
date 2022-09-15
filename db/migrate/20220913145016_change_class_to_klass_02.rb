class ChangeClassToKlass02 < ActiveRecord::Migration[6.1]
  def change
    change_column :characters, :class, :string
  end
end
