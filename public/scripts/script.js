window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('babylonCanvas')
    var engine = new BABYLON.Engine(canvas, true)

    let repositionToZero = (obj) => {
        obj.scaling = new BABYLON.Vector3(-0.1, 0.1, 0.1)
        obj.rotation.x = BABYLON.Tools.ToRadians(90)
        obj.rotation.z = BABYLON.Tools.ToRadians(180)
        obj.position.y += 10
    }

    function createScene() {
        var scene = new BABYLON.Scene(engine)

        scene.createDefaultEnvironment({
            environmentTexture: '../assets/env/environment.env',
            createSkybox: false,
        })

        scene.clearColor = new BABYLON.Color3(0.494, 0.698, 0.882)

        var camera = new BABYLON.ArcRotateCamera("arcCamera1",
            BABYLON.Tools.ToRadians(0),
            BABYLON.Tools.ToRadians(90),
            20.0, new BABYLON.Vector3(0, 6, 0), scene)
        
        camera.attachControl(canvas, true)
        
        let grayValue = 0.2

        var bodyPBR = new BABYLON.PBRMetallicRoughnessMaterial("bodyPBR", scene)
        bodyPBR.baseColor = new BABYLON.Color3(grayValue, grayValue, grayValue)
        bodyPBR.roughness = 0.7

        BABYLON.SceneLoader.ImportMeshAsync('body', '../assets/models/', 'body.obj').then((result)=>{
            let body = result.meshes[0]
            repositionToZero(body)
            body.material = bodyPBR

            // let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(body.position.x, body.position.y-20, body.position.z+50), scene)
        })

        BABYLON.SceneLoader.ImportMeshAsync('door', '../assets/models/', 'door.obj').then((result)=>{
            let door = result.meshes[0]
            repositionToZero(door)
            door.material = bodyPBR
        })

        let tablePBR = new BABYLON.PBRMaterial("woodMaterial", scene)
        tablePBR.albedoTexture = new BABYLON.Texture('../assets/textures/wood/color.jpg', scene)
        tablePBR.albedoTexture.uScale = .2
        tablePBR.albedoTexture.vScale = .2
        tablePBR.albedoTexture.level = 1.5
        tablePBR.microSurfaceTexture = new BABYLON.Texture('../assets/textures/wood/roughness.jpg', scene)
        tablePBR.microSurfaceTexture.uScale = .2
        tablePBR.microSurfaceTexture.vScale = .2
        tablePBR.bumpTexture = new BABYLON.Texture('../assets/textures/wood/normal.png', scene)
        tablePBR.bumpTexture.uScale = .2
        tablePBR.bumpTexture.vScale = .2
        tablePBR.roughness = 0.9
        tablePBR.metallic = 0.0

        BABYLON.SceneLoader.ImportMeshAsync('table', '../assets/models/', 'table.obj').then((result)=>{
            let table = result.meshes[0]
            repositionToZero(table)
            table.material = tablePBR
        })

        let doorGlassPBR = new BABYLON.PBRMaterial("doorGlassPBR", scene);
        doorGlassPBR.baseColor = new BABYLON.Color3(0.9, 0.9, 0.9); // Light gray base color
        doorGlassPBR.metallic = 0; // Non-metallic material
        doorGlassPBR.roughness = 0.1; // Slightly rough surface
        doorGlassPBR.alpha = 0.2; // Partially transparent
        doorGlassPBR.indexOfRefraction = 1.5; // Refraction index of glass (typical value)
        doorGlassPBR.directIntensity = 0.5; // Intensity of direct lighting
        doorGlassPBR.environmentIntensity = 0.5; // Intensity of environment (reflection) lighting
        doorGlassPBR.cameraExposure = 0.6; // Camera exposure
        doorGlassPBR.cameraContrast = 1.6; // Camera contrast

        BABYLON.SceneLoader.ImportMeshAsync('door-glass', '../assets/models/glass-panels/', 'door-glass.obj').then((result)=>{
            let doorGlass = result.meshes[0]
            repositionToZero(doorGlass)
            doorGlass.material = doorGlassPBR
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-1', '../assets/models/glass-panels/', 'glass-1.obj').then((result)=>{
            let doorGlass = result.meshes[0]
            repositionToZero(doorGlass)
            doorGlass.material = doorGlassPBR
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-2', '../assets/models/glass-panels/', 'glass-2.obj').then((result)=>{
            let doorGlass = result.meshes[0]
            repositionToZero(doorGlass)
            doorGlass.material = doorGlassPBR
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-3', '../assets/models/glass-panels/', 'glass-3.obj').then((result)=>{
            let doorGlass = result.meshes[0]
            repositionToZero(doorGlass)
            doorGlass.material = doorGlassPBR
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-4', '../assets/models/glass-panels/', 'glass-4.obj').then((result)=>{
            let doorGlass = result.meshes[0]
            repositionToZero(doorGlass)
            doorGlass.material = doorGlassPBR
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-5', '../assets/models/glass-panels/', 'glass-5.obj').then((result)=>{
            let doorGlass = result.meshes[0]
            repositionToZero(doorGlass)
            doorGlass.material = doorGlassPBR
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-6', '../assets/models/glass-panels/', 'glass-6.obj').then((result)=>{
            let doorGlass = result.meshes[0]
            repositionToZero(doorGlass)
            doorGlass.material = doorGlassPBR
        })

        // console.log(scene)

        return scene
    }

    var scene = createScene()

    engine.runRenderLoop(function(){
        scene.render()
    })
})