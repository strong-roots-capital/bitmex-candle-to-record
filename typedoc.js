module.exports = {
    src: [
        './src/bitmex-candle-to-record.ts',
    ],
    mode: 'file',
    includeDeclarations: true,
    tsconfig: 'tsconfig.json',
    out: './doc',
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: true,
    excludeNotExported: true,
    readme: 'readme.md',
    name: 'bitmex-candle-to-record',
    ignoreCompilerErrors: true,
    plugin: 'none',
    listInvalidSymbolLinks: true,
    theme: 'markdown'
};
