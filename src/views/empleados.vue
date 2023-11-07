<template>
    <div>
        <h1>Gestión de Empleados</h1>
        <div>
            <v-btn @click="fetchEmpleados">Consultar Empleados</v-btn>
            <v-btn @click="agregarEmpleados">Agregar Empleados</v-btn>
            <div v-if="empleados.length > 0">
                <v-data-table :headers="headers" :items="empleados" :items-per-page="10">                 
                   
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
            empleados: [],
            headers: [
                { text: 'NIF', value: 'nif' },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Primer Apellido', value: 'apellido1' },
                { text: 'Segundo Apellido', value: 'apellido2' },
                { text: 'Fecha de Nacimiento', value: 'fechaNacimiento' },
                { text: 'Primer Teléfono de Contacto', value: 'telefono1' },
                { text: 'Email', value: 'email' },
                { text: 'Estado Civil', value: 'estadoCivil' },
                { text: 'Servicio Militar', value: 'servicioMilitar' },
            ],
        };
    },
    methods: {
        fetchEmpleados() {
            axios
                .get("http://localhost:8080/api/empleados/getempleados")
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        this.empleados = response.data; // Almacena la matriz de empleados
                    } else {
                        console.error("La respuesta de la API no contiene datos válidos", response);
                    }
                })
                .catch((error) => {
                    console.error("Error al consultar la API", error);
                });
        },
       
        agregarEmpleados() {
            this.$router.push({ name: 'agregarEmpleado' });
        },
    },
};
</script>
  