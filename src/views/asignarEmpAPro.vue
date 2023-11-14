<template>
  <v-container>
    <v-row>

      <v-col class="mb-6" cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Asignar Empleado a Proyecto</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-form>

                  <label>Seleccionar Proyecto:</label>
                  <v-select v-model="proyectoSeleccionado" :items="proyectos" item-text="descripcion"
                    item-value="idProyecto" @change="onProyectoSeleccionado"></v-select>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="mb-6" cols="12" md="6">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <v-form>

                  <label>Seleccionar Empleados:</label>
                  <v-checkbox v-for="(empleado, index) in empleados" :key="index" v-model="empleadosSeleccionados"
                    :label="`${empleado.nombre} ${empleado.apellido1} ${empleado.apellido2}`" :value="empleado.idEmpleado"
                    :checked="empleadosAsociadosAsignacion.includes(empleado.idEmpleado)"
                    @change="toggleEmpleadoAsociado(empleado.idEmpleado)" ref="miCheckbox">
                  </v-checkbox>

                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="proyectoSeleccionado">
      <v-col>
        <p>ID del proyecto seleccionado: {{ proyectoSeleccionado }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      empleados: [],
      proyectos: [],
      asignaciones: [],
      empleadosSeleccionados: [],
      proyectoSeleccionado: null,
      empleadosAsociadosAsignacion: [],
    };
  },
  mounted() {
    this.fetchEmpleados();
    this.fetchProyectos();
    this.fetchAsignacion();
  },
  methods: {
    fetchAsignacion() {
      axios.get("http://localhost:8080/api/asignacion/getasignaciones").then(response => {
        this.asignaciones = response.data;
      }).catch(error => {
        console.error("Error al obtener las asignaciones", error);
      });
    },
    fetchEmpleados() {
      axios.get('http://localhost:8080/api/empleados/getempleados')
        .then(response => {
          this.empleados = response.data.filter(empleado => empleado.fechaBaja === null);
        })
        .catch(error => {
          console.error('Error al obtener la lista de empleados', error);
        });
    },
    fetchProyectos() {
      axios.get('http://localhost:8080/api/proyectos/getproyectos')
        .then(response => {
          this.proyectos = response.data.filter(proyecto => proyecto.fechaBaja === null);
        })
        .catch(error => {
          console.error('Error al obtener la lista de proyectos', error);
        });
    },
    async onProyectoSeleccionado() {
      console.log('Proyecto seleccionado (ID):', this.proyectoSeleccionado);

      try {
        const response = await axios.get("http://localhost:8080/api/asignacion/getasignaciones");
        const asignacionesFiltradas = response.data;

        this.empleadosAsociadosAsignacion = [];

        asignacionesFiltradas.forEach(asignacion => {
          if (this.proyectoSeleccionado == asignacion.idProyecto) {
            this.empleadosAsociadosAsignacion.push(asignacion.idEmpleado);
            console.log('ID de empleado asociado al proyecto:', asignacion.idEmpleado);
          }
        });
        console.log('Empleados asociados:', this.empleadosAsociadosAsignacion);
      } catch (error) {
        console.error('Error al obtener asignaciones', error);
      }
    },
    toggleEmpleadoAsociado(idEmpleado) {
  const miCheckbox = this.$refs.miCheckbox;

  if (this.empleadosAsociadosAsignacion.includes(idEmpleado)) {
    axios.delete(`http://localhost:8080/api/asignacion/eliminarasignacion?idEmpleado=${idEmpleado}&idProyecto=${this.proyectoSeleccionado}`)
      .then(response => {
        console.log(response.data);
        console.log("empleado eliminado");
      })
      .catch(error => {
        console.error('Error al eliminar asignación', error);
      });
  } else {
    axios.post(`http://localhost:8080/api/asignacion/agregarasignacion?idEmpleado=${idEmpleado}&idProyecto=${this.proyectoSeleccionado}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al agregar asignación', error);
      });
  }

  if (this.empleadosAsociadosAsignacion.includes(idEmpleado)) {
    this.empleadosAsociadosAsignacion = this.empleadosAsociadosAsignacion.filter(id => id !== idEmpleado);
  } else {
    this.empleadosAsociadosAsignacion.push(idEmpleado);
  }

  
  miCheckbox.forEach(checkbox => {
    const empleadoId = parseInt(checkbox.value);
    const checkboxProyecto = this.asignaciones.find(asignacion => asignacion.idEmpleado === empleadoId)?.idProyecto;
    checkbox.$el.checked = this.empleadosAsociadosAsignacion.includes(empleadoId) && checkboxProyecto === this.proyectoSeleccionado;
  });
},
  },
};
</script>
