
export default {
  name: 'fr-select',
  // functional: true,
  props: {
    vname: String,
    schema: Object,
    formData: Object,
  },
  render(h, ctx) {
    const {
      vname,
      schema,
      formData,
    } = this.$props

    console.log('select', schema)

    const nodes = (schema.enum || []).map((val, index) => {
      let option = schema.enumNames ? schema.enumNames[index] : val
      const isHtml = typeof option === 'string' && option[0] === '<'
      if (isHtml) {
        option = <span domPropsInnerHTML={{ option }} />
      }

      return (
        <ElOption
          value={val}
          key={index}
        >
          {option}
        </ElOption>
      )
    })

    //
    return (
      <el-select
        v-model={formData[vname]}
        {...schema.options}
      >
        {nodes}
      </el-select>
    )
  },
}
