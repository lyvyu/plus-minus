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

Tiles = function Tiles(data) {
	var div, numb;

	if($('.number-swatch:visible').length === 25) {
		numb = $('<span>', {class: "number-container", text: data});
		console.log($('.number-swatch:visible').length)
		return numb;
	} else {
		console.log('mai mic')
		console.log($('.number-swatch:visible').length)
		div = document.createElement('div');
		var dataId =  'id_' + i;

		setAttributes(div, {
			'data-id': dataId,
			'class':'col-xs-2 number-swatch bg-primary'
		});

		$('<span>', {class: "number-container", text: data}).appendTo(div);
		return div;
	}
};

function game() {	
	$('.number-swatch').each(function() {
		// var rand = randomInt(-9,9);
		// var th = $(this);
		// th.text('');
		// $('<span>', {class: "number-container", text: rand}).appendTo(th);
	});	

	data = [];
	randomInt(-9,9,25,data);

	for(i=0; i<data.length; i++) {
		tiles = new Tiles(data[i]);
		if(!($('.number-swatch').length >= 25)) {
			document.getElementById('playing-area').appendChild(tiles);
		} else {
			console.log(tiles)
			$('div[data-id="id_' + i + '"]').find('span').remove();
			$('div[data-id="id_' + i + '"]').append(tiles);
		}
	}



	$('.number-swatch').removeClass('hidden-number');
	$('.cloned').remove();
}

$(document).ready(function() {
	
	game();

	$('.number-swatch').click(function() {
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
			.animate({'top': -100, 'opacity': 0}).fadeOut();

		$(this).addClass('hidden-number');
	})

	$('.refresh-btn').click(function() {
		game();
	})
})