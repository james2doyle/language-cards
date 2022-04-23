# language-cards

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# build for cloudflare worker deploy
$ mv wrangler.toml.example wranger.toml
$ NITRO_PRESET=cloudflare npm run build
$ wrangler publish
```

For detailed explanation on how things work, check out the [documentation](https://v3.nuxtjs.org).
