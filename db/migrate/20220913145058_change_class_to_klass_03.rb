class ChangeClassToKlass03 < ActiveRecord::Migration[6.1]
  def change
    rename_column :characters, :class, :klass
  end
end
