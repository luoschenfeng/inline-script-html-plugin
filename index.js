// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require('html-webpack-plugin')
 
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

class InlineScriptHtmlPlugin {
  /**
   * 
   * @param {object} [tests] 
   * @param {string[]} tests.name 
   */
  constructor(tests) {
    // this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.tests = tests ? tests: {};
  }

  getInlinedTag(publicPath, assets, tag) {
    if (tag.tagName !== 'script' || !(tag.attributes && tag.attributes.src)) {
      return tag;
    }
    const scriptName = publicPath
      ? tag.attributes.src.replace(publicPath, '')
      : tag.attributes.src;
    if (Boolean(this.tests) && this.tests.name) {
      const name = this.tests.name
      if (name.some(test => scriptName.match(test))) {
        const asset = assets[scriptName];
        if (asset == null) {
          return tag;
        }
        return { tagName: 'script', innerHTML: asset.source(), closeTag: true };
      } else {
        return tag
      }
    } else {
      return tag
    }
  }

  apply(compiler) {
    let publicPath = compiler.options.output.publicPath || '';
    if (publicPath && !publicPath.endsWith('/')) {
      publicPath += '/';
    }

    compiler.hooks.compilation.tap('InlineScriptHtmlPlugin', compilation => {
      const tagFunction = tag => this.getInlinedTag(publicPath, compilation.assets, tag);
      
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tap(
        'InlineScriptHtmlPlugin',
        assets => {
          assets.bodyTags = assets.bodyTags.map(tagFunction);
        }
      )
    });

      // Still emit the runtime chunk for users who do not use our generated
      // index.html file.
      // hooks.afterEmit.tap('InlineScriptHtmlPlugin', () => {
      //   Object.keys(compilation.assets).forEach(assetName => {
      //     if (this.tests.some(test => assetName.match(test))) {
      //       delete compilation.assets[assetName];
      //     }
      //   });
      // });
  }
}

module.exports = InlineScriptHtmlPlugin;