class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  get '/users' do
    users = User.all.order(:last_logged_in)
    users.to_json
  end

  get '/user/:id' do
    user = User.find(params[:id])
    user.to_json(include: :characters)
  end

  get '/user/:id/log_in' do
    user = User.find(params[:id]).log_in
    user.to_json(include: :characters)
  end

  post '/users' do
    newUser = User.create(username:params[:username], password:params[:password], img_url: params[:img_url])
    newUser.to_json
  end

  get '/items' do
    items = Item.all
    items.to_json
  end

  post '/characters' do 
    char = Character.create(name: params[:name], title: params[:title], xp: params[:xp], klass: params[:klass], strength: params[:strength], dexterity: params[:dexterity], wisdom: params[:wisdom], constitution: params[:constitution], intelligence: params[:intelligence], charisma: params[:charisma], gold: params[:gold], user_id: params[:user_id])
    char.to_json(include: [:items, :spells])
  end

  get '/character/:id' do
    char_items = Character.find(params[:id])
    char_items.to_json(include: [:items, :spells])
  end

  patch '/character/:id' do
    char = Character.find(params[:id])
    char.update(name: params[:name], title: params[:title], xp: params[:xp], klass: params[:klass], strength: params[:strength], dexterity: params[:dexterity], wisdom: params[:wisdom], constitution: params[:constitution], intelligence: params[:intelligence], charisma: params[:charisma], gold: params[:gold])
    char.to_json(include: [:items, :spells])
  end

  delete '/character/:id' do
    char = Character.find(params[:id])
    char.destroy
    char.to_json
  end

  get '/character/:id/items' do
    char_items = Character.find(params[:id]).items
    char_items.to_json
  end

  get '/shop/buy/:id_char/:id_item' do

    char = Character.find(params[:id_char])
    item = Item.find(params[:id_item])
    char.update(gold: char.gold - item.value)
    Pocket.create(item_id: params[:id_item], character_id: params[:id_char], picked_up_at: Time.now)
    char.to_json(include: :items)
  end

  get '/shop/sell/:id_char/:id_item' do

    char = Character.find(params[:id_char])
    item = Item.find(params[:id_item])
    char.update(gold: char.gold + item.value)
    Pocket.where("character_id = ? AND item_id = ?", char.id, item.id).limit(1).destroy_all
    char.to_json(include: :items)
  end

  get '/character/:id/set-as-last' do
    char = Character.find(params[:id])
    user = char.user
    user.update(last_character_used: char.id)
    char
  end

  get '/spells' do
    spells = Spell.all
    spells.to_json
  end

  get '/enemy/rand' do
    enemy = Enemy.all.sample
    enemy.to_json(include: [:spells, :items])
  end

  
end
