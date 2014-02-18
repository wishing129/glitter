var Cmd = function(socket) {
      this.socket = socket
  };
  
  Cmd.prototype.sendCmd = function(cmd_str, cur_dir) {
     
     var cmd_obj = {
          command: cmd_str,
          directory: cur_dir
      };
      this.socket.emit('cmd', cmd_obj);
 };
