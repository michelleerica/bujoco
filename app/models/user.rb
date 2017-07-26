class User < ApplicationRecord
  has_many :designs, dependent: :destroy

  has_secure_password
end
