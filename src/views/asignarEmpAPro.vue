<template>
  <v-container>
    <v-row>
      <!-- Bloque de proyectos a la izquierda -->
      <v-col class="mb-6" cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Asignar Empleado a Proyecto</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-form>
                  <!-- Checkboxes para proyectos -->
                  <label>Seleccionar Proyectos:</label>
                  <v-checkbox v-for="(proyecto, index) in proyectos" :key="index" v-model="proyectosSeleccionados"
                    :label="proyecto.descripcion" :value="proyecto.descripcion"></v-checkbox>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Bloque de empleados a la derecha -->
      <v-col class="mb-6" cols="12" md="6">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <v-form>
                  <!-- Checkboxes para empleados -->
                  <label>Seleccionar Empleados:</label>
                  <v-checkbox v-for="(empleado, index) in empleados" :key="index" v-model="empleadosSeleccionados"
                    :label=empleado.nombre :value="empleado.nombre"></v-checkbox>
                  <v-btn @click="imprimirId" color="primary">
                    Imprimir ID
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
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
      proyectosSeleccionados: [],
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
      }).
        catch.error("Error al obtener las asignaciones", error);

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
    imprimirId() {
      let idemp;
      this.empleados.forEach(empleado => {
        if (this.empleadosSeleccionados.includes(empleado.nombre)) {
          idemp = empleado.idEmpleado;
        }
      });

      let idpro;
      this.proyectos.forEach(proyecto => {
        if (this.proyectosSeleccionados.includes(proyecto.descripcion)) {
          idpro = proyecto.idProyecto;
        }
      });

      console.log('Empleados asignados:', idemp);
      console.log('Proyectos asignados:', idpro);

      axios.post(`http://localhost:8080/api/asignacion/agregarasignacion?idEmpleado=${idemp}&idProyecto=${idpro}`)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error al agregar asignación', error);
        });
    }

  }
}
</script>


