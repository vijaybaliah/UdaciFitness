/**
 * returns the element with data test attribute
 * @param {object} wrapper react element that has the data attribute
 * @param {string} attr value of the data attribute
 */
export const findByTestAttr = (wrapper, attr) => {
  return wrapper.find(`[data-test="${attr}"]`);
}
