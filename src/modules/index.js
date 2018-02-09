import Terrain from "./Map/Terrain";
import Geometries from "./Geometries";
import * as THREE from "three";

const loadModules = () => {
    //require("./Map/Terrain.js");
    require("./Geometries")(THREE);
}
module.exports = {
    loadModules: loadModules
}