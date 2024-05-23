import type { Projector } from 'proj';
import type { Camera } from 'cam';
import type { Light } from 'light';
import type { Capper } from 'capper';
import type { Alert } from 'alert';
export declare class Commands {
    proj: Projector;
    cam: Camera;
    light: Light;
    cam2: Camera;
    proj2: Projector;
    capper: Capper;
    alertObj: Alert;
    private cfg;
    private ipc;
    /**
     * @constructor
     * Assign all connected devices and mock devices as private classes.
     *
     * @param {object} cfg Configuration object
     * @param {object} proj Projector 1
     * @param {object} cam  Camera 1
     * @param {object} light Light source
     * @param {object} alert Alert object
     * @param {object} cam2 (optional) Camera 2
     * @param {object} proj2 (optional) Projector 2
     * @param {object} capper Capper object
     *
     **/
    constructor(cfg: any, proj: Projector, cam: any, light: Light, alert: Alert, cam2?: any, proj2?: Projector, capper?: any);
    /**
     * Move the projector one frame forward
     *
     * @returns {integer} Length of action in ms
     **/
    projector_forward(): Promise<number>;
    /**
     * Move the projector one frame backward
     *
     * @returns {integer} Length of action in ms
     **/
    projector_backward(): Promise<number>;
    /**
     * Move the camera one frame forward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    camera_forward(): Promise<number>;
    /**
     * Move the camera one frame forward with light off
     *
     * @returns {integer} Length of action in ms
     **/
    black_forward(): Promise<number>;
    /**
     * Move the camera one frame backward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    camera_backward(): Promise<number>;
    /**
     * Move the camera one frame forward, light set to black or off
     *
     * @returns {integer} Length of action in ms
     **/
    black_backward(): Promise<number>;
    /**
     * Move the second camera one frame forward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    camera_second_forward(): Promise<number>;
    /**
     * Move the second camera one frame backward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    camera_second_backward(): Promise<number>;
    /**
     * Move the both cameras one frame forward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    cameras_forward(): Promise<number>;
    /**
     * Move the both cameras one frame backward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    cameras_backward(): Promise<number>;
    /**
     * Move first camera one frame forward and rewind secondary camera one frame backward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    camera_forward_camera_second_backward(): Promise<number>;
    /**
     * Rewind first camera one frame backward and move secondary camera one frame forward
     *
     * @param {object} 	 cmd 	   Full cmd object
     *
     * @returns {integer} Length of action in ms
     **/
    camera_backward_camera_second_forward(): Promise<number>;
    /**
     * Move the secondary projector forward one frame
     *
     * @returns {integer} Length of action in ms
     **/
    projector_second_forward(): Promise<number>;
    /**
     * Rewind the secondary projector backward one frame
     *
     * @returns {integer} Length of action in ms
     **/
    projector_second_backward(): Promise<number>;
    /**
     * Move the both projectors forward one frame
     *
     * @returns {integer} Length of action in ms
     **/
    projectors_forward(): Promise<number>;
    /**
     * Rewind both projectors backwards one frame
     *
     * @returns {integer} Length of action in ms
     **/
    projectors_backward(): Promise<number>;
    /**
     * Move the primary projector forward one frame and rewind the secondary projector
     * one frame backwards.
     *
     * @returns {integer} Length of action in ms
     **/
    projector_forward_projector_second_backward(): Promise<number>;
    /**
     * Rewind the primary projector backwards one frame and move the secondary
     * projector forward one frame.
     *
     * @returns {integer} Length of action in ms
     **/
    projector_backward_projector_second_forward(): Promise<number>;
    /**
     * Throws an alert to pause a sequence
     *
     * @returns {integer} Length of action in ms
     **/
    alert(cmd: any): Promise<number>;
    /**
     * Pauses a sequence for a length of time
     *
     * @returns {integer} Length of action in ms
     **/
    pause(cmd: any): Promise<number>;
    /**
     * Sets the camera exposure (if supported).
     *
     **/
    camera_exposure(cmd: any): Promise<number>;
}
