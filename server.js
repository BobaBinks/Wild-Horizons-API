import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendResponse, filterData, filterDataByQueryParams } from './utils/apiUtils.js'

const PORT = 8000

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()

  // get query params
  const urlObj = new URL(req.url, `http://${req.headers.host}`)
  const queryObj = Object.fromEntries(urlObj.searchParams)

  if (urlObj.pathname === '/api' && req.method === 'GET') {

    let filteredData = filterDataByQueryParams(queryObj, destinations)

    sendResponse(res, 200, filteredData)

  } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {

    const filteredData = filterData(req, 'continent', destinations)
    sendResponse(res, 200, filteredData)

  } else if (req.url.startsWith('/api/country') && req.method === 'GET') {

    const filteredData = filterData(req, 'country', destinations)
    sendResponse(res, 200, filteredData)

  } else {

    sendResponse(res, 404, {
      error: "not found",
      message: "The requested route does not exist"
    })
  }
  
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
