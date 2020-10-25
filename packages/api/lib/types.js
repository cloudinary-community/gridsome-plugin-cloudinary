
/**
 * @typedef {Object} Asset
 * @property {String} public_id - indicate asset's public identifier
 * @property {String} asset_id - indicate asset's hashed id
 * @property {String} format - original format
 * @property {String} secure_url - delivery url using https
 * @property {String} url - delivery url using http
 * @property {DeliveryType} type - asset's delivery type 
 * @property {String} version - indicate the current version of the asset
 * @property {Number} height - indicate requested asset's height
 * @property {Number} width - indicate requested asset's width
 * @property {Array<Object>} eager - pre-generate assets based on the eager transformations passed
 * @property {Boolean} placeholder - indicate whether there is a placeholder generated
 * @property {Array} tags - indicate all the tags assigned to the asset
 * @property {String} original_filename - indicate the original filename when uploading
 * @property {Boolean} overwritten - indicate whether it is overwritten (for upload)
 */
