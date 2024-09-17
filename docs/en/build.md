## Build instructions

### Requirements

1. Node.js 22.\*
2. Yarn 1.22.\*

### Build steps

1. Clone the repository
2. _(Optional)_ Change extension key/id in `.env` file if you want to publish your own copy of the extension to the stores
3. Run `yarn install --frozen-lockfile` from the root of the repository
4. Run `yarn build:ext` from the root of the repository

Build artifacts are located in the `./build` folder.

### Running the extension

You can build a debug version of the extension using next command:

-   `yarn dev` - for Chromium-based browsers
-   `yarn dev:firefox` - for Firefox-based browsers
