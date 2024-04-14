let doorOpen = false
let doorAngle = BABYLON.Tools.ToRadians(-90)

window.addEventListener("DOMContentLoaded", function() {
    let canvas = document.getElementById('babylonCanvas')
    let engine = new BABYLON.Engine(canvas, true)

    let repositionToZero = (obj) => {
        obj.scaling = new BABYLON.Vector3(-0.1, 0.1, 0.1)
        obj.rotation.x = BABYLON.Tools.ToRadians(90)
        obj.rotation.z = BABYLON.Tools.ToRadians(180)
        obj.position.y += 10
    }

    let repositionDoor = (obj) => {
        obj.scaling = new BABYLON.Vector3(-0.1, -0.1, -0.1)
        obj.rotation.y = BABYLON.Tools.ToRadians(90)
        obj.position.x += 2.75
        obj.position.y += 6.81
        obj.position.z += 3.85
    }


    function createScene() {
        let scene = new BABYLON.Scene(engine)
        let door, doorGlass;

        let doorAnimations = (obj) => {
            var animationKeys = [];
            animationKeys.push({
                frame: 0,
                value: door.rotation.y
            })
            animationKeys.push({
                frame: 50, // Adjust duration as needed
                value: doorAngle
            })

            // Create animation
            var animation = new BABYLON.Animation(
                "doorAnimation",
                "rotation.y",
                60, // Frames per second
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            )

            // Assign animation keys
            animation.setKeys(animationKeys)

            // Add animation to door
            obj.animations = []
            obj.animations.push(animation)
        }

        let toggleDoor = () => {
            if(doorOpen == false){
                scene.beginAnimation(door, 0, 50, false)
                scene.beginAnimation(doorGlass, 0, 50, false)
                doorOpen = true
            }else{
                scene.beginAnimation(door, 50, 0, false)
                scene.beginAnimation(doorGlass, 50, 0, false)
                doorOpen = false
            }
        }


        scene.createDefaultEnvironment({
            environmentTexture: '../assets/env/environment.env',
            createSkybox: false,
        })

        scene.clearColor = new BABYLON.Color3(0.494, 0.698, 0.882)

        let camera = new BABYLON.ArcRotateCamera("arcCamera1",
            BABYLON.Tools.ToRadians(0),
            BABYLON.Tools.ToRadians(90),
            20.0, new BABYLON.Vector3(0, 6, 0), scene)
        
        camera.attachControl(canvas, true)
        
        let grayValue = 0.2

        let bodyPBR = new BABYLON.PBRMetallicRoughnessMaterial("bodyPBR", scene)
        bodyPBR.baseColor = new BABYLON.Color3(grayValue, grayValue, grayValue)
        bodyPBR.roughness = 0.7

        BABYLON.SceneLoader.ImportMeshAsync('body', '../assets/models/', 'body.obj').then((result)=>{
            let body = result.meshes[0]
            body.material = bodyPBR
            repositionToZero(body)
        })

        BABYLON.SceneLoader.ImportMeshAsync('door', '../assets/models/', 'door.obj').then((result)=>{
            let doorMesh = result.meshes[0]
            doorMesh.material = bodyPBR
            door = doorMesh
            repositionDoor(door)
            doorAnimations(door)
            door.actionManager = new BABYLON.ActionManager(scene)
            door.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                function (evt) {
                    toggleDoor(BABYLON.Tools.ToRadians(-90))
                }
                )
            )
        })

        let tablePBR = new BABYLON.PBRMaterial("woodMaterial", scene)
        tablePBR.albedoTexture = new BABYLON.Texture('../assets/textures/wood/color.jpg', scene)
        tablePBR.albedoTexture.uScale = .1
        tablePBR.albedoTexture.vScale = .1
        tablePBR.albedoTexture.level = 1.5
        tablePBR.microSurfaceTexture = new BABYLON.Texture('../assets/textures/wood/roughness.jpg', scene)
        tablePBR.microSurfaceTexture.uScale = .1
        tablePBR.microSurfaceTexture.vScale = .1
        tablePBR.bumpTexture = new BABYLON.Texture('../assets/textures/wood/normal.png', scene)
        tablePBR.bumpTexture.uScale = .1
        tablePBR.bumpTexture.vScale = .1
        tablePBR.roughness = 0.9
        tablePBR.metallic = 0.0

        BABYLON.SceneLoader.ImportMeshAsync('table', '../assets/models/', 'table.obj').then((result)=>{
            let table = result.meshes[0]
            repositionToZero(table)
            table.material = tablePBR
        })

        BABYLON.SceneLoader.ImportMeshAsync('legs-front', '../assets/models/', 'legs-front.obj').then((result)=>{
            let table = result.meshes[0]
            repositionToZero(table)
            table.material = tablePBR
        })

        BABYLON.SceneLoader.ImportMeshAsync('legs-rear', '../assets/models/', 'legs-rear.obj').then((result)=>{
            let table = result.meshes[0]
            repositionToZero(table)
            table.material = tablePBR
        })

        let rugPBR = new BABYLON.PBRMaterial("rugMaterial", scene)
        rugPBR.albedoTexture = new BABYLON.Texture('../assets/textures/rug/color.jpg', scene)
        rugPBR.albedoTexture.uScale = .05
        rugPBR.albedoTexture.vScale = .05
        rugPBR.albedoTexture.level = 2.5
        rugPBR.microSurfaceTexture = new BABYLON.Texture('../assets/textures/rug/roughness.jpg', scene)
        rugPBR.microSurfaceTexture.uScale = .05
        rugPBR.microSurfaceTexture.vScale = .05
        rugPBR.bumpTexture = new BABYLON.Texture('../assets/textures/rug/normal.png', scene)
        rugPBR.bumpTexture.uScale = .05
        rugPBR.bumpTexture.vScale = .05
        rugPBR.roughness = 1

        BABYLON.SceneLoader.ImportMeshAsync('rug', '../assets/models/', 'rug.obj').then((result)=>{
            let rug = result.meshes[0]
            repositionToZero(rug)
            rug.material = rugPBR
        })
        
        let glassPanelPBR = new BABYLON.PBRMaterial("glassPanelPBR", scene);
        glassPanelPBR.baseColor = new BABYLON.Color3(0.9, 0.9, 0.9); // Light gray base color
        glassPanelPBR.metallic = 0; // Non-metallic material
        glassPanelPBR.roughness = 0.1; // Slightly rough surface
        glassPanelPBR.alpha = 0.2; // Partially transparent
        glassPanelPBR.indexOfRefraction = 1.5; // Refraction index of glass (typical value)
        glassPanelPBR.directIntensity = 0.5; // Intensity of direct lighting
        glassPanelPBR.environmentIntensity = 0.5; // Intensity of environment (reflection) lighting
        glassPanelPBR.cameraExposure = 0.6; // Camera exposure
        glassPanelPBR.cameraContrast = 1.6; // Camera contrast

        BABYLON.SceneLoader.ImportMeshAsync('door-glass', '../assets/models/glass-panels/', 'door-glass.obj').then((result)=>{
            doorGlass = result.meshes[0]
            repositionDoor(doorGlass)
            doorAnimations(doorGlass)
            doorGlass.material = glassPanelPBR

            doorGlass.actionManager = new BABYLON.ActionManager(scene);
            doorGlass.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                function (evt) {
                    // Rotate both models when door is clicked on
                    toggleDoor(BABYLON.Tools.ToRadians(-90)); // Rotate models by 45 degrees (adjust as needed)
                }
                )
            )
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-1', '../assets/models/glass-panels/', 'glass-1.obj').then((result)=>{
            let glassPanel = result.meshes[0]
            glassPanel.material = glassPanelPBR
            repositionToZero(glassPanel)
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-2', '../assets/models/glass-panels/', 'glass-2.obj').then((result)=>{
            let glassPanel = result.meshes[0]
            glassPanel.material = glassPanelPBR
            repositionToZero(glassPanel)
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-3', '../assets/models/glass-panels/', 'glass-3.obj').then((result)=>{
            let glassPanel = result.meshes[0]
            glassPanel.material = glassPanelPBR
            repositionToZero(glassPanel)
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-4', '../assets/models/glass-panels/', 'glass-4.obj').then((result)=>{
            let glassPanel = result.meshes[0]
            glassPanel.material = glassPanelPBR
            repositionToZero(glassPanel)
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-5', '../assets/models/glass-panels/', 'glass-5.obj').then((result)=>{
            let glassPanel = result.meshes[0]
            glassPanel.material = glassPanelPBR
            repositionToZero(glassPanel)
        })
        BABYLON.SceneLoader.ImportMeshAsync('glass-6', '../assets/models/glass-panels/', 'glass-6.obj').then((result)=>{
            let glassPanel = result.meshes[0]
            glassPanel.material = glassPanelPBR
            repositionToZero(glassPanel)
        })

        return scene
    }

    let scene = createScene()

    engine.runRenderLoop(function(){
        scene.render()
    })
})