import { L } from "../../utils";
import { AugmentModule } from "../../common/augmentModule";

declare global {
    interface Options {
        urlloaderbytes?: number;
    }
}

export default class extends AugmentModule {

    executeIf(resp: Config) {
        return resp.type === 'web';
    }

    augment(): void {
        const { urlloaderbytes } = this.options;

        const urlLoaderWithSizeLimit = {
            loader: 'url-loader',
            options: {
                limit: typeof urlloaderbytes === 'number' ? urlloaderbytes : 8192, // will convert media < 8kb to base64 strings
                name: 'media/[name]-[hash].[ext]' // <- for file-loader
            }
        }

        this.addRules(
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    urlLoaderWithSizeLimit,
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: L(this.isDev)
                        }
                    }
                ]
            },
            {
                test: /\.mp4$/i,
                ...urlLoaderWithSizeLimit
            }
        )
    }
}
