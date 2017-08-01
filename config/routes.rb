Rails.application.routes.draw do



  root to: 'designs#new'


  # from notes:

  get '/login' => 'session#new' ## login form
  post '/login'  => 'session#create'## check credentials and attemppt to login (set session)
  delete '/login' => 'session#destroy' #logout (destroy session)

  resources :designs
  resources :users
  resources :elements

  post 'designs/cloudinary' => 'designs#cloudinary' ## save cloudinary
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
