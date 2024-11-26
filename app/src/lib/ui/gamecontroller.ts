let gamecontroller : GameController;

class GameController {
  private seq : Sequence;
  private cmd : any;
  private cam : any;
  private proj : any;
  private pressed : boolean[];

  private cameraMoving : boolean = false;
  private projectorMoving : boolean = false;

  constructor () {

  }

  public init (seq : Sequence, cmd : any, cam : any, proj : any) {
    this.seq = seq;
    this.cmd = cmd;
    this.cam = cam;
    this.proj = proj;

    window.addEventListener('gamepadconnected', (e) => {
      const gamepads = navigator.getGamepads();
      if (gamepads.length > 0) {
        console.dir(gamepads[0]);
        this.pressed = gamepads[0].buttons.map((button: GamepadButton) => { return button.pressed; });
        if (gamepads[0].id.indexOf("USB Gamepad") !== -1 && gamepads[0].buttons.length === 10) {
          gui.notify('GAMEPAD CONNECTED', 'NES Controller');
        } else {
          gui.notify('GAMEPAD CONNECTED', 'Unknown');
        }
      }
      this.handleController();
    });

    window.addEventListener('gamepaddisconnected', (e) => {
      gui.notify('GAMEPAD DISCONNECTED', '');
    });
  }

  handleController () {
    const gamepads = navigator.getGamepads();

    if (gamepads.length === 0) {
      return;
    } 

    const gamepad : Gamepad = gamepads[0];
    if (gamepad.id.indexOf("USB Gamepad") !== -1 && gamepad.buttons.length === 10) {
      this.handleNESController(gamepad);
    }

    requestAnimationFrame(this.handleController.bind(this));
  }

  handleNESController (gamepad : Gamepad) {
      const leftStickX : number = gamepad.axes[0];
      const leftStickY : number = gamepad.axes[1];
      //log.info(leftStickX + ',' + leftStickY)
      //select == 8
      //start == 9
      //A == 2
      //B == 1
      for (let i = 0; i < gamepad.buttons.length; i++) {
        if (gamepad.buttons[i].pressed && !this.pressed[i]) {
          log.info(`Button[${i}] pressed`);
          if (i === 2) {
            if (!this.cameraMoving) this.camera();
          } else if (i === 1) {
            if (!this.projectorMoving) this.projector();
          } else if (i == 9) {
            this.sequence();
          }
        }
      }

      this.pressed = gamepad.buttons.map((button: GamepadButton) => { return button.pressed; });

      this.cameraDirection(leftStickX);
      this.projectorDirection(leftStickY);
  }

  async camera (silent : boolean = false) {
    const dir : string = this.cam.dir ? 'camera_forward' : 'camera_backward';
    if (!silent) log.info(`Gamepad A ${dir}`);
    this.cameraMoving = true;
    await this.cam.moveAsync();
    this.cameraMoving = false;
  }

  async projector (silent : boolean = false) {
    const dir : string = this.cam.dir ? 'projector_forward' : 'projector_backward';
    if (!silent) log.info(`Gamepad B ${dir}`);
    this.projectorMoving = true;
    await this.proj.moveAsync();
    this.projectorMoving = false;
  }

  async cameraDirection (dir: number) {
    if (dir !== 0 && this.cameraMoving) {
      log.info('Camera D-PAD blocked')
      return;
    }
    if (dir === 1) {
      log.info('Gamepad D-pad camera_forward');
      if (!this.cam.dir) {
        this.cameraMoving = true;
        await this.proj.setAsync(true);
      }
      await this.camera(true);
    } else if (dir === -1) {
      log.info('Gamepad D-pad camera_backward');
      if (this.cam.dir) {
        this.cameraMoving = true;
        await this.cam.setAsync(true);
      }
      await this.camera(true);
    }
  }

  async projectorDirection (dir : number) {
    if (dir !== 0 && this.projectorMoving) {
      log.info('Projector D-PAD blocked')
      return;
    }
    if (dir === -1) {
      log.info('Gamepad D-pad projector_forward');
      if (!this.proj.dir) {
        this.projectorMoving = true;
        await this.proj.setAsync(true);
      }
      await this.projector(true);
    } else if (dir === 1) {
      log.info('Gamepad D-pad projector_backward');
      if (this.proj.dir) {
        this.projectorMoving = true;
        await this.proj.setAsync(false);
      }
      await this.projector(true);
    }
  }

  async sequence () {
    if (!this.seq.isRunning()) {
      this.seq.start();
    } else {
      this.seq.cancel();
    }
  }
}


gamecontroller = new GameController();
module.exports = gamecontroller;