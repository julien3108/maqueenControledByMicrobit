enum RadioMessage {
    message1 = 49434,
    avancer = 29696,
    reculer = 19224,
    gauche = 43105,
    droite = 37890,
    stop = 61268,
    pince = 11703
}
radio.onReceivedMessage(RadioMessage.reculer, function () {
    reculer()
})
radio.onReceivedMessage(RadioMessage.droite, function () {
    droite()
})
radio.onReceivedMessage(RadioMessage.pince, function () {
    pince()
})
function stop () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
    currentState = 0
}
radio.onReceivedMessage(RadioMessage.avancer, function () {
    avancer()
})
function reculer () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 100)
    currentState = 2
}
function gauche () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    basic.pause(50)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
    currentState = 3
}
function pince () {
    if (estPincee == 0) {
        serrer()
        estPincee = 1
    } else {
        deserrer()
        estPincee = 0
    }
}
radio.onReceivedString(function (receivedString) {
    receivedString = receivedString
    if (receivedString == "avancer") {
        if (currentState == 0) {
            avancer()
        } else {
            stop()
        }
    } else if (receivedString == "reculer") {
        if (currentState == 0) {
            reculer()
        } else {
            stop()
        }
    } else if (receivedString == "stop") {
        stop()
    } else if (receivedString == "gauche") {
        gauche()
    } else if (receivedString == "droite") {
        droite()
    } else if (receivedString == "pince") {
        pince()
    }
})
function deserrer () {
    maqueen.servoRun(maqueen.Servos.S1, 180)
}
function avancer () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    currentState = 1
}
function serrer () {
    maqueen.servoRun(maqueen.Servos.S1, 90)
}
radio.onReceivedMessage(RadioMessage.stop, function () {
    stop()
})
function droite () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    basic.pause(50)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
    currentState = 4
}
radio.onReceivedMessage(RadioMessage.gauche, function () {
    gauche()
})
let estPincee = 0
let currentState = 0
radio.setGroup(100)
currentState = 0
