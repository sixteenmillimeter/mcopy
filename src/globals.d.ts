declare module 'delay';
declare module 'log';
declare module 'intval';
declare module 'electron';

interface Arduino { 
	send (id : string, cmd : string) : number;
	string (id : string, str : string) : any;
}
