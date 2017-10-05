function randomInt(min, max) {
  let rand = Math.floor(Math.random() * (max - min + 1) + min);

  return rand;
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.attr(key, attrs[key]);
  }
}

function Tile(number, row, col) {
  this.div = $('<div/>', {class: 'col-xs-2 number-swatch bg-primary'});
  let span = $('<span>', {class: "number-container", text: number});

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
  this._busy = false;

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
    this.activateRow(activeRow, () => {
      console.log('done')
    });
  }

  this.activateRow = (row) => {
    $('.number-swatch').removeClass('bg-blue bg-pink mine theirs');
    $('.number-swatch[data-row="' + row + '"]').each((idx, elm) => {
      setTimeout(() => {
        $(elm).addClass('bg-blue mine');
      }, idx * 110)
    });
  };

  this.activatecol = (col) => {
    $('.number-swatch').removeClass('bg-blue bg-pink mine theirs');
    $('.number-swatch[data-col="' + col + '"]').each((idx, elm) => {
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


const game = new Game();

game.run();

$(document).on('click', '.refresh-btn', (e) => {
  e.preventDefault();

  game.reset();
});

$(document).on('click', '.number-swatch.mine', function (elm) {
  let $this = $(this);
  let clone = $this.clone();
  let offset = $this.position();
  let col = $this.data('col');
  let points = $this.data('context');

  $this.addClass('hidden-number');

  game.updateScore('me', points);

  clone
     .css({
       'position': 'absolute',
       'top': offset.top,
       'left': offset.left
     })
     .addClass('cloned').appendTo($this.parent())
     .animate({'top': -100, 'opacity': 0})
     .fadeOut(function () {
       clone.remove();

       game.activatecol(col);

       setTimeout(() => {
         _botPlayer(col);
       }, 1000)
     });
});

/**
 * BOT player
 * */
function _botPlayer(col) {
  let arr = [];
  let grid = $('.number-swatch')
     .not('.hidden-number').get()
     .forEach((elm) => {
       let row = $(elm).data('row');

       if (!arr[row]) {
         arr[row] = [];
       }

       arr[row].push({
         nr: $(elm).data('context'),
         element: elm
       })

     });

  let c = {};
  let min = arr.map((row, idx) => {
    let minVal = Math.min.apply(Math, row.map(function(o){return o.nr;}));
    let count = 0;

    return row.filter(item => {
      let elmCol = $(item.element).data('col');

      if (item.nr < 0) {
        count++;
      }

      c[idx] = count;

      return elmCol === col && item.nr > minVal;
    });
  }).filter(item => {
    return item.length > 0;
  })[0];

  // let minn =

  console.log(c)
  return;

  let selectedTile = $(min[0].element);
     // $('.number-swatch[data-col=' + col + ']')
     // .not('.hidden-number').get()
     // .map((elm) => {
     //   return {
     //     nr: $(elm).data('context'),
     //     element: elm
     //   };
     // })
     // .reduce((prev, current) => {
     //   return (prev.nr > current.nr) ? $(prev.element) : $(current.element);
     // });

  let clone = selectedTile.clone();
  let offset = selectedTile.position();
  let row = selectedTile.data('row');
  let points = selectedTile.data('context');

  // console.log(selectedTile)
  // return;
  // debugger;
  selectedTile.addClass('hidden-number');

  game.updateScore('them', points);

  clone
     .css({
       'position': 'absolute',
       'top': offset.top,
       'left': offset.left
     })
     .addClass('cloned').appendTo(selectedTile.parent())
     .animate({'top': -100, 'opacity': 0})
     .fadeOut(function () {
       clone.remove();

       game.activateRow(row);
     });
}

function CalcBestMove() {

}





