<template>
  <DxChart
    id="chart"
    :data-source="$store.state.graficoSaldoContas"
    title="Saldo de Contas"
  >

    <DxTooltip
    :enabled="true"
    :customize-tooltip="customizeTooltip"
     :shared="true"
    />
     <DxSeries
      color="teal"
      :corner-radius= 10
      type="bar"
      />
    <DxLegend :visible="false"/>
     <DxBorder :visible="true"/>
  </DxChart>
</template>
<script>
import {
  DxChart,
  DxTooltip,
  DxSeries,
  DxLegend,
  DxBorder
} from 'devextreme-vue/chart'

export default {
  components: {
    DxChart,
    DxTooltip,
    DxSeries,
    DxLegend,
    DxBorder
  },
  mounted () {
    this.$store.dispatch('loadGraficoSaldoContas')
  },
  methods: {
    customizeTooltip (pointInfo) {
      return {
        html: `
        <div>
          <div class='tooltip-header'>
          ${pointInfo.argumentText}
          </div>
          <div class='tooltip-body'>
          <div class='series-name'>Saldo: </div>
          <div class='value-text'>${pointInfo.points[0].valueText}
        </div>
        `
      }
    }
  }
}
</script>
<style>
#chart {
    height: 440px;
}
</style>
