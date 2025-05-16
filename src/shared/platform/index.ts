const ua = navigator.userAgent.toLowerCase();

if (window.__wxjs_environment === 'miniprogram' || ua.includes('miniprogram')) {
  import('./miniapp/platformAdapter');
} else if (/iphone|android|mobile/.test(ua)) {
  import('./mobile/platformAdapter');
} else {
  import('./pc/platformAdapter');
}