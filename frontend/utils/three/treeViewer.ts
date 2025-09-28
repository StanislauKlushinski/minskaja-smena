import * as THREE from 'three'
import {
  Clock,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  Object3D,
  Texture
} from 'three'
import {
  CameraController,
  HybridCameraController
} from '@/utils/three/cameraController'
import { World } from '@/utils/three/world'
import { Assets } from '@/utils/three/assets/asset'
import { TIME_MS } from '@/utils/math/time'
import Renderer from '@/utils/three/renderer'
import { IModelFull } from '@/utils/interface'
import { Converter } from '@/utils/three/converter'

export class TreeViewer {
  protected container: HTMLElement
  public cameraController: CameraController
  public renderer: Renderer
  protected world: World = new World()
  public elements: Object3D[] = []

  protected clock: Clock

  public constructor (
    container: HTMLElement
  ) {
    this.container = container
    this.renderer = new Renderer(this, this.container)
    this.cameraController = new HybridCameraController(this)
    this.clock = new Clock()

    window.addEventListener('resize', this.resize.bind(this), false)

    this.frame()
    this.resize()
  }

  /** various utils/helpers */
  public get World (): World {
    return this.world
  }

  public getContainer () {
    return this.container
  }

  public getRenderer () {
    return this.renderer
  }

  public resize () {
    const width = this.container.offsetWidth
    const height = this.container.offsetHeight
    this.renderer.resize(width, height)
    this.cameraController?.onResize()
  }

  protected frame () {
    this.update()
    this.render()
  }

  protected update () {
    const delta = this.clock.getDelta() * TIME_MS.second
    this.cameraController?.onEarlyUpdate(delta)
    requestAnimationFrame(this.frame.bind(this))
  }

  protected render () {
    this.renderer.render()
  }

  public async init (): Promise<void> {
    Assets.getEnvironment(
      this.renderer.renderer
    ).then((value: Texture) => {
      this.renderer.indirectIBL = value
    })
  }

  public clear () {
    for (const element of this.elements) {
      this.renderer.scene.remove(element)
    }
    this.elements = []
    this.World.clear()
  }

  public sleep (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  public async loadModel (modelFull: IModelFull) {
    this.clear()
    this.cameraController.default()

    const converter = new Converter()

    for (const DBElement of modelFull.elements) {
      const object = converter.convert(DBElement)
      if (object) {
        this.renderer.scene.add(object)

        this.elements.push(object)

        let bbox = new THREE.Box3().setFromObject(object)

        this.World.expandWorld(bbox)

        if (object instanceof Mesh) {
          const edges = new EdgesGeometry(object.geometry, Math.PI * 2)

          const edgeLines = new LineSegments(
            edges,
            new LineBasicMaterial({ color: 0x000000 })
          )

          this.renderer.scene.add(edgeLines)

          this.elements.push(edgeLines)
          this.renderer.updateDirectLights()
        }

        this.cameraController.zoomToBox()
        // await this.sleep(1)
      }
    }
  }

}