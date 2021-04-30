import { readItemsAll } from '../dynamodb'

readItemsAll('Tweets').then(tweets => {
  if(typeof tweets==='undefined'){console.log('no values')}
  else{console.log(tweets.length)}
})


