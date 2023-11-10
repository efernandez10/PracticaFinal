import Vue from 'vue';
import VueRouter from 'vue-router';
import empleados from '../views/empleados.vue';
import proyectos from '../views/proyectos.vue';
import agregarEmpleado from '../views/agregarEmpleado.vue';
import agregarProyecto from '../views/agregarProyecto.vue';



Vue.use(VueRouter);

const routes = [
  {
    path: '/empleados',
    name: 'empleados',
    component: empleados,
  },
  {
    path: '/proyectos',
    name: 'proyectos',
    component: proyectos
  },
  {
    path: '/agregarEmpleado',
    name: 'agregarEmpleado',
    component: agregarEmpleado
  },
  {
    path: '/agregarProyecto',
    name: 'agregarProyecto',
    component: agregarProyecto
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
 