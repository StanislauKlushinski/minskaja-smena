import { PMREMGenerator, Texture, WebGLRenderer } from 'three'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'

export class Assets {
  public static getEnvironment (
    renderer: WebGLRenderer
  ): Promise<Texture> {
    return new Promise<Texture>((resolve) => {
      const loader = new EXRLoader()

      loader.load('/hdri/Mild-dwab.texture', (texture) => {
        const generator = new PMREMGenerator(renderer)
        const pmremRT = generator.fromEquirectangular(texture)
        generator.dispose()
        resolve(pmremRT.texture)
      })
    })
  }
}
