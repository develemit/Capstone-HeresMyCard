defmodule HeresMyCardServer.PageController do
  use HeresMyCardServer.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
