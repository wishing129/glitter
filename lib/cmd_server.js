var socketio = require('socket.io');
var child_process = require('./exec_server');
var io;

exports.listen = function(server) {
    io = socketio.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', function (socket) {
       console.log("here comes a connection."); 
       
       handleCmd(socket); 
    });

};

function handleCmd(socket) {

    socket.on('cmd', function(cmd) {
        child_process.execCmd(socket, cmd.command, cmd.directory);
    });
}

