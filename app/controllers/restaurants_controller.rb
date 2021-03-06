class RestaurantsController < ApplicationController
  before_action :set_restaurant, only: [:show, :update, :destroy]

  def index
    @restaurants = Restaurant.all
    render json: @restaurants
  end

  def show
    render json: @restaurant
  end

  def new
    @restaurant = Restaurant.new
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    if @restaurant.save
      render json: @restaurant
    end
  end

  def update
    if @restaurant.update(restaurant_params)
      render json: @restaurant
    end
  end

  def destroy
    @restaurant.destroy
  end

  private
    def restaurant_params
      params.require(:restaurant).permit(:name, :neighborhood, :cuisine, :price_range, :dress_code, :image, :likes)
    end

    def set_restaurant
      @restaurant = Restaurant.find(params[:id])
    end
end
