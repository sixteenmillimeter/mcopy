# mcopy desktop app

1. Installation

------

## Installation

The mcopy desktop app can be either [installed from a binary (on macOS)](https://github.com/sixteenmillimeter/mcopy/releases) or built from source on any platform that supports node.js and [Electron apps](https://electronjs.org/).

### Dependencies

* git
* [node.js](https://nodejs.org/en/)

Once `node` is installed (see below for platform-specific instructions) open your terminal application and enter the following commands:

```
git clone https://github.com/sixteenmillimeter/mcopy.git
cd mcopy/app
npm install
```

That's it. Once the `npm install` process is complete, the app can be launched with:

```
npm start
```

If you are interested in running in dev mode, simply use:

```
npm run dev
```

### macOS

#### Installing node.js on macOS

The node.js runtime can be easily installed on macOS if you already have [Homebrew](https://brew.sh/).
Simply install node.js with the command:
```
brew install node
```

If you're not using Homebrew, you can also install it from the [node.js website](https://nodejs.org/en/download/).

### Linux

#### Installing node.js on Linux

See this helpful document from the [node.js Foundation](https://nodejs.org/en/download/package-manager/) about installing node.js from different package managers.
This will provide more detailed instructions about distro-specific dependencies for node.js and the different packages available. 
Use a more current version of node, if available.
At the time of this writing, development is taking place on node.js version `9.7.1`.

#### Arduino firmware

It's recommended that on linux distributions, you have the Arduino IDE installed for debugging and to ensure that your system serial permissions are configured to communicate with the Arduino devices.

#### Binary installation

When installing from the pre-built .deb package, you may have to locate the package after installation using the following command:
```
dpkg -L mcopy-app
```

In the output, you should see an item like `/usr/lib/mcopy-app/mcopy` which is the binary that contains the desktop app. I will improve the Linux build process, but will also accept any PRs which improve it as well.

### Windows

#### Installing node.js on Windows

Install node.js on Windows using one of their [many install options](https://nodejs.org/en/download/).