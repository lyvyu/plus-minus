function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
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