import AWS from 'aws-sdk'

AWS.config.update({
  region: "ap-northeast-1"
});

const docClient = new AWS.DynamoDB.DocumentClient()

export const putItem= async <T> (tableName: string,item: T): Promise<void> => {

  const param = {
    TableName: tableName,
    Item: item
  }
  console.log('param',param)
  await docClient.put(param)
}

