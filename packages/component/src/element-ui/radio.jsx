export default {
  name: 'fr-radio',
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
    const { style = {}, options = {} } = schema

    return (
      <el-input
        // type="input"
        v-model={formData[vname]}
        style={style}
        placeholder={options.placeholder}
        disabled={options.disabled}
      />
    )
  },
}
