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
    Pikmin = sprites.create([
    assets.image`firePikmin0`,
    assets.image`waterPikmin0`,
    assets.image`elecPikmin0`,
    assets.image`chadPikmin0`,
    assets.image`poisionPikmin0`
    ][Type], SpriteKind.Pikmin)
    sprites.setDataBoolean(Pikmin, "following", false)
    sprites.setDataBoolean(Pikmin, "wild", Wild)
    sprites.setDataNumber(Pikmin, "speed", randint(50.000001, 70.999999))
    sprites.setDataNumber(Pikmin, "type", Type + 1)
    Pikmin.setFlag(SpriteFlag.GhostThroughSprites, false)
    sprites.setDataBoolean(Pikmin, "grabing?", false)
    sprites.setDataNumber(Pikmin, "Gid", 0)
    Pikmin.x = X
    Pikmin.y = Y
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Pikmin)) {
        if (sprites.readDataNumber(value, "type") == pikminType && sprites.readDataBoolean(value, "following")) {
            timer.background(function () {
                for (let index = 0; index < 21; index++) {
                    value.changeScale(0.5, ScaleAnchor.Middle)
                    value.z += 0.5
                    pause(5)
                }
                for (let index = 0; index < 21; index++) {
                    value.changeScale(-0.5, ScaleAnchor.Middle)
                    value.z += -0.5
                    pause(5)
                }
                value.setScale(1, ScaleAnchor.Middle)
            })
            timer.background(function () {
                sprites.setDataBoolean(value, "following", false)
                value.follow(mySprite, 0)
                value.setVelocity((mySprite.x - value.x) * 5, (mySprite.y - value.y) * 5)
                pause(210)
                value.setVelocity(0, 0)
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
let Pikmin: Sprite = null
let mySprite2: Sprite = null
let maxPT = 0
let pikminType = 0
let Pikmin_HUD: Sprite = null
let mySprite: Sprite = null
let allPikmin = 0
let allColor = 0
let packColor = 0
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
let pikminMeterThing = textsprite.create("0/0/0", 1, 13)
pikminMeterThing.setFlag(SpriteFlag.RelativeToCamera, true)
pikminMeterThing.setPosition(132, 105)
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
for (let index = 0; index < 5; index++) {
    spawnPikmin(false, 1, 160, 120)
}
for (let index = 0; index < 5; index++) {
    spawnPikmin(false, 2, 160, 120)
}
game.onUpdate(function () {
    allPikmin = 0
    allColor = 0
    packColor = 0
    for (let value of sprites.allOfKind(SpriteKind.Pikmin)) {
        if (sprites.readDataBoolean(value, "following")) {
            value.follow(mySprite, sprites.readDataNumber(value, "speed"))
        }
        allPikmin += 1
        if (sprites.readDataBoolean(value, "following")) {
            allColor += 1
            if (sprites.readDataNumber(value, "type") == pikminType) {
                packColor += 1
            }
        }
    }
    pikminMeterThing.setText("" + packColor + "/" + allColor + "/" + allPikmin)
    for (let value of sprites.allOfKind(SpriteKind.Wistle)) {
        value.setPosition(mySprite.x, mySprite.y)
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
})
