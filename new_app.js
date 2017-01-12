/*Promises*/
var count = 1, url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=', tweetUrl='';
$.getJSON(url+count)
    .done(function(json, data){
        $('#text').text($(json[0]['content']).text().toUpperCase()).textillate('in');
        $('#title').text(json[0]['title']).textillate('start');
        tweetUrl = 'https://twitter.com/intent/tweet?text='+$(json[0]['content']).text()+'%20'+json[0]['title'];
        if(tweetUrl.length > 140){
            
        }
        $('#tweet').attr('href', tweetUrl);
    })
    .fail(function(){
        console.log('ERROR');
    });

$('#new_click').on('click',function(e){
    $('#text').textillate('out');
    $('#title').textillate('out');
    e.preventDefault();
    count++;
    $('#text').on('outAnimationEnd.tlt', function(){
        $.getJSON(url+count)
            .done(function(json){
                $('#text').removeData();
                $('#title').removeData();
                $('#text').text($(json[0]['content']).text().toUpperCase()).textillate('in');
                $('#title').text(json[0]['title']).textillate('in');
            })
            .fail(function(){
                console.log('ERROR');
            });

    });
});