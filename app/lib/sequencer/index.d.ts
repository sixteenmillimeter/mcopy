import { Commands } from 'cmd';
export declare class Sequencer {
    private running;
    private paused;
    private grid;
    private gridLoops;
    private arr;
    private loops;
    private cfg;
    private cmd;
    private CMDS;
    private ipc;
    private ui;
    private log;
    private id;
    private alerted;
    private psbId;
    /**
     * @constructor
     * Create a new sequencer and assign command and UI as private sub-classes
     *
     * @param {object} cfg Configuration object
     * @param {object} cmd Shared command class
     * @param {object} ui Electron UI, browser window
     **/
    constructor(cfg: any, cmd: Commands, ui: any);
    /**
     * Take configuration object and assign all commands as keys
     * in the internal CMDS object.
     *
     * @param {object} obj Configuration object
     **/
    private cmds;
    /**
     * Initialize the class by requiring ipcMain from electron
     * and creating logger.
     *
     **/
    private init;
    /**
     * Bind ipc listener to channel 'sequencer' or current id of
     * class.
     **/
    private listen;
    /**
     * Listener callback function. Called whenever ipc
     * message is sent to channel 'sequencer'.
     *
     * @param {object} event IPC message event
     * @param {object} arg Arguments provided in message
     **/
    private listener;
    /**
     * Sets the value of the loops in the grid sequence
     * to value sent by UI in ipc message.
     *
     * @param {integer} count Number of loops to set grid sequence to
     **/
    setLoops(count: number): void;
    /**
     * Sets multiple steps at once
     *
     * @param {array} steps Array of steps to set or update
     **/
    setSteps(steps: any[]): void;
    /**
     * Resets multiple steps to default 'undefined' state
     *
     * @param {array} steps Array containing the x location of steps to unset
     **/
    unsetSteps(steps: number[]): void;
    /**
     * Starts a sequence with the existing grid sequence,
     * or if one is provided in the arg object, starts
     * that sequence.
     *
     * @param {object} arg Arguments from ipc message
     **/
    start(arg: any): Promise<void>;
    /**
     * Pauses sequence from UI.
     **/
    pause(): void;
    /**
     * Stops the sequence
     **/
    stop(): void;
    /**
     * Execute command @ step x. Wrapper with try catch.
     *
     * @param {integer} x Step to execute command at
     **/
    private step;
    /**
     * Locate step @ position x and execute the command.
     *
     * @param {integer} x Step to execute command at
     **/
    private cmdExec;
}
