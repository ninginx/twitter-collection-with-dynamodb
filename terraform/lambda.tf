variable "twitter_bearer_token" {}
variable "twitter_id" {}

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
    resources = [ module.dynamodb.aws_dynamodb_table_arn ]
  }
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_policy"
  role= aws_iam_role.iam_dynamo_for_lambda.id
  policy = data.aws_iam_policy_document.allow_dynamodb_access.json
}

resource "aws_lambda_function" "tweet_collect_lambda" {
  filename      = "lambda.zip"
  function_name = "tweet_collect_lambda"
  role          = aws_iam_role.iam_dynamo_for_lambda.arn
  handler       = "index.handler"
  timeout = 15

  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = filebase64sha256("lambda.zip")

  runtime = "nodejs12.x"

  environment {
    variables = {
      TWITTER_BEARER_TOKEN = var.twitter_bearer_token
      TWITTER_ID = var.twitter_id
    }
  }
}

resource "aws_cloudwatch_event_rule" "daily_process" {
  name = "daily_process"
  description = "daily_process"
  schedule_expression = "cron(59 23 * * ? *)"
}

resource "aws_cloudwatch_event_target" "collect_tweet_every_day" {
  rule = aws_cloudwatch_event_rule.daily_process.name
  target_id = "tweet_collect_lambda"
  arn = aws_lambda_function.tweet_collect_lambda.arn
}

resource "aws_lambda_permission" "allow_collect_tweet_every_day" {
  statement_id = "AllowExecutionFromCloudWatch"
  action = "lambda:InvokeFunction"
  function_name = "tweet_collect_lambda"
  principal = "events.amazonaws.com"
  source_arn = aws_cloudwatch_event_rule.daily_process.arn
}