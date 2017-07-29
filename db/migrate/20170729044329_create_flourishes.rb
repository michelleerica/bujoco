class CreateFlourishes < ActiveRecord::Migration[5.0]
  def change
    create_table :flourishes do |t|
      t.string :category
      t.string :location_storage

      t.timestamps
    end
  end
end
