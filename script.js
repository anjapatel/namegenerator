//would be nice to hide results on load and have a 'play' button or something of that sort
//would like to randomize paragraph text, but everything breaks when i try to do so

//arrays here
var firstword = [
  "Tatiana",
  "Belinda",
  "Helcate",
  "Maeve",
  "Terra",
  "Maribel",
  "Alabaster",
  "Sapphire",
  "Mauve",
];

var secondword = [
  "of the East",
  "of the West",
  "of the Willows",
  "of Windshore",
  "the Good",
  "of Watershore",
  "of Alatar",
  "the Death Witch",
  "of Nightwind",
  "of Elderwind",
  "of Eveningsbane",
  "the Jade Witch",
  "of Deepwood"
];


//randomize! woo!
$('button').click(function() {
  $('#witchname').text(randomEl(firstword) + ' ' + randomEl(secondword));
  selectElementContents($('#witchname').get(0));
});

//show element works here, but i can't keep it from firing as soon as i reload
$('button').click(function() {
  $('#text').show(400);
});

//ngl i found this in a fiddle, i don't quite understand the parameters
function randomEl(list) {
  var i = Math.floor(Math.random() * list.length);
  return list[i];
}

function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

$('button').click();

/* BuzzFeed UK New Formats Sharing. 26 Jul 2017 Ver A.

    UKSharing.log_event({
        "category": 'NewFormats: InteractiveName', // (probably best to leave it as this)
        "action": "User clicked Replay",
        "label": "Their last result: Florp!", // or false/undefined,
        "value": 0 # Integers only, or false/undefined
    });

    UKSharing.twitter({
        "message": 'I scored 99! What will YOU score?',
        "url": location.href
    });

    UKSharing.facebook({
        "title": 'I scored 99! What will YOU score?', // This is now shared as a "Quote" as Facebook took away the ability to do custom titles/descriptions and images
        "url": location.href
    });

    UKSharing.pinterest({
        "message": 'I scored 99! What will YOU score?', 
        "picture": 'https://secure.url/image.jpg',
        "url": location.href
    });

    UKSharing.email({
        "subject": 'I scored 99! What will YOU score?', 
        "message": 'https://secure.url/image.jpg',
        "url": location.href
    })

    UKSharing.whatsapp({
        "message": 'I scored 99! What will YOU score?', 
        "picture": 'https://secure.url/image.jpg',
        "url": location.href
    })

*/

window.BF_STATIC = window.BF_STATIC || {};

var UKSharing = {
    GA_Sender: false,
    strip: function (html) {

        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";

    },
    log_event: function (evdata) {

        // Category = text
        // Action = text
        // Label = text or false
        // Value = integer (and ONLY integer!) or false
        if (typeof ga == "undefined") {
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        }

        if (UKSharing.GA_Sender == false) {
            ga('create', 'UA-1740781-1', 'auto', {
                'name': 'UKNFGAHandle'
            });
            UKSharing.GA_Sender = 'UKNFGAHandle.send';
        }

        if (evdata.value) {
            filteredValue = parseInt(evdata.value);
        } else {
            filteredValue = undefined;
        }

        ga(UKSharing.GA_Sender, 'event', evdata.category, evdata.action, evdata.label, filteredValue);

    },
    tools: {

        rel2abs: function (link) {
            var absolute = document.createElement('a');
            absolute.href = link;
            return absolute.href.replace("?s=mobile_app", "");
        }

    },
    spawnPopup: function (url, w, h) {

        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, '_blank', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus && newWindow) {
            newWindow.focus();
        }

    },
    twitter: function (tweet) {

        var twitter_rel = "BuzzFeedUK";
        if (typeof i18n !== 'undefined') {
            if (i18n.twitter_rel) {
                twitter_rel = i18n.twitter_rel;
            }
        }

        var twitterHref;
        var twitterVia = (unescape(tweet.message).length > 100) ? '' : '&via=' + twitter_rel;

        if (tweet.url !== undefined) {
            tweet.url = UKSharing.tools.rel2abs(tweet.url);
            message_with_url_encoded = "" + tweet.message + ' ' + tweet.url;
        }

        message_with_url_encoded = encodeURI(UKSharing.strip(message_with_url_encoded));
        // encodeURI doesn't escape hashes? Boo! BOO!
        message_with_url_encoded = message_with_url_encoded.replace(/#/, '%23');
        message_with_url_encoded = message_with_url_encoded.replace(/&/, '%26');

        var twitterHref = [
            'https://twitter.com/intent/tweet',
            '?text=' + message_with_url_encoded,
            twitterVia
        ].join('');

        if (BF_STATIC.mobile_app) {
            Share.twitter({
                action: "share/twitter/tweet",
                category: "MobileBuzz:UKSharing",
                label: undefined,
                hashtags: '',
                legacy_url: location.pathname,
                parent_id: 'subbuzz',
                related: twitter_rel,
                headline: tweet.message,
                url: UKSharing.tools.rel2abs(tweet.url),
                via: twitterVia ? twitter_rel : ""
            });
        } else {
            UKSharing.spawnPopup(twitterHref, 650, 450);
        }

    },
    facebook: function (fbMessage) {

        if (BF_STATIC.mobile_app) {
            Share.facebook({
                action: "share/facebook/share",
                category: "MobileBuzz:UKSharing",
                description: undefined,
                label: undefined,
                legacy_url: location.pathname,
                link: UKSharing.tools.rel2abs(fbMessage.url),
                name: fbMessage.title,
                description: fbMessage.title,
                parent_id: "subbuzz",
                picture: fbMessage.picture
            });
        } else if (typeof FB !== "undefined") {
            FB.ui({
                method: 'share',
                href: UKSharing.tools.rel2abs(fbMessage.url),
                quote: UKSharing.strip(fbMessage.title),
                picture: fbMessage.picture,
                display: 'popup'
            });
        } else {
            var facebookHref = 'https://www.facebook.com/dialog/share/?&href=' + UKSharing.tools.rel2abs(fbMessage.url) + '&quote=' + UKSharing.strip(fbMessage.title);
            UKSharing.spawnPopup(facebookHref, 650, 650)
        }

    },
    pinterest: function (piMessage) {

        var pinterestHREF;
        pinterestHREF = [
            'http://pinterest.com/pin/create/bookmarklet/',
            '?url=' + UKSharing.tools.rel2abs(piMessage.url),
            '&media=' + encodeURI(piMessage.picture),
            '&description=' + encodeURI(piMessage.message)
        ].join('');
        UKSharing.spawnPopup(pinterestHREF, 400, 580);
        return false;

    },
    whatsapp: function (whatsapp) {

        if (whatsapp.picture !== undefined) {
            whatsapp.message += " " + whatsapp.picture;
        }
        if (whatsapp.url !== undefined) {
            whatsapp.url = UKSharing.tools.rel2abs(whatsapp.url);
        }
        whatsapp.message = UKSharing.strip(whatsapp.message);
        var message_encoded = encodeURI(whatsapp.message + "\n\n");
        message_encoded += encodeURIComponent(whatsapp.url);
        // encodeURI doesn't escape hashes? Boo! BOO!		
        message_encoded = message_encoded.replace(/#/, '%23');
        message_encoded = message_encoded.replace(/&/, '%26');
        var whatsAppProto = [
            'whatsapp://send',
            '?text=' + message_encoded
        ].join('');
        window.location = whatsAppProto;

    },
    email: function (mail) {

        mail.link = "\n\n" + mail.url;
        var eURL = "?subject=" + encodeURI(mail.subject) + "&body=" + encodeURI(mail.message) + encodeURI(mail.link);
        window.location = "mailto:%20" + eURL;

    }
};

$("#share").click(function() {
  UKSharing.facebook({
    "title": 'My witch name would be: ' + $("#witchname").text() + "! What would YOURS be?", // This is now shared as a "Quote" as Facebook took away the ability to do custom titles/descriptions and images
    "url": location.href
  });
})