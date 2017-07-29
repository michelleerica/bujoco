class Design < ApplicationRecord
  belongs_to :user, optional: true
  has_many :elements, dependent: :destroy


end
