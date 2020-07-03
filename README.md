# inline-script-html-plugin

inject the js inline at html ,see https://github.com/facebook/create-react-app/blob/edc671eeea6b7d26ac3f1eb2050e50f75cf9ad5d/packages/react-dev-utils/InlineChunkHtmlPlugin.js#L10

## Installtion

```
npm install --save-dev inline-script-html-plugin
```

## Basic Usage

```
plugins: [
  new HtmlWebpackPlugin(),
  new InlineScriptHtmlPlugin({name: ['runtime']})
]
```
