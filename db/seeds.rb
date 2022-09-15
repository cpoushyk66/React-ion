#Create Test Data
User.destroy_all
Character.destroy_all
Item.destroy_all
Pocket.destroy_all
Spell.destroy_all
Spell_Slot.destroy_all

puts "Generating Users..."

u1 = User.create(username: "CharlotteP", password: "test", img_url: "https://pbs.twimg.com/profile_images/1550536084194578436/_zJmJ1RV_400x400.jpg", last_logged_in: Time.now, dark_mode?: true)
u2 = User.create(username: "CamillaP", password: "test", img_url: "https://pbs.twimg.com/profile_images/1550536084194578436/_zJmJ1RV_400x400.jpg", last_logged_in: Time.now, dark_mode?: false)

puts "Generated #{User.count} users!"

puts "Gernerating characters..."

ch1 = Character.create(name: "Charlotte", title: "the Great", xp: 0, klass: "Necromancer", strength: 5, dexterity: 5, wisdom: 5, constitution: 5, intelligence: 5, charisma: 5, gold: 100, user_id: u1.id)
ch2 = Character.create(name: "Grimur", title: "the Swift", xp: 0, klass: "Swordsman", strength: 5, dexterity: 5, wisdom: 5, constitution: 5, intelligence: 5, charisma: 5, gold: 100, user_id: u1.id)

puts "Generated #{Character.count} characters!"

puts "Generating items..."

i1 = Item.create(name: "Wooden Sword", item_type: "weapon", bonus: 1, bonus_type: "strength", value: 1, rarity: 1, class_restrictions: "none", sellable: true, flavor_text: "A practice sword used by children to play!")
i2 = Item.create(name: "Iron Sword", item_type: "weapon", bonus: 3, bonus_type: "strength", value: 4, rarity: 2, class_restrictions: "none", sellable: true, flavor_text: "An iron sword used most often by guards and low level adventurers!")
i3 = Item.create(name: "Steel Sword", item_type: "weapon", bonus: 5, bonus_type: "strength", value: 5, rarity: 3, class_restrictions: "none", sellable: true, flavor_text: "A steel sword used by only the strongest fighters!")

puts "Filling pockets..."

p1 = Pocket.create(item_id: i1.id, character_id: ch1.id, picked_up_at: Time.now)

puts "Generating Spells"

s1 = Spell.create(name: "Fireball", value: 60, mp_cost: 20, effect: "console.log('booom!');", flavor_text: "Shoot a big ball of fire!", school: "flame")

puts "Learning Spells..."

ss1 = Spell_Slot.create(spell_id: s1.id, character_id: ch1.id, learned_at: Time.now)