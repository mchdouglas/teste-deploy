import Vue from 'vue'
import Crud from '@/components/Crud.vue'
import TituloPagamento from '@/components/titulos/Pagamento.vue'
import GraficoContas from '@/components/dashboard/GraficoContas.vue'
import GraficoGastos from '@/components/dashboard/GraficoGastos.vue'
import AgendaPagamentos from '@/components/dashboard/AgendaPagamentos.vue'
import DetalhePagamento from '@/components/titulos/DetalhesMestre.vue'

Vue.component('app-crud', Crud)
Vue.component('app-titulo-pagamento', TituloPagamento)
Vue.component('app-grafico-contas', GraficoContas)
Vue.component('app-grafico-gastos', GraficoGastos)
Vue.component('app-agenda-pagamentos', AgendaPagamentos)
Vue.component('app-detalhe-pagamento', DetalhePagamento)
