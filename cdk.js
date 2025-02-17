"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const deployment = require("aws-cdk-lib/aws-s3-deployment");
const cf = require("aws-cdk-lib/aws-cloudfront");
const origins = require("aws-cdk-lib/aws-cloudfront-origins");
// import * as iam from 'aws-cdk-lib/aws-iam';
// import { Construct, Stack } from '@aws-cdk/core';
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = new cdk.App();
const stack = new cdk.Stack(app, 'ReactReduxCFCDK', {
    env: { region: 'us-east-1' },
});
const bucket = new s3.Bucket(stack, 'WebAppBucket', {
    bucketName: 'react-redux-shop-23-cdk'
});
const originAccessIdentity = new cf.OriginAccessIdentity(stack, 'WebAppBucketOAI', {
    comment: bucket.bucketName,
});
bucket.grantRead(originAccessIdentity);
const cloudfront = new cf.Distribution(stack, 'WebAppDistribution', {
    defaultBehavior: {
        origin: new origins.S3Origin(bucket, {
            originAccessIdentity,
        }),
        viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    },
    defaultRootObject: 'index.html',
    errorResponses: [
        {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/intex.html',
        },
    ],
});
new deployment.BucketDeployment(stack, 'DeployWebApp', {
    destinationBucket: bucket,
    sources: [deployment.Source.asset('./dist')],
    distribution: cloudfront,
    distributionPaths: ['/*'],
});
// export class StaticSite extends Construct {
//   constructor(parent: Stack, name: string) {
//     super(parent, name);
//     const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, 'JSCC-OAI')
//     const siteBucket = new s3.Bucket(this, 'JSCCStaticBucket', {
//       bucketName: 'js-cc-cloudfront-s3',
//       websiteIndexDocument: 'index.html',
//       publicReadAccess: false,
//       blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
//     })
//     siteBucket.addToResourcePolicy(new iam.PolicyStatement({
//       actions: ['S3:GetObject'],
//       resources: [siteBucket.arnForObjects('*')],
//       principals: [new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
//     }))
//     const distribution = new cloudfront.CloudFrontWebDistribution(this, 'JSCC-distribution', {
//       originConfigs: [{
//         s3OriginSource: {
//           s3BucketSource: siteBucket,
//           originAccessIdentity: cloudfrontOAI
//         },
//         behaviors: [{
//           isDefaultBehavior: true
//         }]
//       }]
//     })
//     new s3deploy.BucketDeployment(this, 'JSCC-Bucket-Deployment', {
//       sources: [s3deploy.Source.asset('./dist')],
//       destinationBucket: siteBucket,
//       distribution,
//       distributionPaths: ['/*']
//     })
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQW1DO0FBQ25DLHlDQUF5QztBQUN6Qyw0REFBNEQ7QUFDNUQsaURBQWlEO0FBQ2pELDhEQUE4RDtBQUM5RCw4Q0FBOEM7QUFDOUMsb0RBQW9EO0FBQ3BELG1DQUFnQztBQUVoQyxJQUFBLGVBQU0sR0FBRSxDQUFDO0FBRVQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBRTtJQUNsRCxHQUFHLEVBQUUsRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFDO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQU0sTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFO0lBQ2xELFVBQVUsRUFBRSx5QkFBeUI7Q0FDdEMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7SUFDakYsT0FBTyxFQUFFLE1BQU0sQ0FBQyxVQUFVO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUV2QyxNQUFNLFVBQVUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLG9CQUFvQixFQUFFO0lBQ2xFLGVBQWUsRUFBRTtRQUNmLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ25DLG9CQUFvQjtTQUNyQixDQUFDO1FBQ0Ysb0JBQW9CLEVBQUUsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQjtLQUNoRTtJQUNELGlCQUFpQixFQUFFLFlBQVk7SUFDL0IsY0FBYyxFQUFFO1FBQ2Q7WUFDRSxVQUFVLEVBQUUsR0FBRztZQUNmLGtCQUFrQixFQUFFLEdBQUc7WUFDdkIsZ0JBQWdCLEVBQUUsYUFBYTtTQUNoQztLQUNGO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsSUFBSSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRTtJQUNyRCxpQkFBaUIsRUFBRSxNQUFNO0lBQ3pCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLFlBQVksRUFBRSxVQUFVO0lBQ3hCLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDO0NBQzFCLENBQUMsQ0FBQTtBQUVGLDhDQUE4QztBQUM5QywrQ0FBK0M7QUFDL0MsMkJBQTJCO0FBRTNCLGtGQUFrRjtBQUVsRixtRUFBbUU7QUFDbkUsMkNBQTJDO0FBQzNDLDRDQUE0QztBQUM1QyxpQ0FBaUM7QUFDakMsMERBQTBEO0FBQzFELFNBQVM7QUFFVCwrREFBK0Q7QUFDL0QsbUNBQW1DO0FBQ25DLG9EQUFvRDtBQUNwRCxvSEFBb0g7QUFDcEgsVUFBVTtBQUVWLGlHQUFpRztBQUNqRywwQkFBMEI7QUFDMUIsNEJBQTRCO0FBQzVCLHdDQUF3QztBQUN4QyxnREFBZ0Q7QUFDaEQsYUFBYTtBQUNiLHdCQUF3QjtBQUN4QixvQ0FBb0M7QUFDcEMsYUFBYTtBQUNiLFdBQVc7QUFDWCxTQUFTO0FBRVQsc0VBQXNFO0FBQ3RFLG9EQUFvRDtBQUNwRCx1Q0FBdUM7QUFDdkMsc0JBQXNCO0FBQ3RCLGtDQUFrQztBQUNsQyxTQUFTO0FBQ1QsTUFBTTtBQUNOLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgczMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJztcbmltcG9ydCAqIGFzIGRlcGxveW1lbnQgZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzLWRlcGxveW1lbnQnO1xuaW1wb3J0ICogYXMgY2YgZnJvbSAnYXdzLWNkay1saWIvYXdzLWNsb3VkZnJvbnQnO1xuaW1wb3J0ICogYXMgb3JpZ2lucyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udC1vcmlnaW5zJztcbi8vIGltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbi8vIGltcG9ydCB7IENvbnN0cnVjdCwgU3RhY2sgfSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ2RvdGVudic7XG5cbmNvbmZpZygpO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG5jb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soYXBwLCAnUmVhY3RSZWR1eENGQ0RLJywge1xuICBlbnY6IHtyZWdpb246ICd1cy1lYXN0LTEnfSxcbn0pO1xuXG5jb25zdCBidWNrZXQgPSBuZXcgczMuQnVja2V0KHN0YWNrLCAnV2ViQXBwQnVja2V0Jywge1xuICBidWNrZXROYW1lOiAncmVhY3QtcmVkdXgtc2hvcC0yMy1jZGsnXG59KTtcblxuY29uc3Qgb3JpZ2luQWNjZXNzSWRlbnRpdHkgPSBuZXcgY2YuT3JpZ2luQWNjZXNzSWRlbnRpdHkoc3RhY2ssICdXZWJBcHBCdWNrZXRPQUknLCB7XG4gIGNvbW1lbnQ6IGJ1Y2tldC5idWNrZXROYW1lLFxufSk7XG5cbmJ1Y2tldC5ncmFudFJlYWQob3JpZ2luQWNjZXNzSWRlbnRpdHkpO1xuXG5jb25zdCBjbG91ZGZyb250ID0gbmV3IGNmLkRpc3RyaWJ1dGlvbihzdGFjaywgJ1dlYkFwcERpc3RyaWJ1dGlvbicsIHtcbiAgZGVmYXVsdEJlaGF2aW9yOiB7XG4gICAgb3JpZ2luOiBuZXcgb3JpZ2lucy5TM09yaWdpbihidWNrZXQsIHtcbiAgICAgIG9yaWdpbkFjY2Vzc0lkZW50aXR5LFxuICAgIH0pLFxuICAgIHZpZXdlclByb3RvY29sUG9saWN5OiBjZi5WaWV3ZXJQcm90b2NvbFBvbGljeS5SRURJUkVDVF9UT19IVFRQUyxcbiAgfSxcbiAgZGVmYXVsdFJvb3RPYmplY3Q6ICdpbmRleC5odG1sJyxcbiAgZXJyb3JSZXNwb25zZXM6IFtcbiAgICB7XG4gICAgICBodHRwU3RhdHVzOiA0MDQsXG4gICAgICByZXNwb25zZUh0dHBTdGF0dXM6IDIwMCxcbiAgICAgIHJlc3BvbnNlUGFnZVBhdGg6ICcvaW50ZXguaHRtbCcsXG4gICAgfSxcbiAgXSxcbn0pXG5cbm5ldyBkZXBsb3ltZW50LkJ1Y2tldERlcGxveW1lbnQoc3RhY2ssICdEZXBsb3lXZWJBcHAnLCB7XG4gIGRlc3RpbmF0aW9uQnVja2V0OiBidWNrZXQsXG4gIHNvdXJjZXM6IFtkZXBsb3ltZW50LlNvdXJjZS5hc3NldCgnLi9idWlsZCcpXSxcbiAgZGlzdHJpYnV0aW9uOiBjbG91ZGZyb250LFxuICBkaXN0cmlidXRpb25QYXRoczogWycvKiddLFxufSlcblxuLy8gZXhwb3J0IGNsYXNzIFN0YXRpY1NpdGUgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuLy8gICBjb25zdHJ1Y3RvcihwYXJlbnQ6IFN0YWNrLCBuYW1lOiBzdHJpbmcpIHtcbi8vICAgICBzdXBlcihwYXJlbnQsIG5hbWUpO1xuXG4vLyAgICAgY29uc3QgY2xvdWRmcm9udE9BSSA9IG5ldyBjbG91ZGZyb250Lk9yaWdpbkFjY2Vzc0lkZW50aXR5KHRoaXMsICdKU0NDLU9BSScpXG5cbi8vICAgICBjb25zdCBzaXRlQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnSlNDQ1N0YXRpY0J1Y2tldCcsIHtcbi8vICAgICAgIGJ1Y2tldE5hbWU6ICdqcy1jYy1jbG91ZGZyb250LXMzJyxcbi8vICAgICAgIHdlYnNpdGVJbmRleERvY3VtZW50OiAnaW5kZXguaHRtbCcsXG4vLyAgICAgICBwdWJsaWNSZWFkQWNjZXNzOiBmYWxzZSxcbi8vICAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTExcbi8vICAgICB9KVxuXG4vLyAgICAgc2l0ZUJ1Y2tldC5hZGRUb1Jlc291cmNlUG9saWN5KG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbi8vICAgICAgIGFjdGlvbnM6IFsnUzM6R2V0T2JqZWN0J10sXG4vLyAgICAgICByZXNvdXJjZXM6IFtzaXRlQnVja2V0LmFybkZvck9iamVjdHMoJyonKV0sXG4vLyAgICAgICBwcmluY2lwYWxzOiBbbmV3IGlhbS5DYW5vbmljYWxVc2VyUHJpbmNpcGFsKGNsb3VkZnJvbnRPQUkuY2xvdWRGcm9udE9yaWdpbkFjY2Vzc0lkZW50aXR5UzNDYW5vbmljYWxVc2VySWQpXVxuLy8gICAgIH0pKVxuXG4vLyAgICAgY29uc3QgZGlzdHJpYnV0aW9uID0gbmV3IGNsb3VkZnJvbnQuQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbih0aGlzLCAnSlNDQy1kaXN0cmlidXRpb24nLCB7XG4vLyAgICAgICBvcmlnaW5Db25maWdzOiBbe1xuLy8gICAgICAgICBzM09yaWdpblNvdXJjZToge1xuLy8gICAgICAgICAgIHMzQnVja2V0U291cmNlOiBzaXRlQnVja2V0LFxuLy8gICAgICAgICAgIG9yaWdpbkFjY2Vzc0lkZW50aXR5OiBjbG91ZGZyb250T0FJXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGJlaGF2aW9yczogW3tcbi8vICAgICAgICAgICBpc0RlZmF1bHRCZWhhdmlvcjogdHJ1ZVxuLy8gICAgICAgICB9XVxuLy8gICAgICAgfV1cbi8vICAgICB9KVxuXG4vLyAgICAgbmV3IHMzZGVwbG95LkJ1Y2tldERlcGxveW1lbnQodGhpcywgJ0pTQ0MtQnVja2V0LURlcGxveW1lbnQnLCB7XG4vLyAgICAgICBzb3VyY2VzOiBbczNkZXBsb3kuU291cmNlLmFzc2V0KCcuL2Rpc3QnKV0sXG4vLyAgICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogc2l0ZUJ1Y2tldCxcbi8vICAgICAgIGRpc3RyaWJ1dGlvbixcbi8vICAgICAgIGRpc3RyaWJ1dGlvblBhdGhzOiBbJy8qJ11cbi8vICAgICB9KVxuLy8gICB9XG4vLyB9XG4iXX0=
