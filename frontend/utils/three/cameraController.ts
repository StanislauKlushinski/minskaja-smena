import {
  Box3,
  MathUtils,
  Mesh,
  PerspectiveCamera,
  Sphere,
  Vector3
} from 'three'

import {
  SmoothOrbitControls,
  SmoothOrbitControlsOptions
} from './smoothOrbitControls'
import { TreeViewer } from '@/utils/three/treeViewer'
import { FlyControls, FlyControlsOptions } from '@/utils/three/flyControls'

export enum NearPlaneCalculation {
  ACCURATE
}

export type CameraControllerOptions = SmoothOrbitControlsOptions &
  FlyControlsOptions & { nearPlaneCalculation?: NearPlaneCalculation }

export const DefaultOrbitControlsOptions: Required<CameraControllerOptions> = {
  enableOrbit: true,
  enableZoom: true,
  enablePan: true,
  orbitSensitivity: 1,
  zoomSensitivity: 1,
  panSensitivity: 1,
  inputSensitivity: 1,
  minimumRadius: 0,
  maximumRadius: Infinity,
  minimumPolarAngle: 0,
  maximumPolarAngle: Math.PI,
  minimumAzimuthalAngle: -Infinity,
  maximumAzimuthalAngle: Infinity,
  minimumFieldOfView: 40,
  maximumFieldOfView: 60,
  touchAction: 'none',
  infiniteZoom: true,
  zoomToCursor: true,
  orbitAroundCursor: true,
  showOrbitPoint: true,
  lookSpeed: 1,
  moveSpeed: 1,
  damperDecay: 30,
  enableLook: true,
  relativeUpDown: false,
  nearPlaneCalculation: NearPlaneCalculation.ACCURATE
}

export class CameraController {
  protected _renderingCamera: PerspectiveCamera
  public _activeControls: SmoothOrbitControls | FlyControls
  protected _orbitControls: SmoothOrbitControls
  protected _flyControls: FlyControls
  protected _options: Required<CameraControllerOptions> = DefaultOrbitControlsOptions

  protected viewer: TreeViewer

  get renderingCamera (): PerspectiveCamera {
    return this._renderingCamera
  }

  public get fieldOfView (): number {
    return this._renderingCamera.fov
  }

  public get aspect (): number {
    return this._renderingCamera.aspect
  }

  public constructor (viewer: TreeViewer) {
    this.viewer = viewer

    this._renderingCamera = new PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight
    )

    this._flyControls = new FlyControls(
      this._renderingCamera,
      this.viewer.getContainer(),
      this.viewer.World,
      this._options
    )
    this._flyControls.enabled = false
    this._flyControls.setDamperDecayTime(30)
    this._flyControls.up = new Vector3(0, 0, 1)

    this._orbitControls = new SmoothOrbitControls(
      this._renderingCamera,
      this.viewer.getContainer(),
      this.viewer.World,
      this.viewer.getRenderer(),
      this._options
    )
    this._orbitControls.enabled = true

    this.viewer.getRenderer().cameraController = this

    this._activeControls = this._orbitControls
    // this._activeControls = this._flyControls

    this.default()
  }

  public default () {
    if (this._activeControls instanceof SmoothOrbitControls) {
      this._activeControls.up = new Vector3(0, 0, 1)
      this._activeControls.setOrbit(2.356, 0.955)
      this._activeControls.jumpToGoal()
    }
  }

  public onEarlyUpdate (_delta?: number) {
    const changed = this._activeControls.update(_delta)
    if (changed) {
      this.updateCameraPlanes()
    }
  }

  public onResize () {
    this._renderingCamera.aspect = this.viewer.getContainer().offsetWidth /
      this.viewer.getContainer().offsetHeight
    this._renderingCamera.updateProjectionMatrix()
  }

  public updateCameraPlanes (targetVolume?: Box3, offsetScale: number = 1) {
    if (!this._renderingCamera) {
      return
    }

    if (!targetVolume) {
      targetVolume = this.viewer.getRenderer().sceneBox
    }
    let nearPlane = this.computeNearCameraPlaneAccurate(
      targetVolume,
      offsetScale
    )
    if (nearPlane) {
      this._renderingCamera.near = nearPlane
      this._renderingCamera.updateProjectionMatrix()
    }
    this.updateFarCameraPlane()
  }

  public toggleControls () {
    const oldControls: SmoothOrbitControls | FlyControls = this._activeControls
    let newControls: SmoothOrbitControls | FlyControls | undefined

    if (this._activeControls instanceof SmoothOrbitControls) {
      newControls = this._flyControls
    } else { newControls = this._orbitControls }

    if (!newControls) {
      throw new Error('Not controls found!')
    }

    oldControls.enabled = false
    newControls.enabled = true

    newControls.fromPositionAndTarget(
      oldControls.getCurrentPosition(),
      oldControls.getCurrentTarget()
    )
    newControls.jumpToGoal()
    this._activeControls = newControls
  }

  protected computeNearCameraPlaneEmpiric (
    targetVolume?: Box3,
    offsetScale: number = 1
  ): number | undefined {
    if (!targetVolume) {
      return
    }

    if (targetVolume.isEmpty()) {
      return
    }

    const size = targetVolume.getSize(new Vector3())
    const maxSize = Math.max(size.x, size.y, size.z)
    const camFov =
      this._renderingCamera === this._renderingCamera ? this.fieldOfView : 55
    const camAspect =
      this._renderingCamera === this._renderingCamera ? this.aspect : 1.2
    const fitHeightDistance = maxSize /
      (2 * Math.atan((Math.PI * camFov) / 360))
    const fitWidthDistance = fitHeightDistance / camAspect
    const distance = offsetScale * Math.max(fitHeightDistance, fitWidthDistance)

    return this._renderingCamera ? distance / 100 : 0.001
  }

  protected computeNearCameraPlaneAccurate (
    targetVolume?: Box3,
    offsetScale: number = 1
  ): number | undefined {
    const minDist = this.getClosestGeometryDistance()
    this._flyControls.minDist = minDist
    this._orbitControls.minDist = minDist

    if (minDist === Number.POSITIVE_INFINITY) {
      return this.computeNearCameraPlaneEmpiric(targetVolume, offsetScale)
    }

    const camFov =
      this._renderingCamera === this._renderingCamera ? this.fieldOfView : 55
    const camAspect =
      this._renderingCamera === this._renderingCamera ? this.aspect : 1.2
    // console.log(minDist, nearPlane)
    return Math.max(minDist, 0) /
      Math.sqrt(
        1 +
        Math.pow(Math.tan(((camFov / 180) * Math.PI) / 2), 2) *
        (Math.pow(camAspect, 2) + 1)
      )
  }

  protected getClosestGeometryDistance (): number {
    const cameraPosition = this._activeControls.getCurrentPosition()
    const meshes = this.viewer.elements.filter(el => el instanceof Mesh)

    let minDistance = Infinity

    for (const mesh of meshes) {
      const box = new Box3().setFromObject(mesh)
      const closestPoint = box.clampPoint(cameraPosition.clone(),
        new Vector3())
      const distance = closestPoint.distanceTo(cameraPosition)

      if (distance < minDistance) {
        minDistance = distance
      }
    }
    return minDistance
  }

  protected updateFarCameraPlane () {
    const renderer = this.viewer.getRenderer()
    if (!this._renderingCamera) {
      return
    }

    const v = new Vector3()
    const box = renderer.sceneBox
    const camPos = new Vector3().copy(this._renderingCamera.position)
    let d = 0
    v.set(box.min.x, box.min.y, box.min.z) // 000
    d = Math.max(camPos.distanceTo(v), d)
    v.set(box.min.x, box.min.y, box.max.z) // 001
    d = Math.max(camPos.distanceTo(v), d)
    v.set(box.min.x, box.max.y, box.min.z) // 010
    d = Math.max(camPos.distanceTo(v), d)
    v.set(box.min.x, box.max.y, box.max.z) // 011
    d = Math.max(camPos.distanceTo(v), d)
    v.set(box.max.x, box.min.y, box.min.z) // 100
    d = Math.max(camPos.distanceTo(v), d)
    v.set(box.max.x, box.min.y, box.max.z) // 101
    d = Math.max(camPos.distanceTo(v), d)
    v.set(box.max.x, box.max.y, box.min.z) // 110
    d = Math.max(camPos.distanceTo(v), d)
    v.set(box.max.x, box.max.y, box.max.z) // 111
    d = Math.max(camPos.distanceTo(v), d)
    this._renderingCamera.far = d * 2
    this._renderingCamera.updateProjectionMatrix()
  }

  public zoomToBox () {
    let box = this.viewer.getRenderer().getBox()
    if (box.max.x === Infinity || box.max.x === -Infinity) {
      box = new Box3(new Vector3(-1, -1, -1), new Vector3(1, 1, 1))
    }

    const targetSphere = new Sphere()
    box.getBoundingSphere(targetSphere)
    targetSphere.radius = this.fitToRadius(targetSphere.radius) * 1.2
    this._activeControls.fitToSphere(targetSphere)
  }

  protected fitToRadius (radius: number) {
    // https://stackoverflow.com/a/44849975
    const vFOV = this._renderingCamera.getEffectiveFOV() * MathUtils.DEG2RAD
    const hFOV = Math.atan(
      Math.tan(vFOV * 0.5) * this._renderingCamera.aspect) * 2
    const fov = 1 < this._renderingCamera.aspect ? vFOV : hFOV
    return radius / Math.sin(fov * 0.5)
  }
}

type MoveType = 'forward' | 'back' | 'left' | 'right' | 'up' | 'down'

export class HybridCameraController extends CameraController {
  protected keyMap: Record<MoveType, boolean> = {
    forward: false,
    back: false,
    left: false,
    right: false,
    up: false,
    down: false
  }

  protected contextMenuTriggered = false

  public constructor (viewer: TreeViewer) {
    super(viewer)
    document.addEventListener('keydown', this.onKeyDown.bind(this))
    document.addEventListener('keyup', this.onKeyUp.bind(this))
    document.addEventListener('contextmenu', this.onContextMenu.bind(this))
  }

  public onEarlyUpdate (_delta?: number): void {
    super.onEarlyUpdate(_delta)
    /** We do this because sometimes while holding a kewy down you get an extra
     *  key down event **after** the context menu event, locking it in place
     */
    if (this.contextMenuTriggered) {
      this.cancelMove()
      this.contextMenuTriggered = false
    }
  }

  protected onKeyDown (event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.keyMap.forward = true
        break

      case 'ArrowLeft':
      case 'KeyA':
        this.keyMap.left = true
        break

      case 'ArrowDown':
      case 'KeyS':
        this.keyMap.back = true
        break

      case 'ArrowRight':
      case 'KeyD':
        this.keyMap.right = true
        break

      case 'PageUp':
      case 'KeyE':
        this.keyMap.up = true
        break

      case 'PageDown':
      case 'KeyQ':
        this.keyMap.down = true
        break
    }
    if (
      !this._flyControls.enabled &&
      Object.values(this.keyMap).some((v) => v)
    ) {
      this.toggleControls()
    }
  }

  protected onKeyUp (event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.keyMap.forward = false
        break

      case 'ArrowLeft':
      case 'KeyA':
        this.keyMap.left = false
        break

      case 'ArrowDown':
      case 'KeyS':
        this.keyMap.back = false
        break

      case 'ArrowRight':
      case 'KeyD':
        this.keyMap.right = false
        break

      case 'PageUp':
      case 'KeyE':
        this.keyMap.up = false
        break

      case 'PageDown':
      case 'KeyQ':
        this.keyMap.down = false
        break
    }
    if (
      this._flyControls.enabled &&
      Object.values(this.keyMap).every((v) => !v)
    ) {
      this.toggleControls()
    }
  }

  protected onContextMenu () {
    this.contextMenuTriggered = true
  }

  protected cancelMove () {
    this.keyMap.back = false
    this.keyMap.forward = false
    this.keyMap.down = false
    this.keyMap.up = false
    this.keyMap.left = false
    this.keyMap.right = false
    if (
      this._flyControls.enabled &&
      Object.values(this.keyMap).every((v) => !v)
    ) {
      this.toggleControls()
    }
  }
}
