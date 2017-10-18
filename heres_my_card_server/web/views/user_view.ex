defmodule HeresMyCardServer.UserView do
  use HeresMyCardServer.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, HeresMyCardServer.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, HeresMyCardServer.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password,
    user_card: user.user_card,
    received_cards: user.received_cards}
  end
end
