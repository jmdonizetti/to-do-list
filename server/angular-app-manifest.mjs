
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/to-do-list/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/to-do-list"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 16882, hash: '7e601e31f7498867cc8a745f4713c8af4e0937fca726b3ea5fa7d93f8c96c006', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17014, hash: 'dc7874899b882af5e45f2d0c7d5f3b0a342b6943b7ac5f01bb105dafd6d31faf', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 18294, hash: '6aa912824b4aaebd9732181a64095a97228a0c57978706c5b8a816aa661458ae', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-XIZD7H42.css': {size: 2011, hash: 'JkL87XCPiCE', text: () => import('./assets-chunks/styles-XIZD7H42_css.mjs').then(m => m.default)}
  },
};
