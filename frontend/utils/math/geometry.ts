import { Vector3 } from 'three'

export function getCenter (
  A: Vector3,
  B: Vector3,
  C: Vector3
): Vector3 {

  const AB = new Vector3().subVectors(B, A)
  const AC = new Vector3().subVectors(C, A)

  const normal = new Vector3().crossVectors(AB, AC).normalize()

  const AB_mid = new Vector3().addVectors(A, B).multiplyScalar(0.5)
  const AC_mid = new Vector3().addVectors(A, C).multiplyScalar(0.5)
  const AB_perp = new Vector3().crossVectors(AB, normal).normalize()
  const AC_perp = new Vector3().crossVectors(AC, normal).normalize()

  // Решаем: AB_mid + t * AB_perp = AC_mid + s * AC_perp
  const delta = new Vector3().subVectors(AC_mid, AB_mid)
  const a = AB_perp.dot(AB_perp)
  const b = AB_perp.dot(AC_perp)
  const c = AC_perp.dot(AC_perp)
  const d = AB_perp.dot(delta)
  const e = AC_perp.dot(delta)
  const denom = a * c - b * b
  const t = (d * c - b * e) / denom
  return new Vector3().addVectors(AB_mid,
    AB_perp.clone().multiplyScalar(t))
}

