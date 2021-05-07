//JSLib/jQuery - Player plugin 30.01.2018 
(function ($) {
	$.fn.setplayimg = function () {
		var vars = _my.players[_my.cur];
		var img = "play";
		$(vars.playobj).removeClass("my_playing");
		if (vars.started) {
			img = "pause";
			$(vars.playobj).addClass("my_playing");
		}
		if (!vars.images.play) return;
		if (vars.over && vars.useover) img += "_over";
		var obj = vars.playobj.style.backgroundImage = "url(" + vars.images[img].src + ")";
	}
	$.fn.volumeclick = function (e) {
		var vars = _my.players[_my.cur];
		if (vars.muted) this.mute();
		if (!e.target) e.target = e.srcElement;
		var vol = "";
		if (vars.voltop) vol = 100 - (e.clientY - vars.volumedivobj.getBoundingClientRect().top) * 100 / vars.volpx;
		else vol = (e.clientX - vars.volumedivobj.getBoundingClientRect().left) * 100 / vars.volpx;
		if (vol < 0) vol = 0;
		if (vol > 100) vol = 100;
		vars.media.volume = vol / 100;
	}
	$.fn.mute = function () {
		var vars = _my.players[_my.cur];
		var img = "";
		if (vars.muted) {
			vars.media.volume = vars.muted;
			vars.muted = 0;
			img = "mute";
			vars.muteobj.classList.remove('my_muted');
		} else {
			vars.muted = vars.media.volume;
			vars.media.volume = 0;
			img = "mute_on";
			vars.muteobj.classList.add('my_muted');
		}
		if (vars.images[img]) vars.muteobj.style.backgroundImage = "url(" + vars.images[img].src + ")";
	}
	$.fn.progress = function (playerid) {
		var vars = _my.players[playerid];
		var obj = vars.rewindobj;
		if (!obj || !isFinite(vars.media.duration) || isNaN(vars.media.duration)) return;
		var w = Math.round(parseInt($(obj).css('width')) * vars.media.currentTime / vars.media.duration);
		vars.rewind_onobj.style.width = w + "px";
	}
	$.fn.rewindclick = function (e) {
		var vars = _my.players[_my.cur];
		if (!isFinite(vars.media.duration) || isNaN(vars.media.duration)) return;
		var w = e.clientX - e.target.getBoundingClientRect().left;
		var time = Math.round(w * vars.media.duration / parseInt($(vars.rewindobj).css('width')));
		vars.media.currentTime = time;
	}
	$.fn.loading = function (str) {
		var vars = _my.players[_my.cur];
		var str = "";
		if (vars.started) str = "загрузка";
		if (vars.loadingobj) vars.loadingobj.innerHTML = str;
	}
	$.fn.clearmedia = function (media) {
		media.pause();
		try {
			media.currentTime = 0;
		} catch (e) {};
		media.src = "";
	}
	$.fn.set_player = function (obj) {
		var func = function () {
			_my.cur = this.id;
			if (obj.streamurl) _my.players[_my.cur].streamurl = obj.streamurl;
			if (typeof (obj.volume) !== 'undefined') _my.players[_my.cur].media.volume = obj.volume / 100;
			if (typeof (obj.autoplay) !== 'undefined') {
				if (obj.autoplay) $.fn.playing('play');
				else $.fn.playing('stop');
			}
		}
		if (obj.playerid) $("#" + obj.playerid).each(func);
		else return this.each(func);
	}
	$.fn.playing = function (str) {
		if (!str) str = "";
		console.log(_my.cur + " " + str);
		//stop all players
		if (str != 'stopall') {
			var tmp = _my.cur;
			for (var i in _my.players)
				if (tmp != i && _my.players[i].started) {
					_my.cur = i;
					$.fn.playing('stopall');
				} _my.cur = tmp;
		}
		//handle normal
		var vars = _my.players[_my.cur];
		var start = 0;
		if (str == 'play' || (!vars.started && str != 'stop')) start = 1;
		//stop
		_my.players[_my.cur].started = 0;
		this.loading();
		this.setplayimg();
		$.fn.clearmedia(vars.media);
		//start	
		if (start) {
			_my.players[_my.cur].started = 1;
			$.fn.visualize();
			this.loading();
			this.setplayimg();
			vars.media.src = vars.streamurl;
			var promise = vars.media.play();
			if (promise !== undefined) {
				var this1 = this;
				promise.then().catch(function () {
					_my.players[_my.cur].started = 0;
					this1.setplayimg();
				});
			}
		}
	}
	$.fn.updateinterval = function (info) {
		if (this.vars.interval >= 10) _my.setTimeout = window.setTimeout($.proxy(this.updateinfo, this), this.vars.interval * 1000);
		this.vars.updatefunc(info);
	}
	$.fn.updateinfo = function () {
		if (!this.vars.port) return;
		var url = "//myradio24.com/users/" + this.vars.port + "/status.json";
		if (url.search(/\?/) == -1) url += "?";
		url += "&_=" + Math.random();
		if (_my.setTimeout) clearTimeout(_my.setTimeout);
		$.ajax({
			url: url,
			data: "",
			success: $.proxy(this.updateinterval, this)
		});
	}
	$.fn.init_updateinfo = function (str) {
		if (!this.vars) this.vars = {};
		var def = {
			interval: 15
		};
		for (var i in def)
			if (typeof this.vars[i] === "undefined") {
				this.vars[i] = def[i];
			}
		for (var i in str)
			if (str[i] != null) this.vars[i] = str[i];
		if (!this.vars.port) return;
		if (!this.vars.updatefunc && typeof _my.init_updateinfo !== "undefined") this.vars.updatefunc = _my.init_updateinfo;
		if (this.vars.interval > 0 && this.vars.interval < 10) this.vars.interval = 10;
		this.updateinfo();
		//INITIALIZE TABLE
		var tableform = $("#my_table_form")[0];
		if (tableform) tableform.onsubmit = $.fn.init_sendtable;
		//INITIALIZE CHAT
		if ($("#my_chat")[0]) {
			var room = "myradio24_" + this.vars.port;
			if (this.vars.vmid) room += "-" + this.vars.vmid;
			$("#my_chat").html("<iframe src='https://vmeste.eu/chat?room=" + room + "' style='width:100%; height:153px; border:0px;'></iframe>");
		}
	}
	//NOT WORK on Safari iOS: "0,0,0 DATA" returned from analyser.getByteFrequencyData(dataArray)
	$.fn.visualize = function () {
		var mobile = 0;
		if (navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i)) mobile = 1;
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		//visualizer
		function visualize(canvas) {
			if (!canvas || canvas.nodeName != "CANVAS") return;
			if (!_my.cur) return;
			var playerid = _my.cur;
			var vars = _my.players[playerid];
			var media = vars.media;
			if (!window.AudioContext || !vars || !media || !media.crossOrigin) {
				$(canvas).remove();
				return;
			}
			var size = $(canvas).data('size') * 1;
			if (!size) size = 64;
			var revert = $(canvas).data('revert') * 1;
			var color = $(canvas).data('color');
			var WIDTH = parseInt(canvas.width);
			var HEIGHT = parseInt(canvas.height);
			var canvasCtx = canvas.getContext("2d");
			canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
			//analyser defined?
			if (!_my.ctx) _my.ctx = new AudioContext();
			if (_my.ctx.state && _my.ctx.state == 'suspended') _my.ctx.resume().then(function () {
				console.log('AudioContext resumed successfully');
			});
			if (!vars.audioSrc) {
				_my.players[playerid].audioSrc = vars.audioSrc = _my.ctx.createMediaElementSource(media);
			}
			var analyser = _my.ctx.createAnalyser();
			vars.audioSrc.connect(analyser);
			vars.audioSrc.connect(_my.ctx.destination);
			analyser.fftSize = size * 2;
			var bufferLength = analyser.frequencyBinCount;
			var dataArray = new Uint8Array(bufferLength);
			var timeArray = new Uint8Array(bufferLength);
			var barWidth = (WIDTH / bufferLength) - 1;
			//draw
			function draw() {
				setTimeout(function () {
					//clear
					canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
					if (!_my.players[playerid].started) {
						console.log("Canvas stop.");
						return;
					}
					//animate
					drawVisual = requestAnimationFrame(draw);
					analyser.getByteFrequencyData(dataArray);
					analyser.getByteTimeDomainData(timeArray);
					//add rects
					var barHeight;
					for (var i = 0; i < bufferLength; i++) {
						barHeight = dataArray[i] / 2;
						c1 = 50;
						c2 = 50;
						c3 = parseInt(barHeight + 100);
						if (color == "red") canvasCtx.fillStyle = 'rgb(' + c3 + ',' + c1 + ',' + c2 + ')';
						else if (color == "blue") canvasCtx.fillStyle = 'rgb(' + c1 + ',' + c2 + ',' + c3 + ')';
						else if (color == "green") canvasCtx.fillStyle = 'rgb(' + c1 + ',' + c3 + ',' + c2 + ')';
						else canvasCtx.fillStyle = 'hsl(' + (i / bufferLength * 360) + ', 100%, 50%)';
						barHeight = barHeight / 128 * HEIGHT;
						xpos = i;
						if (revert) xpos = bufferLength - 1 - i;
						canvasCtx.fillRect((barWidth + 1) * xpos, HEIGHT / 2 - barHeight / 2, barWidth, barHeight);
					}
					for (var i = 0; i < bufferLength; i++) {
						if (!dataArray[i]) continue;
						var value = timeArray[i];
						var percent = value / 256;
						var height = HEIGHT * percent;
						var offset = HEIGHT - height - 1;
						canvasCtx.fillStyle = 'white';
						xpos = i;
						if (revert) xpos = bufferLength - 1 - i;
						canvasCtx.fillRect((barWidth + 1) * xpos, offset, barWidth, 2);
					}
				}, 20);
			}
			draw();
		}
		//run all visualizer's
		$('#my_visualizer, .my_visualizer').each(function () {
			visualize(this);
		});

	}
	$.fn.init_player = function (str) {
		var vars = {};
		if (!this.vars) this.vars = {};
		for (var i in this.vars) vars[i] = this.vars[i];
		//set playerid
		if (!vars.playerid) vars.playerid = "my_player";
		if (typeof str === 'string' && str) vars.playerid = str;
		else if (typeof str === 'object' && str.playerid) vars.playerid = str.playerid;
		var playerid = vars.playerid;
		var obj = $("#" + playerid)[0];
		if (!obj) return;
		var oldplayer = _my.players[playerid];
		if (oldplayer) {
			$.fn.clearmedia(oldplayer.media);
			delete _my.players[playerid];
		}
		//set vars 
		var def = {
			player: "energy",
			skin: "blue",
			width: 200,
			autoplay: 1,
			volume: 70,
			streamurl: "",
			interval: 15
		};
		for (var i in def)
			if (typeof vars[i] === "undefined") vars[i] = def[i];
		for (var i in def) {
			var attr = $("#" + playerid).data(i);
			if (attr != null) vars[i] = attr;
		}
		if (typeof str === "object")
			for (var i in str) vars[i] = str[i];
		this.vars.player = vars.player; //fix for old code, informer check energy
		vars.started = 0;
		vars.lastsong = "";
		if (!vars.streamurl) return;
		if (!vars.skin) vars.skin = "blue";
		if (vars.width < 120) vars.width = 120;
		vars.type = "mp3";
		if (vars.streamurl.substr(-4) == ".flv") vars.type = "mp4";
		if (vars.streamurl.substr(-4) == ".ogg") vars.type = "ogg";
		vars.streamurl = vars.streamurl.replace('?type=.flv', '').replace('?type=.ogg', '');
		if (vars.type != "mp3" || vars.streamurl.substr(-3) == "aac") {
			var ua = window.navigator.userAgent;
			if (ua.replace(' rv:11.', 'MSIE 11.').indexOf("MSIE ") > 0) alert("Ваш браузер не поддерживает формат звука aac и ogg, используйте Google Chrome для нашего плеера.");
		}
		vars.images = {};

		//players
		if (vars.player == "custom") {
			if (!vars.imagesurl) {
				var attr = $("#" + playerid + "_html").data('imagesurl');
				if (attr == null) attr = "";
				vars.imagesurl = attr.trim();
			}
			if (vars.imagesurl[0] == '{') vars.imagesurl = JSON.parse(vars.imagesurl.replace(/'/g, '"'))
			if (!vars.playerhtml) vars.playerhtml = $("#" + playerid + "_html").html();
			for (var i in vars.imagesurl) {
				vars.images[i] = new Image();
				if (vars.imagesurl[i]) vars.images[i].src = vars.imagesurl[i];
			}
			obj.innerHTML = vars.playerhtml;
		}

		if (vars.player == "adaptive") {
			var bg = "#fcfcfc";
			if (vars.skin[0] == '#') bg = vars.skin;
			var html = '\
			<style>\
			.my_player_adaptive {position:fixed; bottom:0; left:0; width:100%; height:55px; line-height: 1.2; background:' + bg + '; z-index:10000; border-top:1px solid #dddddd; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15); }\
			.my_player_adaptive .my_player_body { width: 100%; margin: 0 auto; max-width: 1000px; padding: 0 20px; position: relative; box-sizing: border-box;}\
			.my_player_adaptive .my_cover {transition: all .4s; float:left; width:45px; height:45px; box-sizing:border-box; position:relative; margin: 5px 10px; background:#ddd; background-size:cover; border-radius:4px;}\
			.my_player_adaptive .my_cover:hover {z-index:20000; width:200px; height:200px; margin-top:-150px; margin-right:-145px;}\
			.my_player_adaptive .my_play {transition:0.3s; float:left; width:55px; height:55px; margin-right:10px; background:url(//myradio24.com/img/play.png) no-repeat center; background-size: 65%; background-position: 55% 50%; opacity:.3; cursor:pointer;}\
			.my_player_adaptive .my_play:hover {opacity:.7;}\
			.my_player_adaptive .my_playing {transition:0.3s; background-image:url(//myradio24.com/img/pause.png);}\
			.my_player_adaptive .my_timer { float: left; margin: 0px; margin-right: 15px; color: #ddd; width: 66px;  font: 26px Arial; line-height: 55px;}\
			.my_player_adaptive .my_songinfo { float:left; position:relative; font-size:14px; font-weight:400; color:#666; height: 55px; max-width: 60%;}\
			.my_player_adaptive .my_artist { float:left; position:relative; margin-top:9px; color:#000; width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}\
			.my_player_adaptive .my_songtitle { float:left; position:relative; width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; margin-top:3px;}\
			\
			.my_player_adaptive .my_share { float:right; width:50px; height:55px; cursor:pointer; opacity:.3; position: relative; background:url(//myradio24.com/player/adaptive/share.png) no-repeat center;	background-size: 50%;}\
			.my_player_adaptive .my_share:hover{ opacity:1;}\
			.my_player_adaptive .my_sharediv { position:absolute; bottom: 45px; left:50%; margin-left:-17px; width:35px; height:123px; background:#fff; display:none; box-shadow: 0 2px 2px 0 rgba(0,0,0,.24), 0 0 2px 0 rgba(0,0,0,.12); border-radius: 2px; border: 1px solid #eee; z-index: 999; box-sizing:border-box; padding:5px;}\
			.my_player_adaptive .my_share:hover .my_sharediv { display:block;}\
			.ya-share2__item {margin-bottom:5px !important;} \
			\
			.my_player_adaptive .my_volumeplayer { float:right; width:55px; height:55px; cursor:pointer; opacity:.3; position: relative; background:url(//myradio24.com/player/adaptive/volume.svg) no-repeat center;	background-size: 45%; }\
			.my_player_adaptive .my_volumeplayer:hover{ opacity:1;}\
			.my_player_adaptive .my_volumediv { position:absolute; bottom: 45px; left:50%; margin-left:-15px; width:30px; height:120px; background:#fff; display:none; box-shadow: 0 2px 2px 0 rgba(0,0,0,.24), 0 0 2px 0 rgba(0,0,0,.12); border-radius: 2px; border: 1px solid #eee; z-index: 999; box-sizing:border-box; padding:10px;}\
			.my_player_adaptive .my_volumeplayer:hover .my_volumediv { display:block;}\
			.my_player_adaptive .my_volume {transition:0.3s; position:absolute; bottom: -10px; left: 0; width: 100%; height:100%; background: #666; border-radius:5px;}\
			.my_player_adaptive .my_volumebody { float:left; position:relative; width: 100%; height: 100%; background: #ddd; border-radius: 5px; overflow: hidden;}\
			.my_player_adaptive .my_muted { background:url(//myradio24.com/player/adaptive/volumeoff.svg) no-repeat center; background-size: 45%; }\
			@media screen and (max-width:700px) {\
				.my_player_adaptive .my_player_body {width: 100%;		margin: 0 auto;		max-width: 1200px;		padding: 0;		position: relative;		box-sizing: border-box;	}\
				.my_player_adaptive .my_timer {display:none;	}\
			}\
			</style>\
			<div class="my_player_adaptive">\
				<div class="my_player_body">\
					<div class="my_cover" data-myinfo="img"></div>\
					<div class=my_play></div>\
					<div class=my_timer>00:00</div>\
					<div class="my_songinfo">\
						<div class="my_artist" data-myinfo="artist"></div>\
						<div class="my_songtitle" data-myinfo="songtitle"></div>\
					</div>\
					<div class="my_volumeplayer my_mute">\
						<div class="my_volumediv"><div class="my_volumebody"><div class="my_volume"></div></div></div>\
					</div>\
					<div class="my_share">\
						<div class="my_sharediv" id="my_sharediv"></div>\
					</div>\
				</div>\
			</div>';
			obj.innerHTML = html;
			//load share buttons
			$.getScript("https://myradio24.com/lib/share.js", function (data, textStatus, jqxhr) {
				Ya.share2("my_sharediv", {
					content: {
						url: location.href,
						title: document.title
					},
					theme: {
						services: "vkontakte,odnoklassniki,facebook,twitter",
						counter: true
					}
				});
			});
		}
		if (vars.player == "default") {
			vars.preload = {
				'play': '',
				'pause': '',
				'mute': '',
				'mute_on': ''
			};
			for (var i in vars.preload) {
				vars.preload[i] = new Image();
				vars.preload[i].src = "//myradio24.com/player/default/" + i + ".png";
			}
			var bg = "#101010";
			if (vars.skin[0] == '#') bg = vars.skin;
			var html = '\
			<style>\
			.my_player_default {height: 30px; width: ' + vars.width + 'px; background: ' + bg + '; background-image:linear-gradient(#333333, #000000); line-height: 1.2;}\
			.my_player_default .my_play {position:absolute; left:7px; top:7px; width:16px; height:16px; background:url(//myradio24.com/player/default/play.png); cursor:pointer;}\
			.my_player_default .my_playing {transition:0.3s; background:url(//myradio24.com/player/default/pause.png);}\
			.my_player_default .my_timer {position:absolute; left:30px; top:9px;  width:45px; font:11px Arial; color:#f0f0f0;}\
			.my_player_default .my_mute {position:absolute; right:67px; top:7px; width:16px; height:16px; background:url(\'//myradio24.com/player/default/mute.png\'); cursor:pointer;}\
			.my_player_default .my_muted {transition:0.3s; background:url(\'//myradio24.com/player/default/mute_on.png\');}\
			.my_player_default .my_volumediv {position:absolute; text-align:left; right:10px; top:11px; width:50px; height:8px; background:#303030; background-image:linear-gradient(#202020, #303030); border-radius:2px; cursor:pointer; user-select:none;}\
			.my_player_default .my_volume {transition:0.3s; width:50px; height:8px; background:#cccccc; background-image:linear-gradient(#eeeeee, #aaaaaa); border-radius:2px;}\
			.my_player_default .my_loading {position:absolute; text-align:center; left:31px; bottom:1px; font:9px Verdana; color:#cccccc;}\
			</style>\
			<div class=my_player_default>\
				<div class=my_play></div>\
				<div class=my_timer>00:00:00</div>\
				<div class=my_mute></div>\
				<div class=my_volumediv><div class=my_volume></div></div>\
				<div class=my_loading></div>\
			</div>';
			obj.innerHTML = html;
		}

		if (vars.player == "lite") {
			vars.preload = {
				'play': '',
				'pause': '',
				'mute': '',
				'mute_on': ''
			};
			for (var i in vars.preload) {
				vars.preload[i] = new Image();
				vars.preload[i].src = "//myradio24.com/player/lite/" + i + ".png";
			}
			var html = '\
			<style>\
			.my_player_lite {width: ' + vars.width + 'px; height: 24px; background: url(//myradio24.com/player/lite/player.png); line-height: 1.2;}\
			.my_player_lite .my_play {position:absolute; left:0px; top:0px; width:21px; height:24px; background:url(//myradio24.com/player/lite/play.png); cursor:pointer;}\
			.my_player_lite .my_playing {transition:0.3s; background:url(//myradio24.com/player/lite/pause.png);}\
			.my_player_lite .my_timer {position:absolute; left:30px; top:6px; width:45px; font:11px Arial; color:#101010;}\
			.my_player_lite .my_rewind {position:absolute; left:80px; top:9px; right:45px; height:6px; cursor:pointer; background:gray;}\
			.my_player_lite .my_rewind_on {width:0px; height:6px; background:black;}\
			.my_player_lite .my_mute {position:absolute; right:30px; top:0px; width:14px; height:24px; background:url(//myradio24.com/player/lite/mute.png); cursor:pointer;}\
			.my_player_lite .my_muted {transition:0.3s; background:url(\'//myradio24.com/player/lite/mute_on.png\');}\
			.my_player_lite .my_volumediv {position:absolute; right:4px; top:0px; width:26px; height:24px; background:url(\'//myradio24.com/player/lite/volume.png\'); cursor:pointer; user-select:none;}\
			.my_player_lite .my_volume {transition:0.3s; width:26px; height:24px; background:url(\'//myradio24.com/player/lite/volume_on.png\');}\
			.my_player_lite .my_loading {position:absolute; text-align:center; left:31px; bottom:1px; font:9px Verdana; color:#888888;}\
			</style>\
			<div class=my_player_lite>\
				<div class=my_play></div>\
				<div class=my_timer>00:00:00</div>\
				<div class=my_rewind><div class=my_rewind_on></div></div>\
				<div class=my_mute></div>\
				<div class=my_volumediv><div class=my_volume></div></div>\
				<div class=my_loading></div>\
			</div>';
			obj.innerHTML = html;
		}

		if (vars.player == "energy") {
			vars.voltop = 1;
			vars.useover = 1;
			vars.preload = {
				'play': '',
				'play_over': '',
				'pause': '',
				'pause_over': '',
				'volume': '',
				'volume_on': ''
			};
			for (var i in vars.preload) {
				vars.preload[i] = new Image();
				vars.preload[i].src = "//myradio24.com/player/energy/" + vars.skin + "/" + i + ".png";
			}
			var html = '\
			<style>\
			.my_energy {width: 176px; height:73px; background: url(//myradio24.com/player/energy/' + vars.skin + '/player.png); line-height: 1.2;}\
			.my_energy .my_song {cursor:pointer; position:absolute; overflow: hidden; top:28px; left:15px; width:95px; height:20px; font:14px Verdana; color:#ddddff;}\
			.my_energy .my_marquee {position:absolute; padding-left: 100%; white-space: nowrap; animation: scroll-left 15s linear infinite;}\
			 @keyframes scroll-left { 0% { transform: translateX(0);}  100% {transform: translateX(-100%);} }\
			.my_energy .my_volumediv {position:absolute; top:8px; left:142px; width:28px; height:60px; cursor:pointer; user-select:none;}\
			.my_energy .my_volume {transition:0.3s; width:28px; height:60px; background:url(//myradio24.com/player/energy/' + vars.skin + '/volume.png);}\
			.my_energy .my_play {position:absolute; top:21.5px; left:116px; border-radius:17px; width:34px; height:34px; cursor:pointer;}\
			.my_energy .my_playing {transition:0.3s; background:url(//myradio24.com/player/energy/' + vars.skin + '/pause.png);}\
			.my_energy .my_play:hover {transition:0.3s; background:url(//myradio24.com/player/energy/' + vars.skin + '/play_over.png);}\
			.my_energy .my_playing:hover {transition:0.3s; background:url(//myradio24.com/player/energy/' + vars.skin + '/pause_over.png);}\
			.my_energy .my_timer {position:absolute; text-align:left; top:18px; left:20px; width:90px; font:10px Verdana; color:#508DCB;}\
			.my_energy .my_loading {position:absolute; top:18px; left:60px; width:50px; font:10px Verdana; color:#cccccc;}\
			.my_energy .my_listeners {position:absolute; top:45px; left:20px; width:90px; font:9px Verdana; color:#508DCB;}\
			.my_energy.my_blue .my_timer, .my_energy.my_blue .my_listeners {color:#508DCB;}\
			.my_energy.my_green .my_timer, .my_energy.my_green .my_listeners {color:#00F600;}\
			.my_energy.my_red .my_timer, .my_energy.my_red .my_listeners {color:#FF0000;}\
			.my_energy.my_yellow .my_timer, .my_energy.my_yellow .my_listeners {color:#FFFF00;}\
			.my_energy.my_magento .my_timer, .my_energy.my_magento .my_listeners {color:#FF2DFF;}\
			.my_energy.my_gray .my_timer, .my_energy.my_gray .my_listeners {color:#DDDDDD;}\
			\
			</style>\
			<div class="my_energy my_' + vars.skin + '">\
				<div class=my_song title="скопировать в буфер"><div class=my_marquee data-myinfo="song"></div></div>\
				<div class=my_play></div>\
				<div class=my_timer>00:00</div>\
				<div class=my_loading></div>\
				<div class=my_listeners data-myinfo="htmllisteners"></div>\
				<div class=my_volumediv><div class=my_volume></div></div>\
			</div>';
			obj.innerHTML = html;
		}

		//set objects
		var objs = ['play', 'song', 'loading', 'mute', 'rewind', 'rewind_on', 'volumediv', 'volume', 'volumecursor', 'timer'];
		for (var i = 0; i < objs.length; i++) vars[objs[i] + 'obj'] = $("#" + playerid + " #my_" + objs[i] + ", #" + playerid + " .my_" + objs[i])[0];
		//timeshort?
		vars.timeshort = 0;
		if ($(vars.timerobj).html().search(/:00:/i) == -1) vars.timeshort = 1;
		//volume checker
		var volw = parseInt($(vars.volumedivobj).css('width'));
		var volh = parseInt($(vars.volumedivobj).css('height'));
		vars.voltop = 0;
		vars.volpx = volw;
		if (volw < volh) {
			vars.voltop = 1;
			vars.volpx = volh;
		}
		//inline relative player
		obj.style.display = "inline-block";
		obj.style.position = "relative";
		//events
		$(vars.playobj).on("click", function () {
			_my.cur = playerid;
			$.fn.playing();
		});
		$(vars.muteobj).on("click", function () {
			_my.cur = playerid;
			$.fn.mute();
		});
		$(vars.rewindobj).on("click", function (e) {
			_my.cur = playerid;
			$.fn.rewindclick(e);
		});
		$(vars.volumedivobj).on("click", function (e) {
			_my.cur = playerid;
			$.fn.volumeclick(e);
			e.stopPropagation();
		}); //stop for adaptive player volume
		$(vars.songobj).on("click", function (e) {
			var range = document.createRange();
			range.selectNode(e.target);
			var selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			try {
				if (document.execCommand) document.execCommand('copy');
				selection.removeAllRanges();
				alert("Название скопировано в буфер обмена.");
			} catch (err) {
				alert("Ошибка, ваш браузер не поддерживает копирование в буфер обмена, попробуйте Chrome.");
			}
		});
		//volume cursor
		if (vars.volumecursorobj) {
			$(vars.volumecursorobj).on('mousedown', function (e) {
				_my.move = playerid;
			});
			$('body').on('mouseup', function (e) {
				_my.move = "";
			});
			$("body").on('mousemove', function (e) {
				_my.cur = playerid;
				if (_my.move == playerid) {
					$.fn.volumeclick(e);
				}
			});
		}

		//Load Player

		// new Audio(window.opera ? '-':'#');
		var media = vars.media = new Audio();
		if (vars.volume == 100) vars.volume -= 0.1; //for changing 100 != 100
		media.volume = vars.volume / 100;
		//shoutcast stream not working with crossOrigin :( or :), remove check?
		if (vars.streamurl.search("stream.nsv") == -1) media.crossOrigin = "anonymous";

		//restart if ended
		$(media).on("ended", function (e) {
			if (typeof playnext !== 'undefined' && $('input[data-fileid]').length) {
				setTimeout(function () {
					playnext();
				}, 1000);
				return false;
			}
			var rand = Math.floor(Math.random() * (6000 - 3000)) + 3000;
			console.log('Ended: restart in ' + (rand / 1000) + ' sec');
			$.fn.loading();
			vars.started = 0;
			window.setTimeout(function () {
				_my.cur = playerid;
				$.fn.playing();
			}, rand);
		});
		$(media).on("loadeddata", function () {
			if (vars.loadingobj) vars.loadingobj.innerHTML = "";
		});
		$(media).on("timeupdate", function () {
			$.fn.progress(playerid);
			var str = vars.media.currentTime;
			if (str > 100000) {
				console.log('Bad time: ' + str);
				return;
			}
			var t = Math.floor(str);
			var hours = "";
			if (vars.timeshort) {
				var m = Math.floor(t / 60);
			} else {
				var h = Math.floor(t / 3600);
				hours = (h < 10 ? "0" + h : h) + ":";
				var m = Math.floor((t - h * 3600) / 60);
			}
			var s = t % 60;
			vars.timerobj.innerHTML = hours + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
		});
		$(media).on("volumechange", function () {
			var str = vars.media.volume * 100;
			var vol = Math.round(vars.volpx / 100 * str);
			if (vars.player != "energy" && vars.voltop) vol = vars.volpx - vol;
			if (vars.voltop) {
				vars.volumeobj.style.height = (vars.volpx - vol) + "px";
				if (vars.volumecursorobj) {
					var rad = parseInt(vars.volumecursorobj.style.height) / 2;
					vars.volumecursorobj.style.top = (vol - rad) + "px";
				}
			} else {
				vars.volumeobj.style.width = vol + "px";
				if (vars.volumecursorobj) {
					var rad = parseInt(vars.volumecursorobj.style.width) / 2;
					vars.volumecursorobj.style.left = (vol - rad) + "px";
				}
			}
		});
		if (vars.autoplay > 0) window.setTimeout(function () {
			_my.cur = playerid;
			$.fn.playing();
		}, 200);

		//globalize
		if ((vars.streamurl + location.hostname).search("2" + "4.") != -1 || vars.streamurl.search(":9" + "000") != -1)
			_my.players[playerid] = vars;

		//Visualize?
		$.fn.visualize();

		return this;
	}

	//send table
	$.fn.init_sendtable = function () {
		if (!$("#my_table_from").val() || !$("#my_table_artist").val() || !$("#my_table_song").val()) {
			alert("Не все обязательные поля заполнены!");
		} else {
			var data = {
				send: 1,
				from: $("#my_table_from").val(),
				songartist: $("#my_table_artist").val(),
				songname: $("#my_table_song").val(),
				for: $("#my_table_for").val(),
				comment: $("#my_table_comment").val()
			};
			$.ajax({
				url: "//myradio24.com/" + _my.lang + "/table/" + _my.port + "?get=json" + String.fromCharCode(38) + "aha" + "ck",
				type: "POST",
				dataType: "json",
				data: data,
				success: function (info) {
					$("#my_table_form")[0].reset();
					if (info.ok) alert("Ваш заказ принят и скоро будет выполнен!");
					else alert(info.err);
				}
			});
		}
		return false;
	}

})(jQuery);


//conflict: if(!$.fn) $=JSLib; //if $ is not jQuery, set JSLib to $
//conflict: if(typeof window._ === 'undefined') window._=$; //FOR OLD JSLIB CODE (need for _("#id").html() )
//conflict: if(typeof $.fn.proxy === 'undefined') $.fn.proxy=$.proxy;
//conflict: $.fn.ajax=$.ajax; //FOR OLD JSLIB CODE (need for sendtable my.ajax)
//conflict: $.fn.get=function(sel) {if(this[0]) return this[0]; if(sel) return document.querySelector(sel);} //FOR OLD JSLIB CODE  (need for table my.get)
//conflict: window.JSLib=window.jQuery; //synchronize JSLib with jQuery (for old code)

//EXECUTE THIS
(function ($) {

	//GLOBALS: _my = {ctx | cur | initialized | port | interval | move | players{} }
	if (!window._my) window._my = {
		players: {}
	};

	//CHECK DOUBLE PLAYER
	if (_my.initialized) {
		document.write("<center><font color=red>На странице нельзя размещать более 1 скрипта <b>player.js</b> от Myradio24.</font></center><br>");
		return false;
	}
	_my.initialized = 1;

	//GET PORT / interval
	var obj = document.getElementsByTagName('script');
	obj = obj[obj.length - 1];
	_my.lang = 'ru';
	_my.port = $(obj).data('port');
	_my.interval = $(obj).data('interval');
	_my.vmid = $(obj).data('vmid');
	if (obj.src.search(String.fromCharCode(50, 52) + ".") == -1) {
		$ = _my = "";
	}

	//set default info_update
	_my.init_updateinfo = function (info) {
		//ОТОБРАЗИМ стол заказов, если включен (иначе скроем)
		if ($("#my_table_on").length) {
			if (info.enabletable == 3) {
				info.enabletable = 2;
				if (info.live) info.enabletable = 1;
			}
			$("#my_table_turn, .my_table_turn").html(info.turntable);
			$("#my_table_off").css('display', (info.enabletable == 0 ? "block" : "none"));
			$("#my_table_on").css('display', (info.enabletable == 1 ? "block" : "none"));
			$("#my_table_auto").css('display', (info.enabletable == 2 ? "block" : "none"));
		}
		//ОБНОВИМ информационные блоки
		info.isonline = "<font color=red>оффлайн</font>";
		if (info.online == 1) info.isonline = "онлайн";
		info.nextsong = info.nextsongs[0];
		info.htmllisteners = info.listeners ? "слушателей: " + info.listeners : "";
		info.htmlimg = "<img src=//myradio24.com/" + info.img + " width=300 height=300 border=0>";
		info.htmllogo = "";
		if (info.logo) info.htmllogo = "<img src='//myradio24.com/" + info.logo + "'>";
		//Вывод картинки текущего диджея (устарело, но оставим для совместимости)
		info.htmlavatar = "";
		if (window.my_avatars && Array.isArray(my_avatars)) {
			if (my_avatars[info.djname]) info.htmlavatar = my_avatars[info.djname];
			else if (my_avatars['']) info.htmlavatar = my_avatars[''];
		}
		//рейтинг ведущих
		var rank = info.rank;
		var htmlrank = "";
		if (rank && rank.length > 0) {
			rank.sort(function (a, b) {
				return b[1] - a[1];
			});
			for (var i = 0; i < rank.length; i++) {
				htmlrank += "<div style='display:inline-block; margin:5px;'><div style='float:left; width:100px; height:100px;  border:1px solid #ccc; border-radius:50px; background:url(https://myradio24.com/" + rank[i][4] + "); background-size:cover;'></div>";
				htmlrank += "<div style='float:left; padding:15px 0 0 10px; text-align:left; width:110px;'><b>" + rank[i][0] + "</b><br>" + rank[i][3] + " вещаний<br>" + rank[i][2] + " часов<br>" + rank[i][1] + " рейтинг</div></div>";
			}
		} else htmlrank = "Ничего не найдено.";
		info.htmlrank = htmlrank;
		//последние песни
		var songs = info.songs;
		var htmlsongs = "";
		//console.dir(songs);
		var revert = $(".my_lastsongs").data('revert');
		var htmlsong = $('.my_lastsonghtml').html();
		var newsongs = 0;
		if (songs && songs.length > 0) {
			for (var i = 0; i < songs.length; i++) {
				//new
				if (htmlsong) {
					//var my_songid="my_songid"+songs[i][0].replace(/:/g,"");
					var str = songs[i][0] + songs[i][1];
					var key = 0;
					for (var k = 0; k < str.length; k++) key += str.charCodeAt(k);
					var my_songid = "my_songid" + key;
					var songencode = encodeURIComponent(songs[i][1].replace('&amp;', '&'));
					var htmlsong1 = htmlsong.replace(new RegExp("%song%", "g"), songs[i][1]).replace(new RegExp("%songencode%", "g"), songencode).replace(new RegExp("%songcover%", "g"), songs[i][2]).replace(new RegExp("%songid%", "g"), songs[i][3]).replace(new RegExp("%songtime%", "g"), songs[i][0].substr(0, 5));
					if (!$('#' + my_songid)[0]) {
						if (revert == 1) $(".my_lastsongs").prepend("<div id=" + my_songid + " class='my_songdivs'>" + htmlsong1 + "</div>");
						else $(".my_lastsongs").append("<div id=" + my_songid + " class='my_songdivs'>" + htmlsong1 + "</div>");
						newsongs++;
					}
				}
				//old
				htmlsongs = "<tr><td><div style='text-align:left; padding:4px;'>" + songs[i][0].substr(0, 5) + " - <a href='https://www.youtube.com/results?search_query=" + encodeURIComponent(songs[i][1]) + "' target=_blank title='Найти на YouTube'>" + songs[i][1] + "</a> </td></tr>" + htmlsongs;
			}
			htmlsongs = "<table>" + htmlsongs + "</table>";
			//vm likes
			if (window.VM && newsongs) vm_initlikes();
		}
		//remove old track
		if ($(".my_songdivs").length > songs.length) {
			if (revert == 1) $(".my_lastsongs .my_songdivs").last().remove();
			else $(".my_lastsongs .my_songdivs").first().remove();
		}
		info.htmlsongs = htmlsongs;
		//вставка переменных в data-myinfo
		$('[data-myinfo]').each(function () {
			var key = $(this).data('myinfo');
			if (key && info[key] !== undefined) {
				if (key == 'img' || key == 'logo') $(this).css('background-image', 'url(//myradio24.com/' + info[key] + ')');
				else {
					if (this.tagName == 'A') $(this).attr('href', info[key]);
					$(this).html(info[key]);
				}
			}
		});
		//произведем замену переменных и выведем содержимое информера
		var objs = document.querySelectorAll(".my_info");
		if (!objs.length) return;
		if (!window.my_infohtml) my_infohtml = {};
		for (var k = 0; k < objs.length; k++) {
			if (!my_infohtml[k]) my_infohtml[k] = objs[k].innerHTML;
			var html = my_infohtml[k];
			for (var i in info) {
				html = html.replace(new RegExp("%" + i + "%", "g"), info[i]);
			}
			objs[k].innerHTML = html;
			objs[k].style.visibility = "visible";
		}

	}
	if (window.my_init_updateinfo) _my.init_updateinfo = my_init_updateinfo;

	//onReady
	$(function () {

		//INIT PLAYER's
		$(".my_player").each(function (i) {
			$.fn.init_player(this.id);
		});

		//INIT UPDATE INFO
		$.fn.init_updateinfo({
			port: _my.port,
			interval: _my.interval,
			vmid: _my.vmid
		});

	});

	console.log(vars);
})(jQuery);

function hlsvideo(url, id, res, last) {
	if (typeof Hls === 'undefined') {
		if (last) return;
		$.getScript('https://cdn.jsdelivr.net/npm/hls.js@latest', function () {
			hlsvideo(url, id, res, 1);
		});
		return;
	}
	var videoid = id + '_video';
	var width = res + 'px';
	var height = Math.round(res / 16 * 9) + 'px';
	$('#' + id).html("<video id='" + videoid + "' controls style='width:" + width + "; height:" + height + ";'></video></center>");
	if (Hls.isSupported()) {
		var video = document.getElementById(videoid);
		var hls = new Hls();
		hls.loadSource(url);
		hls.attachMedia(video);
		hls.on(Hls.Events.MANIFEST_PARSED, function () {
			video.play();
		});
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////