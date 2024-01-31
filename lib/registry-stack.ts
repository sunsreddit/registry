import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as parameters from '../config/parameters.json';
import { Repository } from 'aws-cdk-lib/aws-ecr';

export class RegistryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const { resources } = parameters;
    
    const org = resources.github.organization;
    const repos = resources.github.repos;
    repos.forEach((repo: { name: string; }) => {
      const repoName = repo.name;
      new Repository(this, `${repoName}Repo`, {
        repositoryName: `${org}/${repoName}`,
        imageScanOnPush: true
      });
    });

  }
}