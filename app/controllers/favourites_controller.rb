class FavouritesController < ApplicationController
  def create
    favourite = Favourite.new
    favourite.user_id = params[:user_id]
    favourite.save
    properties = params[:favourites]

    properties.each do |property|
      new_property = Property.new
      new_property.favourite_id = favourite.id
      new_property.development_key = property
      new_property.save
    end
    redirect_to '/favourites'
  end

  def save
    user = User.find(session['id'])
    @fav_id = Favourite.where(user_id: user.id)
  end

  def edit
    favourite = Favourite.find(params[:fav_id])
    favourite.save
    redirect_to '/favourites'
  end

  def destroy
    favourite = Favourite.find(params[:fav_id])
    properties = favourite.properties

    properties.each do |property|
      property.destroy
    end

    favourite.destroy
    redirect_to '/favourites'
  end
end
