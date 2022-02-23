Rails.application.routes.draw do
  resources :flats
  root to: 'flats#index'
end
