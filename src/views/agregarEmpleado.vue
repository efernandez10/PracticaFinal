<template>
    <div>
      <h1>Agregar Empleado</h1>
      <v-form @submit.prevent="mostrarConfirmacion">
        <v-text-field v-model="nif" label="NIF" required></v-text-field>
        <v-text-field v-model="nombre" label="Nombre" required></v-text-field>
        <v-text-field v-model="apellido1" label="Primer Apellido" required></v-text-field>
        <v-text-field v-model="apellido2" label="Segundo Apellido" required></v-text-field>
        <v-text-field v-model="telefono1" label="Primer Teléfono de Contacto" required></v-text-field>
        <v-text-field v-model="telefono2" label="Segundo Teléfono de Contacto" required></v-text-field>
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-date-picker
          v-model="fechaNacimiento"
          label="Fecha de Nacimiento"
          :format="date => new Date(date)"
          required
        ></v-date-picker>
        <v-date-picker
          v-model="fechaAlta"
          label="Fecha de Alta"
          :format="date => new Date(date)"
          required
        ></v-date-picker>
        <v-date-picker
          v-model="fechaBaja"
          label="Fecha de Baja"
          :format="date => new Date(date)"
          required
        ></v-date-picker>
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
        fechaBaja: '', // Fecha en formato "yyyy-MM-dd"
        estadoCivil: '',
        servicioMilitar: '',
        mensaje: null,
        mostrarDialogoConfirmacion: false,
      };
    },
    methods: {
      mostrarConfirmacion() {
        this.mostrarDialogoConfirmacion = true;
      },
      agregarEmpleado() {
        const url = `http://localhost:8080/api/empleados/agregarempleado?nif=${this.nif}&nombre=${this.nombre}&apellido1=${this.apellido1}&apellido2=${this.apellido2}&fechaNacimiento=${this.fechaNacimiento}&telefono1=${this.telefono1}&telefono2=${this.telefono2}&email=${this.email}&fechaAlta=${this.fechaAlta}&fechaBaja=${this.fechaBaja}&estadoCivil=${this.estadoCivil === 'Soltero' ? 'Soltero' : 'Casado'}&servicioMilitar=${this.servicioMilitar === 'Si' ? 'NO' : 'SI'}`;
        axios.post(url)
          .then((response) => {
            if (response.data) {
              this.mensaje = { tipo: 'success', texto: 'Empleado agregado con éxito' };
            } else {
              this.mensaje = { tipo: 'error', texto: 'Error al agregar el empleado' };
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
    },
  };
  </script>
  