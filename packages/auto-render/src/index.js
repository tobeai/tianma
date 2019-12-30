// render

import parse from './base/parser'
import RenderFiled from './base/render-field'

const noop = () => {}

export default {
  name: 'auto-render',
  component: {
    RenderFiled,
  },
  props: {
    vname: {
      type: String,
      default: '$form',
    },
    schema: {
      type: Object,
      default: () => {},
    },
    formData: {
      type: Object,
      default: () => {},
    },
    mapping: {
      type: Object,
      default: () => {},
    },
    widgets: {
      type: Object,
      default: () => {},
    },
  },
  render(h) {
    const {
      vname,
      schema,
      formData,
      fields: customized,
      mapping,
      widgets,
    } = this.$props

    const generated = widgets

    return (
      <div class="vue-auto-render">
        <render-filed
          settings={{
            vname,
            schema,
            formData,
          }}
          fields={{
            // 根据 Widget 生成的 Field
            generated,
            // 自定义的 Field
            customized,
            // 字段 type 与 widgetName 的映射关系
            mapping,
          }}
        />
      </div>
    )
  }
}
