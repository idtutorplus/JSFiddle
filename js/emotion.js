/**
 * Simple regex experiment to create an automatic emoticons by DTE :] and Kang Onk
 * Visit: http://kod-tutor.blogspot.com/
 * Update: 22 December 2013
 */
$(function () {

    // Append an emoticon bar before comment-form
    if (putEmoAbove) {
        $(putEmoAbove).before('<div class="heads-up" id="emoWrap"> :) :( ^_^ :D ;) :-bd :yaya: :&#39;( :&#92; :p B) :Q :Ozz 7:( &#92;o/ **p &lt;3 0:) :-a 7:O *fck* x@ X@ ~x( =p*  </div>');
    }

    function emo(emo, imgRep, emoKey) {
        $(emoRange).each(function () {
            $(this).html($(this).html().replace(/<br ?\/?>(:|;|=|\^)/ig, "<br> $1").replace(emo, " <img src='" + imgRep + "' class='emo delayLoad' alt='" + emoKey + "' />"));
        });
    }
	emo(/\s:\)+/g, "http://idplus.googlecode.com/svn/trunk/images/emotion/smile.gif", ":)");
	emo(/\s;\)+/g, "http://idplus.googlecode.com/svn/trunk/images/emotion/wink.gif", ";)");
	emo(/\s:\(/g, "http://idplus.googlecode.com/svn/trunk/images/emotion/sad.gif", ":(");
	emo(/\s:yaya:/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/yaya.gif", ":yaya:");
	emo(/\s:\\/g, "http://idplus.googlecode.com/svn/trunk/images/emotion/memble.gif", ":&#92;");
	emo(/\s:D/g, "http://idplus.googlecode.com/svn/trunk/images/emotion/haha.gif", ":D");
	emo(/\s\^(\_|)\^/g, "http://idplus.googlecode.com/svn/trunk/images/emotion/senyum-tulus.gif", "^_^");
	emo(/\s:'\(/g, "http://idplus.googlecode.com/svn/trunk/images/emotion/cry.gif", ":&#39;(");
	emo(/\sB\)/g, "http://idplus.googlecode.com/svn/trunk/images/emotion/cool.gif", "B)");
	emo(/\s:Q/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/smoking.gif", ":Q");
	emo(/\s\*\*p/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/crazy.gif", "**p");
	emo(/\s7:\(/g, "http://idplus.googlecode.com/svn/trunk/images/emotion/conf.gif", "7:(");
	emo(/\s:p/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/wee.gif", ":p");
	emo(/\s:Oz+/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/sleep.gif", ":Ozz");
	emo(/\s7:O/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/angry.gif", "7:O");
	emo(/\s\\o\//ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/applause.gif", "&#92;o/");
	emo(/\s&lt;3/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/love.gif", "&amp;amp;lt;3");
	emo(/\s0:\)+/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/angelgreen.gif", "0:)");
	emo(/\s:-a/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/vomit.gif", ":-a");
	emo(/\s\*fck\*/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/fuck.gif", "*fck*");
	emo(/\sx\@/g, "http://idplus.googlecode.com/svn/trunk/images/emotion/marahbesar.gif", "x@");
	emo(/\s\X\@/g, "http://idplus.googlecode.com/svn/trunk/images/emotion/arrgh.gif", "X@");
	emo(/\s:-bd/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/topmarkotop.gif", ":-bd");
	emo(/\s\~x\(+/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/ugh.gif", "~x(");
	emo(/\s=p\*/ig, "http://idplus.googlecode.com/svn/trunk/images/emotion/ball2.gif", "=p*");

    var one = 0; // Show alert one times!

    // Click anywhere to hide the emoticon
    $(document.body).on("click", function () {
        $('.emoKey').remove();
    });

    // Click to show the code!
    $('.emo').css('cursor', 'pointer').on("click", function (e) {
        $('.emoKey').remove();
        $(this).after('<input class="emoKey" type="text" size="6" value=" ' + this.alt + '" />');
        $('.emoKey').trigger("select");
        if (emoMessage && one === 0) {
            alert(emoMessage);
            one = 1;
        }
        e.stopPropagation();
    });

});