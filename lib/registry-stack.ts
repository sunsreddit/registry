import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as parameters from '../config/parameters.json';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { CompositePrincipal, Effect, Group, ManagedPolicy, PolicyStatement, Role, User } from 'aws-cdk-lib/aws-iam';

interface RepoConfig {
  name: string;
  userCondition: object;
  resources: string[];
}

export class RegistryStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const { resources } = parameters;
    const org = resources.github.organization;
    const repos = resources.github.repos;
    
    const iamPath = `/${org}/ecr/`;
    const actions = ['ecr:InitiateLayerUpload', 'ecr:UploadLayerPart', 'ecr:CompleteLayerUpload', 'ecr:PutImage'];
    const statements: PolicyStatement[] = [];
    const users: User[] = [];

    const ecrPushGroup = new Group(this, 'EcrPushGroup', {
      path: iamPath,
      groupName: `ecr-github.${org}`
    });

    const repoConfigs: RepoConfig[] = repos.map((repo: {name: string; }) => ({
      name: repo.name,
      userCondition: { 
        StringEquals: { 
          'aws:username': `ecr-github.${repo.name}` 
        }
      },
      resources: [`arn:aws:ecr:${this.region}:${this.account}:repository/${org}/${repo.name}`]
    }));
    
    repoConfigs.forEach(repoConfig => {
      const { name, userCondition, resources } = repoConfig;

      const repoUser = `ecr-github.${name}`;
      const user = new User(this, `${repoUser}User`, {
        groups: [ecrPushGroup],
        path: iamPath,
        userName: repoUser,
      });
      users.push(user);
            
      new Repository(this, `${name}Repo`, {
        imageScanOnPush: true,
        repositoryName: `${org}/${name}`,
      });

      const statement = new PolicyStatement({
        actions,
        conditions: userCondition,
        effect: Effect.ALLOW,
        resources,
      });
      
      statements.push(statement);
    });

    const ecrPolicy = new ManagedPolicy(this, 'EcrPolicy', {
      groups: [ecrPushGroup],
      path: iamPath,
      statements,
    });

    new Role(this, 'EcrRole', {
      assumedBy: new CompositePrincipal(...users),
      managedPolicies: [ecrPolicy],
    }).grantAssumeRole(ecrPushGroup);
  }
}