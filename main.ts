namespace SpriteKind {
    export const PointerSprite = SpriteKind.create()
    export const Other = SpriteKind.create()
    export const Wistle = SpriteKind.create()
    export const Pikmin = SpriteKind.create()
    export const HUD = SpriteKind.create()
    export const Tresure = SpriteKind.create()
    export const Ship = SpriteKind.create()
    export const GroundedPikmin = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Wistle, SpriteKind.GroundedPikmin, function (sprite, otherSprite) {
    music.play(music.stringPlayable("B - A - - - - - ", 800), music.PlaybackMode.InBackground)
    spawnPikmin(false, sprites.readDataNumber(otherSprite, "type"), otherSprite.x, otherSprite.y)
    sprites.destroy(otherSprite)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Pikmin)) {
        sprites.setDataBoolean(value, "following", false)
        sprites.setDataNumber(value, "Gid", 0)
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
    Pikmin2.z = 5
    sprites.setDataBoolean(Pikmin2, "following", false)
    sprites.setDataBoolean(Pikmin2, "wild", Wild)
    sprites.setDataNumber(Pikmin2, "speed", randint(50.000001, 70.999999))
    sprites.setDataNumber(Pikmin2, "type", Type + 1)
    sprites.setDataNumber(Pikmin2, "spriteType", 0)
    Pikmin2.setFlag(SpriteFlag.GhostThroughSprites, false)
    sprites.setDataBoolean(Pikmin2, "grabing?", false)
    sprites.setDataNumber(Pikmin2, "Gid", 0)
    Pikmin2.x = X
    Pikmin2.y = Y
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value2 of sprites.allOfKind(SpriteKind.Pikmin)) {
        if ((sprites.readDataNumber(value2, "type") == pikminType || pikminType == 0) && sprites.readDataBoolean(value2, "following")) {
            timer.background(function () {
                for (let index = 0; index < 5; index++) {
                    value2.changeScale(0.1, ScaleAnchor.Middle)
                    value2.z += 0.5
                    pause(1)
                }
                for (let index = 0; index < 6; index++) {
                    value2.changeScale(-0.1, ScaleAnchor.Middle)
                    value2.z += -0.1
                    pause(1)
                }
                value2.setScale(1, ScaleAnchor.Middle)
            })
            timer.background(function () {
                sprites.setDataBoolean(value2, "following", false)
                value2.follow(mySprite, 0)
                value2.setVelocity((mySprite.x - value2.x + randint(-2, 2)) * 5, (mySprite.y - value2.y + randint(-2, 2)) * 5)
                pause(210)
                value2.setVelocity(0, 0)
                for (let value3 of sprites.allOfKind(SpriteKind.Tresure)) {
                    if (value2.overlapsWith(value3)) {
                        sprites.setDataNumber(value2, "Gid", sprites.readDataNumber(value3, "Tid"))
                        break;
                    }
                }
            })
            break;
        }
    }
})
scene.onPathCompletion(SpriteKind.Tresure, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, assets.tile`hLANDING0`)) {
        music.play(music.stringPlayable("C5 - B B - - - - ", 800), music.PlaybackMode.InBackground)
        for (let value4 of sprites.allOfKind(SpriteKind.Pikmin)) {
            if (true) {
            	
            }
        }
    }
})
function loadHud () {
    Pikmin_HUD = sprites.create(assets.image`randomlyThrowPikmin`, SpriteKind.HUD)
    Pikmin_HUD.setFlag(SpriteFlag.RelativeToCamera, true)
    Pikmin_HUD.setPosition(100, 105)
    Pikmin_HUD.z = 9999
    Player_HUD = sprites.create(assets.image`captionPhoto`, SpriteKind.HUD)
    Player_HUD.setFlag(SpriteFlag.RelativeToCamera, true)
    Player_HUD.setPosition(15, 105)
    Player_HUD.z = 9999
    pikminMeterThing = textsprite.create("x10/10/10", 1, 13)
    pikminMeterThing.setFlag(SpriteFlag.RelativeToCamera, true)
    pikminMeterThing.setPosition(137, 105)
    pikminMeterThing.z = 9999
    hpPlayer = statusbars.create(20, 4, StatusBarKind.Health)
    hpPlayer.setFlag(SpriteFlag.RelativeToCamera, true)
    hpPlayer.z = 9999
    hpPlayer.setPosition(35, 105)
}
function spawnTresure (Type: number, TX: number, TY: number, Rotation: number, Weight: number) {
    Tresure2 = sprites.create([
    assets.image`nullllllllllllllll lol`,
    assets.image`redThing1`,
    assets.image`blueThing1`,
    assets.image`treNail`,
    assets.image`treRoundFun`,
    assets.image`treEnergyContainer`
    ][Type], SpriteKind.Tresure)
    tiles.placeOnTile(Tresure2, tiles.getTileLocation(TX, TY))
    transformSprites.rotateSprite(Tresure2, Rotation)
    sprites.setDataNumber(Tresure2, "spriteType", 1)
    sprites.setDataNumber(Tresure2, "Weight", Weight)
    sprites.setDataNumber(Tresure2, "PikminHolding", 0)
    sprites.setDataNumber(Tresure2, "Tid", sprites.allOfKind(SpriteKind.Tresure).length)
}
sprites.onOverlap(SpriteKind.Wistle, SpriteKind.Pikmin, function (sprite, otherSprite) {
    sprites.setDataBoolean(otherSprite, "following", true)
    sprites.setDataNumber(otherSprite, "Gid", 0)
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
    assets.image`randomlyThrowPikmin`,
    assets.image`redPikmin`,
    assets.image`bluePikmin`,
    assets.image`yellowPikmin`,
    assets.image`purplePikmin`,
    assets.image`whitePikmin`
    ][pikminType])
})
sprites.onOverlap(SpriteKind.Pikmin, SpriteKind.Tresure, function (sprite, otherSprite) {
    otherSprite.sayText("" + sprites.readDataNumber(otherSprite, "PikminHolding") + "/" + sprites.readDataNumber(otherSprite, "Weight"), 500, false)
})
function spawnGroundPikmin (Type: number, X: number, Y: number) {
    Pikmin2 = sprites.create([assets.image`nullllllllllllllll lol`, assets.image`redPikminGROUNDED`][Type], SpriteKind.GroundedPikmin)
    tiles.placeOnTile(Pikmin2, tiles.getTileLocation(X, Y))
    sprites.setDataNumber(Pikmin2, "type", Type)
}
function VisonArea (S1: Sprite, S2: Sprite, Range: number) {
    return Math.sqrt(Math.abs((S1.x - S2.x) ** 2 - (S1.y - S2.y) ** 2)) > Range
}
scene.onOverlapTile(SpriteKind.Tresure, assets.tile`hLANDING0`, function (sprite, location) {
    music.play(music.stringPlayable("C5 - B B - - - - ", 800), music.PlaybackMode.InBackground)
    _tempBooleon = true
    for (let index = 0; index <= 2; index++) {
        if (sprite.image.equals([assets.image`redThing1`, assets.image`blueThing1`, assets.image`blueThing1`][index])) {
            _tempBooleon = false
            spawnGroundPikmin(index + 1, 1, 1)
        }
    }
})
let packColor = 0
let allColor = 0
let allPikmin = 0
let Tresure2: Sprite = null
let hpPlayer: StatusBarSprite = null
let pikminMeterThing: TextSprite = null
let Player_HUD: Sprite = null
let Pikmin_HUD: Sprite = null
let Pikmin2: Sprite = null
let mySprite2: Sprite = null
let maxPT = 0
let pikminType = 0
let mySprite: Sprite = null
let _tempBooleon = false
_tempBooleon = true
storyboard.loaderBootSequence.register()
storyboard.start("game")
tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`homeOverWorld`))
tileUtil.createSpritesOnTiles(assets.tile`hLANDING0`, assets.image`shipThing`, SpriteKind.Ship)
for (let value32 of sprites.allOfKind(SpriteKind.Ship)) {
    value32.z = 9998
}
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
Captain.z = 9994
Captain.setPosition(160, 120)
tiles.placeOnRandomTile(Captain, assets.tile`hLANDING0`)
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
mySprite.z = 9997
loadHud()
pikminType = 0
maxPT = 6
controller.moveSprite(Captain, 75, 75)
spawnGroundPikmin(0, 33, 40)
game.onUpdate(function () {
    for (let value6 of sprites.allOfKind(SpriteKind.Tresure)) {
        sprites.setDataNumber(value6, "PikminHolding", 0)
        if (value6.image.equals(assets.image`nullllllllllllllll lol`)) {
            sprites.destroy(value6)
        }
    }
    allPikmin = 0
    allColor = 0
    packColor = 0
    for (let value33 of sprites.allOfKind(SpriteKind.Pikmin)) {
        if (sprites.readDataBoolean(value33, "following")) {
            value33.follow(Captain, sprites.readDataNumber(value33, "speed"))
        }
        if (sprites.readDataNumber(value33, "Gid") != 0) {
            for (let value7 of sprites.allOfKind(SpriteKind.Tresure)) {
                if (sprites.readDataNumber(value33, "Gid") == sprites.readDataNumber(value7, "Tid")) {
                    value33.follow(value7, sprites.readDataNumber(value33, "speed"))
                    sprites.changeDataNumberBy(value7, "PikminHolding", 1)
                }
            }
        }
        allPikmin += 1
        if (sprites.readDataBoolean(value33, "following")) {
            allColor += 1
            if (sprites.readDataNumber(value33, "type") == pikminType) {
                packColor += 1
            }
        }
    }
    for (let value8 of sprites.allOfKind(SpriteKind.Tresure)) {
        for (let value34 of sprites.allOfKind(SpriteKind.Ship)) {
            if (value34.image.equals(assets.image`shipThing`)) {
                if (sprites.readDataNumber(value8, "PikminHolding") >= sprites.readDataNumber(value8, "Weight")) {
                    value8.follow(value34, 25)
                } else {
                    value8.follow(value34, 0)
                }
            }
        }
    }
    pikminMeterThing.setText("x" + packColor + "/" + allColor + "/" + allPikmin)
    for (let value42 of sprites.allOfKind(SpriteKind.Wistle)) {
        value42.setPosition(mySprite.x, mySprite.y)
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
game.onUpdateInterval(20000, function () {
    _tempBooleon = true
    for (let value9 of tiles.getTilesByType(assets.tile`hPathOVERGROWN`)) {
        if (Math.percentChance(20)) {
            if (!(pikminType < 0)) {
                spawnTresure(pikminType, value9.column, value9.row, 0, 1)
            }
            break;
        }
    }
})
