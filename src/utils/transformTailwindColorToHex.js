import colors from 'tailwindcss/colors'

export const transformTailwindColorToHex = (defaultColor) => {
  if (defaultColor[0] === '#') {
    return
  }

  const defaultColorArray = defaultColor.split('-')

  const colorName = defaultColorArray[0]

  if (typeof colors[colorName] === 'object') {
    const colorGradient = defaultColorArray[1]

    return colors[colorName][colorGradient]
  }
  return colors[colorName]
}
