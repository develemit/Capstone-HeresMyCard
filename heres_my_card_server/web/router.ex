defmodule HeresMyCardServer.Router do
  use HeresMyCardServer.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", HeresMyCardServer do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", HeresMyCardServer do
    pipe_through :api

    get "/user/:email", UserController, :showByEmail
    resources "/users", UserController, except: [:new, :edit]

  end
end
