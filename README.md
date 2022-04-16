# trust-vote-site

> Dash Trust Elections - MNO Voting Site

Uses `@dashevo/dashcore-lib` to verify signatures in-browser.

_Hint_: Messages are signed the same in Dash-QT as with `dash-cli`:

`./private-key.wif`:

```txt
XK5DHnAiSj6HQNsNcDkawd9qdp8UFMdYftdVZFuRreTMJtbJhk8i
```

```bash
my_private_key="$(cat ./private-key.wif)"

my_vote='dte2019-efigaro|lcole|sfigaro|cchere'

dash-cli signmessagewithprivkey \
    "${my_private_key}" \
    "${my_vote}"
```

```txt
H3B3fGVZM2joBDmuTptj7gPI0bTFWWE1YZEPoB/5TtYudBRmiP0zszPmtUPqVQJrQzzL2rVgEOdcUAcZNbEzne0=
```

Alternatively, you can use `dashmsg`:

```bash
curl https://webinstall.dev/dashmsg | bash
export PATH="$HOME/.local/bin:$PATH"
```

```bash
dashmsg sign ./private-key.wif  "dte2019-efigaro|lcole|sfigaro|cchere"
```

```txt
H3B3fGVZM2joBDmuTptj7gPI0bTFWWE1YZEPoB/5TtYudBRmiP0zszPmtUPqVQJrQzzL2rVgEOdcUAcZNbEzne0=
```

Hint: If you've forgotten your voting address, you can look it up by your server's IP address in the masternode list:

```bash
dash-cli masternodelist json 'ENABLED'
```

## Project Structure

```txt
.
├── README.md
├── example.env
├── package-lock.json
├── package.json
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── build/
│   └── ...
└── src/
    ├── apis/
    │   └── dtevote.js
    ├── candidates.json
    ├── components/
    │   ├── App.js
    │   ├── CandidateList.css
    │   ├── CandidateList.js
    │   ├── CandidateSelector.css
    │   ├── CandidateSelector.js
    │   ├── Closed.js
    │   ├── DashLogo.js
    │   └── VoteMessage.js
    ├── index.js
    └── logo.svg
```

## Pre-Reqs

1. Get Node.js
   ```bash
   # Mac & Linux
   curl https://webinstall.dev/node | bash
   ```
   ```pwsh
   # Windows
   curl.exe -A MS https://webinstall.dev/node | powershell
   ```

## Setup

1. Clone the project
   ```bash
   git clone https://github.com/dashevo/trust-vote-site
   pushd ./trust-vote-site/
   ```
2. Configure with `.env`

   ```bash
   rsync -avhP ./example.env ./.env
   ```

   `.env`:

   ```bash
   # necessary to get the fatty mcfat-fat react app to build
   NODE_OPTIONS='--max-old-space-size=4096'

   # season to taste
   PUBLIC_URL='https://vote.example.com'

   REACT_APP_API_URL='https://vote-api.example.com'

   REACT_APP_CANDIDACY_FORM_URL='https://docs.google.com/forms/...'

   # the ISO+Offset time when voting will start and end
   REACT_APP_VOTING_END_DATE='2022-04-03T00:00:00Z'
   REACT_APP_VOTING_END_DATE='2022-04-15T00:00:00Z'

   # a unique vote identifier as part of the message hash
   REACT_APP_VOTE_TAG='dte2022'
   REACT_APP_VOTE_PREFIX='dte2022-'

   REACT_APP_DASH_NETWORK='testnet'

   # additional REACT_APP_* will be made available to the browser
   ```

3. Manually update `candidates.json`
   ```json
   [
     {
       "alias": "name3",
       "text": "Cyrus Tafti",
       "value": "ctafti",
       "key": "ctafti"
     }
   ]
   ```
4. Run the build
   ```bash
   npm ci
   npm run build
   ```

## Dev-Only Setup

```bash
npm run start
```

**Note**: Probably best to avoid running in "dev mode" since it doesn't closely resemble production mode... however, it is a _LOT_ faster.

### CRApp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## License

[MIT](LICENSE) &copy; Dash Core Group, Inc.
