import { putItem } from './dynamodb'
import { getTweet } from './tweet-loader'

export const streamTweet = (): void => {
  getTweet().then((tweets) => {
    tweets.forEach(async (tweet) => {
      await putItem('Tweets', tweet)
    })
  })
}

streamTweet()