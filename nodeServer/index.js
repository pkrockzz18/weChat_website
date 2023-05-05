
const io=require('socket.io')(8009)
const users={};

io.on('connection', (socket)=>{
    socket.on('new-user-joined', names=>{
        console.log("New user",names);
        users[socket.id]=names;
        socket.broadcast.emit('user-joined',names);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, names: users[socket.id]})
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
        
    });
})

// Remember to install a chrome extension called "Moesif Origin and CORS Changer" to remove the error called "Access to XMLHttpRequest has been blocked by CORS Policy"