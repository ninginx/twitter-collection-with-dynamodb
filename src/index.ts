import { putItem } from './dynamodb'
import { getTweet } from './tweet-loader'

export const handler = (): void => {
  getTweet()
    .then((tweets) => {
      tweets.forEach((tweet) => {
        putItem('Tweets', tweet)
          .catch(err => console.error(err))
    })
  })
}
