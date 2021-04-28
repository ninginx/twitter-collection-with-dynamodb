import needle, { NeedleResponse } from 'needle'
import dotenv from 'dotenv';

dotenv.config()

export async function getTweet(tweets?: tweets): Promise<tweetData[]> {

  const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned

  const params: param = {
    'query': `from:${process.env.TWITTER_ID} -is:retweet`,
    'tweet.fields': 'author_id,created_at,public_metrics,entities',
    'max_results': 100
  }

  if(tweets?.meta.next_token) {
    params.next_token=tweets?.meta.next_token
  }

  const res: NeedleResponse  = 
    await needle('get', endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      "authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  })
  
  if((res.body as tweets).meta.next_token) {
    return (res.body as tweets).data.concat(await getTweet(res.body as tweets))
  } else if (res.body) {
    return (res.body as tweets).data;
  } else {
    throw new Error('Unsuccessful request');
  }
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