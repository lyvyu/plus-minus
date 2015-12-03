function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var i, data, Tiles, tiles;

function setAttributes(el, attrs) {
	for(var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

Tiles = function Tiles(data) {
	var i,
		div = document.createElement('div');

	for(i in data) {
		var dataId =  'data-'+ i;
		setAttributes(div, {dataId: data[i]});
	}

	div.innerHTML = data.album_name;

	for(i in this) {
		if(typeof this[i] === 'function') {
			div[i] = this[i].bind(div);
		} else {
			div[i] = this[i];
		}
	}

	return div;
};

data = [
	{'id':1,'album_name':'test1','user':'user_id1'},
	{'id':2,'album_name':'test2','user':'user_id2'}
];

for(i in data) {
	tiles = new Tiles(data[i]);
	document.body.appendChild(tiles);
}

function game() {	
	$('.number-swatch').each(function() {
		var rand = randomInt(-9,9);
		var th = $(this);
		th.text('');
		$('<span>', {class: "number-container", text: rand}).appendTo(th);
	});

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
		console.log(clone)
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