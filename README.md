# 前提
  1. terraform インストール
  
  https://www.terraform.io/downloads.html
  
  or 
  
  ```
  brew install terraform
  ```
  
  2. AWS上でIAMユーザーを作成して、access_key, secret_keyを発行

  ```
  cp ./terraform/terraform.tfvars.sample ./terraform/terraform.tfvars
  ```

# terraformを使って、dynamodbを構築
  1. terraform.tfvars.sampleをコピーして、terraform.tfvarsを作成する.
    * terraform.tfvars.sample ⇨ terraform.tfvars
  2. terraform.tfvars内の設定値を自分の環境のAWS IAMアカウントのアクセスキーを設定する
    * aws_access_key = "" #自分のAWS環境の設定値に置き換える 
    * aws_secret_key = ""
  3. terraformコマンドを実行
    * terraform init
    * terraform plan
    * terraform apply
    