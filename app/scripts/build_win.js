const { MSICreator } = require('electron-wix-msi');
const package = require('../package.json')

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: '../dist/mcopy-win32-x64',
  description: 'mcopy optical printer GUI',
  exe: 'mcopy',
  name: 'mcopy',
  manufacturer: 'sixteenmillimeter.com',
  version: package.version,
  outputDirectory: '../dist/'
});

// Step 2: Create a .wxs template file
msiCreator.create();

// Step 3: Compile the template to a .msi file
setTimeout(msiCreator.compile, 30000)