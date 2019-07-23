class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers
  end

  def show
    pokemon = Pokemon.where(trainer_id: params[:id])

    render json: pokemon
    byebug
  end
end
