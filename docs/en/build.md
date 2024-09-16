## Build instructions

### Requirements

1. Node.js 22.\*
2. Yarn 1.22.\*

### Build steps

1. Clone the repository
2. (Optional) Create a `.env` file in the root of the repository with the following content:

```
CHROME_KEY=%extension_chrome_key%
FIREFOX_ID=%firefox_extension_id%
```

3. Run `yarn install --frozen-lockfile` from the root of the repository
4. Run `yarn build:ext` from the root of the repository

2nd step can be skipped if you don't need to publish the extension to the stores.

Build artifacts are located in the `./build` folder.

### Running the extension

You can build a debug version of the extension using next command:

-   `yarn dev` - for Chromium-based browsers
-   `yarn dev:firefox` - for Firefox-based browsers
