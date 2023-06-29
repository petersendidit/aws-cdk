import {
  App, Stack,
  aws_rds as rds,
  aws_ec2 as ec2,
} from 'aws-cdk-lib';

const app = new App();
const env = { region: process.env.CDK_DEFAULT_REGION, account: process.env.CDK_DEFAULT_ACCOUNT };
const stack = new Stack(app, 'my-test-stack', { env });

const vpc = new ec2.Vpc(stack, 'my-test-stack-vpc', {
  maxAzs: 3,
});

const engine = rds.DatabaseClusterEngine.mysql({
  version: rds.MysqlEngineVersion.VER_8_0_32,
});

new rds.MultiAZDatabaseCluster(stack, 'Cluster', {
  engine,
  instanceType: ec2.InstanceType.of(ec2.InstanceClass.M5D, ec2.InstanceSize.LARGE),
  vpc,
});