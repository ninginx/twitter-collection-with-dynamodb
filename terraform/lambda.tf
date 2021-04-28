resource "aws_iam_role" "iam_dynamo_for_lambda" {
  name = "iam_dynamo_for_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

module "dynamodb" {
  source = "./dynamodb"
}

data "aws_iam_policy_document" "allow_dynamodb_access" {
  statement {
    effect = "Allow"
    actions = [      
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem"
    ]
    resources = [ "${module.dynamodb.aws_dynamodb_table_arn}" ]
  }
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_policy"
  role= aws_iam_role.iam_dynamo_for_lambda.id
  policy = data.aws_iam_policy_document.allow_dynamodb_access.json
}

resource "aws_lambda_function" "twitter_collect_lambda" {
  filename      = "tweet-loader.zip"
  function_name = "lambda_function_name"
  role          = aws_iam_role.iam_dynamo_for_lambda.arn
  handler       = "exports.test"

  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = filebase64sha256("tweet-loader.zip")

  runtime = "nodejs12.x"

  environment {
    variables = {
      foo = "bar"
    }
  }
}