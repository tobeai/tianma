export default {
  name: 'fr-textarea',
  // functional: true,
  props: {
    vname: String,
    schema: Object,
    formData: Object,
  },
  render(h) {
    return (
      <el-input
        type="textarea"
        v-model={this.formData[this.vname]}
        {...this.schema.options}
      />
    )
  },
}
