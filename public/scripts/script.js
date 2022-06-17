window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('babylonCanvas')
    var engine = new BABYLON.Engine(canvas, true)

    function createScene() {
        var scene = new BABYLON.Scene(engine)

        // scene.createDefaultEnvironment({
        //     environmentTexture: '../assets/env/environment.env',
        //     createSkybox: false,
        //     setMainColor: new BABYLON.Color3.White()
        // })
        // scene.setMainColor = new BABYLON.Color3.White()

        // scene.environmentTexture = '../assets/env/small-studio-2k.env'

        scene.clearColor = new BABYLON.Color3(1, 1, 1)
        var box = BABYLON.Mesh.CreateBox("Box", 4, scene)
        box.position.y = 5
        var camera = new BABYLON.ArcRotateCamera("arcCamera1",
            BABYLON.Tools.ToRadians(45),
            BABYLON.Tools.ToRadians(45),
            10.0, new BABYLON.Vector3.Zero(), scene)
        
        camera.setTarget(box.position)
        camera.attachControl(canvas, true)

        var pbr = new BABYLON.PBRMetallicRoughnessMaterial('pbr', scene)
        pbr.diffuseColor = new BABYLON.Color3.White()
        pbr.specularColor = new BABYLON.Color3.White()
        pbr.metallic = 0.2
        pbr.roughness = 0.2
        pbr.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData('../assets/env/environmentSpecular.env', scene);
        // pbr.environmentTexture = '../assets/env/environment.env'
        // pbr.baseTexture = new BABYLON.Texture('../assets/images/marble.jpg')

        var pl1 = new BABYLON.PointLight('pl1', new BABYLON.Vector3(box.position.x, box.position.y-20, box.position.z+50), scene)
        pl1.parent = camera
        pl1.intensity = 100
        // pl1.diffuse = new BABYLON.Color3(1,1,1)
        var pl2 = new BABYLON.PointLight('pl1', new BABYLON.Vector3(box.position.x, box.position.y-20, box.position.z-50), scene)
        pl2.parent = camera
        pl2.intensity = 100
        
        BABYLON.SceneLoader.ImportMeshAsync('mug', '../assets/models/', 'mug.obj').then((result)=>{
            var mug = result.meshes[0]
            mug.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1)
            mug.rotation.x = BABYLON.Tools.ToRadians(-90)
            mug.material = pbr
            mug.material.diffuseColor = new BABYLON.Color3.White()
            camera.position = new BABYLON.Vector3(mug.position.x+20, mug.position.y+15, mug.position.z)
        })
        BABYLON.SceneLoader.ImportMeshAsync('handle', '../assets/models/', 'handle.obj').then((result)=>{
            var handle = result.meshes[0]
            handle.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1)
            handle.rotation.x = BABYLON.Tools.ToRadians(-90)
            handle.material = pbr
        })

        console.log(scene)

        return scene
    }

    var scene = createScene()

    engine.runRenderLoop(function(){
        scene.render()
    })
})