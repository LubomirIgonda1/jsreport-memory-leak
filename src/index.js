const express = require('express')
const jsreportEjs = require('jsreport-ejs')
const jsreportChrome = require('jsreport-chrome-pdf')
const jsreport = require('jsreport-core')

const app = express()

const jsreportInstance = jsreport({
    templatingEngines: {
        strategy: 'in-process'
    },
    extensions: {
        'chrome-pdf': {
            launchOptions: {
                args: ['--no-sandbox']
            }
        }
    }
}).use(jsreportChrome()).use(jsreportEjs()).init()

app.use('/test', async (req, res, next) => {
    try {
        const renderer = await jsreportInstance

        const generatedPdf = await renderer.render({
            template: {
                engine: 'ejs',
                recipe: 'chrome-pdf',
                chrome: {
                    marginTop: '2.5cm',
                    marginRight: '2.5cm',
                    marginBottom: '2.5cm',
                    marginLeft: '2.5cm'
                },
                content: '<h1>Hello world!</h1>'
            }
        })
        return generatedPdf.stream.pipe(res)
    } catch(e) {
        console.log(e)
        return res.status(500).json()
    }
})

module.exports = app