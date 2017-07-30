class FixColumnsElementsTable < ActiveRecord::Migration[5.0]
  def change
    rename_column :elements, :tlx, :left
    change_column :elements, :left, :float
    rename_column :elements, :tly, :top
    change_column :elements, :top, :float
    rename_column :elements, :trx, :width
    change_column :elements, :width, :float
    rename_column :elements, :try, :height
    change_column :elements, :height, :float
    rename_column :elements, :blx, :angle
    change_column :elements, :angle, :float
    remove_column :elements, :bly, :integer
    remove_column :elements, :brx, :integer
    remove_column :elements, :bry, :integer
    change_column :elements, :left, :float

  end
end
