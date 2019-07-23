class PokemonsController < ApplicationController
  def index
    render json: Pokemon.all
  end

  def show
    # trainer_id = params[:id]
    pokemons = Pokemon.all.where(id: params[:id])
    byebug
    render json: pokemons
  end

  def update
  end
end
