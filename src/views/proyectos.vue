<template>
    <div>
        <h1>Gestion de Proyectos</h1>
        <div>
            <v-btn color="primary" @click="fecthProyectos()">Consultar Proyectos</v-btn>
            <v-btn color="success" @click="agregarProyecto()">Agregar Proyecto</v-btn>
            <div v-if="proyectos.length > 0">
                <v-data-table :headers="headers" :items="proyectos" :items-per-page="10">
                    <template v-slot:item.fechaNacimiento="{ item }">
                        {{ item.fechaInicio, item.fechaFin | formatoFecha }}
                    </template>
                    <template v-slot:item.acciones="{ item }">
                        <v-btn color="warning" @click="eliminarProyecto(item)">Eliminar</v-btn>
                    </template>

                </v-data-table>
            </div>

        </div>
    </div>
</template>
  

<script>
import axios from 'axios';
export default {
    data() {
        return {
            proyectos: [],
        };

    },
    methods: {
        fecthProyectos() {
            axios.get("http://localhost:8080/api/proyectos/getproyectos").then(
                (response) => {
                    this.proyectos = response.data.results;
                }).catch(error => {
                    console.error("Error al consultar la api", error)
                });



        }
    }
}

</script>