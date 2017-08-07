class AddFlipXAndFlipYToElements < ActiveRecord::Migration[5.0]
  def change
    add_column :elements, :flipX, :boolean
    add_column :elements, :flipY, :boolean
  end
end
