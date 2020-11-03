export const Actions = {
 border: 'border',
 cutter: 'cutter',
 rotate: 'rotate',
 resize: 'resize',
 quality: 'quality',
 roundCorners: 'roundCorners',
 overlay: 'overlay',
 underlay: 'underlay',
 addVariables: 'addVariables',
 customFunction: 'customFunction',
 effect: 'effect',
 adjust: 'adjust',
 presetTransformation: 'presetTransformation',
 backgroundColor: 'backgroundColor',
 format: 'format',
}

type Adjustment = 'viesus_correct' | 'auto_brightness' | 'brightness' | 'auto_contrast' | 'auto_color'

type BorderType = 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'

type ResizeType = 'imaggaScale' | 'imaggaCrop' | 'crop' | 'fill' | 'scale' | 'minimumPad' | 'fit' | 'pad' | 'limitFit' | 'thumbnail' | 'limitFill' | 'minimumFit' | 'limitPad' | 'fillPad'

export const rotate = (angel: number) => angel ? `a_${angel}` : ''

export const border = ({ type = 'solid', color = 'black', width }: { type?: BorderType, color?: string, width: number | string }) => {
  if (width) {
    return `bo_${width}px_${type}_${color}`
  }

  return ''
}

export const cutter = () => {}

export const resize = ({ type = 'scale', width, height }: { type?: ResizeType, width?: number | string, height?: number | string }) => {
  const w = width ? `,w_${width}` : ''
  const h = height ? `,h_${height}` : ''

  return `c_${type}${w}${h}`
}

export const roundCorners = (value: string | number) => `r_${value}`

export const quality = (value: string | number = 'auto') => value ? `q_${value}` : ''

export const underlay = () => {}

export const addVariables = () => {}

export const customFunction = () => {}

export const effect = () => {}

export const presetTransformation = () => {}

export const backgroundColor = (value: string) => value ? `b_${value}`: ''

export const format = (type: string = 'auto') => type ? `f_${type}` : ''

export const adjust = (type: Adjustment, value?: string | number) => {
  return type ? `e_${type}${value ? `:${value}`: ''}` : ''
}
