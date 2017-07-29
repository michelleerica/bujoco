class CreateElements < ActiveRecord::Migration[5.0]
  def change
    create_table :elements do |t|
      t.integer :design_id
      t.integer :flourish_id
      t.integer :tlx
      t.integer :tly
      t.integer :trx
      t.integer :try
      t.integer :brx
      t.integer :bry
      t.integer :blx
      t.integer :bly

      t.timestamps
    end
  end
end
