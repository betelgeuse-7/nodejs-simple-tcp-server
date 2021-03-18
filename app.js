const net = require("net");

const connectedSockets = new Set(); 


const server = net.createServer(
    socket => {
        connectedSockets.add(socket);

        //writing to the tcp socket
        socket.write("Hello\nWelcome to the local_chat!\nStart typing!\n");
        
        socket.on("data", data => {
            connectedSockets.forEach(sock => { 
                if(sock != socket){
                    sock.write(data.toString()) // transmitting the message to other clients.
                }
            });
            console.log(data.toString());
        })
    }
)

server.listen(8080);
