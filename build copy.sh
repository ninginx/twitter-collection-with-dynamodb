
#!/bin/sh
# distフォルダ
rm -rf ./dist
# TypeScriptビルド
npx tsc
# package.jsonをdistにコピー
cp -f ./package.json ./package-lock.json ./dist
cd dist
# packageのインストール
npm install --production
# uploadするためにzip化
zip -r ./lambda.zip ./

# zipデータをlambdaにアップロード
aws lambda update-function-code \
    --function-name <INPUT YOUR LAMBDA ARN>\
    --zip-file fileb://lambda.zip