class Character < ActiveRecord::Base
    belongs_to :user
    has_many :pockets
    has_many :items, through: :pockets
    has_many :spell_slots
    has_many :spells, through: :spell_slots
end