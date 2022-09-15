class Pocket < ActiveRecord::Base

    belongs_to :character
    belongs_to :enemy
    belongs_to :item
end