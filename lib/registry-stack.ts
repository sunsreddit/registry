import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as parameters from '../config/parameters.json';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import {
  OpenIdConnectProvider,
  Role,
  WebIdentityPrincipal,
} from 'aws-cdk-lib/aws-iam';

export class RegistryStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const {
      aws: { clientIds },
      github: { issuer, organization, repos },
    } = parameters;

    repos.forEach((repo) => {
      new Repository(this, `${repo}Repo`, {
        imageScanOnPush: true,
        repositoryName: `${organization}/${repo}`,
      });
    });

    const oidcProviderGitHubActions = new OpenIdConnectProvider(
      this,
      'OIDCProviderGitHubActions',
      {
        url: `https://${issuer}`,
        clientIds,
      }
    );

    const subCondition = repos
      .map((repo) => `repo:${organization}/${repo}:ref:refs/heads/*`)
      .join('||');

    new Role(this, 'GitHubActionsRole', {
      assumedBy: new WebIdentityPrincipal(
        oidcProviderGitHubActions.openIdConnectProviderArn,
        {
          StringLike: { [`${issuer}:sub`]: subCondition },
          StringEquals: { [`${issuer}:aud`]: 'sts.amazonaws.com' },
        }
      ),
    });
  }
}
