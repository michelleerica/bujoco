class AddScaleXAndScaleYToElements < ActiveRecord::Migration[5.0]
  def change
    add_column :elements, :scaleX, :float
    add_column :elements, :scaleY, :float
  end
end
