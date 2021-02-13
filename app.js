const net = require("net"); // npm install net

// all the connecteted sockets 

const connectedSockets = new Set(); 


const server = net.createServer(
    socket => {
        connectedSockets.add(socket);

        //writing to the tcp socket
        socket.write("Hello\nWelcome to the local_chat!\nStart typing!\n");
        //whenever a data comes in from the client.
        socket.on("data", data => {
            connectedSockets.forEach(sock => { // checking if the sock is our socket
                                                // because we dont want double messages
                                                // others + ours ?? whatever

                if(sock != socket){
                    sock.write(data.toString()) // here we are transmitting the message
                                                // to other clients.
                }
            });
            console.log(data.toString()); // loggin to the console 
        })
    }
)

server.listen(8080); // listening at port 8080