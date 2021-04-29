# 前提
  1. terraform インストール
  
  https://www.terraform.io/downloads.html
  
  or 
  
  ```
  brew install terraform
  ```
  2. twitter api 申請とBearer token発行
  https://developer.twitter.com/en/docs/twitter-api

# terraformを使って、dynamodbを構築
  1. terraform.tfvars.sampleをコピーして、terraform.tfvarsを作成する.
    * terraform.tfvars.sample ⇨ terraform.tfvars
  2. terraform.tfvars内の設定値を自分の環境のAWS IAMアカウントのアクセスキーを設定する
    
    ```
    cp ./terraform/terraform.tfvars.sample ./terraform/terraform.tfvars

    aws_access_key = "" #自分のAWS環境の設定値に置き換える

    aws_secret_key = "" 
    ```

# terraformコマンドを実行

  ```
  terraform init

  terraform plan

  terraform apply
  ```

# twitter apiからtweetを取得してdynamodbに書き込み