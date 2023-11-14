<template>
    <div>
        <h1>Agregar Proyecto</h1>
        <v-form @submit.prevent="mostrarConfirmacion">
            <v-text-field v-model="descripcion" label="Descripcion"></v-text-field>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4>
                    <v-menu ref="menuInicio" v-model="menuInicio" :close-on-content-click="false" :nudge-right="40"
                        :return-value.sync="fechaInicio" lazy transition="scale-transition" offset-y full-width
                        min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="fechaInicio" label="Fecha de Inicio" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="fechaInicio" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menuInicio = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menuInicio.save(fechaInicio)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>

                    <v-menu ref="menuFin" v-model="menuFin" :close-on-content-click="false" :nudge-right="40"
                        :return-value.sync="fechaFin" lazy transition="scale-transition" offset-y full-width
                        min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="fechaFin" label="Fecha de Finalizacion " readonly
                                v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="fechaFin" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menuFin = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menuFin.save(fechaFin)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
                <v-spacer></v-spacer>
            </v-layout>
            <v-text-field v-model="lugar" label="Lugar"></v-text-field>
            <v-text-field v-model="observaciones" label="Observaciones"></v-text-field>
            <v-btn type="submit" color="primary">Agregar Proyecto</v-btn>
        </v-form>
        <v-dialog v-model="mostrarDialogoConfirmacion" max-width="400px">
            <v-card>
                <v-card-title>Confirmación</v-card-title>
                <v-card-text>
                    ¿Estás seguro de que deseas agregar este proyecto?
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="agregarProyecto">Sí</v-btn>
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
            descripcion: '',
            fechaInicio: '',
            fechaFin: '',
            lugar: '',
            observaciones: '',
            mensaje: null,
            mostrarDialogoConfirmacion: false,
            menuInicio: false,
            menuFin: false,



        };

    },
    methods: {
        mostrarConfirmacion() {
            this.mostrarDialogoConfirmacion = true;
        },
        agregarProyecto() {
            if (
                !this.descripcion ||
                !this.fechaInicio ||
                !this.fechaFin ||
                !this.lugar ||
                !this.observaciones

            ) {
                this.mensaje = { tipo: 'error', texto: 'Todos los campos deben estar completados' };
                return;
            }

            const url = `http://localhost:8080/api/proyectos/agregarproyecto?descripcion=${this.descripcion}&fechaInicio=${this.fechaInicio}&fechaFin=${this.fechaFin}&lugar=${this.lugar}&observaciones=${this.observaciones}`;
            axios.post(url)
                .then((response) => {
                    if (response.data) {
                        console.log(response.data);
                        this.mensaje = { tipo: 'success', texto: 'Proyecto agregado con éxito' };
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
    }

}

</script>
<style>
.error-message {
    color: red;
    margin-top: 10px;
}
</style>