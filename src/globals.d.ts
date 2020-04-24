declare module 'delay';
declare module 'log';
declare module 'intval';
declare module 'electron';
declare module 'fs-extra';
declare module 'uuid';
declare module 'exec';
declare module 'spawn';
declare module 'systeminformation';
declare module 'exit';
declare module 'request';
declare module 'animated-gif-detector';
declare module 'winston';
declare module 'frame';

interface Device {
	arduino : string;
}

interface Arduino { 
	send (id : string, cmd : string) : number;
	string (id : string, str : string) : any;
	enumerate () : any;
	connect (id : string, device : Device, state : boolean) : any;
	verify () : any;
	distinguish () : any;
	fakeConnect ( id : string) : any;
	close () : any;
	aliasSerial ( id : string, device : Device) : any;
}
