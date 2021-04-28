1. terraformを使って、dynamodbを構築
    terraform.tfvars.sampleをコピーして、terraform.tfvarsを作成する.
      - terraform.tfvars.sample ⇨ terraform.tfvars
    terraform.tfvars内の設定値を自分の環境のAWS IAMアカウントのアクセスキーを設定する
      - aws_access_key = "" #自分のAWS環境の設定値に置き換える 
      - aws_secret_key = ""
    terraformコマンドを実行
      - terraform init
      - terraform plan
      - terraform apply
    