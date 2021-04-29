import needle, { NeedleResponse } from 'needle'
import dotenv from 'dotenv';

dotenv.config()

export const getTweet = (tweets?: tweets): Promise<tweetData[]> => {
  return new Promise((resolve, reject) => {
    
    const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
    const params: param = {
      'query': `from:${process.env.TWITTER_ID} -is:retweet`,
      'tweet.fields': 'author_id,created_at,public_metrics,entities',
      'max_results': 100
    }
  
    if(tweets?.meta.next_token) {
      params.next_token=tweets?.meta.next_token
    }

    needle('get', endpointUrl, params, {
      headers: {
        "User-Agent": "v2RecentSearchJS",
        "authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
      }
    })
    .then((res: NeedleResponse) => {
      if((res.body as tweets)?.meta.next_token) {
        getTweet(res.body as tweets)
          .then((resPage2)=>{
            resolve((res.body as tweets).data.concat(resPage2))
          })
          .catch((err) => {
            reject(new Error(err.message))
          })
      }
      else{
        resolve((res.body as tweets).data)
      }
    }).catch((err)=>{
      reject(new Error(err.message))
    })
  })
}

type publicMetrics = {
  retweet_count: number,
  reply_count: number,
  like_count: number,
  quote_count: number
}

type entityMention = {
  start: number,
  end: number,
  username: string
}

type entityAnnotation = {
  start: number,
  end: number,
  probability: number,
  type: string,
  normalized_text: string
}

type tweetEntities = {
  mentions?: entityMention,
  annotations?: entityAnnotation[]
}

type tweetData = {
  text: string,
  created_at: string,
  id: string,
  public_metrics: publicMetrics,
  entities?: tweetEntities[]
}

type tweetMeta = {
  newest_id: string,
  oldest_id: string,
  result_count: number,
  next_token?: string
}

type tweets = {
  data: tweetData[],
  meta: tweetMeta 
}

type param = {
  'query': string,
  'tweet.fields': string,
  'max_results': number,
  'next_token'?: string
}