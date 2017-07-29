class Flourish < ApplicationRecord
  has_many :elements, dependent: :destroy

end
