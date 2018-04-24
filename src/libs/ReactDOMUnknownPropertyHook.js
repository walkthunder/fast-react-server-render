/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ReactDebugCurrentFrame} from './ReactGlobalSharedState';
import warning from 'fbjs/lib/warning';

import {
  ATTRIBUTE_NAME_CHAR,
  RESERVED,
  shouldRemoveAttributeWithWarning,
  getPropertyInfo,
} from './DOMProperty';
import isCustomComponent from './isCustomComponent';
import possibleStandardNames from './possibleStandardNames';

function getStackAddendum() {
  const stack = ReactDebugCurrentFrame.getStackAddendum();
  return stack != null ? stack : '';
}

let validateProperty = () => {};

const warnUnknownProperties = function(type, props, canUseEventSystem) {
  const unknownProps = [];
  for (const key in props) {
    const isValid = validateProperty(type, key, props[key], canUseEventSystem);
    if (!isValid) {
      unknownProps.push(key);
    }
  }

  const unknownPropString = unknownProps
    .map(prop => '`' + prop + '`')
    .join(', ');
  if (unknownProps.length === 1) {
    warning(
      false,
      'Invalid value for prop %s on <%s> tag. Either remove it from the element, ' +
        'or pass a string or number value to keep it in the DOM. ' +
        'For details, see https://fb.me/react-attribute-behavior%s',
      unknownPropString,
      type,
      getStackAddendum(),
    );
  } else if (unknownProps.length > 1) {
    warning(
      false,
      'Invalid values for props %s on <%s> tag. Either remove them from the element, ' +
        'or pass a string or number value to keep them in the DOM. ' +
        'For details, see https://fb.me/react-attribute-behavior%s',
      unknownPropString,
      type,
      getStackAddendum(),
    );
  }
};

export function validateProperties(type, props, canUseEventSystem) {
  if (isCustomComponent(type, props)) {
    return;
  }
  warnUnknownProperties(type, props, canUseEventSystem);
}
