<template>
    <div>
      <h1>Gestion de Proyectos</h1>
      <div>
        <v-btn @click="fecthProyectos()">Consultar Proyectos</v-btn>
        {{proyectos.descripcion}}
      </div>
    </div>
  </template>
  

<script>
import axios from 'axios';
export default{
    data(){
        return{
            proyectos:[],
        };

    },
    methods:{
        fecthProyectos(){
            axios.get("http://localhost:8080/api/proyectos/getproyectos").then(
                (response)=>{
                    this.proyectos=response.data.results;
                }).catch(error=>{
                    console.error("Error al consultar la api",error)
                });          



        }
    }
}

</script>