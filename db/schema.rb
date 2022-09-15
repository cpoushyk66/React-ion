# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_09_14_134055) do

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.string "title"
    t.integer "xp"
    t.string "klass"
    t.integer "strength"
    t.integer "dexterity"
    t.integer "wisdom"
    t.integer "constitution"
    t.integer "intelligence"
    t.integer "charisma"
    t.integer "gold"
    t.integer "user_id"
  end

  create_table "enemies", force: :cascade do |t|
    t.string "name"
    t.string "race"
    t.integer "level"
    t.string "class"
    t.integer "strength"
    t.integer "dexterity"
    t.integer "wisdom"
    t.integer "constitution"
    t.integer "intelligence"
    t.integer "charisma"
    t.integer "rarity"
    t.integer "gold"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "item_type"
    t.integer "bonus"
    t.string "bonus_type"
    t.integer "value"
    t.integer "rarity"
    t.string "class_restrictions"
    t.boolean "sellable"
    t.string "flavor_text"
  end

  create_table "pockets", force: :cascade do |t|
    t.integer "item_id"
    t.integer "character_id"
    t.integer "enemy_id"
    t.datetime "picked_up_at"
  end

  create_table "spell_slots", force: :cascade do |t|
    t.integer "spell_id"
    t.integer "character_id"
    t.integer "enemy_id"
    t.datetime "learned_at"
  end

  create_table "spells", force: :cascade do |t|
    t.string "name"
    t.integer "value"
    t.integer "mp_cost"
    t.string "effect"
    t.string "flavor_text"
    t.string "school"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.string "img_url"
    t.datetime "last_logged_in"
    t.boolean "dark_mode?"
    t.integer "last_character_used"
  end

end
