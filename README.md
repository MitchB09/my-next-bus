# My Next Bus
https://my-next-bus.bilensky.ca

Frontend for https://myride.fredericton.ca/ to quickly display my next scheduled bus 

## Infrastructure

To build the AWS SAM template first execute the following to compile template.yaml:

```bash
sam build
sam deploy --guided
```

Deploying Infra to dev environment

```bash
sam deploy --config-file samconfig.toml
```

Deploying to Prod

```bash
sam deploy --config-file samconfig.toml --config-env prod
```

## Running UI

To build and run the ui for the UI, execute the following scripts. 

```bash
cd ui
npm install
npm start
```

Deploying the UI can be done by running a build and syncing the files to S3

```bash
npm run build
aws s3 sync dist/ s3://S3_BUCKET_NAME
```

