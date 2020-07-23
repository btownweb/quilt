import {
  Package,
  createComposedProjectPlugin,
  createProjectTestPlugin,
  createProjectBuildPlugin,
} from '@sewing-kit/plugins';
import {react} from '@sewing-kit/plugin-react';
import {javascript} from '@sewing-kit/plugin-javascript';
import {typescript} from '@sewing-kit/plugin-typescript';
import {buildFlexibleOutputs} from '@sewing-kit/plugin-package-flexible-outputs';
import {} from '@sewing-kit/plugin-jest';

function addLegacyDecoratorSupport(config) {
  return {
    presets: config.presets,
    plugins: (config.plugins || []).map(plugin => {
      const pluginName = Array.isArray(plugin) ? plugin[0] : plugin;

      if (pluginName.includes('@babel/plugin-proposal-decorators')) {
        return [pluginName, {legacy: true}];
      } else if (
        pluginName.includes('@babel/plugin-proposal-class-properties')
      ) {
        return [pluginName, {loose: true}];
      } else {
        return plugin;
      }
    }),
  };
}

export function quiltPackage({jestEnv = 'jsdom', useReact = true} = {}) {
  return createComposedProjectPlugin<Package>('Quilt.Package', [
    javascript(),
    typescript(),
    useReact && react(),
    buildFlexibleOutputs({
      esnext: false,
      esmodules: false,
    }),
    createProjectBuildPlugin('Quilt.PackageBuild', ({hooks}) => {
      hooks.target.hook(({hooks}) => {
        hooks.configure.hook(hooks => {
          hooks.babelIgnorePatterns?.hook(ext => [
            ...ext,
            '**/*.test.ts',
            '**/*.test.tsx',
          ]);

          hooks.babelConfig?.hook(addLegacyDecoratorSupport);
        });
      });
    }),
    createProjectTestPlugin('Quilt.PackageTest', ({hooks}) => {
      hooks.configure.hook(hooks => {
        hooks.jestEnvironment?.hook(() => jestEnv);

        hooks.jestConfig?.hook(config => ({
          ...config,
          transform: {
            ...config.transform,
            '\\.(gql|graphql)$': 'jest-transform-graphql',
          },
          watchPathIgnorePatterns: [
            ...config.watchPathIgnorePatterns,
            '<rootDir>/.*/tests?/.*fixtures',
          ],
        }));

        hooks.babelConfig?.hook(addLegacyDecoratorSupport);
      });
    }),
  ]);
}
