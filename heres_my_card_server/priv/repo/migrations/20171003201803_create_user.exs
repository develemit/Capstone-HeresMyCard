defmodule HeresMyCardServer.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :first_name, :string
      add :last_name, :string
      add :email, :string
      add :password, :string
      add :user_card, :string
      add :received_cards, {:array, :text}

      timestamps()
    end

    alter table(:users) do
      modify :user_card, :text
      modify :received_cards, {:array, :text}, default: []
   end
  end
end
