const ytdl = require('youtube-dl-exec')
const httpStatus = require('http-status')
const APIError = require('../errors/api-error')

const defaultOptions = {
  dumpSingleJson: true,
  noWarnings: true,
  noCallHome: true,
  noCheckCertificate: true,
  preferFreeFormats: true,
  youtubeSkipDashManifest: true
}

const ytdlInfo = (url, options = defaultOptions) => ytdl(url, options)

const ytdlStream = (url, options = {}, flags = {}) => ytdl.exec(url, options, flags)

// http://localhost:3000/v1/video/info?url=https://www.youtube.com/watch?v=PvnlpPWAcZc
// http://localhost:3000/v1/video/info?url=https://twitter.com/Eriknaitor/status/1547709248674471938
// http://localhost:3000/v1/video/info?url=https://www.reddit.com/r/DetailCraft/comments/wbhide/heres_a_hobbit_hole_starter_base_i_built_recently/
exports.info = async (req, res) => {
  const { url } = req.query

  const ytdlFetch = await ytdlInfo(url)

  if (ytdlFetch?.formats) {
    const data = {
      id: ytdlFetch.id,
      title: ytdlFetch.title,
      thumbnail: ytdlFetch.thumbnail,
      url: ytdlFetch.webpage_url,
      formats: ytdlFetch.formats.filter((fmt) => fmt.format_note !== 'storyboard')
    }

    res.json({
      status: 'success',
      data,
      statusCode: 200
    })
  } else {
    throw new APIError({
      errors: "That's not a video",
      status: httpStatus.BAD_REQUEST
    })
  }
}

// http://localhost:3000/v1/video/download/139?url=https://www.youtube.com/watch?v=PvnlpPWAcZc
// http://localhost:3000/v1/video/download/http-832?url=https://twitter.com/Eriknaitor/status/1547709248674471938
// http://localhost:3000/v1/video/download/hls-286?url=https://www.reddit.com/r/DetailCraft/comments/wbhide/heres_a_hobbit_hole_starter_base_i_built_recently/
exports.download = async (req, res) => {
  const { formatId: format } = req.params
  const { url, id } = req.query

  ytdlInfo(url)
    .then((info) => {
      const { formats } = info
      const filteredFile = formats.filter((fmt) => fmt.format_id === format)

      if (filteredFile?.length === 0) {
        throw new APIError({
          errors: "That's not a video",
          status: httpStatus.BAD_REQUEST
        })
      } else {
        ytdlStream(url, {
          format,
          quiet: true,
          output: '-'
        }).stdout.pipe(res.attachment(`${id}.${filteredFile[0].ext}`))
      }
    })
}
