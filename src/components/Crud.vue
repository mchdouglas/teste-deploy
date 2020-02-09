<template>
  <DxDataGrid
    ref="grid"
    :data-source="dataSource"
    :selection="selecao"
    :editing="edicao"
    :search-panel="pesquisa"
    :columns="columns"
    :show-borders="true"
    color="teal"
    :on-toolbar-preparing="toolbarPreparing"
    @selection-changed="onSelectionChanged"
  >
     <DxMasterDetail
      :enabled="mestreDetalhe !== null"
      :aria-expanded="true"
      template="mestreDetalheTemplate"
    />
    <template #mestreDetalheTemplate="{ data }">
      <component
        :is="mestreDetalhe"
        :dados="data"
      />
    </template>
  </DxDataGrid>
</template>

<script>
import { DxDataGrid, DxMasterDetail } from 'devextreme-vue/data-grid'
import CustomStore from 'devextreme/data/custom_store'
import notify from 'devextreme/ui/notify'
export default {
  components: {
    DxDataGrid,
    DxMasterDetail
  },
  props: {
    url: {
      type: String,
      required: true
    },
    carregarDados: {
      type: Function
    },
    colunas: {
      type: Array,
      required: true
    },
    formulario: {
      type: Array,
      required: true
    },
    qtdCamposFormulario: {
      type: Number,
      default: 3
    },
    permiteAdicionar: {
      type: Boolean,
      default: true
    },
    permiteEditar: {
      type: Boolean,
      default: true
    },
    acoes: {
      type: Array,
      default: () => []
    },
    mestreDetalhe: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      fornecedores: [],
      selecao: {
        mode: 'single'
      },
      pesquisa: {
        visible: true,
        width: 300
      },
      edicao: {
        allowAdding: this.permiteAdicionar,
        allowUpdating: this.permiteEditar,
        allowDeleting: true,
        useIcons: true,
        mode: 'form',
        form: {
          labelLocation: 'top',
          colCount: this.qtdCamposFormulario,
          showValidationSummary: true,
          items: this.formulario,
          onInitialized: this.inicializaFormulario
        }
      },
      columns: this.colunas
    }
  },
  methods: {
    onSelectionChanged ({ selectedRowsData }) {
      this.$emit('selecionou', selectedRowsData[0])
    },
    atualizar () {
      const grid = this.$refs.grid.instance
      grid.refresh()
    },
    inicializaFormulario ({ component }) {
      this.$emit('instanciaFormulario', component)
    },
    toolbarPreparing (grid) {
      let toolbarItems = grid.toolbarOptions.items

      this.acoes.forEach(a => toolbarItems.unshift(a))

      toolbarItems.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick (e) {
            grid.component.refresh()
          }
        }
      })
    }
  },
  computed: {
    dataSource () {
      return new CustomStore({
        key: 'id',
        load: async options => {
          if (this.carregarDados) {
            await this.carregarDados()
          }
          let dados = []
          try {
            const { data } = await this.axios.get(this.url)
            dados = data
          } catch {
            notify('Erro ao executar a requisição', 'error', 3000)
          }
          return {
            data: dados,
            totalCount: dados.length
          }
        },
        insert: values => this.axios.post(this.url, values),
        update: (key, values) => this.axios.patch(`${this.url}${key}/`, values),
        remove: async key => {
          try {
            await this.axios.delete(`${this.url}${key}/`)
          } catch {
            notify('Erro ao excluir o registro. Verifique se não existe registros filhos.', 'error', 3000)
          }
        }
      })
    }
  }
}
</script>
