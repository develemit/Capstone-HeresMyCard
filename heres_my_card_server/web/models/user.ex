defmodule HeresMyCardServer.User do
  use HeresMyCardServer.Web, :model

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :password, :string
    field :user_card, :string
    field :received_cards, {:array, :string}, default: []

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:first_name, :last_name, :email, :password, :user_card, :received_cards])
    |> validate_required([:first_name, :last_name, :email, :password, :user_card,:received_cards])
  end
end
