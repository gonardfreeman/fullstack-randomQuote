function Letter(table, letter, duration) {
    this.table = table;
    this.letter = letter;
    this.current = 0;
    this.delay = duration / tbl.indexOf(letter);   // ms
    this.time = Date.now();
    this.done = false;
}
Letter.prototype.update = function() {
    if (this.done) return;
    var time = Date.now();
    if (time - this.time >= this.delay) {
        this.time = time;
        if (this.letter === this.table[this.current] ||
            this.current === this.table.length) {
            this.done = true;
        }
        else {
            this.current++;
        }
    }
};
var tbl = " ABCDEFGHIJKLMNOPQRSTUVWXYZ.,!?;:‘’()/”“[]-…0123456789%$#&—–″";
var letters = [];

$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=1", function(data){
    $('#title').append(data[0]['title']);
    flyLetters($(data[0]['content']).text());
    console.log($(data[0]['content']).text());
});
var globalID;
function flyLetters(data){
    data.toUpperCase().split("").forEach(function(l) {
        letters.push(new Letter(tbl, l, 2500))
    });

    function test(){
        function loop() {
            var txt = '', isDone = true;
            letters.forEach(function(l) {
                l.update();
                if (!l.done) {
                    isDone = false;
                }
                txt += l.table[l.current];
            });
            // output txt
            text.innerText = txt;
            if (!isDone) globalID = requestAnimationFrame(loop);
            else { /* done */ }
        };
        loop();
    }
    test();
    $('#title').fadeIn(2500);
}

var count = 2;
$('#new_click').on('click',function(e){
    e.preventDefault();
    count ++;
    var url = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback="+count
    $.ajax({
        url: url,
        success: function(data){
            $('#title').append(data[0]['title']);
            flyLetters($(data[0]['content']).text());
            console.log($(data[0]['content']).text());
        }
    });
});
