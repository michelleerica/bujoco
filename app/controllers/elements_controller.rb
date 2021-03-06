class ElementsController < ApplicationController
  protect_from_forgery

  def new
    @design = Design.find(params[:id])

    element = @design.elements.create left: params[:image], top: params[:top], width: params[:width], height: params[:height], angle: params[:angle], scaleX: params[:scaleX], scaleY: params[:scaleY] , flipX: params[:flipX],  flipY: params[:flipY]


    if element.id
      render :json => element
    end
  end

  def create
  end

  def edit
  end

  def update
  end

  def show
  end

  def index
  end

  def destroy
  end
end
