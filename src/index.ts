import { putItem } from './dynamodb'
import { getTweet } from './tweet-loader'

export const streamTweet = (): void => {
  getTweet()
    .then((tweets) => {
      console.log(tweets.length)
      tweets.forEach(async (tweet) => {
        await putItem('Tweets', tweet)
          .catch(err => console.error(err))
    })
  })
}
