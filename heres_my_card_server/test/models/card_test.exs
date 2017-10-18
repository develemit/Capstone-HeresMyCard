defmodule HeresMyCardServer.CardTest do
  use HeresMyCardServer.ModelCase

  alias HeresMyCardServer.Card

  @valid_attrs %{image: "some image", links: [], type: "some type"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Card.changeset(%Card{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Card.changeset(%Card{}, @invalid_attrs)
    refute changeset.valid?
  end
end
