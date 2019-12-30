export default {
  name: 'fr-number',
  // functional: true,
  props: {
    vname: String,
    schema: Object,
    formData: Object,
  },
  render(h) {
    return (
      <el-input-number
        type="number"
        v-model={this.formData[this.vname]}
        {...this.schema.options}
      />
    )
  },
}
