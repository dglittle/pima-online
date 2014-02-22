
function comparator(f, desc) {
    return function (a, b) {
        if (f) {
            a = f(a)
            b = f(b)
        }
        if (a < b) return desc ? 1 : -1
        if (a > b) return desc ? -1 : 1
        return 0
    }
}

_.getStartOfDay = function (time) {
    var t = new Date(time)
    t.setHours(0)
    t.setMinutes(0)
    t.setSeconds(0)
    t.setMilliseconds(0)
    return t.getTime()
}

_.englishTimeSpan = function(t) {
    var second = 1000
    var minute = second * 60
    var hour = minute * 60
    var day = hour * 24
    var week = day * 7
    var month = day * 30
    var year = day * 365
    // years
    if (t >= Number.MAX_VALUE)
        return "never"
    if (t / year >= 1)
        return (t / year).toFixed(1) + " years"
    if (t / month >= 1)
        return (t / month).toFixed(1) + " months"
    if (t / week >= 1)
        return (t / week).toFixed(1) + " weeks"
    if (t / day >= 1)
        return (t / day).toFixed(1) + " days"
    if (t / hour >= 1)
        return (t / hour).toFixed(1) + " hours"
    if (t / minute >= 1)
        return (t / minute).toFixed(1) + " minutes"
    if (t / second >= 1)
        return (t / second).toFixed(1) + " seconds"
    return "now"
}

// from http://snipplr.com/view.php?codeview&id=5945
function number_format( number, decimals, dec_point, thousands_sep ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://crestidg.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)    
    // *     example 1: number_format(1234.5678, 2, '.', '');
    // *     returns 1: 1234.57     
 
    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d = dec_point == undefined ? "," : dec_point;
    var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

// adapted from http://snipplr.com/view.php?codeview&id=5949
function size_format (filesize) {
    if (filesize >= 1073741824) {
         filesize = number_format(filesize / 1073741824, 2, '.', '') + 'gb';
    } else { 
        if (filesize >= 1048576) {
            filesize = number_format(filesize / 1048576, 2, '.', '') + 'mb';
    } else { 
            if (filesize >= 1024) {
            filesize = number_format(filesize / 1024, 0) + 'kb';
        } else {
            filesize = number_format(filesize, 0) + ' bytes';
            };
        };
    };
  return filesize;
};


function drawShareButtons(message, url, cb) {
    var d = $('<div/>')

    var shares = [
        {
            type : 'facebook',
            img : 'facebook_grey.png',
            url : createFacebookShareLink(url, '', message, '')
        },
        {
            type : 'twitter',
            img : 'twitter_grey.png',
            url : createTwitterShareLink(message + ' ' + url)
        },
        {
            type : 'google+',
            img : 'google_plus_grey.png',
            url : createGooglePlusShareLink(url)
        }
    ]

    _.each(shares, function (share, i) {
        d.append($('<img style="cursor:pointer;' + (i < shares.length - 1 ? 'margin-right:10px' : '') + '"/>').attr('src', share.img).click(function () {
            cb(share.type)
            window.open(share.url, 'share url', 'height=400,width=500,resizable=yes')
        }))
    })

    return d
}

function createFacebookShareLink(url, img, title, summary) {
    return 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]=' + _.escapeUrl(url) + '&p[images][0]=' + _.escapeUrl(img) + '&p[title]=' + _.escapeUrl(title) + '&p[summary]=' + _.escapeUrl(summary)
}

function createTwitterShareLink(tweet) {
    return 'http://twitter.com/home?status=' + _.escapeUrl(tweet)
}

function createGooglePlusShareLink(url) {
    return 'https://plus.google.com/share?url=' + _.escapeUrl(url)
}

function splitSizeHelper2(size) {
    if (size == null) return ""
    if (size <= 1) return Math.round(100 * size) + '%'
    return size + 'px'
}

function splitHorzMedian(aSize, bSize, a, b, median, fill) {
    if (fill === undefined) fill = true
    aSize = _.splitSizeHelper('width', aSize)
    bSize = _.splitSizeHelper('width', bSize)
    mSize = splitSizeHelper2(median)
    var t = $('<table ' + (fill ? 'style="width:100%;height:100%"' : '') + '><tr valign="top"><td class="a" ' + aSize + '></td><td width="' + mSize + '"><div style="width:' + mSize + '"/></td><td class="b" ' + bSize + '></td></tr></table>')
    // don't do this:
    // t.find('.a').append(a)
    // t.find('.b').append(b)
    var _a = t.find('.a')
    var _b = t.find('.b')
    _a.append(a)
    _b.append(b)
    return t
}

function grid(rows) {
    var t = []
    t.push('<table style="width:100%;height:100%">')
    _.each(rows, function (row, y) {
        t.push('<tr height="33.33%">')
        _.each(row, function (cell, x) {
            var c = 'x' + x + 'y' + y
            t.push('<td class="' + c + '" width="33.33%"/>')
        })
        t.push('</tr>')
    })
    t.push('</table>')
    t = $(t.join(''))

    _.each(rows, function (row, y) {
        _.each(row, function (cell, x) {
            var c = 'x' + x + 'y' + y
            t.find('.' + c).append(cell)
        })
    })

    return t
}

function center(me) {
    var t = $('<table style="width:100%;height:100%"><tr><td valign="center" align="center"></td></tr></table>')
    t.find('td').append(me)
    return t
}

$.fn.myAppend = function (args) {
    for (var i = 0; i < arguments.length; i++) {
        var a = arguments[i]
        if (a instanceof Array)
            $.fn.myAppend.apply(this, a)
        else
            this.append(a)
    }
    return this
}

function cssMap(s) {
    var m = {}
    _.each(s.split(';'), function (s) {
        var a = s.split(':')
        if (a[0])
            m[_.trim(a[0])] = _.trim(a[1])
    })
    return m
}

$.fn.myCss = function (s) {
    return this.css(cssMap(s))
}

$.fn.myHover = function (s, that) {
    var that = that || this
    var m = cssMap(s)
    var old = _.map(m, function (v, k) {
        return that.css(k)
    })
    this.hover(function () {
        that.css(m)
    }, function () {
        that.css(old)
    })
    return this
}

$.fn.addLabel = function (d) {
    if (typeof(d) == "string") d = $('<span/>').text(d)
        
    var id = _.randomString(10, /[a-z]/)
    this.attr('id', id)
    this.after($('<label for="' + id + '"/>').append(d))
    return this
}


function rotate(me, amount) {
    var s = 'rotate(' + amount + 'deg)'
    me.css({
        '-ms-transform' : s,
        '-moz-transform' : s,
        '-webkit-transform' : s,
        '-o-transform' : s
    })
    return me
}

jQuery.fn.extend({
    rotate : function (amount) {
        return this.each(function () {
            rotate($(this), amount)
        })
    },
    enabled : function (yes) {
        if (yes === undefined)
            return !$(this[0]).attr('disabled')
        return this.each(function () {
            if (yes) $(this).removeAttr('disabled')
            else $(this).attr('disabled', 'disabled')
        })
    }
})

jQuery.fn.extend({
    rotate : function (amount) {
        return this.each(function () {
            rotate($(this), amount)
        })
    }
})

function createThrobber() {
    var d = $('<div style="width:30px;height:10px;background:white"/>')
    var dd = $('<div style="width:0px;height:10px;background:blue"/>')
    d.append(dd)
    var start = _.time()
    var i = setInterval(function () {
        if ($.contains(document.documentElement, d[0])) {
            var t = (_.time() - start) / 1000
            t *= 6
            var w = _.lerp(-1, 10, 1, 30, Math.sin(t))
            dd.css('width', w + 'px')
            dd.css('margin-left', (30 - w) / 2 + 'px')
        } else
            clearInterval(i)
    }, 30)
    return d;
}
