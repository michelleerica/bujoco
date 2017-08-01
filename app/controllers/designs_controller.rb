class DesignsController < ApplicationController
  protect_from_forgery

  before_action :set_design, only: [:show, :edit, :update, :destroy]
  before_action :design_create_or_find, only: [:create, :cloudinary]

  # from FRAGA

  # before_action :check_if_admin, only: [:edit, :destroy]
  before_action :check_if_logged_in, except: [ :show]


  # GET /designs
  # GET /designs.json
  def index
    @designs = Design.all
  end

  # GET /designs/1
  # GET /designs/1.json
  def show
    # @design = Design.find(params[:id])

  end

  # GET /designs/new
  def new
    @design = Design.new
    @flourishes = Flourish.all

  end

  # GET /designs/1/edit
  def edit
    @flourishes = Flourish.all

  end

  # POST /designs
  # POST /designs.json

  def create

    params[:elements].values.each do |elem|
      puts 'el', elem
      elem_to_save = Element.create (elem)
      @design.elements << elem_to_save
    end


    respond_to do |format|
      if @design.id
        format.html { redirect_to edit_design_path(design), notice: 'Design was successfully created.' }
        format.json { render :json => @design}
      else
        format.html { render :new }
        format.json { render json: @design.errors, status: :unprocessable_entity }
      end
    end

  end

  #POST /designs/cloudinary
  def cloudinary

    @design.update image: params[:image]

    if @design.image
      render :json => @design
    end
  end
  # PATCH/PUT /designs/1
  # PATCH/PUT /designs/1.json
  def update
#
    # from create
    params[:elements].values.each_with_index do |elem,i|
      puts 'el LEFT', elem.left, 'el OBJ', elem.i
        # if @design = Design.find_or_create_by(id: @design_id, name: params[:name], user: @current_user)

      elem_to_save = Element.create (elem)
      @design.elements << elem_to_save
    end


    respond_to do |format|
      if @design.id
        format.html { redirect_to edit_design_path(design), notice: 'Design was successfully created.' }
        format.json { render :json => @design}
      else
        format.html { render :new }
        format.json { render json: @design.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /designs/1
  # DELETE /designs/1.json
  def destroy
    @design.destroy
    respond_to do |format|
      format.html { redirect_to designs_url, notice: 'Design was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_design
      @design = Design.find(params[:id])
    end

    def design_create_or_find
      design_id = params[:design_id]

      if design_id.nil?
        @design = @current_user.designs.create name: params[:name]
      else
        @design = Design.find design_id
      end

    end

    def design_params
      params.require(:design).permit( :user_id, :image)
    end

end #DesignsController
