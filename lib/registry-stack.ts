import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as parameters from '../config/parameters.json';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import {
  OpenIdConnectProvider,
  PolicyDocument,
  PolicyStatement,
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

    const repoArns: string[] = [];
    repos.forEach((repo) => {
      const repository = new Repository(this, `${repo}Repo`, {
        imageScanOnPush: true,
        repositoryName: `${organization}/${repo}`,
      });
      repoArns.push(repository.repositoryArn);
      new CfnOutput(this, `${repo}RepoArn`, {
        value: repository.repositoryArn,
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

    const ecrPolicyDocument = new PolicyDocument({
      statements: [
        new PolicyStatement({
          actions: [
            'ecr:BatchCheckLayerAvailability',
            'ecr:BatchGetImage',
            'ecr:CompleteLayerUpload',
            'ecr:GetAuthorizationToken',
            'ecr:GetDownloadUrlForLayer',
            'ecr:InitiateLayerUpload',
            'ecr:PutImage',
            'ecr:UploadLayerPart',
          ],
          resources: repoArns,
        }),
        new PolicyStatement({
          actions: ['ecr:GetAuthorizationToken'],
          resources: ['*'],
        }),
      ],
    });

    const subCondition = repos.map(
      (repo) => `repo:${organization}/${repo}:ref:refs/heads/*`
    );

    new Role(this, 'GitHubActionsRole', {
      assumedBy: new WebIdentityPrincipal(
        oidcProviderGitHubActions.openIdConnectProviderArn,
        {
          'ForAnyValue:StringLike': { [`${issuer}:sub`]: subCondition },
          StringEquals: { [`${issuer}:aud`]: 'sts.amazonaws.com' },
        }
      ),
      inlinePolicies: {
        GitHubActionsPolicy: ecrPolicyDocument,
      },
    });
  }
}
