module.exports = {
  submissionRegex: /https?:\/\/[\w.]+\/hc\/[-a-zA-Z]+\/community\/posts\/(\d{12,})(?:-[\w-]+)?/,
  commentRegex: /https?:\/\/[\w.]+\/hc\/[-a-zA-Z]+\/community\/posts\/(\d{12,})(?:-[\w-]+)?\/comments\/(\d{12,})/,
  isID: (input) => { return /\d{12,}/.test(input) },
  thresholds: {
    reports: 4, // 3 + 1, megabots reactions also count
    custodian: 150
  },
  timeouts: {
    queueDelete: 2000,
    feedScrape: 30000
  },
  rewards: {
    submit: 10,
    report: 5,
    dupe: 20,
    vote: 2,
    comment: 5,
    daily: 25,
    commentRemove: 1
  },
  limits: {
    vote: 5
  },
  strings: {
    dupe: (x) => `This is a dupe of ${process.env.ZENDESK_ROOT_URL}/hc/en-us/community/posts/${x} , so I'm closing this out. If you'd like to have your voice heard please upvote that suggestion!`
  },
  generateErrorMessage: (e) => {
    switch (e.message) {
      case 'No such user' : {
        return `Your details couldn't be found, please make sure you've logged in at least once at ${process.env.ZENDESK_ROOT_URL}/hc/en-us/signin\nIf you just recently signed in for the first time, it might take a minute for me to detect it.`
      }
      case 'Not Found' : {
        return "Using your input, no content could be found. Please make sure you haven't made a typo"
      }
      case 'Internal Server Error': {
        return "Zendesk didn't respond properly for whatever reason, please try again later.\nThis issue might be related to problems over at Zendesk, please check https://status.zendesk.com"
      }
      case 'Suggestion closed': {
        return "The suggestion you're trying to execute this action on, is closed"
      }
      default: {
        logger.error(e)
        return "Something went wrong, and I'm not exactly sure what, try again later"
      }
    }
  }
}
