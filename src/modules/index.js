const loadModules = (THREE) => {
    //require("./Map/Terrain.js");
    require("./Geometries")(THREE);
}

module.exports = {
    loadModules: loadModules
}