interface ConfigCommands {
	[key:string] : string
}

interface ConfigDeviceProfile {
	time : number,
	delay : number,
	momentary : number
}

interface ConfigBlackProfile {
	before : number,
	after : number
}

interface ConfigProfile {
	label : string,
	cam : ConfigDeviceProfile,
	proj? : ConfigDeviceProfile,
	black? : ConfigBlackProfile,
	light : boolean
}

interface ConfigProfiles {
	[key:string] : ConfigProfile
}

interface ConfigArduino extends ConfigProfile {
	baud : number,
	board : string,
	serialDelay : number,
	sequenceDelay : number,
	cmd : ConfigCommands
}

interface Config {
	version : string,
	ext_port : number,
	profiles : ConfigProfiles,
	cmd : ConfigCommands,
	arduino : any
}

export type { Config }