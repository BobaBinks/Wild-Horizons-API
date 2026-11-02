const sendResponse = (res, statusCode, data) => {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.end(JSON.stringify(data))
}

const filterData = (req, subject, data) => {
    const filterTarget = req.url.split('/').pop().toLowerCase().split('%20').join("")
    return data.filter((item) => {
        return item[subject].toLowerCase().split(' ').join("") === filterTarget
    })
}

const filterDataByQueryParams = (params, data) => {
    if (!params) return data

    const queryKeys = Object.keys(params)
    console.log(queryKeys)
    return data.filter((item) => {
        for (let key of queryKeys) {

            if (item[key].toString().toLowerCase() !== params[key].toLowerCase()) return false

        }
        return true
    })
}


export {
    sendResponse,
    filterData,
    filterDataByQueryParams,
}