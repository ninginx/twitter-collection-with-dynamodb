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

  ttl {
    attribute_name = "TimeToExist"
    enabled        = false
  }

  tags = {
    Name        = "dynamodb-table-1"
    Environment = "production"
  }
}

output "aws_dynamodb_table_arn" {
  value = aws_dynamodb_table.basic-dynamodb-table.arn
}