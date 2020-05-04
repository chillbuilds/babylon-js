window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('babylonCanvas')
    var engine = new BABYLON.Engine(canvas, true)

    function createScene() {
        var scene = new BABYLON.Scene(engine)
        scene.clearColor = new BABYLON.Color3.Blue()
        var box = BABYLON.Mesh.CreateBox("Box", 4.0, scene)
        var camera = new BABYLON.ArcRotateCamera("arcCamera1",
            BABYLON.Tools.ToRadians(45),
            BABYLON.Tools.ToRadians(45),
            10.0, box.position, scene)

        camera.setTarget(BABYLON.Vector3.Zero())
        camera.attachControl(canvas, true)

        var light = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(0,15,0),scene)
        light.parent = camera
        light.diffuse = new BABYLON.Color3(.0,.0,.0)

        var material = new BABYLON.StandardMaterial("material", scene)
        material.diffuseTexture = new BABYLON.Texture('https://chillbuilds.com/babylon-js/assets/images/marble.jpg', scene)
        box.material = material

        return scene
    }
    var scene = createScene()
    engine.runRenderLoop(function(){
        // var material = scene.getMeshByName('Box').material
        scene.render()
    })
})
