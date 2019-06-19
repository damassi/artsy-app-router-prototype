import React from "react"
import ReactDOM from "react-dom"
import { buildClientApp } from "@artsy/reaction/dist/Artsy/Router/client"
import { routes } from "routes"

buildClientApp({
  routes,
})
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(<ClientApp />, document.getElementById("react"))
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
