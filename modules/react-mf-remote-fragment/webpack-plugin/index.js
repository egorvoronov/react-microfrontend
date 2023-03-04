const {
    CachedSource,
    ConcatSource,
} = require('webpack-sources');
const PLUGIN_NAME = 'ReactMFRemoteFragmentWebpackPlugin';
const fs = require('fs-extra');
const path = require('path');

class ReactMFRemoteFragmentWebpackPlugin {
    constructor(options) {
        this._options = options;
    }

    async buildRemoteContainerJs() {
        const fragmentName = this._options.name;

        const remoteContainerSourceFiles = path.resolve(__dirname, './sources/remoteContainer/');
        const factorySource = new ConcatSource();

        const filesPromisesToPasteNameBetween = [ '1.txt', '2.txt', '3.txt', '4.txt', '5.txt' ].map(filename => fs.readFile(path.join(remoteContainerSourceFiles, filename), 'utf-8'));

        const filesToPasteNameBetween = await Promise.all(filesPromisesToPasteNameBetween);

        for (let i = 0; i < filesToPasteNameBetween.length; i++) {
            let filePart = filesToPasteNameBetween[ i ];
            if (filePart[ filePart.length - 1 ] === '\n') {
                filePart = filePart.slice(0, -1);
            }
            if (i !== filesToPasteNameBetween.length - 1) {
                factorySource.add(filePart + fragmentName);
            } else {
                factorySource.add(filePart);
            }
        }

        return new CachedSource(factorySource);
    }

    async buildFetchReadFragmentJs() {
        const fragmentName = this._options.name;
        const fragmentUrl = this._options.url;

        const fetchReadFragmentSourceFiles = path.resolve(__dirname, './sources/fetchReadFragment/');
        const fetchReadFactorySource = new ConcatSource();

        const fetchReadFilePartsPromises = [ '1.txt', '2.txt', '3.txt', '4.txt' ].map(filename => fs.readFile(path.join(fetchReadFragmentSourceFiles, filename), 'utf-8'));

        const fetchReadFileParts = await Promise.all(fetchReadFilePartsPromises);

        for (let i = 0; i < fetchReadFileParts.length; i++) {
            let filePart = fetchReadFileParts[ i ];
            if (filePart[ filePart.length - 1 ] === '\n') {
                filePart = filePart.slice(0, -1);
            }
            if (i === fetchReadFileParts.length - 1) {
                fetchReadFactorySource.add(filePart);
            } else if (i !== 2) {
                fetchReadFactorySource.add(filePart + fragmentUrl);
            } else {
                fetchReadFactorySource.add(filePart + fragmentName);
            }
        }
        return new CachedSource(fetchReadFactorySource);
    }

    apply(compiler) {
        compiler.hooks.make.tap(PLUGIN_NAME, (compilation) => {
            compilation.hooks.additionalAssets.tapAsync(PLUGIN_NAME, async (callback) => {
                try {
                    const fragmentName = this._options.name;

                    compilation.assets[ `${fragmentName}/remoteContainer.js` ] = await this.buildRemoteContainerJs();
                    compilation.assets[ `${fragmentName}/fetchReadFragment.js` ] = await this.buildFetchReadFragmentJs();

                    callback();
                } catch (err) {
                    callback(new Error(`${PLUGIN_NAME}: ${err}`));
                }
            });
        });
    }
}

module.exports = ReactMFRemoteFragmentWebpackPlugin;
