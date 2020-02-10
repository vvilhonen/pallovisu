import {BoxGeometry, Euler, InstancedMesh, Matrix4, MeshPhongMaterial, Quaternion, Vector3} from "three";

export default class HumanMeat extends InstancedMesh {
    constructor() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshPhongMaterial({color: 0x00FF00});
        const count = 1000;
        super(geometry, material, count);

        const matrix = new Matrix4();
        const pos = new Vector3();
        const rot = new Euler();
        const quat = new Quaternion();
        const scale = new Vector3(0.03, 0.03, 0.03);
        const sideLength = 1.0;

        for (let i = 0; i < count; i++) {
            pos.x = Math.random() * sideLength - sideLength/2;
            pos.y = Math.random() * sideLength - sideLength/2;
            pos.z = Math.random() * sideLength - sideLength/2;

            rot.y = Math.random() * Math.PI;
            rot.x = Math.random() * Math.PI;
            rot.z = Math.random() * Math.PI;

            quat.setFromEuler(rot);

            matrix.compose(pos, quat, scale);
            this.setMatrixAt(i, matrix);
        }
    }

    update() {
        this.rotation.y += 0.01;
    }
}
