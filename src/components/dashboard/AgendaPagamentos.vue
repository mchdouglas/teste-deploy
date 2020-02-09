<template>
  <DxScheduler
    :data-source="$store.state.agendaPagamentos"
    :current-date="currentDate"
    :views="views"
    :height="400"
    :width="800"
    :start-day-hour="9"
    current-view="agenda"
    >

    <DxResource
      :data-source="resourcesData"
      field-expr="tipo"
      label="Tipo"
    />

  </DxScheduler>

</template>
<script>

import { DxScheduler, DxResource } from 'devextreme-vue/scheduler'

export default {
  components: {
    DxScheduler,
    DxResource
  },
  mounted () {
    this.$store.dispatch('loadAgendaPagamentos')
  },
  data () {
    return {
      views: ['agenda', 'week'],
      currentDate: new Date(2019, 11, 29),
      resourcesData: [
        {
          text: 'Pagamentos',
          id: 1,
          color: 'teal'
        },
        {
          text: 'Vencimentos',
          id: 2,
          color: 'tomato'
        }
      ]
    }
  }
}
</script>
