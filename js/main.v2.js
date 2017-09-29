function randomInt(min, max)
{	
    let rand = Math.floor(Math.random() * (max - min + 1) + min);

	return rand;
}

function setAttributes(el, attrs) {
	for(var key in attrs) {
		el.attr(key, attrs[key]);
	}
}

function Tile(number, row, col) {
	this.div = $('<div/>', { class: 'col-xs-2 number-swatch bg-primary' });
	let span = $('<span>', { class: "number-container", text: number });

	this.div.attr({
		'data-id': 'id_' + row + col,
		'data-row': row,
		'data-col': col,
		'data-context': number
	});

	span.appendTo(this.div);

	return this.div;
}

function Game() {
	this.playingArea = $('#playing-area');
	this.score = {
		me: $('.score.me > span'),
		them: $('.score.them > span')
	};

	this.render = () => {
		this.playingArea.html('');
		this.score['me'].text(0);
		this.score['them'].text(0);

		for (let i = 1; i <= 5; i++) {
			for (let j = 1; j <= 5; j++) {
				let randNr = randomInt(-9, 9);

				this.playingArea.append(new Tile(randNr, i, j));
			}
		}

		let activeRow = randomInt(1, 5);
		this.activateRow(activeRow);
	}

	this.activateRow = (row) => {
		$('.number-swatch').removeClass('bg-blue bg-pink mine theirs');
		$('.number-swatch[data-row="'+ row +'"]').each((idx, elm) => {
			setTimeout(() => {
				$(elm).addClass('bg-blue mine');
			}, idx * 110)
		});
	}

	this.activatecol = (col) => {
		$('.number-swatch').removeClass('bg-blue bg-pink mine theirs');
		$('.number-swatch[data-col="'+ col +'"]').each((idx, elm) => {
			setTimeout(() => {
				$(elm).addClass('bg-pink theirs');
			}, idx * 110)
		});
	}

	this.updateScore = (which, score) => {
		let current = this.score[which].text();
		this.score[which].text(+current + score);
	}

	this.run = () => {
		this.render();
	}

	this.reset = () => {
		this.run();
	}
}


let game = new Game();

game.run();

$(document).on('click', '.refresh-btn', (e) => {	
	e.preventDefault();

	game.reset();
});

$(document).on('click', '.number-swatch.mine', function (elm) {
	let $this = $(this);
	let clone = $this.clone();
	let parent = $this.parent();
	let offset = { top: $this.context.offsetTop, left: $this.context.offsetLeft  };
	let col = $this.data('col');
	let points = $this.data('context');

	$this.addClass('hidden-number');

	game.updateScore('me', points);

	clone
	.css({
			'position':'absolute',
			'top': offset.top,
			'left': offset.left - 10
		})
	.addClass('cloned').appendTo(parent)	
	.animate({'top': -100, 'opacity': 0})	
	.fadeOut(function () {
		clone.remove();

		setTimeout(() => {
			game.activatecol(col);
		}, 200)

		botPlayer(col);
	});	
});

function botPlayer(col) {
	let selectedTile = $(document).find('.theirs')
	console.log(selectedTile)
}





