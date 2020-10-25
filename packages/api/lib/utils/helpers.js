exports.getDefaultBreakpoints = (imageWidth, options = {}) => {
 const { breakpoints = {}, fluidWidth = {} } = options

 const max = Math.min(imageWidth, fluidWidth.max);
 const min = fluidWidth.min;
 const breakpoints = [ max ];

 if (max <= min) {
   return breakpoints
 }

 const maxImages = breakpoints.maxImages || 0
 const range = max - min

 for (let i = 1; i < maxImages; i++) {
   const breakpoint = max - (i * range) / (maxImages - 1);
   breakpoints.push(Math.round(breakpoint));
 }
 
 return breakpoints;
}
