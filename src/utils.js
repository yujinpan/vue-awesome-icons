export function createSVG(svgElem) {
  const viewBox = svgElem.getAttribute('viewBox');
  const content = svgElem.innerHTML;
  return (
    '<?xml version="1.0" standalone="no"?>' +
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
    '<svg viewBox="' +
    viewBox +
    '" version="1.1" xmlns="http://www.w3.org/2000/svg"' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">' +
    content +
    '</svg>'
  );
}

export function downloadSVG(svg, name) {
  const file = new Blob([svg], { type: 'image/svg+xml' });
  const filename = name + '.svg';
  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(file);
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(a.href);
}

export function closest(elem, className, endClassName) {
  if (elem.classList.contains(className)) {
    return elem;
  } else {
    return elem.parentNode && !elem.classList.contains(endClassName)
      ? closest(elem.parentNode, className)
      : null;
  }
}
