import AWS from 'aws-sdk'
import { ItemList, Key } from 'aws-sdk/clients/dynamodb';

AWS.config.update({
  region: "ap-northeast-1"
});

const docClient = new AWS.DynamoDB.DocumentClient()

export const putItem= <T> (tableName: string, item: T): Promise<void> => {
  return new Promise((_, reject) => {
    const param = {
      TableName: tableName,
      Item: item
    }
    docClient.put(param,(err)=> {
      if(err) {reject(new Error(err.message))}
    })
  })
}

export const readItemsRecentry = (tableName: string): Promise<ItemList|undefined> => {
  return new Promise((resolve, reject)=>{
    const param: param = {
      TableName: tableName
    }
    docClient.scan(param,(err, data)=>{
      if(err) { reject(err) }
      else{resolve(data.Items)}
    })
  })
}

export const readItemsAll = (tableName: string, LastEvaluatedKey?: Key): Promise<ItemList|undefined> => {
  return new Promise((resolve, reject)=>{
    const param: param = {
      TableName: tableName
    }
    if(LastEvaluatedKey) { param.ExclusiveStartKey = LastEvaluatedKey }
    docClient.scan(param,(err, data)=>{
      if(err) { reject(err) }
      if(data.LastEvaluatedKey) {
        readItemsAll(param.TableName, data.LastEvaluatedKey)
          .then((nextItems)=>{
            if(typeof data.Items!=='undefined'){resolve(nextItems?.concat(data.Items))}
          })
      }
      else{resolve(data.Items)}
    })
  })
}

type param = {
  TableName: string,
  ExclusiveStartKey?: Key
}