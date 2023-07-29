export type AmplifyDependentResourcesAttributes = {
  "analytics": {
    "mysocialmediamessaging": {
      "Id": "string",
      "Region": "string",
      "appName": "string"
    }
  },
  "api": {
    "mysocialmedia": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "mysocialmedia": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "HostedUIDomain": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "OAuthMetadata": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "storage": {
    "s3mysocialmediastorage": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}