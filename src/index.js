import CubeView from "./components/cubeview";
import Container3d from "./components/container-3d";

const modules = require('./modules');

module.exports = {
    CubeView,
    Container3d,
    revizModules: modules.loadModules
}