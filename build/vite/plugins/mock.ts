import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild: boolean, productMock: boolean){
  return viteMockServe({
    ignore: /^\_/, // 忽略指定格式文件
    mockPath: 'mock', // 设置模拟.ts文件存储文件夹
    watchFiles: true,
    enable: true
  })
}
