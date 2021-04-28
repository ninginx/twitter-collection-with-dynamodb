import AWS from 'aws-sdk'
import { getTweet } from './twitter'

AWS.config.update({
  region: "ap-northeast-1"
});

const docClient = new AWS.DynamoDB.DocumentClient()

getTweet().then((tweets) => {
  tweets.forEach((tweet) => {
    
    const params = {
      TableName: 'Tweets',
      Item: tweet
    }
  
    docClient.put(params, (err) => {
      if(err) {console.error('エラー',err)}
    })
  })
  console.log('import finished')
})
