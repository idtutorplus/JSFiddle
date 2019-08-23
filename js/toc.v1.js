/**
 * Simple script experiment to create sitemap blogspot by Id Tutor Plus
 * Visit: http://idtutorplus.blogspot.com
 * Update: 08 Oktober 2014
 */
var tabbedTOC_defaults = {
    blogUrl: "http://idtutorplus.blogspot.com",
    containerId: "tabbed-toc",
    activeTab: 1,
    showDates: false,
    showSummaries: false,
    numChars: 200,
    showThumbnails: false,
    thumbSize: 40,
    noThumb: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC",
    monthNames: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    newTabLink: true,
    maxResults: 99999,
    preload: 0,
    sortAlphabetically: true,
    showNew: false,
    rmoreText: "Selengkapnya &#9658;",
    newText: " - <em style='color:red;'>Baru!</em>"
};
for (var i in tabbedTOC_defaults) {
    tabbedTOC_defaults[i] = (typeof (tabbedTOC[i]) !== undefined && typeof (tabbedTOC[i]) !== 'undefined') ? tabbedTOC[i] : tabbedTOC_defaults[i]
}

function clickTab(pos) {
    var a = document.getElementById(tabbedTOC_defaults.containerId),
        b = a.getElementsByTagName('ol'),
        c = a.getElementsByTagName('ul')[0],
        d = c.getElementsByTagName('a');
    for (var t = 0; t < b.length; t++) {
        b[t].style.display = "none";
        b[parseInt(pos, 10)].style.display = "block"
    }
    for (var u = 0; u < d.length; u++) {
        d[u].className = "";
        d[parseInt(pos, 10)].className = "active-tab"
    }
}

function showTabs(json) {
    var total = parseInt(json.feed.openSearch$totalResults.$t, 10),
        c = tabbedTOC_defaults,
        entry = json.feed.entry,
        category = json.feed.category,
        skeleton = "",
        newPosts = [];
    for (var g = 0; g < (c.showNew === true ? 5 : c.showNew); g++) {
        if (g == entry.length) break;
        entry[g].title.$t = entry[g].title.$t + (c.showNew !== false ? c.newText : '')
    }
    entry = c.sortAlphabetically ? entry.sort(function (a, b) {
        return (a.title.$t.localeCompare(b.title.$t))
    }) : entry;
    category = c.sortAlphabetically ? category.sort(function (a, b) {
        return (a.term.localeCompare(b.term))
    }) : category;
    skeleton = '<span class="divider-layer"></span><ul class="toc-tabs">';
    for (var h = 0, cen = category.length; h < cen; h++) {
        skeleton += '<li class="toc-tab-item-' + h + '"><a href="javascript:clickTab(' + h + ');">' + category[h].term + '</a></li>'
    }
    skeleton += '</ul>';
    skeleton += '<div class="toc-content">';
    for (var i = 0, cnt = category.length; i < cnt; i++) {
        skeleton += '<ol class="panel" data-category="' + category[i].term + '"';
        skeleton += (i != (c.activeTab - 1)) ? ' style="display:none;"' : '';
        skeleton += '>';
        for (var j = 0; j < total; j++) {
            if (j == entry.length) break;
            var link, entries = entry[j],
                pub = entries.published.$t,
                month = c.monthNames,
                title = entries.title.$t,
                rmore = c.rmoreText,
                summary = ("summary" in entries && c.showSummaries === true) ? entries.summary.$t.replace(/<br ?\/?>/g, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "").substring(0, c.numChars) + '&hellip;' : '',
                img = ("media$thumbnail" in entries && c.showThumbnails === true) ? '<img class="thumbnail" style="width:' + c.thumbSize + 'px;height:' + c.thumbSize + 'px;" alt="" src="' + entries.media$thumbnail.url.replace(/\/s72(\-c)?\//, "/s" + c.thumbSize + "-c/") + '"/>' : '<img class="thumbnail" style="width:' + c.thumbSize + 'px;height:' + c.thumbSize + 'px;" alt="" src="' + c.noThumb.replace(/\/s72(\-c)?\//, "/s" + c.thumbSize + "-c/") + '"/>',
                cat = (entries.category) ? entries.category : [],
                date = (c.showDates) ? '<time datetime="' + pub + '" title="' + pub + '">' + pub.substring(8, 10) + ' ' + month[parseInt(pub.substring(5, 7), 10) - 1] + ' ' + pub.substring(0, 4) + '</time>' : '';
            for (var k = 0; k < entries.link.length; k++) {
                if (entries.link[k].rel == 'alternate') {
                    link = entries.link[k].href;
                    break
                }
            }
            for (var l = 0, check = cat.length; l < check; l++) {
                var target = (c.newTabLink) ? ' target="_blank"' : '';
                if (cat[l].term == category[i].term) {
                    skeleton += '<li title="' + title + ' : ' + cat[l].term + '"';
                    skeleton += (c.showSummaries) ? ' class="bold"' : '';
                    skeleton += '><a class="item-title" href="' + link + '"' + target + '>';
                    skeleton += '' + title + '';
                    skeleton += (c.showSummaries !== true) ? '' + date + '' : '';
                    skeleton += '</a>';
                    skeleton += (c.showSummaries) ? '<span class="summary">' + img + summary + '<span style="display:block;clear:both;"></span></span>' : '';
                    skeleton += (c.showSummaries) ? '<div class="itemfoot">' + date + '<a class="itemrmore" href="' + link + '"' + target + '>' + rmore + '</a></div>' : '';
                    skeleton += '</li>'
                }
            }
        }
        skeleton += '</ol>'
    }
    skeleton += '</div>';
    skeleton += '<div style="clear:both;"></div>';
    document.getElementById(c.containerId).innerHTML = skeleton;
    clickTab(c.activeTab - 1)
}(function () {
    var h = document.getElementsByTagName('head')[0],
        s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = tabbedTOC_defaults.blogUrl + '/feeds/posts/summary?alt=json-in-script&max-results=' + tabbedTOC_defaults.maxResults + '&orderby=published&callback=showTabs';
    if (tabbedTOC_defaults.preload !== "onload") {
        setTimeout(function () {
            h.appendChild(s)
        }, tabbedTOC_defaults.preload)
    } else {
        window.onload = function () {
            h.appendChild(s)
        }
    }
})();