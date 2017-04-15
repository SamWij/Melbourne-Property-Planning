Rails.application.routes.draw do
  Rails.application.routes.draw do
  root 'pages#home'
  namespace :api do
    resources :properties
  end
# can customise the route by removing the route e.g. resources :cards, except: [:destroy]
end
end
