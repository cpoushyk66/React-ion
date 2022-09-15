class Item < ActiveRecord::Base
    has_many :pockets
    has_many :characters, through: :pockets
end