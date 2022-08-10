var PowerDynamics_pdc_10 = {};

PowerDynamics_pdc_10.init = function (id, debugging) {
    for (var i = 12; i <= 81; i++) { 
        midi.sendShortMsg(0x90, i, 0x7f);
    }
}

PowerDynamics_pdc_10.shutdown = function() {
   for (var i = 12; i <= 81; i++) {
        midi.sendShortMsg(0x90, i, 0x00);
    }
}

PowerDynamics_pdc_10.wheelTouch = function (channel, control, value, status, group) {
    var deckNumber = script.deckFromGroup(group);
    if ((status & 0x7F) === 0x48) {
        var alpha = 2.0/512;
        var beta = alpha/512;
        engine.scratchEnable(deckNumber, 1024, 33+1/3, alpha, beta);
    } else {
        engine.scratchDisable(deckNumber);
    }
	}

PowerDynamics_pdc_10.wheelTurn = function (channel, control, value, status, group) {
    var newValue = value - 64;
    var deckNumber = script.deckFromGroup(group);
    if (engine.isScratching(deckNumber)) {
        engine.scratchTick(deckNumber, newValue);
    } else {
        engine.setValue(group, 'jog', newValue);
    }
}
