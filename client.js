window.__ModuleLoader__.load({
  id: 'dsh-toonflow-canvas',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const DEFAULT_URL = 'http://127.0.0.1:6017';
    const STORE_KEY = 'toonflow.canvas.url';

    function readUrl() {
      try { return localStorage.getItem(STORE_KEY) || DEFAULT_URL; } catch (e) { return DEFAULT_URL; }
    }
    function saveUrl(u) {
      try { localStorage.setItem(STORE_KEY, u); } catch (e) { /* ignore */ }
    }

    const css = [
      '.tfcanvas-root{display:flex;flex-direction:column;width:100%;height:100%;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);}',
      '.tfcanvas-bar{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex:0 0 auto;}',
      '.tfcanvas-title{display:flex;align-items:center;gap:8px;font-weight:600;font-size:13px;white-space:nowrap;}',
      '.tfcanvas-pill{font-size:11px;line-height:1;padding:3px 7px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);}',
      '.tfcanvas-url{flex:1 1 auto;min-width:120px;max-width:520px;height:28px;padding:0 10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:12px;outline:none;}',
      '.tfcanvas-url:focus{border-color:var(--dsw-alias-brand-primary);}',
      '.tfcanvas-btn{height:28px;padding:0 12px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-size:12px;cursor:pointer;white-space:nowrap;}',
      '.tfcanvas-btn:hover{border-color:var(--dsw-alias-brand-primary);}',
      '.tfcanvas-btn.primary{background:var(--dsw-alias-brand-primary);color:#fff;border-color:var(--dsw-alias-brand-primary);}',
      '.tfcanvas-btn.ghost{background:transparent;}',
      '.tfcanvas-body{position:relative;flex:1 1 auto;min-height:0;background:#fff;}',
      '.tfcanvas-frame{width:100%;height:100%;border:0;display:block;background:#fff;}',
      '.tfcanvas-help{position:absolute;top:12px;left:12px;right:12px;max-width:560px;background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;padding:14px 16px;box-shadow:0 8px 30px rgba(0,0,0,0.22);font-size:12.5px;line-height:1.6;}',
      '.tfcanvas-help h4{margin:0 0 6px;font-size:13px;}',
      '.tfcanvas-help code{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:6px;padding:1px 5px;font-family:ui-monospace,Consolas,monospace;font-size:11.5px;}',
      '.tfcanvas-help pre{margin:8px 0 4px;padding:10px 12px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:auto;font-family:ui-monospace,Consolas,monospace;font-size:11.5px;}',
      '.tfcanvas-help .close{float:right;cursor:pointer;color:var(--dsw-alias-label-secondary);}',
    ].join('');

    function Icon(props) {
      const size = props && typeof props.size === 'number' ? props.size : 20;
      const active = !!(props && props.active);
      const stroke = active ? 'var(--dsw-alias-brand-primary, #2563eb)' : 'currentColor';
      return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true },
        h('rect', { x: 3, y: 4.5, width: 11, height: 9, rx: 2.5, stroke: stroke, strokeWidth: 1.7 }),
        h('rect', { x: 10, y: 10, width: 11, height: 9, rx: 2.5, stroke: stroke, strokeWidth: 1.7, fill: 'var(--dsw-alias-bg-base, #fff)' }),
        h('path', { d: 'M14.5 14.5h2M15.5 13.5v2', stroke: stroke, strokeWidth: 1.4, strokeLinecap: 'round' })
      );
    }

    function Panel() {
      const [url, setUrl] = React.useState(readUrl);
      const [draft, setDraft] = React.useState(readUrl);
      const [nonce, setNonce] = React.useState(0);
      const [help, setHelp] = React.useState(false);

      function normalize(v) {
        let u = String(v || '').trim();
        if (!u) return '';
        if (!/^https?:\/\//i.test(u)) u = 'http://' + u;
        return u;
      }
      function connect() {
        const u = normalize(draft);
        if (!u) return;
        setUrl(u); setDraft(u); saveUrl(u);
        setNonce(function (n) { return n + 1; });
      }
      function reload() { setNonce(function (n) { return n + 1; }); }
      function openTab() { try { window.open(url, '_blank', 'noopener'); } catch (e) { /* ignore */ } }

      return h('div', { className: 'tfcanvas-root' },
        h('style', null, css),
        h('div', { className: 'tfcanvas-bar' },
          h('div', { className: 'tfcanvas-title' }, h(Icon, { size: 18 }), 'Toonflow 画布'),
          h('span', { className: 'tfcanvas-pill', title: '内嵌本地 Toonflow 实例' }, '本地实例'),
          h('input', {
            className: 'tfcanvas-url', value: draft, spellCheck: false,
            onChange: function (e) { setDraft(e.target.value); },
            onKeyDown: function (e) { if (e.key === 'Enter') connect(); },
            placeholder: DEFAULT_URL, 'aria-label': 'Toonflow 地址',
          }),
          h('button', { className: 'tfcanvas-btn primary', onClick: connect }, '连接'),
          h('button', { className: 'tfcanvas-btn', onClick: reload }, '重载'),
          h('button', { className: 'tfcanvas-btn ghost', onClick: openTab }, '新窗口'),
          h('button', { className: 'tfcanvas-btn ghost', onClick: function () { setHelp(function (v) { return !v; }); } }, '怎么用')
        ),
        h('div', { className: 'tfcanvas-body' },
          h('iframe', {
            key: nonce, className: 'tfcanvas-frame', src: url,
            title: 'Toonflow', allow: 'clipboard-write; clipboard-read',
          }),
          help ? h('div', { className: 'tfcanvas-help' },
            h('span', { className: 'close', onClick: function () { setHelp(false); } }, '\u2715'),
            h('h4', null, '让 Toonflow 在 dsh 里跑起来'),
            h('div', null, '1. 启动本地 Toonflow（web + server）：'),
            h('pre', null, 'cd Toonflow-app\nbun install\nbun run dev'),
            h('div', null, '2. 默认地址 ', h('code', null, 'http://127.0.0.1:6017'), '，在上方地址栏填入后点「连接」。'),
            h('div', null, '3. 图像/视频节点里选择 ', h('code', null, 'Muse'), ' 供应商，填入 Muse API Key 即可出图/出片。'),
            h('div', { style: { marginTop: 6, color: 'var(--dsw-alias-label-secondary)' } }, 'Muse 供应商已内置在 Toonflow 的 packages/providers，无需另装。')
          ) : null
        )
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('sidebar.panellist', function () {
          return ctx.slots.register({ name: 'sidebar.panellist', id: 'toonflow', order: 60, label: 'Toonflow' }, Icon);
        });
        ctx.slots.inject('main', function () {
          return ctx.slots.register({ name: 'main', key: 'toonflow' }, Panel);
        });
      },
    };
  },
});
