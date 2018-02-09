import Terrain from "./Map/Terrain";
import Geometries from "./Geometries";

const loadModules = () => {
    require("./Map/Terrain.js");
    require("./Geometries");
}
module.exports = {
    loadModules: loadModules
}