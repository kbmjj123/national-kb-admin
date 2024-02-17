import type { App, Directive } from 'vue'

type DirectiveType = {
  default: Directive
}

const modules = import.meta.glob<DirectiveType>('../directives/*.ts', { eager: true })

export function setupDirectives(app: App) {
  Object.keys(modules).forEach((key) => {
    const directive = modules[key]
    //! 因为采用import.meta.glob会自动将路径做为key，因此需要做下替换
    app.directive(key.replace('../directives/', '').replace('.ts', ''), directive.default)
  })
}
