import AutoRender from '@tobeai/auto-render'
import { mapping, widgets } from './widgets/element-ui'

const noop = () => {}

// https://cn.vuejs.org/v2/guide/render-function.html
// https://github.com/vuejs/babel-plugin-transform-vue-jsx

// 功能设计: 提供默认素材(组件及映射关系), 供用户便捷使用, 组装功能由 auto-render 实现
// 核心数据 propSchema formData onChange onValidate
// 自定义扩展 mapping widgets parse
export default {
  name: 'fr-entry',
  functional: true,
  render(h, ctx) {
    const {
      mapping: customizedMapping,
      widgets: customizedWidgets,
      // ...rest
    } = ctx.props

    console.log(ctx)

    return <AutoRender
      {...ctx.data}
      mapping={{
        ...mapping,
        ...customizedMapping,
      }}
      widgets={{
        ...widgets,
        ...customizedWidgets,
      }}
      // on={ctx.listeners}
    />
  },
}
