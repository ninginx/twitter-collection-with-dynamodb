import { putItem } from './dynamodb'
import { getTweet } from './tweet-loader'

exports.handler = function(): void  {
  getTweet()
    .then((tweets) => {
      console.log(tweets.length)
      tweets.forEach(async (tweet) => {
        await putItem('Tweets', tweet)
          .catch(err => console.error(err))
    })
  })
}
