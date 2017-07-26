class CreateDesigns < ActiveRecord::Migration[5.0]
  def change
    create_table :designs do |t|
      t.text :image
      t.integer :user_id

      t.timestamps
    end
  end
end
