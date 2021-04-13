/** ./node_modules/.bin/electron-packager . 
--overwrite 
--platform=darwin 
--arch=x64 
--icon=assets/icons/icon.icns
 --prune=true 
 --out=../dist **/

 const packager = require('electron-packager');
 const { readFileSync } = require('fs');

 const appleId = (readFileSync('.appleId', 'utf8') ).trim();
 const appleIdPassword = (readFileSync('.applePwd', 'utf8') ).trim();
 // security find-identity to find exact string
 const appleIdentity = (readFileSync('.appleIdentity', 'utf8') ).trim();

 const config = {
 	dir : '.',
 	platform : 'darwin',
 	arch : 'x64',
 	prune : true,
 	icon : './assets/icons/icon.icns',
 	overwrite : true,
 	out : '../dist',
 	osxSign : {
 		identity : appleIdentity,
 		'hardened-runtime' : true,
 		entitlements : './entitlements.plist',
 		'entitlements-inherit': './entitlements.plist',
 		'signature-flags' : 'library'
 	},
 	osxNotarize : {
 		appleId,
 		appleIdPassword
 	}
 };

packager(config);