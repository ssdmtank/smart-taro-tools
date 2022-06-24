import NodePath from 'path'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupTypescript from '@rollup/plugin-typescript'
import RollupBabel from '@rollup/plugin-babel'
import RollupClear from 'rollup-plugin-clear'

const externalPackages = ['react', '@tarojs/taro', '@tarojs/components']

const resolveFile = (path) => NodePath.resolve(__dirname, path)

const shareConfig = {
  input: resolveFile('src/index.ts'),
  plugins: [
    RollupClear({ targets: ['lib', 'esm'] }),
    RollupNodeResolve({ moduleDirectories: ['node_modules'] }),
    RollupCommonjs({ include: /\/node_modules\// }),
  ],
  external: externalPackages,
}
export default [
  {
    ...shareConfig,
    plugins: [
      ...shareConfig.plugins,
      RollupTypescript({ outDir: 'esm' }),
      RollupBabel({
        babelHelpers: 'runtime',
        extensions: ['.ts'],
      }),
    ],
    output: [
      {
        dir: 'esm',
        format: 'esm',
        sourcemap: true,
        preserveModules: true,
        exports: 'auto',
      },
    ],
  },
  {
    ...shareConfig,
    plugins: [
      ...shareConfig.plugins,
      RollupTypescript({ outDir: 'lib' }),
      RollupBabel({
        babelHelpers: 'runtime',
        extensions: ['.ts'],
      }),
    ],
    output: [
      {
        dir: 'lib',
        format: 'cjs',
        sourcemap: true,
        preserveModules: true,
        exports: 'auto',
      },
    ],
  },
]
