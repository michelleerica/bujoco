class AddScaleXAndScaleYToElements < ActiveRecord::Migration[5.0]
  def change
    rename_column :elements, :width, :scaleX
    rename_column :elements, :height, :scaleY

  end
end
