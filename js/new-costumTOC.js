/**
 * Costum Blogger TOC Script by Id Tutor Plus
 * URL: https://plus.google.com/116099308895340121198/about
 * URL: http://idtutorplus.blogspot.com
 * Templates: '&lt;div id="contentOuter"&gt;&lt;table border="0"&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;&lt;label for="feedOrder"&gt;Urutkan artikel berdasarkan:&lt;/label&gt;&lt;/td&gt;&lt;td&gt;&lt;select id="feedOrder"&gt;&lt;option value="published" selected&gt;POSTING TERBARU&lt;/option&gt;&lt;option value="updated"&gt;POSTING DIPERBAHARUI&lt;/option&gt;&lt;/select&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;label for="labelSort"&gt;Filter artikel berdasarkan kategori:&lt;/label&gt;&lt;/td&gt;&lt;td&gt;&lt;select id="labelSort" disabled&gt;&lt;option selected&gt;MEMUAT...&lt;/option&gt;&lt;/select&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;label for="feed-q"&gt;Cari dengan kata kunci:&lt;/label&gt;&lt;/td&gt;&lt;td&gt;&lt;form id="itemSearcher"&gt;&lt;input type="text" id="feed-q"&gt;&lt;/form&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;/div&gt;&lt;header id="tableContent"&gt;&lt;/header&gt;&lt;ul id="feedContent"&gt;&lt;/ul&gt;&lt;div id="descNav"&gt;&lt;/div&gt;&lt;script type="text/javascript" src="advanced-toc.js"&gt;&lt;/script&gt;'
 */
// This is the container template that will be used to insert post template, pagination and the posts count
document.write('<div id="itempager" style="position:relative;"><a title="ITP" style="display:block!important;visibility:visible!important;opacity:1!important;position:absolute;bottom:10px;right:35px;font:normal bold 8px Arial,Sans-Serif!important;color:#666;text-shadow:0 1px 0 rgba(255,255,255,.1);text-decoration:none;" href="http://idtutorplus.blogspot.com/2013/09/table-of-contents-interesting-blog-with.html" target="_blank">&#9658;ITP +]</a></div>');

var loadToc, loadCategories, _toc = {
	init: function() {
		var cfg = {
			homePage: 'http://' + window.location.hostname,
			maxResults: 30,
			numChars: 270,
			thumbWidth: 80,
			navText: "Berikutnya &#9660;",
			resetToc: "Kembali ke Awal",
			noImage: "http://2.bp.blogspot.com/-11FkySHGB5Y/TpZ6SSbsF2I/AAAAAAAAA94/zK10UaL7jgo/s1600/images.jpeg",
			loading: "<span>Memuat...</span>",
			counting: "<div>Menghitung artikel...</div>",
			searching: "<span>Mencari...</span>"
		}, w = window, d = document,
		el = function(id) {
			return d.getElementById(id);
		}, o = {
			a: el('feedOrder'),
			b: el('labelSort').parentNode,
			c: el('itemSearcher'),
			d: el('feed-q'),
			e: el('tableContent'),
			f: el('feedContent'),
			g: el('descNav'),
			h: d.getElementsByTagName('head')[0],
			i: 0,
			j: null,
			k: 'published',
			l: 0,
			m: ""
		}, fn = {
			a: function() {
				old = el('temporer-script');
				old.parentNode.removeChild(old);
			},
			b: function(param) {
				var script = d.createElement('script');
				script.type = "text/javascript";
				script.id = "temporer-script";
				script.src = param;
				if (el('temporer-script')) fn.a();
				o.h.appendChild(script);
			},
			c: function(mode, tag, order) {
				o.i++;
				o.e.innerHTML = cfg.counting;
				o.g.innerHTML = cfg[mode == 1 ? "searching" : "loading"];
				if (mode === 0) {
					fn.b(tag !== null ? cfg.homePage + '/feeds/posts/summary/-/' + tag + '?alt=json-in-script&start-index=' + ((o.i * cfg.maxResults) + 1) + '&max-results=' + cfg.maxResults + '&orderby=' + order + '&callback=loadToc' : cfg.homePage + '/feeds/posts/summary?alt=json-in-script&start-index=' + ((o.i * cfg.maxResults) + 1) + '&max-results=' + cfg.maxResults + '&orderby=' + order + '&callback=loadToc');
				} else if (mode == 1) {
					fn.b(cfg.homePage + '/feeds/posts/summary?alt=json-in-script&start-index=' + ((o.i * cfg.maxResults) + 1) + '&max-results=' + cfg.maxResults + '&q=' + tag + '&orderby=' + order + '&callback=loadToc');
				}
				o.j = (tag !== null) ? tag : null;
				o.l = mode;
				o.a.disabled = true;
				o.b.children[0].disabled = true;
			},
			d: function(json) {
				var _h;
				o.g.innerHTML = "";
				o.e.innerHTML = o.l == 1 ? '<span>Hasil penelusuran untuk kata kunci <strong>&#8220;' + o.m + '&#8221;</strong> (' + json.feed.openSearch$totalResults.$t + ' Temuan)</span>' : '<div>Total: ' + json.feed.openSearch$totalResults.$t + ' Artikel</div>';
				if ("entry" in json.feed) {
					var a = json.feed.entry, b, c, _d, e = "0 Komentar", f = "", g;
					for (var i = 0; i < cfg.maxResults; i++) {
						if (i == a.length) break;
						b = a[i].title.$t;
						_d = ("summary" in a[i]) ? a[i].summary.$t.replace(/<br ?\/?>/ig, " ").replace(/<(.*?)>/g, "").replace(/<iframe/ig, "").substring(0, cfg.numChars) : "";
						g = ("media$thumbnail" in a[i]) ? a[i].media$thumbnail.url.replace(/\/s[0-9]+\-c/, "\/s" + cfg.thumbWidth + "-c") : cfg.noImage.replace(/\/s[0-9]+\-c/, "\/s" + cfg.thumbWidth + "-c");
						for (var j = 0, jen = a[i].link.length; j < jen; j++) {
							c = (a[i].link[j].rel == "alternate") ? a[i].link[j].href : "#";
						}
						for (var k = 0, ken = a[i].link.length; k < ken; k++) {
							if (a[i].link[k].rel == "replies" && a[i].link[k].type == "text/html") {
								e = a[i].link[k].title;
								break;
							}
						}
						_h = d.createElement('li');
						_h.innerHTML = '<div class="inner"><img style="width:' + cfg.thumbWidth + 'px;height:' + cfg.thumbWidth + 'px;" src="' + g + '" alt="' + b + '"><a class="toc-title" href="' + c + '" target="_blank">' + b + '</a><strong> - (' + e + ')</strong><br>' + '<div class="news-text">' + _d + '&hellip;<br style="clear:both;"></div></div>';
						o.f.appendChild(_h);
					}
					_h = d.createElement('a');
					_h.href = '#load-more';
					_h.innerHTML = cfg.navText;
					_h.onclick = function() {
						fn.c(o.l, o.j, o.k);
						return false;
					};
				} else {
					_h = d.createElement('a');
					_h.href = '#reset-content';
					_h.innerHTML = cfg.resetToc;
					_h.onclick = function() {
						o.i = -1;
						o.e.innerHTML = cfg.counting;
						o.f.innerHTML = "";
						fn.c(0, null, 'published');
						o.a.innerHTML = o.a.innerHTML;
						o.b.children[0].innerHTML = o.b.children[0].innerHTML;
						return false;
					};
				}
				o.g.appendChild(_h);
				o.a.disabled = false;
				o.b.children[0].disabled = false;
			},
			e: function(json) {
				var a = json.feed.category, b = '<select id="labelSort"><option value="" selected disabled>KATEGORI...</option>';
				for (var i = 0, len = a.length; i < len; i++) {
					b += '<option value="' + encodeURIComponent(a[i].term) + '">' + a[i].term.toUpperCase() + '</option>';
				}
				b += '</select>';
				o.b.innerHTML = b;
				o.b.children[0].onchange = function() {
					o.i = -1;
					o.f.innerHTML = "";
					o.g.innerHTML = cfg.loading;
					fn.c(0, this.value, o.k);
				};
			}
		};
		loadToc = fn.d;
		loadCategories = fn.e;
		fn.b(cfg.homePage + '/feeds/posts/summary?alt=json-in-script&start-index=' + (o.i + 1) + '&max-results=' + cfg.maxResults + '&orderby=published&callback=loadToc');
		fn.b(cfg.homePage + '/feeds/posts/summary?alt=json-in-script&max-results=0&orderby=published&callback=loadCategories');
		o.a.onchange = function() {
			o.i = -1;
			o.f.innerHTML = "";
			o.g.innerHTML = cfg.counting;
			o.b.children[0].innerHTML = o.b.children[0].innerHTML;
			fn.c(0, null, this.value);
			o.k = this.value;
		};
		o.c.onsubmit = function() {
			o.i = -1;
			o.f.innerHTML = "";
			o.m = o.d.value;
			fn.c(1, o.d.value, o.k);
			return false;
		};
	}
};

_toc.init();