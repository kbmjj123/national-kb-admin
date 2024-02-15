/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { PluginOption } from 'vite';

import { createHtmlPlugin } from 'vite-plugin-html';

import pkg from '../../../package.json';
import { GLOB_CONFIG_FILE_NAME } from '../../constant';

// 对vite-plugin-html进行一个包装，根据环境变量以及构建模式来对html进行处理
export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;

  // 自动追加'/'后缀
  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;

  // 根据当前版本信息以及时间戳，动态生成每次构建的版本信息
  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;
  };

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // 注入站点的标题
      data: {
        title: VITE_GLOB_APP_TITLE,
      },
      // 如果是打包状态下，则潜入一个script节点标签，并指向其版本描述信息
      // 也就是<script src="app.config.js?v=版本-时间戳"></script>
      tags: isBuild
        ? [
            {
              tag: 'script',
              attrs: {
                src: getAppConfigSrc(),
              },
            },
          ]
        : [],
    },
  });
  return htmlPlugin;
}
