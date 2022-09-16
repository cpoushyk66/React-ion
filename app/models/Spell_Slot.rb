class SpellSlot < ActiveRecord::Base

    belongs_to :character
    belongs_to :spell
    belongs_to :enemy
end