const httpStatus = require('http-status')
const APIError = require('../errors/api-error')

// Checks if it's empty and is a valid URL what it got
exports.isAnURL = (req, res, next) => {
  const { url } = req.query
  const urlPattern = /^(?:(?:https):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

  if (!url) {
    throw new APIError({
      errors: "URL can't be empty",
      status: httpStatus.BAD_REQUEST
    })
  }

  if (urlPattern.test(url)) {
    next()
  } else {
    throw new APIError({
      errors: "That's not a valid URL",
      status: httpStatus.BAD_REQUEST
    })
  }
}

// Checks if it's a valid URL in the whitelist
exports.isWhitelisted = (req, res, next) => {
  const whitelist = [
    /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/,
    /^https?:\/\/www\.reddit\.com\/r\/(.+)\/comments\/(.+)\/(.+)/,
    /^https?:\/\/(www\.youtube\.com|youtu\.be)\/((watch\?v=(.+))|(.+))/
  ]
  const { url } = req.query
  const isMatch = whitelist.some((exp) => exp.test(url))

  if (isMatch) {
    next()
  } else {
    throw new APIError({
      errors: "That's not a whitelisted URL",
      status: httpStatus.BAD_REQUEST
    })
  }
}
