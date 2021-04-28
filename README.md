# 前提
  1. terraform インストール
  
  https://www.terraform.io/downloads.html
  
  or 
  
  '''
  brew install terraform
  '''
  
  2. AWS上でIAMユーザーを作成して、access_key, secret_keyを発行
  cp ./terraform/terraform.tfvars.sample ./terraform/terraform.tfvars

# terraformを使って、dynamodbを構築
    terraform.tfvars.sampleをコピーして、terraform.tfvarsを作成する.
      1. terraform.tfvars.sample ⇨ terraform.tfvars
    terraform.tfvars内の設定値を自分の環境のAWS IAMアカウントのアクセスキーを設定する
      1. aws_access_key = "" #自分のAWS環境の設定値に置き換える 
      2. aws_secret_key = ""
    terraformコマンドを実行
      1. terraform init
      2. terraform plan
      3. terraform apply
    