/**
 * Costum Blogger TOC Script by Id Tutor Plus
 * URL: https://plus.google.com/116099308895340121198/about
 * URL: http://idtutorplus.blogspot.com
 * Templates: &lt;div id="contentOuter"&gt;&lt;table border="0"&gt;&lt;tr&gt;&lt;td&gt;&lt;label&gt;Urutkan daftar berdasarkan:&lt;/label&gt;&lt;/td&gt;&lt;td&gt;&lt;select id="orderFeedBy"&gt;&lt;option value="published" selected&gt;Posting Terbaru&lt;/option&gt;&lt;option value="updated"&gt;Posting Diperbaharui&lt;/option&gt;&lt;/select&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;label&gt;Filter daftar berdasarkan kategori:&lt;/label&gt;&lt;/td&gt;&lt;td&gt;&lt;span id="labelSorter"&gt;&lt;select disabled&gt;&lt;option selected&gt;Memuat...&lt;/option&gt;&lt;/select&gt;&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;label&gt;Cari dengan kata kunci:&lt;/label&gt;&lt;/td&gt;&lt;td&gt;&lt;form id="itemSearcher"&gt;&lt;input type="text"/&gt;&lt;/form&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/div&gt;&lt;header id="tableContent"&gt;&lt;/header&gt;&lt;ul id="feedContent"&gt;&lt;/ul&gt;&lt;div id="descNav"&gt;Loading...&lt;/div&gt;&lt;script type="text/javascript" src="advanced-toc.js"&gt;&lt;/script&gt;
 */

// This is the container template that will be used to insert post template, pagination and the posts count
document.write('<div id="itempager" style="position:relative;"><a title="ITP" style="display:block!important;visibility:visible!important;opacity:1!important;position:absolute;bottom:10px;right:35px;font:normal bold 8px Arial,Sans-Serif!important;color:#666;text-shadow:0 1px 0 rgba(255,255,255,.1);text-decoration:none;" href="http://idtutorplus.blogspot.com/2013/09/table-of-contents-interesting-blog-with.html" target="_blank">&#9658;ITP +]</a></div>');

function getID(a) {
	return document.getElementById(a);
}

var head = document.getElementsByTagName('head')[0],
	tocContainer = getID('feedContent'),
	descNav = getID('descNav'),
	orderByer = getID('orderFeedBy'),
	labelSorter = getID('labelSorter'),
	input = getID('itemSearcher').getElementsByTagName('input')[0],
	tableContent = getID('tableContent'),
	nextPage, feedArchive, startPage = 0, filter = 0;

function showLabels(json) {
	var cat = json.feed.category, skeleton = "<select id='labelSorter' onchange='changeSort(this.value);'><option value='' selected disabled>KATEGORI...</option>";
	for (var i = 0, cen = cat.length; i < cen; i++) {
		skeleton += "<option value='" + decodeURIComponent(cat[i].term) + "'>" + cat[i].term.toUpperCase() + "</option>";
	}
	skeleton += "</select>";
	labelSorter.innerHTML = skeleton;
}

function showFeedList(json) {
	var entries = json.feed.entry, postTitle, postUrl, postImage, postContent, commentNum, skeleton = "";
	if (json.feed.entry) {
		for (var i = 0; i < tocConfig.feedNum; i++) {
			if (i == json.feed.entry.length) {
				break;
			}
			postTitle = entries[i].title.$t;
			for (var j = 0, jen = entries[i].link.length; j < jen; j++) {
				if (entries[i].link[j].rel == 'alternate') {
					postUrl = entries[i].link[j].href;
					break;
				}
			}
			for (var k = 0, ken = json.feed.link.length; k < ken; k++) {
				if (json.feed.link[k].rel == 'next') {
					nextPage = json.feed.link[k].href;
				}
			}
			for (var l = 0, len = entries[i].link.length; l < len; l++) {
				if (entries[i].link[l].rel == 'replies' && entries[i].link[l].type == 'text/html') {
					commentNum = entries[i].link[l].title;
					break;
				}
			}
			postContent = ("summary" in entries[i]) ? entries[i].summary.$t.replace(/<br ?\/?>/ig," ").replace(/<(.*?)>/g,"").replace(/<iframe/ig,"").substring(0,tocConfig.numChars) : "";
			postImage = ("media$thumbnail" in entries[i]) ? entries[i].media$thumbnail.url.replace(/\/s[0-9]+\-c/, "\/s" + tocConfig.thumbWidth + "-c") : tocConfig.noImage.replace(/\/s[0-9]+\-c/, "\/s" + tocConfig.thumbWidth + "-c");
			skeleton += "<li><div class='inner'>" +
			"<a href='" + postUrl + "' target='_blank'><img style='width:" + tocConfig.thumbWidth + "px;height:" + tocConfig.thumbWidth + "px;' src='" + postImage + "' alt='" + postTitle + "' /></a>" +
			"<a class='toc-title' href='" + postUrl + "' target='_blank'>" + postTitle + "</a><strong> - (" + commentNum + ")</strong><br>" +
			"<div class='news-text'>" + postContent + "&hellip;<br style='clear:both;'></div>" +
			"</div></li>";
		}
		tableContent.innerHTML = (input.value !== '' && filter == 'search') ? "<span>Hasil penelusuran untuk kata kunci <strong>&#8220;" + input.value + "&#8221;</strong> (" + json.feed.openSearch$totalResults.$t + " Temuan)</span>" : "Total: " + json.feed.openSearch$totalResults.$t + " Artikel";;
		feedContent.innerHTML += (nextPage) ? skeleton : "";
		if (nextPage && filter != 'search') {
			skeleton = (filter !== 0) ? "<a href='javascript:initResult(2);' class='next'>" + tocConfig.navText + "</a>" : "<a href='javascript:initResult(1);' class='next'>" + tocConfig.navText + "</a>";
		} else {
			skeleton = "<a href='#top' class='front'>" + tocConfig.frontText + "</a>";
		}
		descNav.innerHTML = skeleton;
		input.value = '';
		labelSorter.getElementsByTagName('select')[0].removeAttribute('disabled');
		orderByer.removeAttribute('disabled');
	} else {
		if (filter == 'search') {
			feedContent.innerHTML = "";
			tableContent.innerHTML = "";
			alert(tocConfig.noResult);
		}
		descNav.innerHTML = "<a href='#top' class='front'>" + tocConfig.frontText + "</a>";
	}
}

function initResult(archive) {
	var p, param;
	if (archive == 1) {
		p = nextPage.indexOf("?");
		param = nextPage.substring(p);
	} else if (archive == 2) {
		p = nextPage.indexOf("?");
		param = nextPage.substring(p).replace(/\?/, '/-/' + filter + '?');
	} else {
		param = "?start-index=1&max-results=" + tocConfig.feedNum + "&orderby=" + orderByer.value + "&alt=json-in-script";
	}
	param += "&callback=showFeedList";
	updateScript(param);
}

function removeScript() {
	var old = getID('temporer-script');
	old.parentNode.removeChild(old);
}

function buildLabels() {
	var s = document.createElement('script');
		s.type = "text/javascript";
		s.src = tocConfig.url + "/feeds/posts/summary?max-results=0&alt=json-in-script&callback=showLabels";
	head.appendChild(s);
}

function updateScript(tail) {
	if (startPage == 1) {
		removeScript();
		startPage = 1;
	}
	descNav.innerHTML = tocConfig.loading;
	feedArchive = (tocConfig.labelName !== false) ? tocConfig.url + "/feeds/posts/summary/-/" + tocConfig.labelName + tail : feedArchive = tocConfig.url + "/feeds/posts/summary" + tail;
	var toc_script = document.createElement('script');
		toc_script.type = 'text/javascript';
		toc_script.src = feedArchive;
		toc_script.id = 'temporer-script';
	head.appendChild(toc_script);
}

function changeSort(label) {
	removeScript();
	tocContainer.innerHTML = "";
	tableContent.innerHTML = "Menghitung artikel&hellip;";
	descNav.innerHTML = tocConfig.loading;
	var newScript = document.createElement('script'),
		labSorter = labelSorter.getElementsByTagName('select')[0],
		l = (label !== 0) ? '/-/' + label : "";
	newScript.type = 'text/javascript';
	newScript.id = 'temporer-script';
	newScript.src = tocConfig.url + '/feeds/posts/summary' + l + '?alt=json-in-script&max-results=' + tocConfig.feedNum + '&orderby=' + orderByer.value + '&callback=showFeedList';
	head.appendChild(newScript);
	labSorter.disabled = true;
	orderByer.disabled = true;
	filter = label;
}

function searchPost() {
	removeScript();
	tocContainer.innerHTML = "";
	tableContent.innerHTML = "";
	descNav.innerHTML = tocConfig.searching;
	var newScript = document.createElement('script');
		newScript.type = 'text/javascript';
		newScript.id = 'temporer-script';
		newScript.src = tocConfig.url + '/feeds/posts/summary?alt=json-in-script&orderby=published&q=' + input.value + '&max-results=9999&callback=showFeedList';
	head.appendChild(newScript);
	filter = 'search';
	return false;
}

getID('itemSearcher').onsubmit =  searchPost;

orderByer.onchange = function() {
	changeSort(0);
}
initResult(0);
buildLabels();