/* Copper Launcher site — behaviour
   Theme toggle · language (EN/RU) · scroll-spy · reveal · tabs · dialog ·
   gallery · copy button · live GitHub releases. No dependencies. */
(function () {
  "use strict";

  var REPO = "CopperLauncher/Copper-Android";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;

  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) {}
    return null;
  }

  /* ---------------------------------------------------------------- Toast */
  var toastEl = $("#toast"), toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  /* ---------------------------------------------------------------- i18n
     English lives in the HTML. Missing keys fall back to English. */
  var RU = {
    "nav.home": "Главная", "nav.features": "Возможности", "nav.screenshots": "Скриншоты",
    "nav.wiki": "Вики", "nav.faq": "FAQ", "nav.get": "Скачать",
    "hero.badge": "Бесплатный и открытый",
    "hero.title1": "Minecraft: Java", "hero.title2": "прямо у тебя в кармане.",
    "hero.lede": "Copper — лаунчер, который позволяет играть в Minecraft: Java Edition на Android с модами, шейдерами и почти любой версией игры.",
    "hero.download": "Скачать", "hero.source": "Исходный код",
    "hero.sub": "На базе PojavLauncher и MojoLauncher · Лицензия LGPLv3",
    "about.kicker": "О лаунчере", "about.title": "Настоящий Java Edition без ПК",
    "about.lede": "Copper запускает полноценный Minecraft: Java Edition на Android — быстро, удобно и с полной поддержкой модов.",
    "about.what": "Что такое Copper?",
    "about.p1": "Copper — это лаунчер Minecraft: Java Edition для Android, основанный на PojavLauncher и MojoLauncher. Он запускает практически все версии игры: от самой первой rd-132211 до свежих снапшотов 26.x, включая сборки Combat Test.",
    "about.mods": "Моды без лишних хлопот",
    "about.p2": "Ставьте модлоадеры и моды вроде OptiFine через обычные .jar-установщики — или скачивайте всё прямо из встроенного каталога лаунчера.",
    "features.kicker": "Возможности", "features.title": "Всё, что нужно для комфортной игры",
    "features.lede": "Гибкая настройка, встроенный каталог контента и продуманный интерфейс для игры на телефоне.",
    "f.ui.t": "Гибкий интерфейс", "f.ui.p": "Ставьте свои обои (включая живые .mp4 и .gif), выбирайте цветовые темы и играйте в альбомном режиме.",
    "f.browse.t": "Каталог контента", "f.browse.p": "Ищите, скачивайте и обновляйте моды, ресурспаки и шейдеры с Modrinth и CurseForge прямо в приложении.",
    "f.packs.t": "Импорт сборок", "f.packs.p": "Устанавливайте готовые сборки форматов .mrpack и CurseForge .zip в пару нажатий.",
    "f.inst.t": "Изолированные сборки", "f.inst.p": "Каждый экземпляр хранит свои файлы отдельно — моды и настройки из разных сборок не конфликтуют друг с другом.",
    "f.logs.t": "Быстрая отправка логов", "f.logs.p": "Загружайте логи на mclo.gs в один клик прямо из Copper или делитесь ими в виде файла.",
    "f.skins.t": "Менеджер скинов", "f.skins.p": "Меняйте и настраивайте скины своего аккаунта Microsoft, не выходя из лаунчера.",
    "f.render.t": "Рендереры на выбор", "f.render.p": "Holy GL4ES, LTW, MobileGlues и другие — подберите оптимальный вариант под своё железо и моды.",
    "f.every.t": "Почти любая версия", "f.every.p": "От классической rd-132211 до новейших снапшотов 26.x, включая версии Combat Test.",
    "shots.kicker": "Скриншоты", "shots.title": "Как это выглядит",
    "shots.lede": "Главный экран, экземпляры, поиск модов, скины и плащи, шейдеры, настройки оформления и отправка логов.",
    "shots.main": "Главный экран", "shots.newinst": "Новый экземпляр", "shots.browse": "Поиск модов", "shots.install": "Установка модов", "shots.skins": "Менеджер скинов", "shots.capes": "Менеджер плащей", "shots.shaders": "Управление шейдерами", "shots.appearance": "Оформление", "shots.log": "Отправка лога",
    "wiki.kicker": "Вики", "wiki.title": "От установки до первого блока",
    "wiki.lede": "Небольшая пошаговая инструкция, с которой вы запустите игру за пару минут.",
    "wiki.install": "Установка и запуск", "wiki.modding": "Установка модов",
    "wiki.modlede": "Самый простой способ поставить моды меньше чем за две минуты, не выходя из лаунчера.",
    "faq.kicker": "FAQ", "faq.title": "Частые вопросы", "faq.lede": "Собрали ответы на самые популярные вопросы игроков. Пожалуйста, прочитайте внимательно.",
    "road.kicker": "Планы", "road.title": "Что уже готово и что дальше",
    "comm.kicker": "Сообщество", "comm.title": "Присоединяйтесь к нам",
    "comm.lede": "Есть вопрос, нашли баг или хотите помочь проекту? Мы всегда на связи.",
    "cred.kicker": "Благодарности", "cred.title": "Создано на базе открытого ПО",
    "cred.lede": "Сторонние библиотеки, их лицензии и исходный код.",
    "outro.title": "Готовы начать?", "outro.body": "Скачайте Copper и запускайте Minecraft: Java Edition прямо на телефоне.", "outro.play": "Играть",
    "dlg.title": "Скачать Copper", "dlg.gh": "Скачать актуальный APK с GitHub",
    "dlg.nightly": "Ранние сборки — могут быть нестабильны", "dlg.buildT": "Собрать из исходников", "dlg.build": "Инструкция в репозитории GitHub", "dlg.close": "Закрыть",
    "rel.gh": "Открыть на GitHub", "rel.apk": "Скачать APK",
    "js.copied": "Скопировано", "js.out": "уже вышла", "js.theme": "Сменить тему",
    "js.relTitle": "Заметки о выпуске", "js.relLoading": "Загружаем заметки…", "js.relErr": "Не удалось загрузить информацию о релизе.", "js.relRetry": "Повторить", "js.relNone": "Для этого релиза нет описания.", "js.newver": "Вышла новая версия {v}", "js.pre": "Пре-релиз"
  };
  var EN_JS = {
    "js.copied": "Copied to clipboard", "js.out": "out now", "js.theme": "Toggle dark mode",
    "js.relTitle": "Release notes", "js.relLoading": "Loading release notes…", "js.relErr": "Couldn't load release info right now.", "js.relRetry": "Try again", "js.relNone": "No release notes were published for this version.", "js.newver": "Version {v} is out", "js.pre": "Pre-release"
  };
  var DICT = { en: EN_JS, ru: RU };
  var defaults = {};
  $$("[data-i18n]").forEach(function (el) { defaults[el.getAttribute("data-i18n")] = el.textContent; });

  var lang = "en";
  function tr(key) {
    var d = DICT[lang] || {};
    if (d[key] != null) return d[key];
    if (defaults[key] != null) return defaults[key];
    return EN_JS[key] != null ? EN_JS[key] : key;
  }
  function applyLang(l) {
    lang = DICT[l] ? l : "en";
    root.lang = lang;
    $$("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = (DICT[lang] && DICT[lang][k] != null) ? DICT[lang][k] : defaults[k];
      if (v != null) el.textContent = v;
    });
    var sel = $("#langSelect"); if (sel) sel.value = lang;
    var tb = $("#themeBtn"); if (tb) tb.setAttribute("aria-label", tr("js.theme"));
    updateHeroBadge();
    renderRelease();
  }
  (function initLang() {
    var saved = store("copper.lang");
    var nav = (navigator.language || "en").toLowerCase();
    var l = (saved === "en" || saved === "ru") ? saved : (nav.indexOf("ru") === 0 ? "ru" : "en");
    var sel = $("#langSelect");
    if (sel) sel.addEventListener("change", function () { store("copper.lang", sel.value); applyLang(sel.value); });
    lang = l;
  })();

  /* ---------------------------------------------------------------- Theme */
  var themeBtn = $("#themeBtn");
  function isDark() {
    var t = root.dataset.theme;
    if (t === "dark") return true;
    if (t === "light") return false;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function syncThemeIcons() {
    var dark = isDark();
    var moon = $("#themeIconMoon"), sun = $("#themeIconSun");
    // SVG elements have no .hidden property, so toggle the attribute directly.
    if (moon) moon.toggleAttribute("hidden", dark);
    if (sun) sun.toggleAttribute("hidden", !dark);
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#1a110d" : "#fff8f5");
  }
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    store("copper.theme", next);
    syncThemeIcons();
  });
  if (window.matchMedia) {
    var mq = matchMedia("(prefers-color-scheme: dark)");
    var onMq = function () { syncThemeIcons(); };
    if (mq.addEventListener) mq.addEventListener("change", onMq); else if (mq.addListener) mq.addListener(onMq);
  }
  syncThemeIcons();

  /* ------------------------------------------------- Reveal on scroll */
  $$(".reveal").forEach(function (sec) {
    $$(".rv", sec).forEach(function (c, i) { c.style.setProperty("--i", i); });
  });
  if ("IntersectionObserver" in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal").forEach(function (el) { rio.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ------------------------------------------------------ Scroll spy */
  var links = $$("#navLinks a");
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
  function setCurrent(id) {
    links.forEach(function (a) {
      if (byId[id] === a) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    var cur = byId[id];
    var nav = $("#navLinks");
    if (cur && nav && nav.scrollWidth > nav.clientWidth) {
      var left = cur.offsetLeft - (nav.clientWidth - cur.offsetWidth) / 2;
      nav.scrollTo ? nav.scrollTo({ left: left, behavior: "smooth" }) : (nav.scrollLeft = left);
    }
  }
  if ("IntersectionObserver" in window) {
    var visible = {};
    var order = ["top", "about", "features", "screenshots", "wiki", "faq", "roadmap", "community", "credits"];
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var active = null;
      for (var i = 0; i < order.length; i++) if (visible[order[i]]) active = order[i];
      // Sections not in the nav (about, roadmap …) inherit the previous nav item.
      var idx = active ? order.indexOf(active) : -1;
      while (idx >= 0 && !byId[order[idx]]) idx--;
      if (idx >= 0) setCurrent(order[idx]); else setCurrent("top");
    }, { rootMargin: "-35% 0px -55% 0px" });
    order.forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ------------------------------------------------------------ Tabs */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute("aria-controls"));
        if (p) p.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") n = tabs[0];
        else if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  });

  /* ---------------------------------------------------------- Dialog */
  function openDialog(d) {
    if (!d || d.open) return;               // never open twice
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
  }
  function closeDialog(d) { if (!d || !d.open) return; if (d.close) d.close(); else d.removeAttribute("open"); }
  var dlg = $("#dlDialog");
  if (dlg) {
    $$("[data-open-dialog]").forEach(function (b) {
      b.addEventListener("click", function () {
        openDialog(dlg);
      });
    });
    var close = function () { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); };
    var cb = $("#dlgClose"); if (cb) cb.addEventListener("click", close);
    var bb = $("#dlgBuild"); if (bb) bb.addEventListener("click", close);
    dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
  }

  /* --------------------------------------------------------- Gallery */
  var strip = $("#galleryStrip");
  function gal(dir) {
    if (!strip) return;
    var fig = $("figure", strip);
    var step = fig ? fig.getBoundingClientRect().width + 20 : 240;
    strip.scrollBy({ left: dir * step * 1.5, behavior: "smooth" });
  }
  var gp = $("#galPrev"), gn = $("#galNext");
  if (gp) gp.addEventListener("click", function () { gal(-1); });
  if (gn) gn.addEventListener("click", function () { gal(1); });
  if (strip) strip.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); gal(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); gal(-1); }
  });

  /* ------------------------------------------------------------ Copy */
  $$("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = $(btn.getAttribute("data-copy"));
      if (!src) return;
      var text = src.textContent.trim();
      var done = function () { toast(tr("js.copied")); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
      } else { fallbackCopy(text); done(); }
    });
  });
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ------------------------------------------------- GitHub releases
     Latest release → hero badge + "Release notes" dialog. Body is rendered by
     GitHub itself (body_html), then sanitised. Re-checked every 5 minutes while
     the tab is visible, and when the tab regains focus. */
  var TTL = 5 * 60 * 1000;
  var API = "https://api.github.com/repos/" + REPO + "/releases?per_page=10";
  var CACHE_KEY = "copper.latest.v3";
  var latest = null, relStatus = "loading", lastFetch = 0, inflight = null;

  function isNightly(r) { return r && /^nightly/i.test(String(r.tag_name || "")); }
  function slim(r) {
    return {
      tag_name: r.tag_name, name: r.name, prerelease: !!r.prerelease, published_at: r.published_at || r.created_at,
      html_url: r.html_url, body: r.body || "", body_html: r.body_html || "",
      assets: (r.assets || []).map(function (a) { return { name: a.name, browser_download_url: a.browser_download_url }; })
    };
  }
  function apkOf(r) {
    var a = (r.assets || []).filter(function (x) { return /\.apk$/i.test(x.name || ""); })[0];
    return a ? a.browser_download_url : null;
  }
  function updateHeroBadge() {
    var b = $("#heroBadge");
    if (!b) return;
    b.textContent = (latest && relStatus === "ready") ? latest.tag_name + " " + tr("js.out") : tr("hero.badge");
  }

  /* --- sanitiser: allow-list on a detached, inert document --- */
  var ALLOWED = " a b blockquote br code del details div em g-emoji h1 h2 h3 h4 h5 h6 hr i img input kbd li ol p pre s span strong sub summary sup table tbody td tfoot th thead tr tt ul ";
  var DROP = /^(script|style|iframe|object|embed|form|link|meta|svg|math|noscript|template|textarea|select|button|audio|video|source|base|frame|frameset)$/;
  function clean(node) {
    Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
      if (ch.nodeType === 3) return;
      if (ch.nodeType !== 1) { node.removeChild(ch); return; }
      var tag = ch.tagName.toLowerCase();
      if (DROP.test(tag)) { node.removeChild(ch); return; }
      clean(ch);
      if (ALLOWED.indexOf(" " + tag + " ") < 0) {
        while (ch.firstChild) node.insertBefore(ch.firstChild, ch);
        node.removeChild(ch); return;
      }
      Array.prototype.slice.call(ch.attributes).forEach(function (a) {
        var n = a.name.toLowerCase(), v = a.value.trim(), ok = false;
        if (tag === "a") ok = (n === "href" && /^(https?:|mailto:|#)/i.test(v)) || n === "title";
        else if (tag === "img") ok = (n === "src" && /^https:\/\//i.test(v)) || n === "alt" || n === "title" || ((n === "width" || n === "height") && /^\d+%?$/.test(v));
        else if (tag === "input") ok = (n === "type" && v === "checkbox") || n === "checked";
        else if (tag === "details") ok = n === "open";
        else if (tag === "td" || tag === "th") ok = (n === "colspan" || n === "rowspan" || n === "align") && /^\w+$/.test(v);
        if (!ok) ch.removeAttribute(a.name);
      });
      if (tag === "input") {
        if (ch.getAttribute("type") !== "checkbox") { node.removeChild(ch); return; }
        ch.setAttribute("disabled", "");
      }
      if (tag === "a") { ch.setAttribute("target", "_blank"); ch.setAttribute("rel", "noopener noreferrer"); }
      if (tag === "img") { ch.setAttribute("loading", "lazy"); ch.setAttribute("referrerpolicy", "no-referrer"); }
    });
  }
  function cleanNodes(html) {
    var doc = new DOMParser().parseFromString("<!doctype html><body>" + html, "text/html");
    clean(doc.body);
    return Array.prototype.map.call(doc.body.childNodes, function (n) { return document.importNode(n, true); });
  }

  /* --- fallback markdown → HTML (only used if GitHub sends no body_html) --- */
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function inline(t) {
    var codes = [];
    t = esc(t).replace(/`([^`]+)`/g, function (_, c) { codes.push(c); return "\u0000" + (codes.length - 1) + "\u0000"; });
    t = t.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img alt="$1" src="$2">')
         .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
         .replace(/\*\*([^*]+)\*\*|__([^_]+)__/g, function (_, a, b) { return "<strong>" + (a || b) + "</strong>"; })
         .replace(/(^|[^*\w])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
         .replace(/~~([^~]+)~~/g, "<del>$1</del>")
         .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2">$2</a>');
    return t.replace(/\u0000(\d+)\u0000/g, function (_, i) { return "<code>" + codes[i] + "</code>"; });
  }
  function mdToHtml(md) {
    var lines = String(md || "").replace(/\r\n?/g, "\n").split("\n"), out = [], para = [], stack = [], m, i;
    function flush() { if (para.length) { out.push("<p>" + para.join("<br>") + "</p>"); para = []; } }
    function closeTo(n) { while (stack.length > n) out.push("</li></" + stack.pop().t + ">"); }
    for (i = 0; i < lines.length; i++) {
      var ln = lines[i];
      if (/^\s*```/.test(ln)) {
        flush(); closeTo(0); var code = []; i++;
        while (i < lines.length && !/^\s*```/.test(lines[i])) code.push(lines[i++]);
        out.push("<pre><code>" + esc(code.join("\n")) + "</code></pre>"); continue;
      }
      if (!ln.trim()) { flush(); continue; }
      if ((m = ln.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/))) { flush(); closeTo(0); out.push("<h" + m[1].length + ">" + inline(m[2]) + "</h" + m[1].length + ">"); continue; }
      if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(ln)) { flush(); closeTo(0); out.push("<hr>"); continue; }
      if (/^\s*>/.test(ln)) {
        flush(); closeTo(0); var q = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) q.push(lines[i++].replace(/^\s*>\s?/, ""));
        i--; out.push("<blockquote>" + mdToHtml(q.join("\n")) + "</blockquote>"); continue;
      }
      if ((m = ln.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/))) {
        flush();
        var ind = m[1].replace(/\t/g, "    ").length, t = /\d/.test(m[2]) ? "ol" : "ul";
        while (stack.length && ind < stack[stack.length - 1].i) out.push("</li></" + stack.pop().t + ">");
        if (stack.length && ind === stack[stack.length - 1].i) out.push("</li><li>");
        else { out.push("<" + t + "><li>"); stack.push({ t: t, i: ind }); }
        var task = m[3].match(/^\[( |x|X)\]\s+(.*)$/);
        out.push(task ? '<input type="checkbox"' + (task[1] === " " ? "" : " checked") + "> " + inline(task[2]) : inline(m[3]));
        continue;
      }
      if (stack.length && /^\s+\S/.test(ln)) { out.push(" " + inline(ln.trim())); continue; }
      closeTo(0); para.push(inline(ln.trim()));
    }
    flush(); closeTo(0);
    return out.join("");
  }

  /* --- dialog rendering --- */
  var relDlg = $("#relDialog"), relBody = $("#relBody");
  function fmtDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    try { return d.toLocaleDateString(lang === "ru" ? "ru-RU" : "en-GB", { year: "numeric", month: "long", day: "numeric" }); }
    catch (e) { return String(iso).slice(0, 10); }
  }
  function setBody(nodes) {
    relBody.textContent = "";
    nodes.forEach(function (n) { relBody.appendChild(n); });
  }
  function msg(text, withRetry) {
    var p = document.createElement("p"); p.className = "rel__empty"; p.textContent = text + " ";
    if (withRetry) {
      var a = document.createElement("a"); a.href = "#"; a.setAttribute("data-retry", ""); a.textContent = tr("js.relRetry"); p.appendChild(a);
    }
    return p;
  }
  function renderRelease() {
    if (!relDlg || !relBody) return;
    var title = $("#relTitle"), tag = $("#relTag"), pre = $("#relPre"), date = $("#relDate"), gh = $("#relGh"), apk = $("#relApk");
    if (!latest) {
      title.textContent = tr("js.relTitle"); tag.textContent = "—"; pre.hidden = true; date.textContent = "";
      if (relStatus === "loading") { var bar = document.createElement("div"); bar.className = "rel__loading"; bar.setAttribute("role", "progressbar"); bar.setAttribute("aria-label", tr("js.relLoading")); setBody([bar]); }
      else setBody([msg(tr("js.relErr"), true)]);
      return;
    }
    title.textContent = latest.name && latest.name !== latest.tag_name ? latest.name : tr("js.relTitle");
    tag.textContent = latest.tag_name;
    pre.hidden = !latest.prerelease; pre.textContent = tr("js.pre");
    date.textContent = fmtDate(latest.published_at);
    gh.href = latest.html_url || gh.href;
    apk.href = apkOf(latest) || latest.html_url || apk.href;
    var html = latest.body_html || (latest.body ? mdToHtml(latest.body) : "");
    var nodes = html ? cleanNodes(html) : [];
    setBody(nodes.length ? nodes : [msg(tr("js.relNone"), false)]);
  }

  /* --- fetching, caching, auto-update --- */
  function apply(next, announce) {
    var prev = latest;
    latest = next; relStatus = "ready";
    updateHeroBadge(); renderRelease();
    if (announce && prev && next && prev.tag_name !== next.tag_name) toast(tr("js.newver").replace("{v}", next.tag_name));
  }
  function refresh() {
    if (inflight) return inflight;
    if (!window.fetch) { if (!latest) relStatus = "error"; renderRelease(); return Promise.resolve(); }
    if (!latest) { relStatus = "loading"; renderRelease(); }
    inflight = fetch(API, { headers: { Accept: "application/vnd.github.full+json" } })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        var list = (Array.isArray(data) ? data : []).filter(function (r) { return !isNightly(r) && !r.draft; });
        lastFetch = Date.now();
        if (!list.length) throw new Error("no releases");
        var next = slim(list[0]);
        store(CACHE_KEY, JSON.stringify({ at: lastFetch, data: next }));
        apply(next, true);
      })
      .catch(function () {
        if (!latest) { relStatus = "error"; updateHeroBadge(); renderRelease(); }   // keep showing old data if we have it
      })
      .then(function () { inflight = null; });
    return inflight;
  }
  function loadReleases() {
    var cached = null;
    try { cached = JSON.parse(store(CACHE_KEY)); } catch (e) {}
    if (cached && cached.data && cached.data.tag_name) {
      latest = cached.data; relStatus = "ready"; lastFetch = cached.at || 0;
      updateHeroBadge(); renderRelease();
      if (Date.now() - lastFetch < TTL) return;
    }
    refresh();
  }
  setInterval(function () { if (!document.hidden) refresh(); }, TTL);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && Date.now() - lastFetch > TTL) refresh();
  });

  /* --- wiring --- */
  var badgeBtn = $("#badgeBtn");
  if (badgeBtn && relDlg) {
    badgeBtn.addEventListener("click", function () {
      renderRelease(); openDialog(relDlg);
      if (relStatus !== "ready") refresh();
      relBody.scrollTop = 0;
    });
    var rc = $("#relClose"); if (rc) rc.addEventListener("click", function () { closeDialog(relDlg); });
    relDlg.addEventListener("click", function (e) { if (e.target === relDlg) closeDialog(relDlg); });
    relBody.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest("[data-retry]");
      if (t) { e.preventDefault(); relStatus = "loading"; renderRelease(); refresh(); }
    });
  }

  /* ----------------------------------------------------------- Boot */
  applyLang(lang);
  loadReleases();
})();
