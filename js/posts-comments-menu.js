// RECENT POSTS & RECENT COMMENTS 4 DROP DOWN MENU
// VISIT: http://idtutorplus.blogspot.com/2012/10/recent-posts-and-recent-comments-on.html

// Recent Post with Thumbnail
function dropdownposts(json) {
    var entry = json.feed.entry;
    for (var i = 0; i < numposts; i++) {
        var posturl;
        for (var j = 0; j < entry[i].link.length; j++) {
            if (entry[i].link[j].rel == 'alternate') {
                posturl = entry[i].link[j].href;
                break;
            }
        }
        for (var l = 0; l < entry[i].link.length; l++) {
            if (entry[i].link[l].rel == "replies" && entry[i].link[l].type == "text/html") {
                cmnum = entry[i].link[l].title.split(" ")[0];
                break
            }
        }

        var poststitle = entry[i].title.$t,
            postdate = entry[i].published.$t.substring(0, 10),
            postdate = postdate.replace(/-/g, "/");

        if ("media$thumbnail" in entry[i]) {
            postimg = entry[i].media$thumbnail.url;
        } else {
            postimg = pBlank;
        }
        document.write('<li><img src="' + postimg + '" class="rp-thumb" alt="thumb" />');
        document.write('<strong><a href="' + posturl + '">' + poststitle + '</a></strong><span class="footer-outer"><span class="itp">' + postdate + '</span><span class="cm"> - ' + cmnum + ' ' + cmtext + '</span></span></li>');
    }
}

// Recent Comment
function dropdowncomment(json) {
    var entry, commurl, commsum, lihatkomentar;
    for (var i = 0; i < numcomment; i++) {
        entry = json.feed.entry[i];
        if (i == json.feed.entry.length) break;
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') {
                commurl = entry.link[k].href;
                break
            }
        }

        if ("content" in entry) {
            commsum = entry.content.$t;
        } else if ("summary" in entry) {
            commsum = entry.summary.$t;
        } else {
            commsum = "";
        }

        var re = /<\S[^>]*>/g;
        commsum = commsum.replace(re, "");
        if (commsum.length > cmsumm) {
            commsum = commsum.substring(0, cmsumm) + "...";
        }

        document.write('<li>');
        document.write('<strong><a rel="nofollow" href="' + commurl + '">' + entry.author[0].name.$t + ':</a></strong> <span>' + commsum + '</span>');
        document.write('</li>');
    }
}