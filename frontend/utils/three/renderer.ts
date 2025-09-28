import * as THREE from 'three'
import {
  ACESFilmicToneMapping,
  Box3,
  DirectionalLight,
  Group,
  Object3D,
  Scene,
  Sphere,
  Spherical,
  Texture,
  Vector2,
  Vector3,
  VSMShadowMap,
  WebGLRenderer
} from 'three'
import { TreeViewer } from './treeViewer'
import { type CameraController } from './cameraController'

import './three-extensions/three-extensions'
import { Intersections } from '@/utils/three/intersection'

export default class Renderer {
  protected _renderer: WebGLRenderer
  protected _scene: Scene
  protected _needsRender: boolean = true
  protected _cameraController: CameraController | null = null
  protected _intersections: Intersections

  protected container: HTMLElement
  protected rootGroup: Group

  protected sun: DirectionalLight = new DirectionalLight(0xffffff, 5)
  protected sunTarget: Object3D = new Object3D()

  public viewer: TreeViewer

  public get renderer (): WebGLRenderer {
    return this._renderer
  }

  /**************
   * Intersections */
  public get intersections (): Intersections {
    return this._intersections
  }

  public get sceneBox (): Box3 {
    const bounds: Box3 = new Box3()

    const elements = this.viewer.elements

    for (const element of elements) {
      let bbox = new THREE.Box3().setFromObject(element)
      bounds.union(bbox)
    }

    return bounds
  }

  public get sceneSphere (): Sphere {
    return this.sceneBox.getBoundingSphere(new Sphere())
  }

  public get sceneCenter (): Vector3 {
    return this.sceneBox.getCenter(new Vector3())
  }

  public get scene () {
    return this._scene
  }

  public set indirectIBL (texture: Texture) {
    this._scene.environment = texture
  }

  public set cameraController (value: CameraController) {
    this._cameraController = value
  }

  public constructor (viewer: TreeViewer, container: HTMLElement) {
    this._scene = new Scene()
    this.rootGroup = new Group()
    this.rootGroup.name = 'ContentGroup'
    this._scene.add(this.rootGroup)
    this._intersections = new Intersections()

    this.viewer = viewer
    this._renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      stencil: true
    })
    this._renderer.setClearColor(0xffffff, 0)
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.toneMapping = ACESFilmicToneMapping
    this._renderer.toneMappingExposure = 0.5
    this._renderer.shadowMap.enabled = true
    this._renderer.shadowMap.type = VSMShadowMap
    this._renderer.shadowMap.autoUpdate = false
    this._renderer.shadowMap.needsUpdate = true

    /** No autoclear. We're clearing ourselves */
    this._renderer.autoClear = false
    this._renderer.autoClearColor = false
    this._renderer.autoClearDepth = false
    this._renderer.autoClearStencil = false

    this.container = container
    this._renderer.setSize(container.offsetWidth, container.offsetHeight)
    container.appendChild(this._renderer.domElement)

    this.addDirectLights()
  }

  public render (): void {
    if (!this._cameraController) {
      return
    }

    if (this._needsRender) {
      this._renderer.clear(true, true, true)
      this._cameraController.renderingCamera.layers.enableAll()
      this._renderer.render(this.scene, this._cameraController.renderingCamera)
      let drawingSize = new Vector2()

      this._renderer.getDrawingBufferSize(drawingSize)
      this._needsRender = drawingSize.length() !== 0
    }
  }

  public resize (width?: number, height?: number) {
    if (!width || !height) {
      const size = this._renderer.getSize(new Vector2())
      width = size.x
      height = size.y
    }
    width = Math.floor(width)
    height = Math.floor(height)
    this.renderer.setSize(width, height)
    this._needsRender = true
  }

  private addDirectLights () {
    this.sun.name = 'sun'
    this._scene.add(this.sun)

    this.sun.castShadow = true

    this.sun.shadow.mapSize.width = 2048
    this.sun.shadow.mapSize.height = 2048

    const d = 50

    this.sun.shadow.camera.left = -d
    this.sun.shadow.camera.right = d
    this.sun.shadow.camera.top = d
    this.sun.shadow.camera.bottom = -d
    this.sun.shadow.camera.near = 5
    this.sun.shadow.camera.far = 350
    this.sun.shadow.bias = -0.001
    this.sun.shadow.radius = 2

    this._scene.add(this.sunTarget)
    this.sunTarget.position.copy(this.sceneCenter)
    this.sun.target = this.sunTarget
  }

  public updateDirectLights () {
    const phi = 1.33
    const theta = 0.75
    const radiusOffset = 0

    const spherical = new Spherical(this.sceneSphere.radius + radiusOffset, phi,
      theta)
    this.sun.position.setFromSpherical(spherical)

    this.renderer.shadowMap.needsUpdate = true
  }

  public getBox (): Box3 {
    return this.sceneBox
  }
}
