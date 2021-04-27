const getCoordsOnArc = (angle, offset=10) => [
  Math.cos(angle - (Math.PI / 2)) * offset,
  Math.sin(angle - (Math.PI / 2)) * offset,
]

export { getCoordsOnArc }
