const client = require('discord-rich-presence')('398961509356797962');

const updatePresence = (payload) => {
    client.updatePresence({
        state: payload.name,
        details: `ep ${payload.ep} of ${payload.eptotal}`,
        startTimestamp: new Date(),
        largeImageKey: 'default',
        instance: false,
    });
};

const stopRpc = () => {
    client.disconnect();
    process.exit();
};

process.on('message', ({type, payload}) => {
    if(type === 'update') {
        console.log('update');
        updatePresence(payload)
    } else if (type === 'stop') {
        console.log('stop');
        stopRpc();
    }
});