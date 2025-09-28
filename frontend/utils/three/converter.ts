import {
  IDBArc,
  IDBCircle,
  IDBElement,
  IDBEllipse,
  IDBLine,
  IDBMesh,
  IDBPoint,
  IDBPointCloud
} from '@/utils/interface'
import {
  BufferGeometry,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  Points,
  PointsMaterial,
  Vector3
} from 'three'
import { getCenter } from '../math/geometry'

export class Converter {
  public lineMaterial: LineBasicMaterial = new LineBasicMaterial({
    color: 0x7f7f7f,
    linewidth: 1,
    vertexColors: true,
    alphaToCoverage: false,
    toneMapped: false,
    opacity: 1
  })

  public pointMaterial: PointsMaterial = new PointsMaterial({
    color: 0xff000000,
    size: 2,
    sizeAttenuation: false,
    toneMapped: false
  })

  public convert (DBElement: IDBElement): false | Line | Points | Mesh {
    switch (DBElement.type) {
      case 'Line':
        return this.convertLine(DBElement)
      case 'Arc':
        return this.convertArc(DBElement)
      case 'Circle':
        return this.convertCircle(DBElement)
      case 'Ellipse':
        return this.convertEllipse(DBElement)
      case 'Point':
        return this.convertPoint(DBElement)
      case 'PointCloud':
        return this.convertPointCloud(DBElement)
      case 'Mesh':
        return this.convertMesh(DBElement)
      default:
        return false
    }
  }

  public convertLine (DBLine: IDBLine) {
    const points: Vector3[] = []

    for (const point of DBLine.data) {
      points.push(new Vector3(...point.data))
    }

    const geometry = new BufferGeometry().setFromPoints(points)

    return new Line(geometry, this.lineMaterial)
  }

  public convertArc (DBArc: IDBArc) {
    const points: Vector3[] = []

    const A = new Vector3(...DBArc.data[0].data)
    const B = new Vector3(...DBArc.data[2].data)
    const C = new Vector3(...DBArc.data[1].data)

    const AB = new Vector3().subVectors(B, A)
    const AC = new Vector3().subVectors(C, A)
    const normal = new Vector3().crossVectors(AB, AC).normalize()

    const center = getCenter(A, B, C)

    const radius = center.distanceTo(A)
    const xAxis = new Vector3().subVectors(A, center).normalize()
    const yAxis = new Vector3().crossVectors(normal, xAxis).normalize()

    function angleTo (p: Vector3) {
      const v = new Vector3().subVectors(p, center)
      const x = v.dot(xAxis)
      const y = v.dot(yAxis)
      return Math.atan2(y, x)
    }

    let angleA = angleTo(A)
    let angleB = angleTo(B)
    let angleC = angleTo(C)

    // Убедимся, что дуга идёт от A до B через C
    if (!(
      (angleA > angleB && angleB < angleC && angleC < angleA) ||
      (angleB > angleC && angleC > angleA)
    )
    ) {
      angleB -= Math.PI * 2
    }
    const steps = 100

    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const angle = angleA + t * (angleB - angleA)
      const point = new Vector3().addVectors(
        xAxis.clone().multiplyScalar(Math.cos(angle) * radius),
        yAxis.clone().multiplyScalar(Math.sin(angle) * radius)
      ).add(center)
      points.push(point)
    }

    const geometry = new BufferGeometry().setFromPoints(points)

    return new Line(geometry, this.lineMaterial)

  }

  public convertCircle (DBCircle: IDBCircle) {
    const points: Vector3[] = []

    const radius = DBCircle.data[2]
    const center = new Vector3(...DBCircle.data[0].data)
    const normal = new Vector3(...DBCircle.data[1].data)

    // Выбираем произвольный вектор, который не коллинеарен с normal
    let arbitrary = new Vector3(0, 1, 0)
    if (Math.abs(normal.dot(arbitrary)) > 0.999) {
      arbitrary.set(1, 0, 0)  // если слишком параллельны, берём другой
    }

    const xAxis = new Vector3().crossVectors(normal, arbitrary).normalize()

    const yAxis = new Vector3().crossVectors(normal, xAxis).normalize()

    const steps = 100

    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const angle = t * Math.PI * 2
      const point = new Vector3().addVectors(
        xAxis.clone().multiplyScalar(Math.cos(angle) * radius),
        yAxis.clone().multiplyScalar(Math.sin(angle) * radius)
      ).add(center)
      points.push(point)
    }

    const geometry = new BufferGeometry().setFromPoints(points)

    return new Line(geometry, this.lineMaterial)
  }

  public convertEllipse (DBEllipse: IDBEllipse) {
    const center = new Vector3(...DBEllipse.data[0].data)
    const semiX = new Vector3(...DBEllipse.data[1].data)
    const semiY = new Vector3(...DBEllipse.data[2].data)

    const xAxis = semiX.clone().sub(center)
    const yAxis = semiY.clone().sub(center)

    const a = xAxis.length()
    const b = yAxis.length()

    xAxis.normalize()
    yAxis.normalize()

    const tStart = 0
    const tEnd = DBEllipse.data[3] ? Math.PI * 2 : Math.PI

    const steps = 100
    const points: Vector3[] = []

    for (let i = 0; i <= steps; i++) {
      const t = tStart + (i / steps) * (tEnd - tStart)
      const point = new Vector3().addScaledVector(xAxis, Math.cos(t) * a).
        addScaledVector(yAxis, Math.sin(t) * b).
        add(center)

      points.push(point)
    }

    const geometry = new BufferGeometry().setFromPoints(points)

    return new Line(geometry, this.lineMaterial)
  }

  public convertPoint (DBPoint: IDBPoint) {
    const geometry = new BufferGeometry().setFromPoints([
      new Vector3(...DBPoint.data)
    ])
    return new Points(geometry, this.pointMaterial)
  }

  public convertPointCloud (DBPointCloud: IDBPointCloud) {
    let points: Array<Vector3> = []

    for (const DBPoint of DBPointCloud.data) {
      points.push(new Vector3(...DBPoint.data))
    }

    const geometry = new BufferGeometry().setFromPoints(points)
    return new Points(geometry, this.pointMaterial)
  }

  public convertMesh (DBMesh: IDBMesh) {
    const geometry = new BufferGeometry()
    geometry.setAttribute('position',
      new Float32BufferAttribute(DBMesh.data[0], 3))
    geometry.setIndex(DBMesh.data[1])
    geometry.computeVertexNormals() // если нет нормалей

    const material: MeshStandardMaterial = new MeshStandardMaterial({
      color: new Color(...DBMesh.data[2]),
      emissive: 0x0,
      roughness: 1,
      metalness: 0,
      side: DoubleSide,
      clipShadows: true,
      opacity: DBMesh.data[3],
      // wireframe: true,
      depthTest: true
    })

    material.transparent = material.opacity < 1
    material.depthWrite = !material.transparent

    material.color.convertSRGBToLinear()
    material.emissive.convertSRGBToLinear()

    const mesh = new Mesh(geometry, material)

    mesh.castShadow = !material.transparent
    mesh.receiveShadow = !material.transparent

    mesh.renderOrder = material.transparent ? 10 : 0
    return mesh
  }
}