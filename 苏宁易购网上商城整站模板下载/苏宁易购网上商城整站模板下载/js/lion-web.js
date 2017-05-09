/*
**easing 缓动公式
*/
jQuery.easing.jswing = jQuery.easing.swing; jQuery.extend(jQuery.easing, { def: "easeOutQuad", swing: function (e, f, a, h, g) { return jQuery.easing[jQuery.easing.def](e, f, a, h, g) }, easeInQuad: function (e, f, a, h, g) { return h * (f /= g) * f + a }, easeOutQuad: function (e, f, a, h, g) { return -h * (f /= g) * (f - 2) + a }, easeInOutQuad: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f + a } return -h / 2 * ((--f) * (f - 2) - 1) + a }, easeInCubic: function (e, f, a, h, g) { return h * (f /= g) * f * f + a }, easeOutCubic: function (e, f, a, h, g) { return h * ((f = f / g - 1) * f * f + 1) + a }, easeInOutCubic: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f * f + a } return h / 2 * ((f -= 2) * f * f + 2) + a }, easeInQuart: function (e, f, a, h, g) { return h * (f /= g) * f * f * f + a }, easeOutQuart: function (e, f, a, h, g) { return -h * ((f = f / g - 1) * f * f * f - 1) + a }, easeInOutQuart: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f * f * f + a } return -h / 2 * ((f -= 2) * f * f * f - 2) + a }, easeInQuint: function (e, f, a, h, g) { return h * (f /= g) * f * f * f * f + a }, easeOutQuint: function (e, f, a, h, g) { return h * ((f = f / g - 1) * f * f * f * f + 1) + a }, easeInOutQuint: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f * f * f * f + a } return h / 2 * ((f -= 2) * f * f * f * f + 2) + a }, easeInSine: function (e, f, a, h, g) { return -h * Math.cos(f / g * (Math.PI / 2)) + h + a }, easeOutSine: function (e, f, a, h, g) { return h * Math.sin(f / g * (Math.PI / 2)) + a }, easeInOutSine: function (e, f, a, h, g) { return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a }, easeInExpo: function (e, f, a, h, g) { return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a }, easeOutExpo: function (e, f, a, h, g) { return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a }, easeInOutExpo: function (e, f, a, h, g) { if (f == 0) { return a } if (f == g) { return a + h } if ((f /= g / 2) < 1) { return h / 2 * Math.pow(2, 10 * (f - 1)) + a } return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a }, easeInCirc: function (e, f, a, h, g) { return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a }, easeOutCirc: function (e, f, a, h, g) { return h * Math.sqrt(1 - (f = f / g - 1) * f) + a }, easeInOutCirc: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a } return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a }, easeInElastic: function (f, h, e, l, k) { var i = 1.70158; var j = 0; var g = l; if (h == 0) { return e } if ((h /= k) == 1) { return e + l } if (!j) { j = k * 0.3 } if (g < Math.abs(l)) { g = l; var i = j / 4 } else { var i = j / (2 * Math.PI) * Math.asin(l / g) } return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e }, easeOutElastic: function (f, h, e, l, k) { var i = 1.70158; var j = 0; var g = l; if (h == 0) { return e } if ((h /= k) == 1) { return e + l } if (!j) { j = k * 0.3 } if (g < Math.abs(l)) { g = l; var i = j / 4 } else { var i = j / (2 * Math.PI) * Math.asin(l / g) } return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e }, easeInOutElastic: function (f, h, e, l, k) { var i = 1.70158; var j = 0; var g = l; if (h == 0) { return e } if ((h /= k / 2) == 2) { return e + l } if (!j) { j = k * (0.3 * 1.5) } if (g < Math.abs(l)) { g = l; var i = j / 4 } else { var i = j / (2 * Math.PI) * Math.asin(l / g) } if (h < 1) { return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e } return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e }, easeInBack: function (e, f, a, i, h, g) { if (g == undefined) { g = 1.70158 } return i * (f /= h) * f * ((g + 1) * f - g) + a }, easeOutBack: function (e, f, a, i, h, g) { if (g == undefined) { g = 1.70158 } return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a }, easeInOutBack: function (e, f, a, i, h, g) { if (g == undefined) { g = 1.70158 } if ((f /= h / 2) < 1) { return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a } return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a }, easeInBounce: function (e, f, a, h, g) { return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a }, easeOutBounce: function (e, f, a, h, g) { if ((f /= g) < (1 / 2.75)) { return h * (7.5625 * f * f) + a } else { if (f < (2 / 2.75)) { return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a } else { if (f < (2.5 / 2.75)) { return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a } else { return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a } } } }, easeInOutBounce: function (e, f, a, h, g) { if (f < g / 2) { return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a } return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a } });


var buzz = {
    defaults : {
        autoplay : false,
        duration : 5000,
        formats : [],
        loop : false,
        placeholder : '--',
        preload : 'metadata',
        volume : 80
    },
    types : {
        'mp3' : 'audio/mpeg',
        'ogg' : 'audio/ogg',
        'wav' : 'audio/wav',
        'aac' : 'audio/aac',
        'm4a' : 'audio/x-m4a'
    },
    sounds : [],
    el : document.createElement('audio'),

    sound : function(src, options) {
        options = options || {};

        var pid = 0, events = [], eventsOnce = {}, supported = buzz.isSupported();

        // publics
        this.load = function() {
            if(!supported) {
                return this;
            }

            this.sound.load();
            return this;
        };

        this.play = function() {
            if(!supported) {
                return this;
            }

            this.sound.play();
            return this;
        };

        this.togglePlay = function() {
            if(!supported) {
                return this;
            }

            if(this.sound.paused) {
                this.sound.play();
            } else {
                this.sound.pause();
            }
            return this;
        };

        this.pause = function() {
            if(!supported) {
                return this;
            }

            this.sound.pause();
            return this;
        };

        this.isPaused = function() {
            if(!supported) {
                return null;
            }

            return this.sound.paused;
        };

        this.stop = function() {
            if(!supported) {
                return this;
            }

            this.setTime(this.getDuration());
            this.sound.pause();
            return this;
        };

        this.isEnded = function() {
            if(!supported) {
                return null;
            }

            return this.sound.ended;
        };

        this.loop = function() {
            if(!supported) {
                return this;
            }

            this.sound.loop = 'loop';
            this.bind('ended.buzzloop', function() {
                this.currentTime = 0;
                this.play();
            });
            return this;
        };

        this.unloop = function() {
            if(!supported) {
                return this;
            }

            this.sound.removeAttribute('loop');
            this.unbind('ended.buzzloop');
            return this;
        };

        this.mute = function() {
            if(!supported) {
                return this;
            }

            this.sound.muted = true;
            return this;
        };

        this.unmute = function() {
            if(!supported) {
                return this;
            }

            this.sound.muted = false;
            return this;
        };

        this.toggleMute = function() {
            if(!supported) {
                return this;
            }

            this.sound.muted = !this.sound.muted;
            return this;
        };

        this.isMuted = function() {
            if(!supported) {
                return null;
            }

            return this.sound.muted;
        };

        this.setVolume = function(volume) {
            if(!supported) {
                return this;
            }

            if(volume < 0) {
                volume = 0;
            }
            if(volume > 100) {
                volume = 100;
            }

            this.volume = volume;
            this.sound.volume = volume / 100;
            return this;
        };

        this.getVolume = function() {
            if(!supported) {
                return this;
            }

            return this.volume;
        };

        this.increaseVolume = function(value) {
            return this.setVolume(this.volume + (value || 1 ));
        };

        this.decreaseVolume = function(value) {
            return this.setVolume(this.volume - (value || 1 ));
        };

        this.setTime = function(time) {
            if(!supported) {
                return this;
            }

            this.whenReady(function() {
                this.sound.currentTime = time;
            });
            return this;
        };

        this.getTime = function() {
            if(!supported) {
                return null;
            }

            var time = Math.round(this.sound.currentTime * 100) / 100;
            return isNaN(time) ? buzz.defaults.placeholder : time;
        };

        this.setPercent = function(percent) {
            if(!supported) {
                return this;
            }

            return this.setTime(buzz.fromPercent(percent, this.sound.duration));
        };

        this.getPercent = function() {
            if(!supported) {
                return null;
            }

            var percent = Math.round(buzz.toPercent(this.sound.currentTime, this.sound.duration));
            return isNaN(percent) ? buzz.defaults.placeholder : percent;
        };

        this.setSpeed = function(duration) {
            if(!supported) {
                return this;
            }

            this.sound.playbackRate = duration;
        };

        this.getSpeed = function() {
            if(!supported) {
                return null;
            }

            return this.sound.playbackRate;
        };

        this.getDuration = function() {
            if(!supported) {
                return null;
            }

            var duration = Math.round(this.sound.duration * 100) / 100;
            return isNaN(duration) ? buzz.defaults.placeholder : duration;
        };

        this.getPlayed = function() {
            if(!supported) {
                return null;
            }

            return timerangeToArray(this.sound.played);
        };

        this.getBuffered = function() {
            if(!supported) {
                return null;
            }

            return timerangeToArray(this.sound.buffered);
        };

        this.getSeekable = function() {
            if(!supported) {
                return null;
            }

            return timerangeToArray(this.sound.seekable);
        };

        this.getErrorCode = function() {
            if(supported && this.sound.error) {
                return this.sound.error.code;
            }
            return 0;
        };

        this.getErrorMessage = function() {
            if(!supported) {
                return null;
            }

            switch( this.getErrorCode() ) {
                case 1:
                    return 'MEDIA_ERR_ABORTED';
                case 2:
                    return 'MEDIA_ERR_NETWORK';
                case 3:
                    return 'MEDIA_ERR_DECODE';
                case 4:
                    return 'MEDIA_ERR_SRC_NOT_SUPPORTED';
                default:
                    return null;
            }
        };

        this.getStateCode = function() {
            if(!supported) {
                return null;
            }

            return this.sound.readyState;
        };

        this.getStateMessage = function() {
            if(!supported) {
                return null;
            }

            switch( this.getStateCode() ) {
                case 0:
                    return 'HAVE_NOTHING';
                case 1:
                    return 'HAVE_METADATA';
                case 2:
                    return 'HAVE_CURRENT_DATA';
                case 3:
                    return 'HAVE_FUTURE_DATA';
                case 4:
                    return 'HAVE_ENOUGH_DATA';
                default:
                    return null;
            }
        };

        this.getNetworkStateCode = function() {
            if(!supported) {
                return null;
            }

            return this.sound.networkState;
        };

        this.getNetworkStateMessage = function() {
            if(!supported) {
                return null;
            }

            switch( this.getNetworkStateCode() ) {
                case 0:
                    return 'NETWORK_EMPTY';
                case 1:
                    return 'NETWORK_IDLE';
                case 2:
                    return 'NETWORK_LOADING';
                case 3:
                    return 'NETWORK_NO_SOURCE';
                default:
                    return null;
            }
        };

        this.set = function(key, value) {
            if(!supported) {
                return this;
            }

            this.sound[key] = value;
            return this;
        };

        this.get = function(key) {
            if(!supported) {
                return null;
            }

            return key ? this.sound[key] : this.sound;
        };

        this.bind = function(types, func) {
            if(!supported) {
                return this;
            }
            types = types.split(' ');

            var that = this, efunc = function(e) {
                func.call(that, e);
            };
            for(var t = 0; t < types.length; t++) {
                var type = types[t], idx = type;
                type = idx.split( '.' )[0];

                events.push({
                    idx : idx,
                    func : efunc
                });
                this.sound.addEventListener(type, efunc, true);
            }
            return this;
        };

        this.unbind = function(types) {
            if(!supported) {
                return this;
            }
            types = types.split(' ');

            for(var t = 0; t < types.length; t++) {
                var idx = types[t], type = idx.split( '.' )[0];

                for(var i = 0; i < events.length; i++) {
                    var namespace = events[i].idx.split('.');
                    if(events[i].idx == idx || (namespace[1] && namespace[1] == idx.replace('.', '') )) {
                        this.sound.removeEventListener(type, events[i].func, true);
                        delete events[i];
                    }
                }
            }
            return this;
        };

        this.bindOnce = function(type, func) {
            if(!supported) {
                return this;
            }

            var that = this;

            eventsOnce[pid++] = false;
            this.bind(pid + type, function() {
                if(!eventsOnce[pid]) {
                    eventsOnce[pid] = true;
                    func.call(that);
                }
                that.unbind(pid + type);
            });
        };

        this.trigger = function(types) {
            if(!supported) {
                return this;
            }
            types = types.split(' ');

            for(var t = 0; t < types.length; t++) {
                var idx = types[t];

                for(var i = 0; i < events.length; i++) {
                    var eventType = events[i].idx.split('.');
                    if(events[i].idx == idx || (eventType[0] && eventType[0] == idx.replace('.', '') )) {
                        var evt = document.createEvent('HTMLEvents');
                        evt.initEvent(eventType[0], false, true);
                        this.sound.dispatchEvent(evt);
                    }
                }
            }
            return this;
        };

        this.fadeTo = function(to, duration, callback) {
            if(!supported) {
                return this;
            }

            if( duration instanceof Function) {
                callback = duration;
                duration = buzz.defaults.duration;
            } else {
                duration = duration || buzz.defaults.duration;
            }

            var from = this.volume, delay = duration / Math.abs(from - to), that = this;
            this.play();

            function doFade() {
                setTimeout(function() {
                    if(from < to && that.volume < to) {
                        that.setVolume(that.volume += 1);
                        doFade();
                    } else if(from > to && that.volume > to) {
                        that.setVolume(that.volume -= 1);
                        doFade();
                    } else if( callback instanceof Function) {
                        callback.apply(that);
                    }
                }, delay);
            }


            this.whenReady(function() {
                doFade();
            });
            return this;
        };

        this.fadeIn = function(duration, callback) {
            if(!supported) {
                return this;
            }

            return this.setVolume(0).fadeTo(100, duration, callback);
        };

        this.fadeOut = function(duration, callback) {
            if(!supported) {
                return this;
            }

            return this.fadeTo(0, duration, callback);
        };

        this.fadeWith = function(sound, duration) {
            if(!supported) {
                return this;
            }

            this.fadeOut(duration, function() {
                this.stop();
            });

            sound.play().fadeIn(duration);

            return this;
        };

        this.whenReady = function(func) {
            if(!supported) {
                return null;
            }

            var that = this;
            if(this.sound.readyState === 0) {
                this.bind('canplay.buzzwhenready', function() {
                    func.call(that);
                });
            } else {
                func.call(that);
            }
        };
        // privates
        function timerangeToArray(timeRange) {
            var array = [], length = timeRange.length - 1;

            for(var i = 0; i <= length; i++) {
                array.push({
                    start : timeRange.start(length),
                    end : timeRange.end(length)
                });
            }
            return array;
        }

        function getExt(filename) {
            return filename.split('.').pop();
        }

        function addSource(sound, src) {
            var source = document.createElement('source');
            source.src = src;
            if(buzz.types[ getExt(src)]) {
                source.type = buzz.types[ getExt(src)];
            }
            sound.appendChild(source);
        }

        // init
        if(supported) {

            for(var i in buzz.defaults ) {
                if(buzz.defaults.hasOwnProperty(i)) {
                    options[i] = options[i] || buzz.defaults[i];
                }
            }

            this.sound = document.createElement('audio');

            if( src instanceof Array) {
                for(var j in src ) {
                    if(src.hasOwnProperty(j)) {
                        addSource(this.sound, src[j]);
                    }
                }
            } else if(options.formats.length) {
                for(var k in options.formats ) {
                    if(options.formats.hasOwnProperty(k)) {
                        addSource(this.sound, src + '.' + options.formats[k]);
                    }
                }
            } else {
                addSource(this.sound, src);
            }

            if(options.loop) {
                this.loop();
            }

            if(options.autoplay) {
                this.sound.autoplay = 'autoplay';
            }

            if(options.preload === true) {
                this.sound.preload = 'auto';
            } else if(options.preload === false) {
                this.sound.preload = 'none';
            } else {
                this.sound.preload = options.preload;
            }

            this.setVolume(options.volume);

            buzz.sounds.push(this);
        }
    },
    group : function(sounds) {
        sounds = argsToArray(sounds, arguments);

        // publics
        this.getSounds = function() {
            return sounds;
        };

        this.add = function(soundArray) {
            soundArray = argsToArray(soundArray, arguments);
            for(var a = 0; a < soundArray.length; a++) {
                sounds.push(soundArray[a]);
            }
        };

        this.remove = function(soundArray) {
            soundArray = argsToArray(soundArray, arguments);
            for(var a = 0; a < soundArray.length; a++) {
                for(var i = 0; i < sounds.length; i++) {
                    if(sounds[i] == soundArray[a]) {
                        delete sounds[i];
                        break;
                    }
                }
            }
        };

        this.load = function() {
            fn('load');
            return this;
        };

        this.play = function() {
            fn('play');
            return this;
        };

        this.togglePlay = function() {
            fn('togglePlay');
            return this;
        };

        this.pause = function(time) {
            fn('pause', time);
            return this;
        };

        this.stop = function() {
            fn('stop');
            return this;
        };

        this.mute = function() {
            fn('mute');
            return this;
        };

        this.unmute = function() {
            fn('unmute');
            return this;
        };

        this.toggleMute = function() {
            fn('toggleMute');
            return this;
        };

        this.setVolume = function(volume) {
            fn('setVolume', volume);
            return this;
        };

        this.increaseVolume = function(value) {
            fn('increaseVolume', value);
            return this;
        };

        this.decreaseVolume = function(value) {
            fn('decreaseVolume', value);
            return this;
        };

        this.loop = function() {
            fn('loop');
            return this;
        };

        this.unloop = function() {
            fn('unloop');
            return this;
        };

        this.setTime = function(time) {
            fn('setTime', time);
            return this;
        };

        this.setduration = function(duration) {
            fn('setduration', duration);
            return this;
        };

        this.set = function(key, value) {
            fn('set', key, value);
            return this;
        };

        this.bind = function(type, func) {
            fn('bind', type, func);
            return this;
        };

        this.unbind = function(type) {
            fn('unbind', type);
            return this;
        };

        this.bindOnce = function(type, func) {
            fn('bindOnce', type, func);
            return this;
        };

        this.trigger = function(type) {
            fn('trigger', type);
            return this;
        };

        this.fade = function(from, to, duration, callback) {
            fn('fade', from, to, duration, callback);
            return this;
        };

        this.fadeIn = function(duration, callback) {
            fn('fadeIn', duration, callback);
            return this;
        };

        this.fadeOut = function(duration, callback) {
            fn('fadeOut', duration, callback);
            return this;
        };
        // privates
        function fn() {
            var args = argsToArray(null, arguments), func = args.shift();

            for(var i = 0; i < sounds.length; i++) {
                sounds[ i ][func].apply(sounds[i], args);
            }
        }

        function argsToArray(array, args) {
            return ( array instanceof Array ) ? array : Array.prototype.slice.call(args);
        }

    },
    all : function() {
        return new buzz.group(buzz.sounds);
    },
    isSupported : function() {
        return !!buzz.el.canPlayType;
    },
    isOGGSupported : function() {
        return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/ogg; codecs="vorbis"');
    },
    isWAVSupported : function() {
        return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/wav; codecs="1"');
    },
    isMP3Supported : function() {
        return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/mpeg;');
    },
    isAACSupported : function() {
        return !!buzz.el.canPlayType && (buzz.el.canPlayType('audio/x-m4a;') || buzz.el.canPlayType('audio/aac;') );
    },
    toTimer : function(time, withHours) {
        var h, m, s;
        h = Math.floor(time / 3600);
        h = isNaN(h) ? '--' : (h >= 10 ) ? h : '0' + h;
        m = withHours ? Math.floor(time / 60 % 60) : Math.floor(time / 60);
        m = isNaN(m) ? '--' : (m >= 10 ) ? m : '0' + m;
        s = Math.floor(time % 60);
        s = isNaN(s) ? '--' : (s >= 10 ) ? s : '0' + s;
        return withHours ? h + ':' + m + ':' + s : m + ':' + s;
    },
    fromTimer : function(time) {
        var splits = time.toString().split(':');
        if(splits && splits.length == 3) {
            time = (parseInt(splits[0], 10) * 3600 ) + (parseInt(splits[1], 10) * 60 ) + parseInt(splits[2], 10);
        }
        if(splits && splits.length == 2) {
            time = (parseInt(splits[0], 10) * 60 ) + parseInt(splits[1], 10);
        }
        return time;
    },
    toPercent : function(value, total, decimal) {
        var r = Math.pow(10, decimal || 0);

        return Math.round(((value * 100 ) / total ) * r) / r;
    },
    fromPercent : function(percent, total, decimal) {
        var r = Math.pow(10, decimal || 0);

        return Math.round(((total / 100 ) * percent ) * r) / r;
    }
};

/*基本通用方法*/
; (function (win) {
    var classtype = {
        "[object Array]": "array",
        "[object Boolean]": "boolean",
        "[object Date]": "date",
        "[object Function]": "function",
        "[object Number]": "number",
        "[object Object]": "object",
        "[object RegExp]": "regexp",
        "[object String]": "string"
    };
    var me = {
        __Index: 0,
        list: new Array(),
        get: function (id) {
            return id === undefined
            ? this.list
            : this.list[id];
        },
        fn: new Function(),
        inherit: function (childClass, parentClass) {
            var Constructor = new Function();
            Constructor.prototype = parentClass.prototype;
            childClass.prototype = new Constructor();
            childClass.prototype.constructor = childClass;
            childClass.superclass = parentClass.prototype;

            if (childClass.prototype.constructor == Object.prototype.constructor) {
                childClass.prototype.constructor = parentClass;
            }
        },
        extend: function (obj, newProperties) {
            var key;
            for (key in newProperties) {
                if (newProperties.hasOwnProperty(key)) {
                    obj[key] = newProperties[key];
                }
            }
            return obj;
        },
        copy: function (targetClass, obj, newProperties) {
            if (typeof obj !== 'object') {
                return obj;
            }

            var value = obj.valueOf();
            if (obj != value) {
                return new obj.constructor(value);
            }

            var o;
            if (obj instanceof obj.constructor && obj.constructor !== Object) {
                if (targetClass) {
                    o = new targetClass();
                } else {
                    o = me.clone(obj.constructor.prototype);
                }

                for (var key in obj) {
                    if (targetClass || obj.hasOwnProperty(key)) {
                        o[key] = obj[key];
                    }
                }
            } else {
                o = {};
                for (var key in obj) {
                    o[key] = obj[key];
                }
            }

            if (newProperties) {
                for (var key in newProperties) {
                    o[key] = newProperties[key];
                }
            }

            return o;
        },
        clone: function (obj) {
            me.__cloneFunc.prototype = obj;
            return new me.__cloneFunc();
        },
        __cloneFunc: function () {
        },
        delegate: function (func, scope) {
            scope = scope || window;
            if (arguments.length > 2) {
                var args = Array.prototype.slice.call(arguments, 2);
                return function () {
                    return func.apply(scope, args);
                }
            } else {
                return function () {
                    return func.call(scope);
                }
            }
        },
        dom: function ($select, classCss) {
            var wrap = $select;
            var name, DOM = {
                wrap: $(wrap)
            },
                els = wrap[0].getElementsByTagName("*"),
                elsLen = els.length;
            for (var i = 0; i < elsLen; i++) {
                name = els[i].className;
                if (name.indexOf(classCss) > -1) {
                    name = name.split(classCss)[1];
                }
                if (name) {
                    DOM[name] = $(els[i], wrap)
                }
            }
            return DOM
        },
        //模板引擎
        template: function () {
            var args = arguments, result;
            if (args.length > 0) {
                if (me.isString(args[0])) {
                    result = args[0];
                    if (args.length == 2 && me.isObject(args[1])) {
                        for (var key in args[1]) {
                            if (args[1][key] != undefined) {
                                var reg = new RegExp("({" + key + "})", "g");
                                result = result.replace(reg, args[1][key]);
                            }
                        }
                    } else {
                        for (var i = 1; i < args.length; i++) {
                            if (args[i] != undefined) {
                                var reg = new RegExp("({[" + (i - 1) + "]})", "g");
                                result = result.replace(reg, args[i]);
                            }
                        }
                    }
                }
            }
            return result;
        },
        __type: function (obj) {
            return obj == null ? String(obj) : classtype[Object.prototype.toString.call(obj)] || "object";
        },
        isObject: function (obj) {
            return this.isFunction(obj) || !!(obj && 'object' === typeof obj);
        },
        isFunction: function (obj) {
            return this.__type(obj) === "function";
        },
        isArray: Array.isArray || function (obj) {
            return this.__type(obj) === "array";
        },
        isNum: function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        isString: function (obj) {
            return this.__type(obj) === "string";
        },
        each: function (data, callback, args) {
            var i, len;
            if (me.isArray(data)) {
                for (i = 0, len = data.length; i < len; i++) {
                    if (callback.call(data[i], i, data[i], args) === false) {
                        break;
                    }
                }
            } else {
                for (i in data) {
                    if (callback.call(data[i], i, data[i], args) === false) {
                        break;
                    }
                }
            }
        },
        funManager: {
            __loadList: {},
            __loadFun: function (item, callback, win) {
                if (item.methord && me.isFunction(item.methord())) {
                    win = win || window;
                    item.methord()(item, function () {
                        callback();
                    }, win);
                }
            },
            load: function (fns, statechange, win, __index) {
                __index = __index || 0;
                if (fns[__index]) {
                    me.funManager.__loadFun(fns[__index], function () {
                        me.funManager.load(fns, statechange, win, __index + 1);
                    }, win);
                }
                statechange(__index, win);
            },
            get: function (id) {
                return this.__loadList[id];
            }
        },
        log: function (msg) {
            var console = window.console || { log: function () { } };
            //console.log(msg);
        },
        Event: {
            mousewheel: function (e) {
                var _eoe = e.originalEvent;
                var _de = _eoe.detail ? _eoe.detail * -1 : _eoe.wheelDelta / 40;
                var _direction = _de < 0 ? -1 : 1;
                return {
                    direction: _direction,
                    unit: _de
                }
            },
            __: function (_e, el, event, handle) {
                for (var key in _e) {
                    if (win[_e[key].validator]) {
                        el[_e[key].validator](_e[key].prefix + event, handle, false);
                        break;
                    }
                }
            },
            add: function (el, event, handle) {
                var _e = [
                    { validator: 'addEventListener', prefix: '' },
                    { validator: 'attachEvent', prefix: 'on' }
                ];
                this.__(_e, el, event, handle);
            },
            remove: function (el, event, handle) {
                var _e = [
                    { validator: 'removeEventListener', prefix: '' },
                    { validator: 'detachEvent', prefix: 'on' }
                ];
                this.__(_e, el, event, handle);
            }
        },
        getUid: function (_name) {
            return me.template("me-{0}{1}-{2}", _name, new Date().getTime(), me.__Index++)
        },
        Browser: {
            isTouch: function () {
                var msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture;
                return (("ontouchstart" in window) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
            },
            Prefix: function () {
                var props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                var obj = document.createElement('div');
                for (var i in props) {
                    if (obj.style[props[i]] !== undefined) {
                        return me.template("-{0}-", props[i].replace('Perspective', '').toLowerCase());
                    }
                }
            },
            parseURL: function (url) {
                var a = document.createElement('a');
                a.href = url;
                return {
                    source: url,
                    protocol: a.protocol.replace(':', ''),
                    host: a.hostname,
                    port: a.port,
                    query: a.search,
                    params: (function () {
                        var ret = {},
                            seg = a.search.replace(/^\?/, '').split('&'),
                            len = seg.length, i = 0, s;
                        for (; i < len; i++) {
                            if (!seg[i]) { continue; }
                            s = seg[i].split('=');
                            ret[s[0]] = s[1];
                        }
                        return ret;
                    })(),
                    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
                    hash: a.hash.replace('#', ''),
                    path: a.pathname.replace(/^([^\/])/, '/$1'),
                    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
                    segments: a.pathname.replace(/^\//, '').split('/')
                };
            }
        },
        Array: {
            indexOf: function (array, val) {
                for (var i = 0; i < array.length; i++) {
                    if (this[i] == val) return i;
                }
                return -1;
            },
            remove: function (array, val) {
                var index = this.indexOf(array, val);
                if (index > -1) {
                    array.splice(index, 1);
                }
                return array;
            }
        }
    }
    win.me = me;
})(window);
/*组件基类，所有组件继承assembly,assembly用于统一生产组件编号，目前是用于组件进行监控*/
; (function (me, win) {
    var assembly = function (options) {
        this.initialized = false;
        this.registerEvent = {
            before: [],
            change: [],
            after: []
        };
        this.options = options;

        this.init(options);
        me.log("me.base.js运行中...");
    }
    assembly.output = function () {
        me.log(me.list);
    }
    assembly.prototype.oninit = me.fn;
    assembly.prototype.init = function (cfg) {
        this.initialized = true;

        function _getClassName(_constructor, _constr) {
            var _constr = _constr || "";
            if (_constructor.superclass) {
                var args = /(\w+)\.superclass/.exec(_constructor.arguments.callee);
                if (args != null) {
                    _constr += args[1] + "-";
                    return _getClassName(_constructor.superclass.constructor, _constr);
                }
            }
            return _constr;
        }
        this.__Uid = me.getUid(_getClassName(this.constructor));
        this.oninit(cfg);
        me.list[this.__Uid] = this;
    };
    assembly.prototype.destory = function () {
        this.initialized = false;
        delete me.list[this.__Uid];
    };
    assembly.prototype.getUid = function () {
        return this.__Uid;
    }
    assembly.prototype.getOptions = function () {
        return this.options;
    }
    assembly.prototype.config = function () {
        if (arguments.length > 0) {
            if (typeof (arguments[0]) === "string") {
                if (arguments.length > 1) {
                    this.options[arguments[0]] = arguments[1];
                } else {
                    return this.options[name];
                }
            }
        } else {
            return this.options;
        }
    };
    assembly.prototype.on = function (name, callback) {
        var __self = this;
        var _e = __self.registerEvent[name];
        if (_e) {
            _e.push(callback);
        }
        return _e;
    };
    assembly.prototype.off = function (name, callback) {
        var __self = this;
        var _e = __self.registerEvent[name];
        var e = [];
        me.each(_e, function (name, _callback) {
            if (_callback === callback) {
                e.push(name);
            }
        });
        me.each(e.reverse(), function (name, _callback) {
            _e.splice(_callback, 1);
        });
    };
    me.assembly = assembly;
})(window.me = window.me || {}, window);

/*弹出层组件*/
; (function (me, win) {
    var toast = function (options, ok, cancel) {
        options = options || {};
        if (me.isString(options)) {
            options = { content: options };
        }
        options = me.copy({}, toast.defaults, options);
        if (!me.isArray(options.button)) {
            options.button = [];
        }
        if (ok !== undefined) {
            options.ok = ok;
        }
        if (options.ok) {
            options.button.push({
                id: 'ok',
                value: options.okValue,
                callback: options.ok
            });
        }
        if (cancel !== undefined) {
            options.cancel = cancel;
        }
        if (options.cancel) {
            options.button.push({
                id: 'cancel',
                value: options.cancelValue,
                callback: options.cancel
            });
        }
        toast.superclass.constructor.call(this, options);
        return this;
    }
    toast.list = {};
    me.inherit(toast, me.assembly);
    toast.prototype.closed = true;
    toast.prototype.destroyed = true;
    toast.prototype.current = true;
    toast.prototype.oninit = function () {
        var __self = this, _o = __self.options;
        __self.closed = false;
        __self.destroyed = false;

        var wrap = $('<div />')
           .css({
               display: 'none',
               position: 'absolute',
               left: 0,
               top: 0,
               bottom: 'auto',
               right: 'auto',
               margin: 0,
               padding: 0,
               outline: 0,
               border: '0 none',
               background: 'transparent'
           })
           .html(_o.template)
           .appendTo('body');
        __self.dom = __self.dom || me.dom(wrap, _o.className);
        var backdrop = $('<div />');
        __self.dom.backdrop = backdrop;
        __self.button(_o.button).title(_o.title).content(_o.content).size(_o.width, _o.height).time(_o.time).addclass(_o.addClass).zIndex().focus().show(_o.show).reset();
        __self.dom.close[_o.show === false ? 'hide' : 'show']().attr('title', _o.cancelValue)
            .on('click', function (event) {
                __self._trigger('cancel');
                event.preventDefault();
            });
        __self.dom.wrap.on('click', '[data-id]', function (event) {
            var $this = $(this);
            if (!$this.attr('disabled')) {
                __self._trigger($this.data('id'));
            }
            event.preventDefault();
        });
        _o.init && _o.init(__self);
        __self.resize();
        return __self;
    },
    toast.prototype.addclass = function (css) {
        var __self = this, _o = __self.options;
        __self.dom.toast.addClass(css);
        return __self;
    },
    toast.prototype.resize = function () {
        var __self = this, _o = __self.options;
        $(window).resize(function () {
            __self.reset();
        });
        return __self;
    },
    toast.prototype.reset = function () {
        var __self = this, _o = __self.options;
        var pos = __self._center();
        var style = __self.dom.wrap[0].style;
        style.left = pos.left + 'px';
        style.top = pos.top + 'px';
        return __self;
    },
    toast.prototype.size = function (width, height) {
        var __self = this, _o = __self.options;
        __self.dom.content.css('width', width);
        __self.dom.content.css('height', height);
        return __self;
    },
    toast.prototype.setsize = function (width, height) {
        var __self = this, _o = __self.options;
        __self.show(true);
        __self.dom.content.css({
            'width': width,
            'height': height
        });
        var pos = __self._center(width, height);
        __self.dom.wrap.css({
            'left': pos.left,
            'top': pos.top
        });
        return __self;
    },
    toast.prototype.content = function (html) {
        var __self = this, _o = __self.options;
        if (!__self.dom.content) {
            return __self;
        }
        __self.dom.content.empty('')[typeof html === 'object' ? 'append' : 'html']((_o.icon ? '<i class=' + _o.icon + '></i>' : "") + html);

        return __self;
    },
    toast.prototype.title = function (text) {
        var __self = this, _o = __self.options;
        if (!__self.dom.title) {
            return __self;
        }
        __self.dom.title.html(text);
        __self.dom.title[text ? 'show' : 'hide']();
        return __self;
    },
    toast.prototype.button = function () {
        var __self = this, _o = __self.options;
        var html = '', args = _o.button;
        __self.callbacks = {};
        if (!__self.dom.button) {
            return this;
        }
        if (typeof args === 'string') {
            html = args;
        } else {
            $.each(args, function (i, val) {
                val.id = val.id || val.value;
                __self.callbacks[val.id] = val.callback;
                html +=
                  '<button'
                + ' type="button"'
                + ' data-id="' + val.id + '"'
                + ' class="' + (_o.className + val.id) + '"'
                + (val.disabled ? ' disabled' : '')
                + '>'
                + val.value
                + '</button>';
            });
        }
        if ($.trim(html) == "")
            __self.dom.button.hide();
        else
            __self.dom.button.html(html).show();
        return __self;
    },
    toast.prototype.zIndex = function () {
        var __self = this, _o = __self.options;
        var index = _o.zIndex++;
        __self.dom.wrap.css('zIndex', index);
        __self.dom.backdrop.css('zIndex', index - 1);
        _o.zIndex = index;
        return __self;
    },
    toast.prototype.time = function (second) {
        var __self = this, _o = __self.options;
        var cancel = _o.cancelValue, timer = __self._timer;
        timer && clearTimeout(timer);
        if (second) {
            __self._timer = setTimeout(function () {
                __self._click(cancel);
            }, 1000 * second);
        };
        return __self;
    },
    toast.prototype.focus = function () {
        var __self = this, _o = __self.options;
        return __self;
    },
    toast.prototype.show = function (show) {
        var __self = this, _o = __self.options;
        if (__self.destroyed) {
            return this;
        }
        if (show === false) {
            return this;
        }
        __self.dom.wrap.css('position', 'fixed').show().addClass(_o.className + "show");
        if (_o.lock) __self.lock();
        __self.dom.backdrop.show();
        __self.open = true;
        return __self;
    },
    toast.prototype.lock = function () {
        var __self = this, _o = __self.options;
        var backdropCss = {
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            userSelect: 'none',
            opacity: 0.2,
            background: "#000"
        };
        backdropCss = $.extend(backdropCss, __self.options.css.lock);
        __self.dom.wrap.addClass(_o.className + 'lock');
        _o.zIndex = _o.zIndex + 2;
        __self.zIndex();

        var _isIE6 = !('minWidth' in $('html')[0].style);
        var _isFixed = !_isIE6;
        if (!_isFixed) {
            $.extend(backdropCss, {
                position: 'absolute',
                width: $(window).width() + 'px',
                height: $(document).height() + 'px'
            });
        }
        __self.dom.backdrop
            .css(backdropCss)
            .insertAfter(__self.dom.wrap)
            .on('focus', function () {
                __self.focus();
            });

    },
    toast.prototype.close = function () {
        var __self = this, _o = __self.options;
        if (!__self.destroyed && __self.open) {
            __self.dom.wrap.removeClass(_o.className + 'show');
            setTimeout(function () {
                __self.dom.wrap.hide();
                __self.dom.backdrop.hide();
                __self.remove();
                __self.open = false;
            }, 200);
        }
        return this;
    },
    toast.prototype.remove = function () {
        var __self = this, _o = __self.options;
        if (__self.destroyed) {
            return g;
        }
        if (__self.current === this)
            __self.current = null;
        __self.dom.wrap.remove();
        __self.dom.backdrop.remove();
        for (var i in __self) {
            delete this[i];
        }
        return this;
    },
    toast.prototype.position = function (target, pos) {
        var __self = this, _o = __self.options;
        target = target || $(window);
        pos = $.extend({}, { x: 0, y: 0, position: '50%' }, pos);
        var ww = target.width();
        var wh = target.height();
        var ow = __self.dom.wrap.width();
        var oh = __self.dom.wrap.height();
        var left = 0, top = 0;
        if (/^(\d+(%?)\s*){1,2}$/.test(pos.position)) {
            var items = pos.position.match(/\d+%?\s*/g);
            var _rel = {
                vertical: items[0],
                horizontal: items.length > 1 ? items[1] : items[0]
            }
            left = (_rel.horizontal.indexOf('%') > -1 ? (ww - ow) * parseFloat(_rel.horizontal) / 100 : _rel.horizontal) + target.offset().left + pos.x;
            top = (_rel.vertical.indexOf('%') > -1 ? (wh - oh) * parseFloat(_rel.vertical) / 100 : _rel.vertical) + target.offset().top + pos.y;
        }
        var style = __self.dom.wrap[0].style;
        style.left = Math.max(parseInt(left), 0) + 'px';
        style.top = Math.max(parseInt(top), 0) + 'px';
        return __self;
    }
    toast.prototype._center = function (width, height) {
        var __self = this, _o = __self.options;
        var $w = $(window);
        var $document = $(document);
        var fixed = true;
        var dl = fixed ? 0 : $document.scrollLeft();
        var dt = fixed ? 0 : $document.scrollTop();
        var ww = $w.width();
        var wh = $w.height();
        var ow = width || __self.dom.wrap.width();
        var oh = height || __self.dom.wrap.height();
        var left = (ww - ow) / 2 + dl;
        var top = (wh - oh) * 382 / 1000 + dt;
        return {
            left: Math.max(parseInt(left), dl),
            top: Math.max(parseInt(top), dt)
        }

    },
    toast.prototype._trigger = function (id) {
        var __self = this, _o = __self.options;
        var fn = __self.callbacks[id];
        return typeof fn !== 'function' || fn.call(__self) !== false ?
            __self.close() : __self;
    },
    toast.prototype._click = function (name) {
        var __self = this, _o = __self.options;
        var fn = __self.callbacks[name];
        return typeof fn !== 'function' || fn.call(__self, window) !== false ?
            __self.close() : __self;
    },


    toast.top = function () {
        var top = win,
            test = function (name) {
                try {
                    var doc = window[name].document;
                } catch (e) {
                    return false;
                }
                return window[name].me.toast && doc.getElementsByTagName('frameset').length === 0;
            }
        if (test('top')) {
            top = window.top;
        } else if (test('parent')) {
            top = window.parent;
        };
        return top;
    }
    toast._through = function () {
        var __self = this, _o = __self.options;
        __self._frame();
        var api = new _topDialog(arguments[0]);
        return api;
    }
    toast._frame = function () {
        var __self = this, _o = __self.options;
        _top = __self.top();
        _topDialog = _top.me.toast;
    },
    toast.alert = function (content, callback) {
        var __self = this, _o = __self.options;
        return __self._through({
            title: '提示',
            addClass: 'alert',
            icon: 'alert',
            width: 440,
            lock: true,
            content: content,
            ok: callback || true
        });
    }
    toast.confirm = function (content, yes, no) {
        var __self = this, _o = __self.options;
        return __self._through({
            //title: '确认',
            icon: 'confirm',
            addClass: 'confirm',
            lock: true,
            css: {
                lock: { 'opacity': 0.2, 'background': '#fff' }
            },
            content: content,
            ok: function (here) {
                return yes.call(this, here);
            },
            cancel: function (here) {
                return no && no.call(this, here);
            }
        });
    };
    toast.tip = function (content, time) {
        var __self = this, _o = __self.options;
        return __self._through({
            icon: 'tip',
            addClass: 'tip',
            content: content,
            lock: true,
            css: {
                lock: { 'opacity': 0.2, 'background': '#fff' }
            },
            time: time || 2
        });
    }
    toast.open = function (url, options) {
        var __self = this, _o = __self.options;
        var $iframe = $('<iframe />')
                .attr({
                    src: url,
                    width: '100%',
                    height: '100%',
                    allowtransparency: 'yes',
                    frameborder: 'no',
                    scrolling: 'no'
                }).on('load', function () {

                });
        var config = {
            init: function (api) {
                $iframe.attr("name", api.getUid());
                api.dom.content.html('').append($iframe);
            }
        }
        $.extend(config, options);
        return __self._through(config);
    }
    toast.close = function () {
        var __self = this, _o = __self.options;
        var _api = __self.top().me.get(window.frameElement.name);
        _api.close();
    }
    toast.resize = function (width, height) {
        var __self = this, _o = __self.options;
        var _api = __self.top().me.get(window.frameElement.name);
        _api.setsize(width, height);
        return _api;
    }


    toast.defaults = {
        init: null,
        zIndex: 1024,
        lock: true,
        content: 'Loading...',
        title: '',
        show: true,
        button: null,
        ok: null,
        cancel: null,
        okValue: '确定',
        cancelValue: '取消',
        className: 'ui-me-',
        template: '<div class="ui-me-toast"><div class="ui-me-head"><div class="ui-me-title"></div><div class="ui-me-close"></div></div><div class="ui-me-content"></div><div class="ui-me-foot"><div class="ui-me-button"></div></div></div>',
        css: {
            lock: { 'opacity': 0.2, 'background': '#000' }
        }
    }
    me.toast = toast;
})(window.me = window.me || {}, window);



var apsAdboardCptGroupObj = window.apsAdboardCptGroupObj = {};

me.getAdInfo = function(api, adids, cb) {
    try {
        function insertScript(url) {
            var script = document.createElement('script');
            var head = document.getElementsByTagName('head');
            script.type = 'text/javascript';
            script.src = url;
            head[0].appendChild(script);
            script.onload = function() {
                head[0].removeChild(script);
            }
        }
        var url = api;
        var qs = '';
        var screenType = 'w';
        for (var i = 0; i < adids.length; i++) {
            qs += (i == 0 ? '?' : '&') + 'pid=' + adids[i];
        }
        qs += '&screenType=' + screenType;
        url += qs;
        insertScript(url);
    } catch (e) {}

    apsAdboardCptGroupObj.aps_adboard_defaultRomanceCptGroup = function(adData, pids) {
        cb(adData, pids);
    }
}


apsAdboardCptGroupObj.aps_adboard_jsonpCallback = function(adData, f, pids) {
    try {
        if ((adData != null && "" != adData) && (f != null && "" != f) && (pids != null && "" != pids)) {
            switch (f) {
                case "cpt":
                    if (typeof (aps_adboard_romancecptGroup) == "function") {
                        aps_adboard_romancecptGroup(adData, pids)
                    } else {
                        apsAdboardCptGroupObj.aps_adboard_defaultRomanceCptGroup(adData, pids)
                    }
                    break;
                default:
                    throw new Error("adType error!");
                    break;
            }
        } else {
            throw new Error("callback data is null")
        }
    } catch (err) {
        if (typeof (aps_adboard_errors) == "function") {
            aps_adboard_errors(err);
        } else {
            apsAdboardCptGroupObj.aps_adboard_defaultErrors(err);
        }
    }
}

/**
*加载js
**/

function seriesLoadScripts(scripts,callback) {
   if(typeof(scripts) != "object") var scripts = [scripts];
   var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
   var s = new Array(), last = scripts.length - 1, recursiveLoad = function(i) {  //递归
       s[i] = document.createElement("script");
       s[i].setAttribute("type","text/javascript");
       s[i].onload = s[i].onreadystatechange = function() { //Attach handlers for all browsers
           if(!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
               this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
               if(i != last) recursiveLoad(i + 1); else if(typeof(callback) == "function") callback();
           }
       }
       s[i].setAttribute("src",scripts[i]);
       HEAD.appendChild(s[i]);
   };
   recursiveLoad(0);
}
/**
*资源
*/
me.random = function (min, max) {
    return Math.floor((max - min + 1) * Math.random()) + min;
}

me.$w = $(window).width(), me.$h = $(window).height();

me.routes = function (typeName, box, param) {
    param = param || {};
    var frames = {
        WtoE: [
            { x: -box.width, y: param.y, duration: 0 },
            { x: me.$w, y: param.y, duration: param.duration || 10, ease: 'linear' }
        ],
        EtoW: [
            { x: me.$w, y: param, duration: 0 },
            { x: -box.width, y: param, duration: 10, ease: 'linear' }
        ],
        WStoNE: [
            { x: 0 - box.width / 2, y: me.$h, duration: 0, ease: 'linear' },
            { x: me.$w / 2 - box.width / 2, y: me.$h / 2 - box.height, duration: 3, ease: 'easeOutQuart' },
            { x: me.$w, y: -box.height / 2, duration: 2, ease: 'easeInBack' }
        ],
        StoN: [//ÃÃ‚->Ã‰Ã
                { x: param + 0, y: me.$h, duration: 0, ease: 'linear' },
                { x: param + 100, y: me.$h * 9 / 10, duration: 1.15, ease: 'linear' },
                { x: param + 0, y: me.$h * 8 / 10, duration: 1.15, ease: 'linear' },
                { x: param + 100, y: me.$h * 7 / 10, duration: 1.15, ease: 'linear' },
                { x: param + 0, y: me.$h * 6 / 10, duration: 1.15, ease: 'linear' },
                { x: param + 100, y: me.$h * 5 / 10, duration: 1.15, ease: 'linear' },
                { x: param + 0, y: me.$h * 4 / 10, duration: 1.15, ease: 'linear' },
                { x: param + 100, y: me.$h * 3 / 10, duration: 1.15, ease: 'linear' },
                { x: param + 0, y: me.$h * 2 / 10, duration: 1.15, ease: 'linear' },
                { x: param + 100, y: me.$h * 1 / 10, duration: 1.15, ease: 'linear' },
                { x: param + 0, y: 0, duration: 1.15, ease: 'linear' },
                { x: param + 100, y: me.$h * (-1 / 10), duration: 1.15, ease: 'linear' },
                { x: param + 0, y: -box.height, duration: 1.15, ease: 'linear' }
        ],
        ES: [
            { x: me.$w/2 - box.width/2, y: me.$h - box.height, opacity: 1, duration: 0 },
            { x: me.$w/2 - box.width/2, y: me.$h - box.height, opacity: 1, duration: 4.8, ease: 'linear' },
            { x: me.$w/2 - box.width/2, y: me.$h - box.height, opacity: 0, duration: 0.2, ease: 'linear' }
        ],
        EtoWtoEtoW: [
           { x: me.$w, y: param.y, duration: 0 },
           { x: me.$w * 19 / 20, y: Math.cos(6.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 18 / 20, y: Math.cos(6) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 17 / 20, y: Math.cos(5.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 16 / 20, y: Math.cos(5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 15 / 20, y: Math.cos(4.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 14 / 20, y: Math.cos(4) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 13 / 20, y: Math.cos(3.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 12 / 20, y: Math.cos(3) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 11 / 20, y: Math.cos(2.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 10 / 20, y: Math.cos(2) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 9 / 20, y: Math.cos(1.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 8 / 20, y: Math.cos(1) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 7 / 20, y: Math.cos(0) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 6 / 20, y: Math.cos(-0.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 5 / 20, y: Math.cos(-1) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 4 / 20, y: Math.cos(-1.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 3 / 20, y: Math.cos(-2) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 2 / 20, y: Math.cos(-2.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 1 / 20, y: Math.cos(-3) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 0 / 20, y: Math.cos(-3.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * (-1 / 20), y: Math.cos(-4) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * (-2 / 20), y: Math.cos(-4.5) * param.h + param.y, duration: param.duration, ease: 'linear' }
        ],
        WtoEtoWtoE: [
           { x: me.$w * (-1 / 20), y: param.y, duration: 0 },
           { x: me.$w * 0 / 20, y: Math.cos(6.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 1 / 20, y: Math.cos(6) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 2 / 20, y: Math.cos(5.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 3 / 20, y: Math.cos(5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 4 / 20, y: Math.cos(4.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 5 / 20, y: Math.cos(4) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 6 / 20, y: Math.cos(3.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 7 / 20, y: Math.cos(3) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 8 / 20, y: Math.cos(2.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 9 / 20, y: Math.cos(2) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 10 / 20, y: Math.cos(1.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 11 / 20, y: Math.cos(1) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 12 / 20, y: Math.cos(0) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 13 / 20, y: Math.cos(-0.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 14 / 20, y: Math.cos(-1) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 15 / 20, y: Math.cos(-1.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 16 / 20, y: Math.cos(-2) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 17 / 20, y: Math.cos(-2.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 18 / 20, y: Math.cos(-3) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w * 19 / 20, y: Math.cos(-3.5) * param.h + param.y, duration: param.duration, ease: 'linear' },
           { x: me.$w, y: Math.cos(-4) * param.h + param.y, duration: param.duration, ease: 'linear' }
        ]
    };
    return frames[typeName];
};
me.path=function(typeName, width, height){
	var frames = {
		"WStoNE":{name:"WStoNE"},
		"ES":{name:"ES"},//
        //DownToUp
		"StoN":{name:"StoN",param:[1, (me.$w - width) / 2, me.$w - height][me.random(0, 2)]},
        //LeftToRight
		"WtoE_0":{name:"WtoE",param:[{ y: me.$h - height }, { y: me.$h / 2 }][me.random(0, 1)]},
		"WtoE_1":{name:"WtoE",param:[{ y: me.$h - height,duration: 9 }, { y: me.$h / 2,duration: 9 }][me.random(0, 1)]},
		"WtoE_2":{name:"WtoE",param:[{ y: height }, { y: 20 }][me.random(0, 1)]},
		"EtoW":{name:"EtoW",param:[(me.$h - height) * 4 / 5, (me.$h - height) / 2][me.random(0, 1)]},
		"WtoEtoWtoE":{name:"WtoEtoWtoE",param:[{ duration: 0.3, h: 30, y: (me.$h - height) / 2 }, { duration: 0.3, h: 30, y: me.$h * 3 / 4 }][me.random(0, 1)]},
		"EtoWtoEtoW_0":{name:"EtoWtoEtoW",param:[{ duration: 0.3, h: 100, y: (me.$h - height) / 2 }][0]},
		"EtoWtoEtoW_1":{name:"EtoWtoEtoW",param:[{ duration: 0.3, h: 80, y: me.$h * 3 / 4 }][0]},
		"EtoWtoEtoW_2":{name:"EtoWtoEtoW",param:[{ duration: 0.3, h: 50, y: me.$h * 1 / 4 }][0]},
		"EtoWtoEtoW_3":{name:"EtoWtoEtoW",param: [{ duration: 0.3, h: 120, y: me.$h * 1 / 2 }][0]}
	}
	frames[typeName].box={width: width, height: height};
	return frames[typeName];
};


/*
**环境配置
*/
(function (me, win) {
    var evn={
            getEnv:function() {
                var ego_pre = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
                var ego_sit = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
                var ego_dev = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
                var _hostName = document.location.hostname;
                if (ego_pre.test(_hostName)) {
                    return 'pre';
                } else {
                    if (ego_sit.test(_hostName)) {
                        return 'sit'
                    } else {
                        if (ego_dev.test(_hostName)) {
                            return 'dev'
                        }
                    }
                }
                return 'prd';
            },
            domain:function(){
                var url={
                    'prd': 'http://act.suning.com/act-wap-web/configCrazyLion/queryActCode.do',
                    'sit': 'http://actsit.cnsuning.com/act-wap-web/configCrazyLion/queryActCode.do',
                    'pre': 'http://actpre.cnsuning.com/act-wap-web/configCrazyLion/queryActCode.do',
                    'dev': 'http://actdev.cnsuning.com:8080/act-wap-web/configCrazyLion/queryActCode.do'
                };
                return url[this.getEnv()];
            },
            passport:function(){
                var url={
                    'prd':'http://aq.suning.com/asc/',
                    'sit':'http://aqsit.cnsuning.com/asc/',
                    'pre':'http://aqpre.cnsuning.com/asc/',
                    'dev':'http://aqsit.cnsuning.com/asc/'
                };
                return url[this.getEnv()];
            },
            detect:function(){
                var url={
                    'prd':'http://dt.suning.com/detect/dt/detect.js',
                    'sit':'http://10.27.22.228/detect/dt/detect.js',
                    'pre':'http://10.27.22.228/detect/dt/detect.js',
                    'dev':'http://10.27.22.228/detect/dt/detect.js'
                };
                return url[this.getEnv()];
            },
            lucky:function(){
                var url={
                    'prd':'http://res.suning.cn/project/cmsWeb/act/lion/js/ldp.js',
                    'sit':'http://sitres.suning.cn/project/ldp/api/js/ldp.js',
                    'pre':'http://preres.suning.cn/project/ldp/api/js/ldp.js',
                    'dev':'http://sitres.suning.cn/project/ldp/api/js/ldp.js'
                };
                return url[this.getEnv()];
            },
            qmjs:function(){
                var url={
                    'prd':'http://qms.suning.com/project/qms/js/',
                    'sit':'http://qmssit.cnsuning.com/project/qms/js/',
                    'pre':'http://qmssit.cnsuning.com/project/qms/js/',
                    'dev':'http://qmssit.cnsuning.com/project/qms/js/'
                };
                return url[this.getEnv()];
            },
            ad:function(){
              var url={
                    'prd':'http://th.suning.com/getCptDatasGroup',
                    'sit':'http://apscoresit.cnsuning.com/getCptDatasGroup',
                    'pre':'http://apscorepre.cnsuning.com/getCptDatasGroup',
                    'dev':'http://apscoresit.cnsuning.com/getCptDatasGroup'
                };
                return url[this.getEnv()];
            },
            base:function(){
              var url={
                    'prd':'http://res.suning.cn/project/cmsWeb/act/lion2/',
                    'sit':'http://sitres.suning.cn/project/cmsWeb/act/lion2/',
                    'pre':'http://preres.suning.cn/project/cmsWeb/act/lion2/',
                    'dev':'http://res.suning.cn/project/cmsWeb/act/lion2/'
                };
                return url[this.getEnv()];
            },
            passportjs: function() {
                var url = {
                    'prd': 'https://passport.suning.com/ids/js/passport.js',
                    'sit': 'https://passportsit.cnsuning.com/ids/js/passport.js',
                    'pre': 'https://passportpre.cnsuning.com/ids/js/passport.js',
                    'dev': 'https://passport.suning.com/ids/js/passport.js'
                };
                return url[this.getEnv()];
            }
        };
    me.Environment=evn;
})(window.me = window.me || {}, window);



/*
**Cookie操作
*/
var cookiesManager = {
    name:"swfcookiename_tolion",
    set:function(value){
        this.__setCookie(this.name,value);
    },
    get:function(){
        var __self=this;
        return me.extend({index:0,date:new Date()},$.parseJSON(__self.__getCookie(this.name)));
    },
    del:function(){
        if(cookiesManager.get().date!=new Date().format("yyyy-MM-dd")){
            this.__delCookie(this.name);
        }
    },
    __setCookie: function(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    __getCookie: function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    __delCookie: function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
};
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

/*
*动画对象
**/
(function(me,win){
	var swf=function(option,game){
		this.element=null;
		//获取资源
		var datas=me.path(option.type,option.width,option.height);
		this.source={
			name: option.name,
			url:option.src ,
			lionType:option.lionType,
			width: datas.box.width,
			height: datas.box.height,
			path: me.routes(datas.name, datas.box,datas.param)
		};
        this.isexist=true;
		//组标识
		this.game=game;
	}
	swf.prototype.create=function(){
			var _self = this;
            var _embed = $("<div>").css({
                "display": "none",
                "position": "fixed",
                "width": "0px",
                "height": "0px",
                "cursor": "pointer"
            }).html("<a class='swfmark' style='cursor: pointer;position:absolute;width:100%;height:100%;z-index:9999;visibility:visible;display:block;opacity:0;background-color: #ffffff;filter:alpha(opacity=0)'></a><div style='position:absolute;width:100%;height:100%;z-index:-1;'></div>");
            $('body').append(_embed);
            _embed.addClass('animswf');
            _self.element=_embed;

            me.log(_self.source);
            _self.element.css({
                "width": _self.source.width + "px",
                "height": _self.source.height + "px",
                "z-index":9999
            }).find("div:eq(0)").html("<img width=100% height=100% src='" + (me.Environment.base()+_self.source.url) + "' />");

            _self.render();
            //绑定事件
			_self.bindEvent();
           return _self;
	};
	swf.prototype.bindEvent = function() {
		var _self = this,game=this.game;
		_self.element.find('.swfmark').click(function() {
            if(_self.isexist){
    			//爆炸
    			_self.element.find("div:eq(0)").html("<img src='"+me.Environment.base()+"images/over.gif' />");
                win.mySound .play();
                _self.isexist=false;

    			setTimeout(function(){
    				_self.element.find("div:eq(0)").html('');

    				//setTimeout(function(){
    					//用户登陆登陆
    					ensureLogin(function() {

    						game.lotteryIndex++;

    						if(game.lotteryIndex==1){
    							game.lotterystime=new Date();
    						}
    						if(game.lotteryIndex==game.list.length){
    							if(new Date() - game.lotterystime<3000){
                                     _self.openDialog();
    							}
    						}

    					});//{base: me.Environment.passport(),loginTheme: 'b2c_pop'}
    				//},400);

    			}, 100);
            }
		});
	};
    swf.prototype.openDialog=function(callback){
        var _self = this,game=this.game;
        if(!game.dialog||!game.dialog.open){
            //弹出层
            game.dialog=new me.toast({
                zIndex: 10000,
                content: "<div class='me-title'><span></span><a class='meicon' href='javascript:void(0);' target='_blank'></a></div><div class='me-ad'></div>"
            });
            //请求广告接口，获取广告
            _self.getAdvertise();
            //请求开发接口，获取活动编号
            if(callback){callback();}else{
                _self.getActivity();
            };
        }
    },
    swf.prototype.getAdvertise=function(){
        var _self = this,game=this.game;
        if (game.options.adids.pc.length == 0) {
            $(".me-ad").html(me.template("<a href={link} title={title} target='_blank'><img src="+me.Environment.base()+"{src} alt={title} /></a>",game.options.addefault.pc));
        }
        else {
            me.getAdInfo(me.Environment.ad(), [game.options.adids.pc[me.random(0,game.options.adids.pc.length-1)]], function(adJsonDatas, pids){
                me.each(adJsonDatas,function(index,item){
                    $(".me-ad").html(me.template("<a href='{apsClickUrl}' title={title} target='_blank'><img src='{adSrc}' alt='{title}' /></a>",item));
                });
            });
        }
        
        win.apsAdboardCptGroupObj.aps_adboard_defaultErrors = function(err) {
            $(".me-ad").html(me.template("<a href={link} title={title} target='_blank'><img src="+me.Environment.base()+"{src} alt={title} /></a>",game.options.addefault.pc));
        };

    },
	swf.prototype.getActivity=function(){
		var _self = this,game=this.game;
        // var _url=window.location.href;
        // if(_url.indexOf("?")>-1){
        //     _url=_url.split('?')[0];
        // }
        // if(_url.indexOf("#")>-1){
        //     _url=_url.split('#')[0];
        // }
        // _url="http://www.suning.com";
		$.ajax({
                url: me.Environment.domain(),
                data:{lionType:_self.source.lionType},
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback:"lionCallback",
                success: function(datas) {
                	me.log("~~~~~~~~~~");
                    datas=datas.activity;
                	me.log(datas);
                    // var datas=[
	                // 	{APPCODE:"yFkJ16",failure:"啊哦~很遗憾，您未中奖，等待小狮子再来一次！",success:"恭喜你中奖{awardAmount}"},
	                // 	{APPCODE:"N8ywrS",failure:"需要点中屏幕中的所有米兔和小狮子，才能获取抽奖资格哦~",success:"恭喜你中奖{awardAmount}"}
                	// ];

                	function checkEnabledActivity(index){
                        me.log("checkEnabledActivity："+index);
                		if(index<datas.length){
							LDPAPI.queryEnabledActivityNumber(datas[index].APPCODE, function(canDraw) {
                                me.log("queryEnabledActivityNumber:"+canDraw);
		                		if(canDraw){
		                			//抽奖成功
		                			LDPAPI.drawAward(datas[index].APPCODE, encodeURIComponent(bd.rst()), 2, function(msg) {
                                        me.log("LDPAPI.drawAward");
                                        me.log(msg);
                                        _self.setDiatitle(msg.awardName||"啊哦~很遗憾，您未中奖，等待小狮子再来一次！");
                                        if(me.isNum(msg.awardOrder)&&msg.awardName){
                                            $(".ui-me-content .meicon").addClass("on");
                                            $(".ui-me-content .meicon").attr("href","http://member.suning.com/webapp/wcs/stores/servlet/MyGiftTicket?storeId=10052&catalogId=10051");
                                        }
		                			});

		                		}else{
		                			index++;
		                			checkEnabledActivity(index);
		                		};
		                		return;
	                		});
                		}else{
                			//抽奖失败
                            _self.setDiatitle("啊哦~很遗憾，您未中奖，等待小狮子再来一次！");
                		}

                	}
                	checkEnabledActivity(0);
                },
                error:function(){
                    //网络异常
                    _self.setDiatitle("啊哦~很遗憾，您未中奖，等待小狮子再来一次！");
                }
            });
	};
    swf.prototype.setDiatitle=function(title){
        $(".ui-me-content .me-title span").html(title);
    },
	swf.prototype.render = function() {

		var _self = this,_o=this.source;

		var strJs = "_self.element";
            $.each(_o.path, function (index, item) {
                if (index === 0) {
                    strJs += ".css({"
                        + "display:'block',"
                        + "'opacity':1,"
                        + "left: " + item.x + " + 'px',"
                        + "top: " + item.y + " + 'px'"
                    + "})";
                } else {
                    strJs += ".animate({"
                        + "left: " + item.x + " + 'px',"
                        + "top: " + item.y + " + 'px',"
                        + "'opacity': " + (item.opacity == undefined ? 1 : item.opacity) + ""
                    + "}, " + item.duration + " * 1000, " + ((index === _o.path.length - 1) ? "'" + item.ease + "',function(){_self.game.groupIndex++;if(_self.game.groupIndex==_self.game.list.length){_self.game.__index++;me.log(_self.game.__index);if(_self.game.lotteryIndex<_self.game.list.length&&_self.game.list.length>1&&_self.game.lotteryIndex>0){_self.openDialog(function(){_self.setDiatitle('需要点中屏幕中的所有米兔和小狮子，才能获取抽奖资格哦~')});}};_self.element.remove();}" : "'" + item.ease + "'") + ").delay(0)";
                }
            });
            me.log("开始时间->"+(_self.game.__index+1)+"==="+ new Date());
            cookiesManager.set('{"index":'+(_self.game.__index+1)+',"date":"'+new Date().format('yyyy-MM-dd')+'"}');
            eval(strJs);

            return _self;
	};
	me.swf=swf;
})(window.me = window.me || {}, window);

//游戏
(function(me,win){
	var game=function(options){
		this.options=options;
		this.source=options.pc;
		this.list=[];
		this.groupIndex=0;
	};
	game.prototype = {
		init:function() {
			var __self=this;
			if (__self.options.startTime
	            && __self.options.endTime
	            && new Date() > new Date(__self.options.startTime.replace(/-/g, "/"))
	            && new Date() < new Date(__self.options.endTime.replace(/-/g, "/"))) {
	            __self._time = me.random(1000, 3000);
	            //__self.__index = 0, __self.__nextindex = -1;
                __self.__index = cookiesManager.get().index||0, __self.__nextindex = -1;
	            __self.__isrun = true;
	            __self.interval = __self.options.interval.split(';');
	            __self.dialog=null;
	            __self.update();
	        }
		},
	    __isRun: function() {
	        var _self = this,
	            _p = this.options;
	        if (_self.__index > _self.interval.length - 1) {
	            if (!_p.loop) {
	                return false;
	            }
	        }
	        return true;
	    },
	    __getIndex: function() {
	        var _self = this,
	            _p = this.options;
	        var index = _self.__index % _self.interval.length;
	        if (_self.__index > _self.interval.length - 1) {
	            if (_p.loop) {
	                index = _self.interval.length - 1;
	            }
	        }
	        return index;
	    },
	    create:function() {
			var __self=this;

			__self.groupIndex=0;
			__self.lotteryIndex=0;
			__self.list.length=0;
			__self.items=__self.source[me.random(0,__self.source.length-1)];
			//__self.items=__self.source[__self.__index?me.random(0,__self.source.length-1):me.random(0,4)];  // 15010880 修改
			//判断是否数组
			if(me.isArray(__self.items)){
				for(var i in __self.items){
					__self.list.push(new me.swf(__self.items[i],__self));
				}
			}else{
				__self.list.push(new me.swf(__self.items,__self));
			}
			//对象已经生成
			for(var i in __self.list){
				__self.list[i].create();
			}
			return __self;
		},
		update:function(){
			var _self = this, _p = _self.options;
            var __outerTime = 200, __interTime;
            function _do() {
                if (_self.__isRun()) {
                    __outerTime = setTimeout(function () {
                    	me.log(_self.__index+":"+_self.__nextindex);
                        if (_self.__index !== _self.__nextindex&&!_self.isStop) {
                            _self.__nextindex = _self.__index;

                            if (_self.__isRun()) {
                                var t=_self.interval[_self.__getIndex()];
                                __interTime = setTimeout(function () { _self.create(); }, t * 1000*60);
                            } else {
                                clearTimeout(__interTime);
                            }
                        }
                        _do();
                    }, __outerTime);
                } else {
                    clearTimeout(__outerTime);
                    clearTimeout(__interTime);
                }
            }
            _do();
		}
	};
	me.game=game;
})(window.me = window.me || {}, window);

/*
*弹出层样式
*/
var toastCss=".ui-me-toast{position:relative;width:486px;height:559px;background:url("+me.Environment.base()+"images/dialog.png);opacity:0;-webkit-transition:all .15s ease-out;transition:all .15s ease-out;-webkit-transform:translateY(-100%);transform:translateY(-100%);-ms-transform:translateY(-100%)}.ui-me-toast .ui-me-head{position:relative}.ui-me-toast .ui-me-head .ui-me-title{font-size:22px;line-height:22px}.ui-me-toast .ui-me-head .ui-me-close{position:absolute;position:relative;top:0;top:28px;right:0;left:34px;float:right;width:40px;height:40px;background:url("+me.Environment.base()+"images/dialogclose.png);cursor:pointer;-webkit-transition:all .4s ease;-moz-transition:all .4s ease;-o-transition:all .4s ease;transition:all .4s ease}.ui-me-toast .ui-me-head .ui-me-close:hover{-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg);-ms-transform:rotate(180deg)}.ui-me-toast .ui-me-content{position:relative;padding:40px;padding-top:90px}.ui-me-toast .ui-me-content .me-title{position:relative;height:118px;color:#fff000;font-weight:700;font-size:16px;text-align: center;}.ui-me-toast .ui-me-content .me-title .meicon{position:absolute;top:30px;left:50%;margin-left:-41px;width:83px;height:88px;display:none;}.ui-me-toast .ui-me-content .me-title .meicon.on{display:block;background:url("+me.Environment.base()+"images/dialogicon.png)}.ui-me-toast .ui-me-content .me-ad{width:400px;height:300px;border:5px solid #d1002b;background-color:#fff;background-image:url(http://img.suning.cn/public/v3/css/images-sidebar/sidebar-loading.gif);background-position:50%;background-repeat:no-repeat}.ui-me-show .ui-me-toast{opacity:1;-webkit-transform:translateY(0);transform:translateY(0);-ms-transform:translateY(0)}.ui-me-foot{position:absolute;top:-99px;left:50%;z-index:-1;margin-left:-355px;width:686px;height:259px;background-image:url("+me.Environment.base()+"images/dialogbg.png);background-position:50%;background-repeat:no-repeat;animation:mymove 3s infinite;-webkit-animation:mymove 3s infinite}@keyframes mymove{0%{transform:scale(.9)}50%{transform:scale(1.2)}to{transform:scale(.9)}}@-webkit-keyframes mymove{0%{-webkit-transform:scale(.9)}50%{-webkit-transform:scale(1.2)}to{-webkit-transform:scale(.9)}}.me-ad img{display:block;width:400px;height:300px;}";
/*
*程序入口
*/
(function(me,win){

        win.mySound =new buzz.sound(me.Environment.base()+"images/over", {
                formats : ['wav']
            });


        //加载弹出层样式
        $("<style rel='stylesheet'>" + toastCss + "</style>").appendTo($("head"));

        if (typeof(passport_config) == "undefined") {
            //var _base = me.Environment.passport();
            win.passport_config=win.passport_config|| {base: me.Environment.passport(), loginTheme: 'b2c_pop' };
            //$("<script type='text/javascript'>var passport_config =passport_config|| {base: '" + _base + "', loginTheme: 'b2c_pop' }; </script> ").appendTo($("head"));
        }

        var scripts =[];

        var scriptsModel={
            passport:false,
            detect:false,
            ldp:false,
            dialog:false,
            authTip:false,
            queryQualificat:false
        };

        $("script").each(function() {
            if ($(this).attr("src")) {
                if ($(this).attr("src").indexOf("passport.js") > -1) {
                    scriptsModel.passport=true;
                }
                if ($(this).attr("src").indexOf("detect.js") > -1) {
                    scriptsModel.detect=true;
                }
                if ($(this).attr("src").indexOf("ldp.js") > -1) {
                    scriptsModel.ldp=true;
                }
                if ($(this).attr("src").indexOf("SFE.dialog.js") > -1) {
                    scriptsModel.dialog=true;
                }
                if ($(this).attr("src").indexOf("authTip.js") >-1) {
                    scriptsModel.authTip=true;
                }
                if ($(this).attr("src").indexOf("queryQualificat-Api.js") > -1) {
                    scriptsModel.queryQualificat=true;
                }
            }
        });

        if(!scriptsModel.passport){
            scripts.push(me.Environment.passportjs());
        }
        if(!scriptsModel.detect){
            scripts.push(me.Environment.detect());
        }
        if(!scriptsModel.ldp){
            scripts.push(me.Environment.lucky());
        }
        if(!scriptsModel.dialog){
            scripts.push(me.Environment.qmjs()+"SFE.dialog.js");
        }
        if(!scriptsModel.authTip){
            scripts.push(me.Environment.qmjs()+"authTip.js");
        }
        if(!scriptsModel.queryQualificat){
            scripts.push(me.Environment.qmjs()+"api/queryQualificat-Api.js");
        }
    //
        scripts.push(me.Environment.base()+"cartoonConfig.js?v="+Date.parse(new Date()));

        seriesLoadScripts(scripts,function(){
            if (window.bd) {
                bd.init({
                    'token' : 'other'
                });
            }
            
            new me.game(ctConfig).init();

        });

})(window.me = window.me || {}, window);















