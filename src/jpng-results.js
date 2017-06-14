let results = null;

function el(tag, style, inner){
  const element = document.createElement(tag);
  if (style) element.classList.add(style);
  if (inner) element.innerHTML = inner;
  return element;
}

function context2d(w, h){
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
  canvas.width = w; canvas.height = h;
  return ctx;
}

function drawTransparencyPattern(src){
  var w = src.width, h = src.height,
      ctx = context2d(16, 16),
      dst = context2d(w, h),
      size = 8, pattern;
  
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fillRect(0, 0, size<<1, size<<1);
  ctx.fillStyle = 'rgb(235,235,235)';
  ctx.fillRect(0, 0, size, size);
  ctx.fillRect(size, size, size, size);
  pattern = ctx.createPattern(ctx.canvas, 'repeat');
  dst.fillStyle = pattern;
  dst.fillRect(0, 0, w, h);
  dst.drawImage(src, 0, 0);
  return dst.canvas;
}

function appendResults(records){
  records.forEach( (record) => createResult(record) );
}

function thumbnail(source, size){
  let width = source.width,
      height = source.height,
      max = width > height ? width : height,
      scale = 1, w = width, h = height, ctx;
  if (max > size) scale = size/max;
  w = Math.ceil(width * scale);
  h = Math.ceil(height * scale);
  ctx = context2d(w, h);
  ctx.drawImage(source, 0, 0, width, height, 0, 0, w, h);
  return ctx.canvas;
}

function side(name, img, size){
  const div = el('div', 'side-by-side');
  const text = `${name} (${Math.round(size/1024)}kb)`;
  div.appendChild(el('p', '', text));
  div.appendChild(drawTransparencyPattern(thumbnail(img, 100)));
  return div;
}

function sideBySide(record){
  const div = el('div');
  div.appendChild(side('original', record.img, record.size));
  div.appendChild(side('jpng', record.jpngCanvas, record.jpng.size));
  return div;
}

function createResult(record){
  const result = el('section');
  result.appendChild(el('p', '', String(record.name)));
  if (record.error) {
    result.classList.add('error');
    result.appendChild(el('p', '', String(record.error)));
  }
  if (record.jpng) {
    result.appendChild(sideBySide(record));
  }
  else if (record.img) {
    result.appendChild(thumbnail(record.img, 100));
  }
  results.appendChild(result);
}

function createResults(){
  results = document.getElementById('jpng-results');
}

export { createResults, appendResults }