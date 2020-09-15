const awsconfig = {
  aws_cognito_region: "us-east-1", // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id: "us-east-1_94v61s6iV", // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: "sv6e6dlf01r3vliij7sbfli02", // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
  aws_cognito_identity_pool_id:
    "us-east-1:ede18ef5-f483-4df8-b071-4ce3aaa2b869", // (optional) - Amazon Cognito Identity Pool ID
  aws_mandatory_sign_in: "enable", // (optional) - Users are not allowed to get the aws credentials unless they are signed in
  oauth: {},
};
export default awsconfig;
