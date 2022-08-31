const hasKey = (obj, key) => {
  const hasOwn = {}.hasOwnProperty;
  return hasOwn.call(obj, key);
};

const replaceAttr = (tokens, idx, attr) => {
  const replace = attr.replace;

  Object.keys(replace).forEach((attr) => {
    if (attr === 'html' && tokens[idx + 1].type === 'text') {
      let linkText = tokens[idx + 1];
      linkText.content = replace.html;
      return;
    }
    if (attr === 'href') {
      let element = tokens[idx];
      element.attrSet('href', replace.href);
      return;
    }
  });
};

const setAttr = (tokens, idx, attrs) => {
  let element = tokens[idx];
  Object.keys(attrs).forEach((attr) => {
    let val = attrs[attr];
    if (attr === 'className' && val) return element.attrPush(['class', val]);
    if (attr === 'nofollow' && val) return element.attrPush(['rel', 'nofollow']);
    if (attr === 'replace') return replaceAttr(tokens, idx, attrs);
    if (attr !== 'pattern' && val) {
      if (attr === 'title' && val === true) {
        let linkText = tokens[idx + 1].content;
        return element.attrPush([attr, linkText]);
      } else {
        return element.attrPush([attr, val]);
      }
    }
  });
};

const addAttributes = (tokens, idx, attributes) => {
  const attrHref = tokens[idx].attrGet('href');
  const attrs = attributes.attrsReplace;
  const attrsDefault = attributes.attrsDefault;
  for (let i = 0, count = attrs.length; i < count; i++) {
    let attr = attrs[i];
    if (hasKey(attr, 'pattern') && attr.pattern.test(attrHref)) {
      setAttr(tokens, idx, attr);
      break;
    } else {
      setAttr(tokens, idx, attrsDefault);
    }
  }
};

const markdownitLink = (md, configs) => {
  let defaultRender =
    md.renderer.rules.link_open ||
    ((tokens, idx, options, env, self) => {
      return self.renderToken(tokens, idx, options);
    });

  const attributes = configs;

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    addAttributes(tokens, idx, attributes);
    return defaultRender(tokens, idx, options, env, self);
  };
};

markdownitLink.defaultRender = (tokens, idx, options, env, self) => {
  return self.renderToken(tokens, idx, options);
};

module.exports = markdownitLink;
