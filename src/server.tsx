import { buildServerApp } from "@artsy/reaction/dist/Artsy/Router/buildServerApp"
import express from "express"
import webpack from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackConfig from "../webpack.config"
import { routes } from "./routes"

const compiler = webpack(webpackConfig)
const app = express()

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
    stats: "errors-only",
  })
)

app.get("/", async (req, res) => {
  const { bodyHTML, styleTags } = await buildServerApp({
    routes,
    url: req.url,
  })

  res.send(`
    <html>
      <head>
        <title>App shell prototype</title>
        <style type="text/css">${bodyHTML}</style>
      </head>
      <body>
        <div id="react">${styleTags}</div>

        <script src="/assets/app.js"></script>
      </body>
    </html>
  `)
})

app.listen(3000, () => {
  console.warn("\nApp started at http://localhost:3000 \n")
})
