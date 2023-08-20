namespace SpriteKind {
    export const PointerSprite = SpriteKind.create()
    export const Other = SpriteKind.create()
    export const Wistle = SpriteKind.create()
    export const Pikmin = SpriteKind.create()
    export const HUD = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Pikmin)) {
        sprites.setDataBoolean(value, "following", false)
        value.follow(mySprite, 0)
    }
    mySprite2 = sprites.create(assets.image`wistile wave`, SpriteKind.Wistle)
    mySprite2.setPosition(mySprite.x, mySprite.y)
    music.play(music.tonePlayable(523, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
    mySprite2.lifespan = 1000
})
function spawnPikmin (Wild: boolean, Type: number, X: number, Y: number) {
    Pikmin2 = sprites.create([
    assets.image`firePikmin0`,
    assets.image`waterPikmin0`,
    assets.image`elecPikmin0`,
    assets.image`chadPikmin0`,
    assets.image`poisionPikmin0`
    ][Type], SpriteKind.Pikmin)
    sprites.setDataBoolean(Pikmin2, "following", false)
    sprites.setDataBoolean(Pikmin2, "wild", Wild)
    sprites.setDataNumber(Pikmin2, "speed", randint(50.000001, 70.999999))
    sprites.setDataNumber(Pikmin2, "type", Type + 1)
    Pikmin2.setFlag(SpriteFlag.GhostThroughSprites, false)
    sprites.setDataBoolean(Pikmin2, "grabing?", false)
    sprites.setDataNumber(Pikmin2, "Gid", 0)
    Pikmin2.x = X
    Pikmin2.y = Y
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value2 of sprites.allOfKind(SpriteKind.Pikmin)) {
        if (sprites.readDataNumber(value2, "type") == pikminType && sprites.readDataBoolean(value2, "following")) {
            timer.background(function () {
                for (let index = 0; index < 10; index++) {
                    value2.changeScale(0.5, ScaleAnchor.Middle)
                    value2.z += 0.5
                    pause(5)
                }
                for (let index = 0; index < 10; index++) {
                    value2.changeScale(-0.5, ScaleAnchor.Middle)
                    value2.z += -0.5
                    pause(5)
                }
                value2.setScale(1, ScaleAnchor.Middle)
            })
            timer.background(function () {
                sprites.setDataBoolean(value2, "following", false)
                value2.follow(mySprite, 0)
                value2.setVelocity((mySprite.x - value2.x) * 5, (mySprite.y - value2.y) * 5)
                pause(210)
                value2.setVelocity(0, 0)
            })
            break;
        }
    }
})
sprites.onOverlap(SpriteKind.Wistle, SpriteKind.Pikmin, function (sprite, otherSprite) {
    sprites.setDataBoolean(otherSprite, "following", true)
})
sprites.onOverlap(SpriteKind.Pikmin, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.setFlag(SpriteFlag.GhostThroughWalls, false)
})
controller.menu.onEvent(ControllerButtonEvent.Repeated, function () {
    scene.systemMenu.showSystemMenu()
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    pikminType += 1
    if (pikminType == maxPT) {
        pikminType = 0
    }
    Pikmin_HUD.setImage([
    assets.image`noPikmin`,
    assets.image`redPikmin`,
    assets.image`bluePikmin`,
    assets.image`yellowPikmin`,
    assets.image`purplePikmin`,
    assets.image`whitePikmin`
    ][pikminType])
})
function VisonArea (S1: Sprite, S2: Sprite, Range: number) {
    return Math.sqrt(Math.abs((S1.x - S2.x) ** 2 - (S1.y - S2.y) ** 2)) > Range
}
let packColor = 0
let allColor = 0
let allPikmin = 0
let Pikmin2: Sprite = null
let mySprite2: Sprite = null
let maxPT = 0
let pikminType = 0
let Pikmin_HUD: Sprite = null
let mySprite: Sprite = null
tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`homeOverWorld`))
// function Handle_Ship_Moving() {
// if (!(deaded)) {
// if (controller.right.isPressed()) {
// transformSprites.changeRotation(Ship, 5)
// }
// if (controller.left.isPressed()) {
// transformSprites.changeRotation(Ship, -5)
// }
// if (controller.up.isPressed()) {
// Ship_Speed = Math.constrain(Ship_Speed, 10, Max_Ship_Speed)
// Ship_Speed = Ship_Speed + (1 + Ship_Speed * 0.05)
// } else {
// Ship_Speed = Ship_Speed * 0.975
// }
// Ship_Speed = Math.constrain(Ship_Speed, 0, Max_Ship_Speed)
// Ship.vx = Math.sin(transformSprites.getRotation(Ship) * (3.14 / 180)) * Ship_Speed
// Ship.vy = Math.cos(transformSprites.getRotation(Ship) * (3.14 / 180)) * (Ship_Speed * -1)
// }
// }
let Captain = sprites.create(assets.image`player`, SpriteKind.Player)
scene.cameraFollowSprite(Captain)
// function Handle_Ship_Moving() {
// if (!(deaded)) {
// if (controller.right.isPressed()) {
// transformSprites.changeRotation(Ship, 5)
// }
// if (controller.left.isPressed()) {
// transformSprites.changeRotation(Ship, -5)
// }
// if (controller.up.isPressed()) {
// Ship_Speed = Math.constrain(Ship_Speed, 10, Max_Ship_Speed)
// Ship_Speed = Ship_Speed + (1 + Ship_Speed * 0.05)
// } else {
// Ship_Speed = Ship_Speed * 0.975
// }
// Ship_Speed = Math.constrain(Ship_Speed, 0, Max_Ship_Speed)
// Ship.vx = Math.sin(transformSprites.getRotation(Ship) * (3.14 / 180)) * Ship_Speed
// Ship.vy = Math.cos(transformSprites.getRotation(Ship) * (3.14 / 180)) * (Ship_Speed * -1)
// }
// }
mySprite = sprites.create(assets.image`pointer`, SpriteKind.PointerSprite)
Pikmin_HUD = sprites.create(assets.image`noPikmin`, SpriteKind.HUD)
let Player_HUD = sprites.create(assets.image`captionPhoto`, SpriteKind.HUD)
Captain.setPosition(160, 120)
Pikmin_HUD.setFlag(SpriteFlag.RelativeToCamera, true)
Player_HUD.setFlag(SpriteFlag.RelativeToCamera, true)
Player_HUD.setPosition(15, 105)
Player_HUD.z = 9999
Pikmin_HUD.setPosition(100, 105)
Pikmin_HUD.z = 9999
let pikminMeterThing = textsprite.create("x10/10/10", 1, 13)
pikminMeterThing.setFlag(SpriteFlag.RelativeToCamera, true)
pikminMeterThing.setPosition(137, 105)
pikminMeterThing.z = 9999
let hpPlayer = statusbars.create(20, 4, StatusBarKind.Health)
hpPlayer.setFlag(SpriteFlag.RelativeToCamera, true)
hpPlayer.z = 9999
hpPlayer.setPosition(35, 105)
pikminType = 0
maxPT = 6
controller.moveSprite(Captain, 75, 75)
for (let index = 0; index < 20; index++) {
    spawnPikmin(false, 0, 160, 120)
}
for (let index = 0; index < 10; index++) {
    spawnPikmin(false, 1, 160, 120)
}
for (let index = 0; index < 10; index++) {
    spawnPikmin(false, 2, 160, 120)
}
game.onUpdate(function () {
    allPikmin = 0
    allColor = 0
    packColor = 0
    for (let value3 of sprites.allOfKind(SpriteKind.Pikmin)) {
        if (sprites.readDataBoolean(value3, "following")) {
            value3.follow(Captain, sprites.readDataNumber(value3, "speed"))
        }
        allPikmin += 1
        if (sprites.readDataBoolean(value3, "following")) {
            allColor += 1
            if (sprites.readDataNumber(value3, "type") == pikminType) {
                packColor += 1
            }
        }
    }
    pikminMeterThing.setText("x" + packColor + "/" + allColor + "/" + allPikmin)
    for (let value4 of sprites.allOfKind(SpriteKind.Wistle)) {
        value4.setPosition(mySprite.x, mySprite.y)
    }
    if (controller.dx() != 0) {
        if (controller.dx() < 0) {
            mySprite.x = Captain.x + -25
        } else {
            mySprite.x = Captain.x + 25
        }
    } else {
        mySprite.x = Captain.x
    }
    if (controller.dy() != 0) {
        if (controller.dy() < 0) {
            mySprite.y = Captain.y + -25
        } else {
            mySprite.y = Captain.y + 25
        }
    } else {
        mySprite.y = Captain.y
    }
    while (allPikmin == 0) {
        pikminType += 1
        if (pikminType == maxPT) {
            pikminType = 0
        }
        Pikmin_HUD.setImage([
        assets.image`noPikmin`,
        assets.image`redPikmin`,
        assets.image`bluePikmin`,
        assets.image`yellowPikmin`,
        assets.image`purplePikmin`,
        assets.image`whitePikmin`
        ][pikminType])
        allPikmin = 0
        allColor = 0
        packColor = 0
        for (let value5 of sprites.allOfKind(SpriteKind.Pikmin)) {
            if (sprites.readDataBoolean(value5, "following")) {
                value5.follow(Captain, sprites.readDataNumber(value5, "speed"))
            }
            allPikmin += 1
            if (sprites.readDataBoolean(value5, "following")) {
                allColor += 1
                if (sprites.readDataNumber(value5, "type") == pikminType) {
                    packColor += 1
                }
            }
        }
    }
})
