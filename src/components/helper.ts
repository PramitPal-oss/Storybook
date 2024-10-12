type ColorResult = {
  textColor: string;
  rgbaVariantbg: string;
  rgbaVarianthover: string;
};

const DEFAULT_ALPHA = {
  bg: 0.1,
  hover: 0.12,
};

const COLOR_VARIANTS = {
  dark: 'var(--color-black-0)',
  light: 'var(--color-white-0)',
} as const;

const LUMINANCE_THRESHOLD = 0.7;

const calculateLuminance = (r: number, g: number, b: number): number => (0.299 * r + 0.587 * g + 0.114 * b) / 255;

const getTextColor = (luminance: number): string => (luminance > LUMINANCE_THRESHOLD ? COLOR_VARIANTS.dark : COLOR_VARIANTS.light);

const createColorVariants = (r: number, g: number, b: number): ColorResult => {
  const luminance = calculateLuminance(r, g, b);
  return {
    textColor: getTextColor(luminance),
    rgbaVariantbg: `rgba(${r}, ${g}, ${b}, ${DEFAULT_ALPHA.bg})`,
    rgbaVarianthover: `rgba(${r}, ${g}, ${b}, ${DEFAULT_ALPHA.hover})`,
  };
};

export const getContrastColor = (color: string): ColorResult | undefined => {
  // Handle HEX colors
  if (color.includes('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return createColorVariants(r, g, b);
  }

  // Handle RGBA colors
  if (color.includes('rgba')) {
    const rgbaValues = color.match(/\d+(\.\d+)?/g);
    if (!rgbaValues) return;
    return createColorVariants(+rgbaValues[0], +rgbaValues[1], +rgbaValues[2]);
  }

  // Handle HSLA colors
  const hslaValues = color.match(/\d+(\.\d+)?%?/g);
  if (!hslaValues) return;

  // Convert HSLA to RGBA for consistent handling
  const hue = +hslaValues[0];
  const saturation = +hslaValues[1];
  const lightness = +hslaValues[2];

  return {
    textColor: getTextColor(calculateLuminance(hue, saturation, lightness)),
    rgbaVariantbg: `hsla(${hue}, ${saturation}%, ${lightness}%, ${DEFAULT_ALPHA.bg})`,
    rgbaVarianthover: `hsla(${hue}, ${saturation}%, ${lightness}%, ${DEFAULT_ALPHA.hover})`,
  };
};


// const getContrastColor = (color: string) => {
//   if (color.includes('#')) {
//     const hex = color.replace('#', '');
//     const r = parseInt(hex.substring(0, 2), 16);
//     const g = parseInt(hex.substring(2, 4), 16);
//     const b = parseInt(hex.substring(4, 6), 16);
//     const rgbaVariantbg = `rgba(${r}, ${g}, ${b}, ${0.1})`;
//     const rgbaVarianthover = `rgba(${r}, ${g}, ${b}, ${0.12})`;
//     const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
//     return {
//       textColor: luminance > 0.7 ? 'var(--color-black-0)' : 'var(--color-white-0)',
//       rgbaVariantbg,
//       rgbaVarianthover,
//     };
//   } else if (color.includes('rgba')) {
//     const rgbaValues = color.match(/\d+(\.\d+)?/g);
//     if (!rgbaValues) return;
//     const rgbaVariantbg = `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, ${0.1})`;
//     const rgbaVarianthover = `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, ${0.12})`;
//     const luminance = (0.299 * +rgbaValues[0] + 0.587 * +rgbaValues[1] + 0.114 * +rgbaValues[2]) / 255;
//     return {
//       textColor: luminance > 0.7 ? 'var(--color-black-0)' : 'var(--color-white-0)',
//       rgbaVariantbg,
//       rgbaVarianthover,
//     };
//   } else {
//     const hslaValues = color.match(/\d+(\.\d+)?%?/g);
//     if (!hslaValues) return;
//     const rgbaVariantbg = `hsla(${hslaValues[0]}, ${hslaValues[1]}%, ${hslaValues[2]}%, ${0.1})`;
//     const rgbaVarianthover = `rgba(${hslaValues[0]}, ${hslaValues[1]}, ${hslaValues[2]}, ${0.12})`;
//     const luminance = (0.299 * +hslaValues[0] + 0.587 * +hslaValues[1] + 0.114 * +hslaValues[2]) / 255;
//     return {
//       textColor: luminance > 0.7 ? 'var(--color-black-0)' : 'var(--color-white-0)',
//       rgbaVariantbg,
//       rgbaVarianthover,
//     };
//   }
// };