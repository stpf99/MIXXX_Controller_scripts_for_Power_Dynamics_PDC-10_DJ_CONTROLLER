var PowerDynamics_pdc_10 = {};

PowerDynamics_pdc_10.init = function (id, debugging) {
    // turn on all LEDs
    for (var i = 1; i <= 12; i++) { // Repeat the following code for the numbers 1 through 12
                                // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
        midi.sendShortMsg(0x90, i, 0x7f);
    }
}

PowerDynamics_pdc_10.shutdown = function() {
   // turn off all LEDs
   for (var i = 1; i <= 12; i++) {
        midi.sendShortMsg(0x90, i, 0x00);
    }
}

PowerDynamics_pdc_10.wheelTouch = function (channel, control, value, status, group) {
    var deckNumber = script.deckFromGroup(group);
    if ((status & 0x7F) === 0x90) {
        var alpha = 1.0/8;
        var beta = alpha/32;
        engine.scratchEnable(deckNumber, 128, 33+1/3, alpha, beta);
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
