#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { RegistryStack } from '../lib/registry-stack';
import parameters from '../config/parameters.json';
import tags from '../config/tags.json';
import 'dotenv/config';

const { description, stackName, terminationProtection } =
  parameters;
const props = {
  stackName,
  env: { account: process.env.AWS_ACCOUNT_ID, region: process.env.AWS_REGION },
  description,
  tags,
  terminationProtection,
};

const app = new App();
new RegistryStack(app, props.stackName, props);