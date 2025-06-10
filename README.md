This repo includes some WebSpatial sample codes

## Development

```bash
pnpm install
npm run devAVP
npm run sim
```

You can use Safari's Web Inspector to debug.

## Build for packaged production for AVP simulator (all web assets are included in the package)

**Prerequisite:**

- XCode 14.3
- VisionOS Simulator installed

```
npm run build-sim
```

## Build for packaged production for physical AVP (all web assets are included in the package)

**Prerequisite:**

- XCode 14.3
- Knowledge of XCode Apple Developer Account Configuration

Step1: build web assets.
**Note:**

- you need to fill the teamId and change the bundleId in package.json
- the build result will be located at build folder

```
    "device-packaged": "npm run build && npx webspatial-builder build --base=/ --teamId= --bundle-id=",
```

run the following command to build for packaged production for AVP

```bash
npm run device-packaged
```

Step2: If you failed to build, you can try to build with XCode manually.

open XCode project located at `node_modules/.webspatial-builder-temp/platform-visionos/project/web-spatial.xcodeproj`

Step3: install the ipa file to your device.

## Samples

src/pages/home: shows how to popup animated dialog
