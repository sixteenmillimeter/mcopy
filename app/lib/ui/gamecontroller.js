var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let gamecontroller;
class GameController {
    constructor() {
        this.cameraMoving = false;
        this.projectorMoving = false;
    }
    init(seq, cmd, cam, proj) {
        this.seq = seq;
        this.cmd = cmd;
        this.cam = cam;
        this.proj = proj;
        window.addEventListener('gamepadconnected', (e) => {
            const gamepads = navigator.getGamepads();
            if (gamepads.length > 0) {
                console.dir(gamepads[0]);
                this.pressed = gamepads[0].buttons.map((button) => { return button.pressed; });
                if (gamepads[0].id.indexOf("USB Gamepad") !== -1 && gamepads[0].buttons.length === 10) {
                    gui.notify('GAMEPAD CONNECTED', 'NES Controller');
                }
                else {
                    gui.notify('GAMEPAD CONNECTED', 'Unknown');
                }
            }
            this.handleController();
        });
        window.addEventListener('gamepaddisconnected', (e) => {
            gui.notify('GAMEPAD DISCONNECTED', '');
        });
    }
    handleController() {
        const gamepads = navigator.getGamepads();
        if (gamepads.length === 0) {
            return;
        }
        const gamepad = gamepads[0];
        if (gamepad.id.indexOf("USB Gamepad") !== -1 && gamepad.buttons.length === 10) {
            this.handleNESController(gamepad);
        }
        requestAnimationFrame(this.handleController.bind(this));
    }
    handleNESController(gamepad) {
        const leftStickX = gamepad.axes[0];
        const leftStickY = gamepad.axes[1];
        //log.info(leftStickX + ',' + leftStickY)
        //select == 8
        //start == 9
        //A == 2
        //B == 1
        for (let i = 0; i < gamepad.buttons.length; i++) {
            if (gamepad.buttons[i].pressed && !this.pressed[i]) {
                log.info(`Button[${i}] pressed`);
                if (i === 2) {
                    if (!this.cameraMoving)
                        this.camera();
                }
                else if (i === 1) {
                    if (!this.projectorMoving)
                        this.projector();
                }
                else if (i == 9) {
                    this.sequence();
                }
            }
        }
        this.pressed = gamepad.buttons.map((button) => { return button.pressed; });
        this.cameraDirection(leftStickX);
        this.projectorDirection(leftStickY);
    }
    camera(silent = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = this.cam.dir ? 'camera_forward' : 'camera_backward';
            if (!silent)
                log.info(`Gamepad A ${dir}`);
            this.cameraMoving = true;
            yield this.cam.moveAsync();
            this.cameraMoving = false;
        });
    }
    projector(silent = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = this.cam.dir ? 'projector_forward' : 'projector_backward';
            if (!silent)
                log.info(`Gamepad B ${dir}`);
            this.projectorMoving = true;
            yield this.proj.moveAsync();
            this.projectorMoving = false;
        });
    }
    cameraDirection(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dir !== 0 && this.cameraMoving) {
                log.info('Camera D-PAD blocked');
                return;
            }
            if (dir === 1) {
                log.info('Gamepad D-pad camera_forward');
                if (!this.cam.dir) {
                    this.cameraMoving = true;
                    yield this.proj.setAsync(true);
                }
                yield this.camera(true);
            }
            else if (dir === -1) {
                log.info('Gamepad D-pad camera_backward');
                if (this.cam.dir) {
                    this.cameraMoving = true;
                    yield this.cam.setAsync(true);
                }
                yield this.camera(true);
            }
        });
    }
    projectorDirection(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dir !== 0 && this.projectorMoving) {
                log.info('Projector D-PAD blocked');
                return;
            }
            if (dir === -1) {
                log.info('Gamepad D-pad projector_forward');
                if (!this.proj.dir) {
                    this.projectorMoving = true;
                    yield this.proj.setAsync(true);
                }
                yield this.projector(true);
            }
            else if (dir === 1) {
                log.info('Gamepad D-pad projector_backward');
                if (this.proj.dir) {
                    this.projectorMoving = true;
                    yield this.proj.setAsync(false);
                }
                yield this.projector(true);
            }
        });
    }
    sequence() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.seq.isRunning()) {
                this.seq.start();
            }
            else {
                this.seq.cancel();
            }
        });
    }
}
gamecontroller = new GameController();
module.exports = gamecontroller;
//# sourceMappingURL=gamecontroller.js.map