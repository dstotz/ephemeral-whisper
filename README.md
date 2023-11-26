# Ephemeral Whisper

A self hosted e2e encrypted temporary note sharing application used for sending sensitive information.

A demo of this app can be found at <https://ephemeral-whisper.vercel.app>

## Getting Started

### Quickstart

1. `yarn install`
2. `bin/generate_env`
3. `yarn dev`

### Configuration

To use this application you need an RSA keypair with passphrase, an IV, and a symetric key value. All values except for the encryption passphrase need to be BASE64 encoded environment variables.

You can use the `bin/generate_env` script to automatically create a `.env` file along with the certificate files as a quick way to get started. Once the `.env` file is created, you can move it to the root directory of this project.

#### Environment Variables

##### DATABASE_URL

Can be set to any relative filepath such as `file:./dev.db`

##### ENCRYPTION_PASSPHRASE

Random string with at least 24 charachters

##### SYMETRIC_KEY_BASE64

`openssl rand -base64 32`

##### PRIVATE_KEY_BASE64

`openssl genrsa -des3 -out private.pem 2048 && cat private.pem | base64`
When prompted enter the value used for your `ENCRYPTION_PASSPHRASE`

##### PUBLIC_KEY_BASE64

`openssl rsa -in private.pem -pubout -out public.pem && cat public.pem | base64`
When prompted enter the value used for your `ENCRYPTION_PASSPHRASE`

##### IV_BASE64

`openssl rand -base64 16`

#### Cron Jobs

In order to automatically purge expired whispers, you will need to set up a cron job that calls `GET /api/purge_expired_secrets`

Calling this endpoint will automatically purge any whispers that have expired as of the time of the call and utilizes a temporary lock. So it is safe to call as frequently as you want.

### Local Dev

Run the development server with `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

### Tests

Tests are run using Playwright and have a GitHub action set up to automatically run on pushes to `main` or PR's.

### TODO

- Add salting to the encryption
- Component tests
- Switch to Postgres
- Dockerize local dev env
