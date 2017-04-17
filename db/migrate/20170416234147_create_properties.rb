class CreateProperties < ActiveRecord::Migration[5.0]
  def change
    create_table :properties do |t|
      t.integer :favourite_id
      t.string :development_key

      t.timestamps
    end
  end
end
