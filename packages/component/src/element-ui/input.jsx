export default {
  name: 'fr-input',
  props: {
    vname: String,
    schema: Object,
    formData: Object,
  },
  render(h) {
    const {
      vname,
      schema: { options },
      formData = {},
    } = this.$props

    return (
      <el-input
        // type="input"
        v-model={formData[vname]}
        {...options}
        clearable={options.clearable}
        placeholder={options.placeholder}
        disabled={options.disabled}
        readonly={options.readonly}
      />
    )
  },
}
