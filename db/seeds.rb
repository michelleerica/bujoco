# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# User.destroy_all

Design.destroy_all
d1 = Design.create

# Element.destroy_all

Flourish.destroy_all


f2 = Flourish.create category:"scribbles", location_storage:"heart", name:"heart"

f3 = Flourish.create category:"scribbles", location_storage:"star", name:"star"

f4 = Flourish.create category:"scribbles", location_storage:"triarrow", name:"triarrow"

f5 = Flourish.create category:"scribbles", location_storage:"doublearrow", name:"doublearrow"

f6 = Flourish.create category:"scribbles", location_storage:"
arrowdown", name:"arrowdown"

f7 = Flourish.create category:"scribbles", location_storage:"arrowstraight", name:"arrowstraight"

f8 = Flourish.create category:"banner", location_storage:"banner-small_yxirbx ", name:"banner-small"

f8 = Flourish.create category:"banner", location_storage:"banner-wide", name:"banner-wide"

f9 = Flourish.create category:"scribbles", location_storage:"flowers-three", name:"flowers-three"

f10 = Flourish.create category:"divider", location_storage:"divider-short", name:"divider-short"

f11 = Flourish.create category:"divider", location_storage:"divider-wide", name:"divider-wide"

f12 = Flourish.create category:"scribbles", location_storage:"little-flower", name:"little-flower"

f13 = Flourish.create category:"border", location_storage:"border-tri", name:"border-tri"

f14 = Flourish.create category:"border", location_storage:"border-vine", name:"border-vine"

f15 = Flourish.create category:"border", location_storage:"border-dash", name:"border-dash"

f16 = Flourish.create category:"scribbles", location_storage:"hearts-cluster", name:"hearts-cluster"

f17 = Flourish.create category:"scribbles", location_storage:"frame-small", name:"frame-small"

f18 = Flourish.create category:"scribbles", location_storage:"frame-round", name:"frame-round"

f19 = Flourish.create category:"scribbles", location_storage:"little-flower-alt", name:"little-flower-alt"

# Elements
e1 = Element.create blx:0, bly:60, brx:472, bry:60, tlx:0, tly:25, trx:472, try:25

f14.elements << e1
#
# e1 = Element.create blx: bly: brx: bry: tlx: tly: trx: try:
#
# e1 = Element.create blx: bly: brx: bry: tlx: tly: trx: try:
#
# e1 = Element.create blx: bly: brx: bry: tlx: tly: trx: try:
#
# e1 = Element.create blx: bly: brx: bry: tlx: tly: trx: try:
#
# e1 = Element.create blx: bly: brx: bry: tlx: tly: trx: try:
#
# 0
# y
# :
# 59.821351966737076
