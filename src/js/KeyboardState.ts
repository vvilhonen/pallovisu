export default class KeyboardState {
    private readonly state: {[key: string]: boolean};

    constructor() {
        document.addEventListener("keydown", this.keyDown.bind(this), false);
        document.addEventListener("keyup", this.keyUp.bind(this), false);
        this.state = {};
    }

    private keyDown(event: KeyboardEvent) {
        this.state[event.key] = true
    }

    private keyUp(event: KeyboardEvent) {
        this.state[event.key] = false
    }

    down(key) {
        return this.state[key];
    }
}