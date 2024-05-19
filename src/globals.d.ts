declare module 'delay';
declare module 'intval';
declare module 'processing';
declare module 'electron';
declare module 'fs-extra';
declare module 'uuid';
declare module 'exec';
declare module 'spawn';
declare module 'systeminformation';
declare module 'exit';
declare module 'request';
declare module 'animated-gif-detector';
declare module 'frame';

interface Device {
	serial : string;
	device : string;
}

interface Arduino { 
	hasState : any;
	alias : any;
	serial : any;
	stateStr : any;
	send (id : string, cmd : string) : number;
	sendString (id : string, str : string) : any;
	enumerate () : any;
	connect (device : string, serial : string, state : boolean) : any;
	verify () : any;
	distinguish () : any;
	fakeConnect ( id : string) : any;
	stateAsync (device : string, confirm: boolean) : any;
	state (serial: string, confirm: boolean) : number;
	close () : any;
	aliasSerial ( device : string, serial : string) : any;
}
