/**
 * Determines if the end of a scrollable content has been reached.
 * 
 * @param {Object} params - The parameters object.
 * @param {Object} params.layoutMeasurement - The object containing the dimensions of the viewport.
 * @param {Object} params.contentOffset - The object containing the offset of the scrolled content.
 * @param {Object} params.contentSize - The object containing the size of the scrollable content.
 * @returns {boolean} Returns true if the end of the content is reached, false otherwise.
 */
export default function endScrollReached({ layoutMeasurement, contentOffset, contentSize }) {
  
    const paddingToBottom = 10; // Additional padding to account for reaching the bottom
  
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

};
