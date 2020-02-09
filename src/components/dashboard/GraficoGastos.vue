<template>
  <DxChart
    id="chart"
    :rotated="true"
    :data-source="$store.state.graficoGastoFornecedor"
    title="Gastos e Pagamentos por Fornecedor"
    @pointClick="onPointClick"
  >
    <DxCommonSeriesSettings
      argument-field="fornecedor"
      type="bar"
      hover-mode="allArgumentPoints"
      selection-mode="allArgumentPoints"
    >
      <DxLabel :visible="true">
        <DxFormat
          :precision="0"
          type="fixedPoint"
        />
      </DxLabel>
    </DxCommonSeriesSettings>
    <DxSeries
      value-field="gasto"
      name="Gastos"
      color="teal"
      :corner-radius= 10
    />
    <DxSeries
      value-field="pago"
      name="Pagamentos"
      color="tomato"
      :corner-radius= 10
    />

    <DxLegend :visible="true"/>
    <DxExport :enabled="true"/>

  </DxChart>
</template>
<script>

import DxChart, {
  DxExport,
  DxSeries,
  DxLabel,
  DxLegend,
  DxCommonSeriesSettings,
  DxFormat
} from 'devextreme-vue/chart'

export default {
  components: {
    DxChart,
    DxExport,
    DxSeries,
    DxLabel,
    DxLegend,
    DxCommonSeriesSettings,
    DxFormat
  },
  mounted () {
    this.$store.dispatch('loadGraficoGastoFornecedor')
  },
  methods: {
    onPointClick ({ target }) {
      target.select()
    }
  }
}
</script>
<style>
#chart {
    height: 440px;
}
</style>
