<template>
    <div>
        <h1>Gestión de Proyectos</h1>
        <div>
            <v-btn color="primary" @click="fetchProyectos">Consultar Proyecto</v-btn>
            <v-btn color="success" @click="agregarProyecto">Agregar Proyectos</v-btn>
            <v-btn color="secondary" @click="asignarEmpleado">Asignar Empleado a Proyectos</v-btn>
            <div v-if="proyectos.length > 0">
                <v-data-table :headers="headers" :items="proyectos">
                    <template v-slot:item.fechaInicio="{ item }">
                        {{ item.fechaInicio | formatoFecha }}
                    </template>.
                    <template v-slot:item.fechaFin="{ item }">
                        {{ item.fechaFin | formatoFecha }}
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
            headers: [
                { text: 'Descripción', value: 'descripcion' },
                { text: 'Fecha de inicio', value: 'fechaInicio' },
                { text: 'Fecha de finalización', value: 'fechaFin' },
                { text: 'Lugar', value: 'lugar' },
                { text: 'Observaciones', value: 'observaciones' },
                { text: 'Acciones', value: 'acciones', sortable: false },
            ],
        };

    },
    filters: {
        formatoFecha: function (fecha) {
            if (fecha) {
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                return new Date(fecha).toLocaleDateString(undefined, options);
            }
            return '';
        },
    },
    methods: {
        fetchProyectos() {
            axios
                .get("http://localhost:8080/api/proyectos/getproyectos")
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        
                        this.proyectos = response.data.filter(proyecto => proyecto.fechaBaja === null);
                    } else {
                        console.error("La respuesta de la API no contiene datos válidos", response);
                    }
                })
                .catch((error) => {
                    console.error("Error al consultar la API", error);
                });
        },
        eliminarProyecto(item) {
            const proyectoId = item.idProyecto;
            const index = this.proyectos.indexOf(item);
           
            this.proyectos.splice(index, 1);
            
            axios
                .put(`http://localhost:8080/api/proyectos/dardebaja/${proyectoId}`)
                .then((response) => {
                    console.log("Borrado de la lista");
                })
                .catch((error) => {
                    console.error("Error al dar de baja al proyecto en la API", error);
                });
        },
        agregarProyecto() {
            this.$router.push({ name: 'agregarProyecto' });
        },
        asignarEmpleado() {
            this.$router.push({ name: 'asignarEmpAPro' });
        },

    }
}

</script>