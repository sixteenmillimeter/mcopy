const path = require('path');
const { MSICreator } = require('electron-wix-msi');
const package = require('../package.json')

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: path.resolve(__dirname, '..', 'dist', 'mcopy-win32-x64'),
  description: 'mcopy optical printer GUI',
  exe: 'mcopy',
  name: 'mcopy',
  manufacturer: 'sixteenmillimeter.com',
  version: package.version,
  outputDirectory: path.resolve(__dirname, '..', 'dist')
});

async function build () {

	// Step 2: Create a .wxs template file
	try {
		await msiCreator.create();
	} catch (err) {
		console.error(err);
	}

	// Step 3: Compile the template to a .msi file
	try {
		await msiCreator.compile();
	} catch (err) {
		console.error(err);
	}
}

build();