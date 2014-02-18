var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

function execCmd(socket, command, directory) {

    var cmd_arr = command.split(' ');

    var cmd_cmd = cmd_arr[0];
    var cmd_args = cmd_arr.slice(1);


    var cmd_p;
    if(cmd_cmd=='cd') {
        
        cmd_p = exec('cd '+ directory +' && ' + command +' && pwd', function(error, stdout, stderr){
            if(error==null) {
                directory = stdout;
                directory = directory.replace(/\n/g, '');
                socket.emit('execResult', {
                    type: 'end',
                    success: true,
                    message: null,
                    cur_dir: directory
                 });
            }else{
                socket.emit('execResult', {
                    type:'err',
                    success: false,
                    message: null,
                    cur_dir: directory
                });
            }
            
        });
        
    }else {
    directory.trim();

    console.log(cmd_cmd + " ::: "+ directory);
    
    cmd_p = spawn(cmd_cmd, cmd_args, {cwd: directory});

        cmd_p.stdout.on('data', function(data){
            socket.emit('execResult', {
                type: 'data',
                success: true,
                message: data.toString('ascii'),
                cur_dir: directory
            })
        });
        cmd_p.stderr.on('data', function(data){
            socket.emit('execResult', {
                type:'err',
                success: false,
                message: data.toString('ascii'),
                cur_dir: directory
            });
            console.log('Exec encountered a problem: '+ data);
        });

        cmd_p.stdout.on('end', function(data){
            socket.emit('execResult', {
                type: 'end',
                success: true,
                message: null,
                cur_dir: directory
            });
        });


        cmd_p.on('error', function(){
            console.log("uhh..");
        });

        cmd_p.on('close', function(code){
            console.log('exit with code: ' + code);
        });
    }
}

exports.execCmd = execCmd;
