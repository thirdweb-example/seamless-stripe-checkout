# Seamless NFT Experience

This project demonstrates how you can create a seamless NFT experience for your users.

We use Magic.link to authenticate users using their email, then we use stripe to collect payment for the NFTs and send them to the user's wallet generated by Magic.

## Using This Template

Create a project using this example:

```bash
npx thirdweb create --template seamless-stripe-checkout
```

- Create an [Edition](https://thirdweb.com/thirdweb.eth/TokenERC1155) contract using the dashboard.
- Add an NFT to the token contract with your desired metadata and set initial supply to 0.
- Update the contract address in the [addresses.ts](./constants/addresses.ts) file.
- Add your wallet's private key as an environment variable in a `.env.local` file called `PRIVATE_KEY`:

```text title=".env.local"
PRIVATE_KEY=your-wallet-private-key
```

- Create a Magic Auth app on Magic.link and add your publishable key to the `.env.local` file:

```text title=".env.local"
NEXT_PUBLIC_MAGIC_LINK_API_KEY=your-magic-publishable-key
```

- Create a stripe account and add your publishable key and secret key to the `.env.local` file:

```text title=".env.local"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

- Install the [stripe cli](https://stripe.com/docs/stripe-cli) and run `stripe login` to login to your stripe account.
- Forward the webhook to your local server by running `stripe listen --forward-to localhost:3000/api/webhook` in a separate terminal.
- Paste the webhook secret key in the `.env.local` file:

```text title=".env.local"
WEBHOOK_SECRET_KEY=your-stripe-webhook-secret
```

- Install dependencies:

```bash
yarn # yarn

npm install # npm
```

- Run the development server:

```bash
yarn dev # yarn

npm run dev # npm
```

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).