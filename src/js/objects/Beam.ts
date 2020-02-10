import {AxesHelper, Color, ConeGeometry, Group, Mesh, MeshPhongMaterial, Quaternion, Vector3} from "three";
import KeyboardState from "../KeyboardState";

export default class Beam extends Group {
    private readonly colorFirst: Color;
    private readonly colorSecond: Color;
    private readonly material: MeshPhongMaterial;

    private readonly qUp: Quaternion;
    private readonly qDown: Quaternion;
    private readonly qLeft: Quaternion;
    private readonly qRight: Quaternion;

    constructor() {
        const radius = 0.1;
        const height = 1;
        const geometry = new ConeGeometry(radius, height, 16);
        const material = new MeshPhongMaterial();
        const beam = new Mesh(geometry, material);
        beam.position.y = 1.5;
        super();

        beam.add(new AxesHelper());

        this.material = material;
        this.colorFirst = new Color(0x440000);
        this.colorSecond = new Color(0xFF0000);

        this.qUp = new Quaternion().setFromAxisAngle(new Vector3(1,0,0), 0.01);
        this.qDown = new Quaternion().setFromAxisAngle(new Vector3(1,0,0), -0.01);
        this.qLeft = new Quaternion().setFromAxisAngle(new Vector3(0,0,1), 0.01);
        this.qRight = new Quaternion().setFromAxisAngle(new Vector3(0,0,1), -0.01);

        this.add(beam);
    }

    update(keyboard: KeyboardState, _cameraQ: Quaternion) {
        //TODO: rotate related to camera orientation
        if (keyboard.down("s")) {
            this.quaternion.multiplyQuaternions(this.qUp, this.quaternion);
        } else if (keyboard.down("w")) {
            this.quaternion.multiplyQuaternions(this.qDown, this.quaternion);
        }

        if (keyboard.down("a")) {
            this.quaternion.multiplyQuaternions(this.qLeft, this.quaternion);
        } else if (keyboard.down("d")) {
            this.quaternion.multiplyQuaternions(this.qRight, this.quaternion);
        }

        if (keyboard.down(" ")) {
            this.material.color = this.colorSecond;
        } else {
            this.material.color = this.colorFirst;
        }
    }
}
