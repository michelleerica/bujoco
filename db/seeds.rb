# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

u1 = User.create name:"michelle", email:"michelle@michelle.com", password:"chicken", is_admin: true

u2 = User.create name:"luke", email:"luke@ga.com", password:"chicken", is_admin: false

Design.destroy_all
d1 = Design.create name:"example"

Element.destroy_all

Flourish.destroy_all

f2 = Flourish.create category:"scribbles", location_storage:"heart", name:"heart"

f3 = Flourish.create category:"scribbles", location_storage:"star", name:"star"

f4 = Flourish.create category:"scribbles", location_storage:"triarrow", name:"triarrow"

f5 = Flourish.create category:"scribbles", location_storage:"doublearrow", name:"doublearrow"

f6 = Flourish.create category:"scribbles", location_storage:"
arrowdown", name:"arrowdown"

f7 = Flourish.create category:"scribbles", location_storage:"arrowstraight", name:"arrowstraight"

f8 = Flourish.create category:"banner", location_storage:"banner-small", name:"banner-small"

f8 = Flourish.create category:"banner", location_storage:"banner-wide", name:"banner-wide"

f9 = Flourish.create category:"scribbles", location_storage:"flowers_three", name:"flowers_three"

f10 = Flourish.create category:"divider", location_storage:"divider-short", name:"divider-short"

f11 = Flourish.create category:"divider", location_storage:"divider-wide", name:"divider-wide"

f12 = Flourish.create category:"scribbles", location_storage:"little-flower", name:"little-flower"

f13 = Flourish.create category:"divider", location_storage:"border-tri", name:"border-tri"

f14 = Flourish.create category:"divider", location_storage:"border-vine", name:"border-vine"

f15 = Flourish.create category:"divider", location_storage:"border-dash", name:"border-dash"

f16 = Flourish.create category:"scribbles", location_storage:"hearts-cluster", name:"hearts-cluster"

f17 = Flourish.create category:"scribbles", location_storage:"frame-small", name:"frame-small"

f18 = Flourish.create category:"scribbles", location_storage:"frame-round", name:"frame-round"

f19 = Flourish.create category:"scribbles", location_storage:"little-flower-alt", name:"little-flower-alt"

f20 = Flourish.create category:"month", location_storage:"january", name:"january"

f21 = Flourish.create category:"month", location_storage:"february", name:"february"

f22 = Flourish.create category:"month", location_storage:"march", name:"march"

f23 = Flourish.create category:"month", location_storage:"april", name:"april"

f24 = Flourish.create category:"month", location_storage:"may", name:"may"

f25 = Flourish.create category:"month", location_storage:"june", name:"june"

f26 = Flourish.create category:"month", location_storage:"july", name:"july"

f27 = Flourish.create category:"month", location_storage:"august", name:"august"

f28 = Flourish.create category:"month", location_storage:"september", name:"september"

f29 = Flourish.create category:"month", location_storage:"october", name:"october"

f30 = Flourish.create category:"month", location_storage:"november", name:"november"

f31 = Flourish.create category:"month", location_storage:"december", name:"december"

f32 = Flourish.create category:"days", location_storage:"sunday", name:"sunday"

f34 = Flourish.create category:"days", location_storage:"monday", name:"monday"

f35 = Flourish.create category:"days", location_storage:"tuesday", name:"tuesday"

f36 = Flourish.create category:"days", location_storage:"wednesday", name:"wednesday"

f37 = Flourish.create category:"days", location_storage:"thursday", name:"thursday"

f38 = Flourish.create category:"days", location_storage:"friday", name:"friday"

f39 = Flourish.create category:"days", location_storage:"saturday", name:"saturday"

f40 = Flourish.create category:"border", location_storage:"border-hearts", name:"border-hearts"

f41 = Flourish.create category:"border", location_storage:"border-sunshine", name:"border-sunshine"

f42 = Flourish.create category:"border", location_storage:"border-dashed", name:"border-dashed"

f43 = Flourish.create category:"quote", location_storage:"quote-poodles", name:"quote-poodles"

f44 = Flourish.create category:"quote", location_storage:"quote-omnia", name:"quote-omnia"

f45 = Flourish.create category:"heading", location_storage:"heading_habit", name:"heading_habit"

f46 = Flourish.create category:"border", location_storage:"box-plain", name:"box-plain"

f47 = Flourish.create category:"days", location_storage:"week-init", name:"week-init"

f49 = Flourish.create category:"border", location_storage:"border-squiggle", name:"border-squiggle"

f50 = Flourish.create category:"border", location_storage:"border-square", name:"border-square"

f51 = Flourish.create category:"days", location_storage:"days-abrev", name:"days-abrev"

f52 = Flourish.create category:"heading", location_storage:"yearlylog", name:"yearlylog"


f53 = Flourish.create category:"heading", location_storage:"todo", name:"todo"

f54 = Flourish.create category:"basics", location_storage:"key", name:"key"

f55 = Flourish.create category:"basics", location_storage:"line", name:"line"

f56 = Flourish.create category:"divider", location_storage:"divider-squig", name:"divider-squig"

f57 = Flourish.create category:"goals", location_storage:"continuei", name:"continuei"

f58 = Flourish.create category:"goals", location_storage:"starti", name:"starti"

f59 = Flourish.create category:"goals", location_storage:"stopi", name:"stopi"

f60 = Flourish.create category:"goals", location_storage:"goalsi", name:"goalsi"

f62 = Flourish.create category:"divider", location_storage:"divider-heartbeat", name:"divider-heartbeat"


f63 = Flourish.create category:"heading", location_storage:"monthlylog", name:"monthlylog"

f64 = Flourish.create category:"heading", location_storage:"weeklylog", name:"weeklylog"


# Elements
e1 = Element.create left:75, top:0, scaleX:0.2, scaleY:0.5, angle:47
e2 = Element.create left:100, top:100, scaleX:0.2, scaleY:0.5, angle:0




f14.elements << e1
f43.elements << e2

d1.elements << e1 << e2

u1.designs << d1

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
