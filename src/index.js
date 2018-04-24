/**
 * Make SSR more efficiently
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactPartialRenderer from './ReactPartialRenderer';

/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 */
export default function renderToString(element) {
  const renderer = new ReactPartialRenderer(element, false);
  const markup = renderer.read(Infinity);
  return markup;
}
