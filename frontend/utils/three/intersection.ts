import { Box3, Camera, Raycaster, Scene, Vector2 } from 'three'
import { OBB } from 'three/examples/jsm/math/OBB.js'
import { World } from '@/utils/three/world'

export class Intersections {
  protected raycaster: Raycaster
  private boundsBuffer: Box3 | OBB = new Box3()

  public constructor () {
    this.raycaster = new Raycaster()
    this.raycaster.params.Line = { threshold: 0.01 }
    this.raycaster.params.Points = { threshold: 0.01 }
  }

  public intersect (
    scene: Scene,
    camera: Camera,
    point: Vector2,
    nearest?: boolean,
    bounds?: Box3 | OBB,
    firstOnly?: boolean,
    tasOnly?: boolean
  ): Array<any> | null

  public intersect (
    scene: Scene,
    camera: Camera,
    point: Vector2,
    nearest = true,
    bounds?: Box3 | OBB,
    firstOnly = false
  ): Array<any> | null {
    this.raycaster.setFromCamera(point, camera)
    this.raycaster.firstHitOnly = firstOnly
    const preserveMask = this.setRaycasterLayers()

    let result: Array<any> | null
    result = this.intersectInternal(scene, nearest, bounds)
    this.raycaster.layers.mask = preserveMask
    return result
  }

  private setRaycasterLayers (): number {
    const preserveMask = this.raycaster.layers.mask
    this.raycaster.layers.enableAll()
    return preserveMask
  }

  private intersectInternal (
    scene: Scene,
    nearest?: boolean,
    bounds?: Box3 | OBB
  ): any[] | null {
    let results: any[] | null

    results = this.raycaster.intersectObjects(scene.children)

    if (results.length === 0) {
      return null
    }
    if (nearest) {
      results.sort((a, b) => {
        return a.distance - b.distance
      })
    }
    if (bounds) {
      this.boundsBuffer = World.expandBoxRelative(bounds)

      results = results.filter((result) => {
        return (
          this.boundsBuffer.containsPoint(result.point) ||
          (result.pointOnLine
            ? this.boundsBuffer.containsPoint(result.pointOnLine)
            : false)
        )
      })
    }

    return results
  }

}
