//leemos el socket.io
const socket = io();

//creamos la constane que nos uestra la ventada del params que necesitamos ccon su argumento
const params = new URLSearchParams(window.location.search);

// realizamos la condicción para que nos redireccione de ser necesario
if (!params.has('nombre')) {
        window.location = 'index.html';
        throw new Error('El nombre y sala son necesario');
}

//creamos la variable que nos dara el nombre de usuario
const usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

//escuchamos cuando se conecte el usuario
socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (resp)=>{
        console.log('Usuarios conectados', resp);
    })
});

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
    console.log('Servidor:', mensaje);
});

///cuando los usuarios ingresan y salen del chat
socket.on('listaPersona', (personas) => {
    console.log(personas);
});

///mensajes privados
socket.on('mensajePrivado', (mensaje) => {
    console.log('Mensaje privado', mensaje);
})