import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as parameters from '../config/parameters.json';

export class RegistryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const { resources } = parameters;
    
    const org = resources.github.organization;
    const repos = resources.github.repos;
    repos.forEach((repo) => {
      console.log(`${org}/${repo.name}`);
    });

  }
}
