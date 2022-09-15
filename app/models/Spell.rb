class Spell < ActiveRecord::Base

    has_many :spell_slots
    has_many :characters, through: :spell_slots
end