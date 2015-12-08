function randomInt(min,max,times,target)
{
	for (var i = 0; i < times; i++) {		
    	var rand = Math.floor(Math.random()*(max-min+1)+min);
    	target.push(rand);
	};

	return;
}

var i, data, Tiles, tiles;

function setAttributes(el, attrs) {
	for(var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}
var counter = 0, k = 5, row = 0, col = 0;

Tiles = function Tiles(data) {
	var div, numb;

	if($('.number-swatch:visible').length === 25) {
		numb = $('<span>', {class: "number-container", text: data});
		// console.log($('.number-swatch:visible').length)
		return {
			elm: numb,
			content: data
		};
	} else {
		// console.log('mai mic')
		// console.log($('.number-swatch:visible').length)

		if (counter % k === 0) {
			row ++;
			if (col === 5) {
				col = 0;				
			}
		}
		counter++;
		col++;

		div = document.createElement('div');
		var dataId =  'id_' + i;

		setAttributes(div, {
			'data-id': dataId,
			'data-context': data,
			'data-row': row,
			'data-col': col,
			'class':'col-xs-2 number-swatch bg-primary'
		});

		$('<span>', {class: "number-container", text: data}).appendTo(div);
		return div;
	}
};

var botPlayer = false, user = false;

function bot(col) {

	if (botPlayer) {
		$('.number-swatch.cloned').remove();

		$('.number-swatch[data-col="'+ col +'"]').toggleClass('bg-pink active');

		var myArray = [];
		$('.number-swatch[data-col="'+ col +'"]').each(function() {
			var number = $(this).find('span').text();
			console.log(number)
			myArray.push(number);
		})
		var maxVal = Math.max.apply(Math, myArray);

		var chosenTile = $('.number-swatch[data-col="'+ col +'"][data-context="'+ maxVal +'"]');
		console.log(chosenTile);

		$(document).on('click','.number-swatch[data-col="'+ col +'"][data-context="'+ maxVal +'"]',function (e) {
			e.preventDefault();
			var clone = '';
				clone = $(this).clone();
			var thisParent = $(this).parent();
			var offset = { top: clone.context.offsetTop, left:clone.context.offsetLeft  };
			var posY = offset.top;
			var posX = offset.left;
			
			clone.css({
				'position':'absolute',
				'top': posY,
				'left': posX - 10
			}).addClass('cloned').appendTo(thisParent)
				.animate({'top': -100, 'opacity': 0}).fadeOut(function(){
					var dataNumb = $(this).data('row');

					botPlayer = false;
					user = true;

					$('.number-swatch[data-col="'+ col +'"]').removeClass('bg-pink active');
					bot(dataNumb);
				//return false;
				});


			$(this).addClass('hidden-number');
		});

		setTimeout(function(){
			chosenTile.trigger("click");
		}, 1500);

		console.log('bot',botPlayer,'user',user);

		return false;

	} else if(user) {
	// user click
		$('.number-swatch.cloned').remove();
		$('.number-swatch[data-row="'+ col +'"]').toggleClass('bg-blue active');

		$(document).on('click','.number-swatch.active',function (e) {
			var clone = '';
				clone = $(this).clone();
			var thisParent = $(this).parent();
			var offset = { top: clone.context.offsetTop, left:clone.context.offsetLeft  };
			var posY = offset.top;
			var posX = offset.left;
			
			clone.css({
				'position':'absolute',
				'top': posY,
				'left': posX - 10
			}).addClass('cloned').appendTo(thisParent)
				.animate({'top': -100, 'opacity': 0}).fadeOut(function(){
					var dataNumb = $(this).data('col');
					$('.number-swatch').removeClass('bg-blue active');

					botPlayer = true;
					user = false;
					bot(dataNumb);
				});

			botPlayer = true;
			user = false;

			$(this).addClass('hidden-number');
		});

		console.log('bot',botPlayer,'user',user);

		return false;
	}

}

function game() {	
	data = [];
	randomInt(-9,9,25,data);

	for(i=0; i<data.length; i++) {
		tiles = new Tiles(data[i]);
		if(!($('.number-swatch').length >= 25)) {
			document.getElementById('playing-area').appendChild(tiles);
		} else {
			console.log(tiles)
			$('div[data-id="id_' + i + '"]').find('span').remove();
			$('div[data-id="id_' + i + '"]').attr('data-context',tiles.content).append(tiles.elm);
		}
	}

	var rand = Math.floor((Math.random() * 5) + 1);
	$('.number-swatch').removeClass('bg-blue bg-pink active');
	$('.number-swatch[data-row="'+ rand +'"]').toggleClass('bg-blue active');

	$('.number-swatch').removeClass('hidden-number');
	$('.cloned').remove();

	// user = true;

	// // user click
	$('.number-swatch.active').click(function (e) {
		botPlayer = true;
		var clone = '';
			clone = $(this).clone();
		var thisParent = $(this).parent();
		var offset = { top: clone.context.offsetTop, left:clone.context.offsetLeft  };
		var posY = offset.top;
		var posX = offset.left;

		clone.css({
			'position':'absolute',
			'top': posY,
			'left': posX - 10
		}).addClass('cloned').appendTo(thisParent)
			.animate({'top': -100, 'opacity': 0}).fadeOut(function(){
				var dataNumb = $(this).data('col');
				$('.number-swatch').removeClass('bg-blue active');
				bot(dataNumb);
			});

		$(this).addClass('hidden-number');
	})
}

$(document).ready(function() {
	
	game();

	$('.refresh-btn').click(function() {
		game();
	})
})