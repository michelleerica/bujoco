class Element < ApplicationRecord
  belongs_to :design, optional: true
  belongs_to :flourish, optional: true

end
