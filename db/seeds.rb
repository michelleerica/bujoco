# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# User.destroy_all

# Design.destroy_all

# Element.destroy_all

Flourish.destroy_all

f1 = Flourish.create category:"heading", location_storage:"goals_rgwwnx.jpg", name:"goals"

f2 = Flourish.create category:"scribbles", location_storage:"heart_imspyt.png", name:"heart"

f3 = Flourish.create category:"scribbles", location_storage:"test_cvwy8z.png", name:"star"

f4 = Flourish.create category:"scribbles", location_storage:"arrowii_trizen.png", name:"triarrow"

f5 = Flourish.create category:"scribbles", location_storage:"arrowiii_qpof1q.png", name:"doublearrow"

f6 = Flourish.create category:"scribbles", location_storage:"arrowdown_ezxcf6.png", name:"arrowdown"

f7 = Flourish.create category:"scribbles", location_storage:"arrow_cabiem.png", name:"arrowstraight"
