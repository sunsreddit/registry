#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { RegistryStack } from '../lib/registry-stack';
import parameters from '../config/parameters.json';
import tags from '../config/tags.json';

const { account, description, region, stackName, terminationProtection } =
  parameters;
const props = {
  stackName,
  env: { account, region },
  description,
  tags,
  terminationProtection,
};

const app = new App();
new RegistryStack(app, props.stackName, props);