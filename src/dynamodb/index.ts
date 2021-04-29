import AWS from 'aws-sdk'

AWS.config.update({
  region: "ap-northeast-1"
});

const docClient = new AWS.DynamoDB.DocumentClient()

export const putItem= <T> (tableName: string, item: T): Promise<void> => {
  return new Promise((resolve, reject) => {
    const param = {
      TableName: tableName,
      Item: item
    }
    docClient.put(param,(err)=> {
      if(err) { reject(new Error(err.message)) }
    })
  })

}

