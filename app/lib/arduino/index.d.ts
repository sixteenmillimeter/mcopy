/// <reference types="node" />
import type { EventEmitter } from 'events';
import type { Config } from 'cfg';
/** @module lib/arduino */
/**
 * Class representing the arduino communication features.
 */
export declare class Arduino {
    private log;
    private eventEmitter;
    private cfg;
    private path;
    private known;
    private serial;
    private baud;
    private queue;
    private timer;
    private locks;
    private confirmExec;
    private errorState;
    private keys;
    private values;
    alias: any;
    stateStr: any;
    hasState: any;
    constructor(cfg: Config, ee: EventEmitter, errorState: Function);
    init(): Promise<void>;
    /**
     * Enumerate all connected devices that might be Arduinos
     *
     * @async
     * @returns {Promise} Resolves after enumerating
     **/
    enumerate(): Promise<string[]>;
    /**
     * Send a command to an Arduino using async/await
     *
     * @param  {string}  device 	The Arduino device identifier
     * @param  {string}  cmd 		Single character command to send
     *
     * @async
     * @returns {Promise} Resolves after sending
     **/
    private sendAsync;
    /**
     * Sends a command to the specified Arduino and waits for a response.
     * Handles the communication lock to prevent sending multiple commands simultaneously.
     * Emits an 'arduino_send' event after successfully sending the command.
     *
     * @async
     * @param {string} device - The Arduino device identifier.
     * @param {string} cmd - The command to be sent to the Arduino.
     * @returns {Promise<boolean|string>} Returns 'false' if the communication is locked, otherwise returns the response from the device.
     * @throws {Error} Throws an error if the sendAsync method encounters an error.
     **/
    send(device: string, cmd: string): Promise<number>;
    /**
     * Sends a string to the specified Arduino.
     * Handles different types of devices, including fake devices for testing purposes.
     * Waits for a specified delay before sending the string.
     *
     * @async
     * @param {string} device - The Arduino device identifier.
     * @param {string} str - The string to be sent to the Arduino.
     * @returns {Promise<boolean|string>} Returns 'true' if the string is sent successfully, otherwise returns an error message.
     * @throws {Error} Throws an error if the writeAsync method encounters an error.
     **/
    sendString(device: string, str: string): Promise<number>;
    /**
     *
     **/
    private stateAsync;
    /**
     *
     **/
    state(device: string, confirm?: boolean): Promise<string>;
    /**
     * Send a string to an Arduino using async/await
     *
     * @param  {string}  device 	Arduino identifier
     * @param  {string}  str		String to send
     *
     * @returns {Promise} Resolves after sending
     **/
    private writeAsync;
    /**
     * Handles the end of communication with the Arduino.
     * Calculates the time taken for the communication, executes the callback,
     * and emits an 'arduino_end' event. Handles errors and stray data received.
     *
     * @param {string} serial - The serial address of the Arduino device.
     * @param {string} data - The data received from the Arduino.
     * @returns {any} The time taken for the communication in milliseconds.
     **/
    private end;
    private error;
    /**
     * Associates an alias with an Arduinos serial address.
     * Used to map multi-purpose devices onto the same serial connection.
     *
     * @param {string} device - The serial number of the target Arduino.
     * @param {string} serial - The alias to be associated with the target device.
     **/
    aliasSerial(device: string, serial: string): void;
    /**
     * Connects to an Arduino using its serial number.
     * Sets up the SerialPort instance and path for the device, and handles data communication.
     * Handles opening the connection and emitting 'arduino_end' or 'confirmEnd' events upon receiving data.
     *
     * @async
     * @param {string} device - The device identifier (common name).
     * @param {string} serial - The serial address of the target Arduino (e.g., COM port on Windows).
     * @param {function} confirm - A callback function to be executed upon receiving confirmation data.
     * @returns {Promise<string>} Resolves with the device path if the connection is successful.
     * @throws {Error} Rejects with an error message if the connection fails.
     **/
    connect(device: string, serial: string, confirm: any): Promise<any>;
    /**
     * Handles the confirmation data received from an Arduino.
     * Executes the confirmation callback function if the received data is present in the list of expected values.
     *
     * @param {string} data - The data received from the Arduino.
     **/
    private confirmEnd;
    /**
     * Verifies the connection to an Arduino by sending a connect command.
     * The confirmation callback checks if the received data matches the expected connect command.
     *
     * @async
     * @returns {Promise<boolean>} Resolves with 'true' if the connection is verified successfully.
     * @throws {Error} Rejects with an error message if the connection verification fails.
     **/
    verify(): Promise<unknown>;
    /**
     * Distinguishes the type of Arduino connected.
     * Sends a command to the device to identify its type and resolves the promise with the received type.
     *
     * @async
     * @returns {Promise<string>} Resolves with the type of the connected Arduino-based device.
     * @throws {Error} Rejects with an error message if the distinguish operation fails.
     **/
    distinguish(): Promise<string>;
    /**
     * Closes the connection to an Arduino.
     *
     * @async
     * @returns {Promise<boolean>} Resolves with 'true' if the connection is closed successfully.
     * @throws {Error} Throws an error if the closeArduino method encounters an error.
     **/
    close(): Promise<boolean>;
    /**
     * Establishes a fake connection to an Arduino for testing purposes.
     * Creates a fake SerialPort instance with custom write and string methods.
     *
     * @async
     * @param {string} serial - The device identifier of the fake Arduino.
     * @returns {Promise<boolean>} Resolves with 'true' if the fake connection is established successfully.
     **/
    fakeConnect(device: string): Promise<boolean>;
    /**
     * Connect to an Arduino using async/await
     *
     * @param  {string}  device 	Arduino identifier
     *
     * @returns {Promise} Resolves after opening
     **/
    private openArduino;
    /**
     * Close a connection to an Arduino using async/await
     *
     * @param  {string}  device 	Arduino identifier
     *
     * @returns {Promise} Resolves after closing
     **/
    private closeArduino;
    private lock;
    private unlock;
    private isLocked;
}
