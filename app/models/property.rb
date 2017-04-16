class Property < ApplicationRecord
  belongs_to :favourite, optional: true
end
