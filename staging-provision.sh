aws cloudformation deploy \
    --template-file staging-cfn.yaml \
    --stack-name FederalTransitStagingFrontend \
    --parameter-overrides \
        HostedZoneId="Z0401464I81OU6L6XYXW" \
        AcmCertificateArn="arn:aws:acm:us-east-1:339713170431:certificate/e06ec23d-1ec7-45ec-84c3-46d00773a26a" \
        StagingSubdomain="staging.federaltransit.org" \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --region us-east-1