
# Re-use an existing ACM certificate
ACM_CERTIFICATE_ARN="arn:aws:acm:us-east-1:339713170431:certificate/124a1c6d-7a5a-45f0-b786-ea132628c0d8"

DOMAIN_NAME="federaltransit.org"
SUBDOMAIN_NAME="staging"
STAGING_BUCKET_NAME="federal-transit-staging"
AWS_REGION="us-east-1"

# -- 1. Create a new S3 bucket for the staging domain --
aws s3api create-bucket --bucket federal-transit-staging --region us-east-1

# -- 2. Enable static web hosting for the bucket
aws s3api put-bucket-website --bucket federal-transit-staging --website-configuration IndexDocument=index.html

# -- 3. Set the bucket policy to allow public access
BUCKET_POLICY="{ \"Version\": \"2025-11-17\", \"Statement\": [ { \"Sid\": \"PublicReadGetObject\", \"Effect\": \"Allow\", \"Principal\": \"*\", \"Action\": \"s3:GetObject\", \"Resource\": \"arn:aws:s3:::${STAGING_BUCKET_NAME}/*\" } ] }"
aws s3api put-bucket-policy --bucket ${STAGING_BUCKET_NAME} --policy "${BUCKET_POLICY}"

# -- 4. Create CloudFront distribution for the bucket
S3_WEBSITE_ENDPOINT="${STAGING_BUCKET_NAME}.s3-website-${AWS_REGION}.amazonaws.com"
TIMESTAMP=$(date +%Y%m%d%H%M%S)
