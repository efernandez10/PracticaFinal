<template>
  <div>
    <h1>Agregar Empleado</h1>
    <v-form @submit.prevent="mostrarConfirmacion">
      <v-text-field v-model="nif" label="NIF" ></v-text-field>
      <div v-if="nifFormatError" class="error-message">El formato del NIF es incorrecto.</div>
      <v-text-field v-model="nombre" label="Nombre" ></v-text-field>
      <v-text-field v-model="apellido1" label="Primer Apellido" ></v-text-field>
      <v-text-field v-model="apellido2" label="Segundo Apellido" ></v-text-field>
      <v-text-field v-model="telefono1" label="Primer Teléfono de Contacto" ></v-text-field>
      <v-text-field v-model="telefono2" label="Segundo Teléfono de Contacto"></v-text-field>

      <v-text-field v-model="email" label="Email"></v-text-field>      
      <div v-if="emailFormatError" class="error-message">El formato del correo electrónico es incorrecto.</div>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4>
          <v-menu
            ref="menuNacimiento"
            v-model="menuNacimiento"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="fechaNacimiento"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="fechaNacimiento"
                label="Fecha de Nacimiento"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="fechaNacimiento" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuNacimiento = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menuNacimiento.save(fechaNacimiento)">OK</v-btn>
            </v-date-picker>
          </v-menu>      
        
          <v-menu
            ref="menuAlta"
            v-model="menuAlta"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="fechaAlta"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="fechaAlta"
                label="Fecha de alta"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="fechaAlta" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuAlta = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menuAlta.save(fechaAlta)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-spacer></v-spacer>
      </v-layout>
      <v-select v-model="estadoCivil" :items="['Soltero', 'Casado']" label="Estado Civil" required></v-select>
      <v-select v-model="servicioMilitar" :items="['Si', 'No']" label="Servicio Militar" required></v-select>
      <v-btn type="submit" color="primary">Agregar Empleado</v-btn>
    </v-form>
    <v-dialog v-model="mostrarDialogoConfirmacion" max-width="400px">
      <v-card>
        <v-card-title>Confirmación</v-card-title>
        <v-card-text>
          ¿Estás seguro de que deseas agregar a este empleado?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="agregarEmpleado">Sí</v-btn>
          <v-btn color="red" @click="cancelarGuardado">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-alert v-if="mensaje" :type="mensaje.tipo">{{ mensaje.texto }}</v-alert>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nif: '',
      nombre: '',
      apellido1: '',
      apellido2: '',
      fechaNacimiento: '', // Fecha en formato "yyyy-MM-dd"
      telefono1: '',
      telefono2: '',
      email: '',
      fechaAlta: '', // Fecha en formato "yyyy-MM-dd"      
      estadoCivil: '',
      servicioMilitar: '',
      mensaje: null,
      mostrarDialogoConfirmacion: false,
      menuNacimiento: false,
      menuAlta: false,
      emailFormatError: false, // Variable para rastrear errores de formato de correo electrónico
      nifFormatError:false,
    };
  },
  methods: {
    mostrarConfirmacion() {
      this.mostrarDialogoConfirmacion = true;
    },
    agregarEmpleado() {
      if (
    !this.nif ||
    !this.nombre ||
    !this.apellido1 ||
    !this.apellido2 ||
    !this.fechaNacimiento ||
    !this.telefono1 ||
    !this.telefono2 ||
    !this.email ||
    !this.fechaAlta ||
    !this.estadoCivil ||
    !this.servicioMilitar
  ) {
    this.mensaje = { tipo: 'error', texto: 'Todos los campos deben estar completados' };
    return;
  }
      // Verificar el formato del correo electrónico antes de enviar la solicitud y del nif
      if((!this.validarFormatoEmail(this.email))||(!this.validarFormatoNif(this.nif))) {
        this.emailFormatError = true;
        this.nifFormatError=true;
        return; // Evitar el envío si el formato es incorrecto
      }

      const url = `http://localhost:8080/api/empleados/agregarempleado?nif=${this.nif}&nombre=${this.nombre}&apellido1=${this.apellido1}&apellido2=${this.apellido2}&fechaNacimiento=${this.fechaNacimiento}&telefono1=${this.telefono1}&telefono2=${this.telefono2}&email=${this.email}&fechaAlta=${this.fechaAlta}&estadoCivil=${this.estadoCivil === 'Soltero' ? 'Soltero' : 'Casado'}&servicioMilitar=${this.servicioMilitar === 'Si' ? 'NO' : 'SI'}`;
      axios.post(url)
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            this.mensaje = { tipo: 'success', texto: 'Empleado agregado con éxito' };
            this.emailFormatError = false;
            this.nifFormatError=false;
          } else {
            this.mensaje = { tipo: 'error', texto: 'Todos los campos deben estar completados' };
          }
        })
        .catch((error) => {
          this.mensaje = { tipo: 'error', texto: 'Error al agregar el empleado' };
        });
      this.mostrarDialogoConfirmacion = false;
    },
    cancelarGuardado() {
      this.mostrarDialogoConfirmacion = false;
    },
  
    validarFormatoEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    },
    validarFormatoNif(nif) {
      const nifRegex = /^([XYZ]\d{7}[A-Z]|\d{8}[A-Za-z])$/;
      return nifRegex.test(nif);
    },
    
  },
};
</script>
<style>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>

