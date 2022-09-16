class ChangeClassToKlass < ActiveRecord::Migration[6.1]
  def change
    change_column :characters, :class, :klass
  end
end
