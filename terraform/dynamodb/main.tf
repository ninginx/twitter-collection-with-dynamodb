resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "Tweets"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "id"
  range_key      = "created_at"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "created_at"
    type = "S"
  }

  tags = {
    Name        = "dynamodb-table-1"
    Environment = "production"
  }
}

output "aws_dynamodb_table_arn" {
  value = aws_dynamodb_table.basic-dynamodb-table.arn
}

resource "aws_dynamodb_table" "summary-dynamodb-table" {
  name           = "TweetSummary"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "dayISOS"


  attribute {
    name = "dayISOS"
    type = "S"
  }

  tags = {
    Name        = "dynamodb-table-1"
    Environment = "production"
  }
}
