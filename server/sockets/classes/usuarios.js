

class Usuarios {

    constructor(){
        this.personas = [];
    }

    //declaramos elargumento que necesitamos mostrar dentro de la función
    agregarPersonas(id, nombre, sala){
        
        //declaración de variable con su respectivo argumento
        let persona = {id, nombre, sala};
        //inclusion del objeto persona dentro del areglo de personas del constructor
        this.personas.push(persona);
        //retorno de del constructor personas
        return this.personas;
    }

    //obtnemos la persona que necesitamos discriminada por id
    getPersona(id){  
        //declaración de personas filtrada por id y posicion 
        let persona = this.personas.filter(persona => persona.id === id)[0];
        //return de variable
        return persona;
    }

    // obttenemos todas las personas conectadas
    getPersonas(){
        //return  del array
        return this.personas;
    }

    //obttenemos todas las personas que se encuentran en la sala
    getPersonasPorSala(sala){
        let personaSala =  this.personas.filter(persona =>persona.sala === sala);

        return personaSala;
    }

    //eliminación de las personas que abbandonan la sala discriminada por id
    eliminarPersona(id){

        //variable que me trae la persona discriminada por id que
        let personaEliminada = this.getPersona(id);
        //proceso de eliminación de la persona por id 
        this.personas = this.personas.filter(persona => persona.id != id);
        //return de la persona eliminada 
        return personaEliminada;
    }

}
module.exports = Usuarios;