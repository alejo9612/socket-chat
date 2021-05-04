//desestructuramos el io del server
const { io } = require('../server');
//llamamos la clase
const Usuarios = require('./classes/usuarios');
//llamamos la la función
const { crearMensaje } = require('../util/utilidades');
//creamos una nueva instancia
const usuarios = new Usuarios();

//leemos con el io
io.on('connection', (client) => {

    //escuchamos cuando el usuario se conecta al chat
    client.on('entrarChat', (data, callback) => {
        
        //creamos la condicción por si es diferente a quien se conecta
        if (!data.nombre || !data.sala) {
            return callback = ({
                error: true,
                msg: 'El nombre es necesario'
            })
        }

        //conexión de sala
        client.join(data.sala);
        //creamos la vaariable de los usuarios que se conectan con su id y nombre
        usuarios.agregarPersonas(client.id, data.nombre , data.sala);
        
       client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

       callback(usuarios.getPersonasPorSala(data.sala));
    });

    //desconexión de usuarios
    client.on('disconnect', () =>{

        let personaEliminada = usuarios.eliminarPersona(client.id);

        client.broadcast.to(personaEliminada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaEliminada} salio`));
        client.broadcast.to(personaEliminada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaEliminada.sala));
    });

    //Envio de mensaje
    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    })

    ///Mensajes Privados
    client.on('mensajePrivado', (data) =>{

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.id).emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje));
    });


});