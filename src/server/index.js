import express from 'express'
import cors from 'cors'
import serialize from 'serialize-javascript'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom'

import App from '../shared/App'
import routes from '../shared/routes'

let app = express();

app.use(cors())
app.use(express.static('public'))

app.get('*', (req, res, next) => {

    let activeRoute = routes.find((route) => matchPath(req.url, route)) || {};
    const promise = activeRoute.fetchInitialData
        ? activeRoute.fetchInitialData(req.path)
        : Promise.resolve();
    
    promise
        .then(data => {
            let context = { data };
            const markup = renderToString(
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            )
            res.send(`
                <html>
                    <head>
                        <title>RRSSR</title>
                        <script src='/bundle.js' defer></script>
                        <script>window.__INITIAL__STETE__=${serialize(data)}</script>
                    </head>
                    <body>
                        <div id="app">${markup}</div>
                    </body>
                </html>
            `)
        })
        .catch(next)
})


app.listen(80, () => console.log('runing from port 80'))