'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path ="jquery.d.ts"/> 
const mscript_1 = __importDefault(require("mscript"));
/******
    Mscript GUI
*******/
class MscriptGUI {
    constructor() {
        this.editor = {};
        this.data = {};
        this.raw = '';
    }
    /**
     * Initializes the mscript GUI. Sets up CodeMirror instance,
     * binds events and sets height of editor.
     **/
    init() {
        const startingScript = `CF 1
PF 1`;
        const editorHeight = $(window).height() - $('footer').eq(0).height() - 30;
        const editorElem = document.getElementById('editor');
        const editorConfig = {
            lineNumbers: true,
            mode: 'python',
            matchBrackets: true,
            theme: 'monokai'
        };
        $('#editor').val(startingScript);
        this.editor = CodeMirror.fromTextArea(editorElem, editorConfig);
        this.editor.setSize(null, editorHeight);
        this.editor.on('change', (e) => { });
        $(document).on('resize', function (e) {
            this.editor.setSize(null, editorHeight);
        }.bind(this));
    }
    /**
     * Callback for when open event occurs.
     **/
    open() {
        //recalcuate in case resize has occurred needed
        const editorHeight = $(window).height() - $('footer').eq(0).height() - 30;
        this.editor.setSize(null, editorHeight);
        this.editor.refresh();
    }
    /**
     * Create script from the sequencer's current state.
     * Previous comment: ehhhh
     * TODO: Make this smarter.
     **/
    fromSequence() {
        let str;
        let tmp = [];
        let cont;
        let cmd;
        //str = seq.grid.map(step => { return step.cmd }).join('\n'); //quick hack
        //console.dir(seq.grid);
        for (let step of seq.grid) {
            if (!step || !step.cmd) {
                continue;
            }
            cmd = step.cmd;
            if (tmp.length > 0 && tmp[tmp.length - 1].cmd === cmd) {
                tmp[tmp.length - 1].num++;
                continue;
            }
            tmp.push({ cmd, num: 1 });
        }
        tmp = tmp.map(line => {
            return `${line.cmd} ${line.num}`;
        });
        if (seq.gridLoops > 1) {
            tmp.map(line => {
                return `	${line}`;
            });
            tmp.reverse();
            tmp.push(`LOOP ${seq.gridLoops}`);
            tmp.reverse();
            tmp.push('END');
        }
        str = tmp.join('\n');
        nav.change('script');
        cont = confirm(`Are you sure you want to over-write the current sequence?`);
        if (cont) {
            this.editor.getDoc().setValue(str);
        }
    }
    /**
     * Take current compiled mscript state and send it to the sequencer
     * GUI. TODO: Add confirm step if sequence is longer than X steps.
     * TODO: Make this smarter (detect outer non-fade loop and assign to loop counter)
     **/
    toGUI() {
        let c;
        let step;
        for (let x = 0; x < this.data.arr.length; x++) {
            c = this.data.arr[x];
            seq.set(x, c);
            if (c === 'CF' || c === 'CB') {
                if (typeof this.data.meta[x] !== 'undefined' && this.data.meta[x] !== '') {
                    seq.setLight(x, this.data.meta[x]);
                }
                else {
                    seq.setLight(x, light.color);
                }
            }
            else {
                //unset light?
            }
            grid.state(x);
        }
    }
    /**
     * Handles compilation of mscript and switches to sequencer
     * GUI after confirmation questions.
     **/
    toSequence() {
        const data = this.editor.getValue();
        let cont = false;
        if (data !== this.raw) {
            cont = confirm(`Current script has not been compiled. Compile first?`);
            if (cont) {
                this.compile();
            }
        }
        mse.console.print(`Sending compiled script to GUI sequencer...`);
        seq.clear();
        this.toGUI();
        grid.refresh();
        seq.stats();
        return nav.change('sequencer');
    }
    /**
     * Compiles text in editor using the Mscript library.
     *
     **/
    compile() {
        const data = this.editor.getValue();
        const mscript = new mscript_1.default();
        let output = null;
        try {
            output = mscript.interpret(data);
            this.raw = '';
        }
        catch (err) {
            mse.console.print(err.toString());
            return;
        }
        const len = output.arr.length;
        const cam2 = typeof output.cam2 !== 'undefined' ? `, CAM2 : ${output.cam2}` : '';
        const proj2 = typeof output.proj2 !== 'undefined' ? `, PROJ2 : ${output.proj2}` : '';
        const report = `Sequence contains ${len} step${(len === 1 ? '' : 's')}, CAM: ${output.cam}, PROJ: ${output.proj}${cam2}${proj2}`;
        this.raw = data;
        this.data = output;
        //mse.console.print(JSON.stringify(output, null, '\t') + '\n')
        mse.console.print(report);
    }
    /**
     * This function re-writes the optional "meta" attribute
     * of an mcopy command object to "light". TODO: change this.
     * Do not re-write this object and improve the consumers
     * of the compiled data.
     **/
    prepare() {
        const arr = [];
        let obj;
        for (let i = 0; i < this.data.arr.length; i++) {
            obj = {
                cmd: this.data.arr[i]
            };
            if (typeof this.data.meta[i] !== 'undefined' && this.data.meta[i] !== '') {
                obj.light = this.data.meta[i];
            }
            else {
                obj.light = light.color.join(',');
            }
            arr.push(obj);
        }
        return arr;
    }
    /**
     * Method which compiles script if needs and then runs as a sequence.
     **/
    run() {
        const data = this.editor.getValue();
        let arr;
        let cont = false;
        if (data !== this.raw) {
            cont = confirm(`Current script has not been compiled. Compile first?`);
            if (cont) {
                this.compile();
            }
        }
        arr = this.prepare();
        mse.console.print(`Started running compiled sequence...`);
        gui.overlay(true);
        gui.spinner(true, `Running mscript sequence...`, true, true);
        return seq.exec(arr, 1);
    }
}
/*******
 *   Mscript GUI Console
 *******/
class MscriptConsole {
    /**
     * Initializes the console by creating the element
     * containing the output text and binding to
     * keyup event.
     **/
    init() {
        this.elem = $('#console textarea');
        this.elem.on('keyup', function (e) {
            var code = e.keyCode || e.which;
            if (code === 13) {
                this.exec();
                e.preventDefault();
                return false;
            }
        }.bind(this));
    }
    /**
     * Parse the current state of the console and get the last
     * line to add to the current state array.
     **/
    parse() {
        const lines = (this.elem.val() + '').split('\n');
        const line = lines[lines.length - 2].replace('>', '').trim();
        this.lines.push(line);
    }
    /**
     * Executes the command in the last line of the console.
     * TODO: implement the remaining commands. Currently only camera
     * forward and backward will be executed.
     **/
    exec() {
        let command;
        this.parse();
        command = this.lines[this.lines.length - 1].replace('>', '').trim();
        log.info(command);
        this.newLine();
        if (mscript.cmd.indexOf(command) !== -1) {
            if (command === 'CF') {
                cmd.camera_forward(light.color);
            }
            else if (cmd === 'CB') {
                cmd.camera_backward(light.color);
            }
        }
        if (command === 'compile') {
            mse.mscript.compile();
        }
        else if (command === 'run') {
            mse.mscript.run();
        }
    }
    /**
     * Adds a new line to the console after an event
     * and re-establishes the height of the array. Animates
     * the console to scroll down to last line.
     **/
    newLine() {
        let current = (this.elem.val() + '');
        let height;
        current += '> ';
        this.elem.val(current);
        height = this.elem[0].scrollHeight;
        this.elem.animate({
            scrollTop: height
        }, 'normal');
    }
    /**
     * Print string to the console and add new line
     **/
    print(str) {
        let current = (this.elem.val() + '');
        let height;
        current += str;
        current += '\n';
        mse.console.elem.val(current);
        mse.console.elem.focus();
        this.newLine();
    }
}
const mse = {
    mscript: new MscriptGUI(),
    console: new MscriptConsole()
};
module.exports = mse;
//# sourceMappingURL=mscript.js.map