
function searchMovie(){
    
    $('#movie-list').html('');
    
    // $.getJSON('http://www.omdbapi.com/?apikey=ca892c66')
    $.ajax({
        //api URL
        url : 'https://www.omdbapi.com',
        //method
        type: 'get',
        //return data type
        dataType : 'json',
        //parameter
        data : {
            'apikey' : 'ca892c66',
            //data from search field (screen)
            's' : $('#search-input').val()
        },
        //if success
        success : function (result){
            //found data
            if(result.Response == "True"){
                //set data object in array
                let movies = result.Search;
                //looping data
                $.each(movies, function(i,data){
                    $('#movie-list').append(`
                    <div class="col-md-4">
                        <div class="card mb-3" >
                            <img class="card-img-top" src="`+ data.Poster + `">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title +`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="` + data.imdbID + `">See Detail</a>
                                </div>
                        </div> 
                        </div>
                    `);
                });
                
                $('#search-input').val('');
            //not found
            }else{
                $('#movie-list').html(`
                <div class="col">
                <h1 class="text-center">` + result.Error + `</h1>
                </div>
                `)
            }
        }
    });
}
$('#search-button').on('click', function(){
    searchMovie();
});

$('#search-input').on('keyup', function(e){
    if(e.which === 13){
        searchMovie();
    }
});
// jquery find element movie-list, when click inside element that class is see-detail either 
// in beginning or ending or anytime, proceed with function 
//event binding/delegations
$('#movie-list').on('click','.see-detail', function(){
    $.ajax({
        //api URL
        url : 'https://www.omdbapi.com',
        //method
        type: 'get',
        //return data type
        dataType : 'json',
        //parameter
        data : {
            'apikey' : 'ca892c66',
            //data from id
            'i' : $(this).data('id')
        },
        success : function (movie){
            if(movie.Response === "True"){
                $('.modal-body').html(`
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-4">
                                    <img src="`+ movie.Poster +`" class="img-fluid">
                                </div>
                                
                                <div class="col-md-8">
                                    <ul class="list-group">
                                        <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                                        <li class="list-group-item">`+ movie.Released +`</li>
                                        <li class="list-group-item">Genre : `+ movie.Genre +`</li>
                                        <li class="list-group-item">Director : `+ movie.Director +`</li>
                                        <li class="list-group-item">Actor : `+ movie.Actors +`</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                `);
            }
        }
    });
});