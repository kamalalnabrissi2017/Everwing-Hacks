/*
 * DinoDevs
 * Copyright 2018
 * All rights reserved.
 */

// Page functions
(function(){
	// Create typer
	var typping = function(t){
		if (t.track.group >= t.code.length){
			setTimeout(function(){
				t.callback(t);
			}, 0);
			return;
		}
		else if (t.track.index == -1) {
			t.track.index = 0;
			switch(t.code[t.track.group].type) {
				case 'text':
					t.stack.push(document.createElement('span'));
					t.stack[t.stack.length - 2].appendChild(t.stack[t.stack.length - 1]);
					typping(t);
					return;

				case 'br':
					t.stack[t.stack.length - 1].appendChild(document.createElement('br'));
					t.track.index = -1;
					t.track.group++;
					break;

				case 'command':
					t.stack.push(document.createElement('span'));
					t.stack[t.stack.length - 1].className = "command";
					t.stack[t.stack.length - 2].appendChild(t.stack[t.stack.length - 1]);
					typping(t);
					return;

				case 'dir':
					t.stack.push(document.createElement('span'));
					t.stack[t.stack.length - 1].className = "dir";
					t.stack[t.stack.length - 2].appendChild(t.stack[t.stack.length - 1]);
					typping(t);
					return;

				case 'cursor':
					t.stack.push(document.createElement('span'));
					t.stack[t.stack.length - 1].className = "cursor";
					t.stack[t.stack.length - 2].appendChild(t.stack[t.stack.length - 1]);
					typping(t);
					return;
			}
		}
		else if(t.code[t.track.group].hasOwnProperty('text') && t.track.index < t.code[t.track.group].text.length){
			t.stack[t.stack.length - 1].appendChild(document.createTextNode(t.code[t.track.group].text[t.track.index]));
			t.track.index++;
		}
		else {
			t.stack.pop();
			t.track.group++;
			t.track.index = -1;
			typping(t);
			return;
		}
		setTimeout(function(){
			typping(t);
		}, t.wait);
	};

	var typeHearts = function(callback){
		typping({
			"code" : [{type:'text', text: '♥♥♥♥'}],
			"wait" : 250,
			"track" : {group: 0, index: -1},
			"stack" : [document.getElementById('title')],
			"callback" : callback || function(){}
		});
	};

	var typeTerminal = function(callback){
		typping({
			"code" : (function(){
				// Define code
				var code = [
					'EverWing-Hacks by dinodevs # ' + (new Date().toGMTString().replace(',', '')) + ' ' + bowser.osname + ' ' + bowser.osversion, {type:'br'},
					'This project was discontinued. Thank you for your support.', {type:'br'},
					{type:"br"},
					'This extension was intended to be used ONLY for educational purposes. It was created to show how easy it is to cheat on a popular game just by running some simple commands on the browser\'s console.', {type:'br'},
					{type:'br'},
					'This software came with ABSOLUTELY NO WARRANTY. By using it your account chould get banned for cheating.', {type:'br'},
					{type:'br'},
					'Last login: ' + (new Date().toGMTString().replace(',', '')) + ' from ' + bowser.name + ' ' + bowser.version, {type:'br'},
					{type:'command', text:'root@localhack'}, ' ', {type:'dir', text:'~ #'}, ' ./check_other_forks.sh', {type:'cursor', text:'_'}
				];
				for (var i = 0; i < code.length; i++) {
					if (typeof code[i] === 'string') {
						code[i] = {type: 'text', text: code[i]};
					}
				}
				return code;
			})(),
			"wait" : 10,
			"track" : {group: 0, index: -1},
			"stack" : [document.getElementById('terminal')],
			"callback" : callback || function(){}
		});
	};

	setTimeout(function(){
		typeHearts(function(){
			typeTerminal();
			document.getElementById('footer').style.opacity = 1;
		});
	}, 500);
})();
