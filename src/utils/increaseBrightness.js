export function increaseBrightness(hex, percent) {
  // Remove # from the 'hex'
  if (hex[0] === '#') {
    hex = hex.substring(1)
  }

  // Convert 3 char to 6 char (example: 'ABC' -> 'AABBCC')
  if (hex.length === 3) {
    hex = hex[0].repeat(2) + hex[1].repeat(2) + hex[2].repeat(2)
  }

  // RGB Channel
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(2, 4), 16)

  return (
    '#' +
    (0 | ((1 << 8) + r + ((256 - r) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + g + ((256 - g) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
  )
}
