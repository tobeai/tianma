export default {
  name: 'fr-switch',
  // functional: true,
  props: {
    vname: String,
    schema: Object,
    formData: Object,
  },
  render(h) {
    const {
      vname,
      schema = {},
      formData = {},
    } = this.$props

    return (
      <el-switch
        v-model={formData[vname]}
        {...schema.options}
      />
    )
  },
}
