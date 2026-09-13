# BuildInBlu

Responsive React Native / Expo presentation site for BuildInBlu. The same codebase runs on iOS, Android, and the web.

The interface is fully available in Greek and English through the `EL / EN` switcher in the header. The portfolio includes dedicated, shareable case-study routes for every featured project.

## Run locally

```bash
npm install
npm start
```

Then press `a` for Android, `i` for iOS (macOS), or `w` for web. You can also scan the QR code with a compatible Expo development client.

## Direct commands

```bash
npm run android
npm run ios
npm run web
npm run check
npm run build
```

`npm run check` verifies that the installed packages match the active Expo SDK. `npm run build` creates the production web export in `dist/`.

Portfolio routes use URL hashes so they keep working on any static host without server-side rewrites:

- `#projects`
- `#projects/marios-papaiosif`
- `#projects/geumio`
- `#projects/diatrofologoi`

All contact calls-to-action open the BuildInBlu Instagram profile, while each case study links to its live project.
