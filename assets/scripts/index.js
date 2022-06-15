window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('babylonCanvas')
    var engine = new BABYLON.Engine(canvas, true)

    function createScene() {
        var scene = new BABYLON.Scene(engine)

        scene.createDefaultEnvironment({
            environtmentTexture: '../images/environmentSpecular.env'
        })

        scene.clearColor = new BABYLON.Color3.Blue()
        var box = BABYLON.Mesh.CreateBox("Box", 4.0, scene)
        var camera = new BABYLON.ArcRotateCamera("arcCamera1",
            BABYLON.Tools.ToRadians(45),
            BABYLON.Tools.ToRadians(45),
            10.0, box.position, scene)

        camera.setTarget(BABYLON.Vector3.Zero())
        camera.attachControl(canvas, true)

        // var material = new BABYLON.StandardMaterial("material", scene)
        var pbr = new BABYLON.PBRSpecularGlossinessMaterial('pbr', scene)
        // material.ambientColor = new BABYLON.Color3(1,1,1)
        // material.diffuseTexture = new BABYLON.Texture('https://chillbuilds.com/babylon-js/assets/images/marble.jpg', scene)
        // box.material = material
        box.material = pbr

        return scene
    }
    var scene = createScene()
    engine.runRenderLoop(function(){
        scene.render()
    })
})
