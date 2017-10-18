defmodule HeresMyCardServer.CardView do
  use HeresMyCardServer.Web, :view

  def render("index.json", %{cards: cards}) do
    %{data: render_many(cards, HeresMyCardServer.CardView, "card.json")}
  end

  def render("show.json", %{card: card}) do
    %{data: render_one(card, HeresMyCardServer.CardView, "card.json")}
  end

  def render("card.json", %{card: card}) do
    %{id: card.id,
      image: card.image,
      type: card.type,
      links: card.links}
  end
end
