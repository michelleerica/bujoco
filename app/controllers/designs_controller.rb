class DesignsController < ApplicationController
  protect_from_forgery

  # before_action :set_design, only: [:show, :edit, :update, :destroy]

  # from FRAGA

  before_action :check_if_admin, only: [:edit, :destroy]
  before_action :check_if_logged_in, except: [ :show]


  # GET /designs
  # GET /designs.json
  def index
    @designs = Design.all
  end

  # GET /designs/1
  # GET /designs/1.json
  def show
    @design = Design.find(params[:id])

  end

  # GET /designs/new
  def new
    @design = Design.new
    @flourishes = Flourish.all

  end

  # GET /designs/1/edit
  def edit
  end

  # POST /designs
  # POST /designs.json

  def create
    # raise 'hell'
    # binding.pry

    design_id = params[:design_id]

    if design_id.nil?
      design = @current_user.designs.create name: params[:name]

      # this belongs in the publish action:
      # d = Design.find params[:design_id]
      # d.update image: params[:image]

    else
    #   design = Design.find params["id"]
      design = Design.find design_id
    end

    params[:elements].values.each do |elem|
      puts 'el', elem
      elem_to_save = Element.create (elem)
      design.elements << elem_to_save
    end


     #(dgesign_params)
    #  raise 1
    #  binding.pry

    # if design.id
    #   render :json => design
    # end



    respond_to do |format|
      if design.id
        format.html { redirect_to edit_design_path(design), notice: 'Design was successfully created.' }
        format.json { render :json => design}
      else
        format.html { render :new }
        format.json { render json: design.errors, status: :unprocessable_entity }
      end
    end

  end

  # PATCH/PUT /designs/1
  # PATCH/PUT /designs/1.json
  def update

    if params[:file].present?
      req = Cloudinary::Uploader.upload(params[:file])
      @design.image = req["public_id"]
    end

    respond_to do |format|
      if @design.update(design_params)
        format.html { redirect_to @design, notice: 'Design was successfully updated.' }
        format.json { render :show, status: :ok, location: @design }
      else
        format.html { render :edit }
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
    # def set_design
    #   @design = Design.find(params[:id])
    # end

    def design_params
      params.require(:design).permit( :user_id, :image)
    end

end #DesignsController
