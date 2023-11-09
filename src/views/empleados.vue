<template>
  <div>
    <h1>Gestión de Empleados</h1>
    <div>
      <v-btn color="primary" @click="fetchEmpleados">Consultar Empleados</v-btn>
      <v-btn color="success" @click="agregarEmpleados">Agregar Empleados</v-btn>
      <div v-if="empleados.length > 0">
        <v-data-table :headers="headers" :items="empleados" :items-per-page="10">
          <template v-slot:item.fechaNacimiento="{ item }">
            {{ item.fechaNacimiento | formatoFecha }}
          </template>
          <template v-slot:item.acciones="{ item }">
            <v-btn color="warning" @click="eliminarEmpleado(item)">Eliminar</v-btn>
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
    eliminarEmpleado(item) {

      const empleadoId = item.idEmpleado;
      const index = this.empleados.indexOf(item);

      this.empleados.splice(index, 1);




      // Ahora puedes utilizar empleadoId en tu solicitud de eliminación
      axios
        .delete(`http://localhost:8080/api/empleados/${empleadoId}`)
        .then((response) => {
          console.log("Empleado Borrado Perfectamente");
        })
        .catch((error) => {
          console.error("Error al eliminar el empleado en la API", error);
        });
    },
    agregarEmpleados() {
      this.$router.push({ name: 'agregarEmpleado' });
    },
  },
};
</script>
