$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBdVN9DkdgZOtlpnymlClTD8sC7I5WIHPI",
    authDomain: "retromovies-abd06.firebaseapp.com",
    databaseURL: "https://retromovies-abd06.firebaseio.com",
    projectId: "retromovies-abd06",
    storageBucket: "retromovies-abd06.appspot.com",
    messagingSenderId: "431147430642"
  };
    firebase.initializeApp(config);

  var imgPost = null;
  var userConnect = null;

  renderTopMovies();

  $("#link-top-movies").click(function() {
    var offset = -10; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#top-movies").offset().top + offset
    }, 1500);
  });

  $("#link-episode").click(function() {
    var offset = -10; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#episode").offset().top + offset
    }, 1500);
  });


  // FIREBASE
  $('#submit_register').click(function () {
    var email = $('#email').val();
    var password = $('#password').val();
    if (password.length >= 6) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function () {
          verify();
      })
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    $('#modalRegister').html('<div class="modal-dialog"><!-- Modal content--><div class="modal-content register-form"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title"><h5 class="text-uppercase bold text-center">Registro Completado</h5></div><div class="content"><div class="modal-body"><!-- Mensaje Registro Exitoso --><h4>Su registro se ha realizado con éxito. Recibirá un correo de verificación.</h4><button type="button" data-dismiss="modal" class="btn btn-primary btn-send text-uppercase">Cerrar</button></form></div></div></div></div>');
    }
    else {
      alert('Email: Ingrese un correo válido. \nContraseña: debe tener al menos 6 caracteres.');
    }
  });

  $('#submit_login').click( function () {
    var emailLogin = $('#email_login').val();
    var passwordLogin = $('#pwd_login').val();
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if(user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(user);

      if (emailVerified) {
        showContentUsers();
      }

      function showContentUsers() {
        // Cambio Menu Principal
        $('#menu-user').html('<li class=""><a href="#" class="search"><span class="icon-search"></span> Buscar</a></li><li id="show-profile"><a href="#"><span class="icon-user"></span> Cuenta</a></li><li><button type="button" class="btn btn-link navbar-btn" id="close_session">Cerrar Sesión</button></li>');
        search();
        // Para ver perfil de usuario
        $('#show-profile').click(function () {
         $('#global-content').html('<!-- inicio user --><div class="container-fluid userbackimg"><div class="userprofile"></div><img align="left" class="userimage-profile profu thumbnail" src="assets/img/yoda.jpg" alt="Profile image example" style="border-radius:50%;/><div class="fb-profile-text"><div><br><h1>Gizmo</h1><p class="phrase">Old´s cool</p><div class="useraboutcont col-sm-offset-4 col-sm-6 col-md-offset-3 col-md-6 col-lg-offset-1 col-lg-6"><p class="aboutuser">Estudiante de enfermería, fan de las películas y series de los 80.</p></div></div></div></div><!-- images --><h1 id="fav-movies">Películas Favoritas</h1><div class="container imgconta"><div class="movie-card"><div class="movie-header star"><div class="header-icon-container"></div></div><!--movie-header--><div class="movie-content"><div class="movie-content-header"><a href="#"><h3 class="movie-title">Star Wars, episodio VI</h3></a><span class="heart icon-heart"></span></div><div class="movie-info"><div class="info-section"><label>Año</label><span>1983</span></div><!--year--><div class="info-section"><label>Género</label><span>Ciencia fición</span></div><!--genre--><div class="info-section"><label>Duración</label><span>133 min</span></div><!--last--></div></div><!--movie-content--></div><!--movie-card--><div class="movie-card"><div class="movie-header gremlins"><div class="header-icon-container"></div></div><!--movie-header--><div class="movie-content"><div class="movie-content-header"><a href="#"><h3 class="movie-title">Gremlins</h3></a><span class="heart icon-heart"></span></div><div class="movie-info"><div class="info-section"><label>Año</label><span>1984</span></div><!--year--><div class="info-section"><label>Género</label><span>Terror, fantasía, comedia</span></div><!--genre--><div class="info-section"><label>Duración</label><span>106 min</span></div><!--last--></div></div><!--movie-content--></div><!--movie-card--><div class="movie-card"><div class="movie-header nevere"><div class="header-icon-container"></div></div><!--movie-header--><div class="movie-content"><div class="movie-content-header"><a href="#"><h3 class="movie-title">La historia sin fin</h3></a><span class="heart icon-heart"></span></div><div class="movie-info"><div class="info-section"><label>Año</label><span>1984</span></div><!--year--><div class="info-section"><label>Género</label><span>Aventuras</span></div><!--genre--><div class="info-section"><label>Duración</label><span>102 min</span></div><!--last--></div></div><!--movie-content--></div><!--movie-card--><div class="movie-card"><div class="movie-header backf"><div class="header-icon-container"></div></div><!--movie-header--><div class="movie-content"><div class="movie-content-header"><a href="#"><h3 class="movie-title">Volver al futuro</h3></a><span class="heart icon-heart"></span></div><div class="movie-info"><div class="info-section"><label>Año</label><span>1985</span></div><!--year--><div class="info-section"><label>Género</label><span>Ciencia ficción, aventuras, comedia</span></div><!--genre--><div class="info-section"><label>Duración</label><span>116 min</span></div><!--last--></div></div><!--movie-content--></div><!--movie-card--><div class="movie-card"><div class="movie-header goonies"><div class="header-icon-container"></div></div><!--movie-header--><div class="movie-content"><div class="movie-content-header"><a href="#"><h3 class="movie-title">Los Goonies</h3></a><span class="heart icon-heart"></span></div><div class="movie-info"><div class="info-section"><label>Año</label><span>1985</span></div><!--year--><div class="info-section"><label>Género</label><span>Aventuras, comedia</span></div><!--genre--><div class="info-section"><label>Duración</label><span>114 min</span></div><!--last--></div></div><!--movie-content--></div><!--movie-card--><div class="movie-card"><div class="movie-header little"><div class="header-icon-container"></div></div><!--movie-header--><div class="movie-content"><div class="movie-content-header"><a href="#"><h3 class="movie-title">La tiendita del horror</h3></a><span class="heart icon-heart"></span></div><div class="movie-info"><div class="info-section"><label>Año</label><span>1986</span></div><!--year--><div class="info-section"><label>Género</label><span>Musical, Comedia, Terror</span></div><!--genre--><div class="info-section"><label>Duración</label><span>94 min</span></div><!--last--></div></div><!--movie-content--></div><!--movie-card--></div><!--container--><!-- end images --><!-- fin user -->');
        });
      }

      $('#close_session').click( function () {
        window.location.href="index.html"
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          location.reload();
          }).catch(function(error) {
          // An error happened.
        });
      });
    }
  });

  function verify() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
      console.log(error);
      });
  }

$('#forgetpwd').click(function () {
    var auth = firebase.auth();
    var emailAddress = prompt('Ingresa tu correo');
    auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    }).catch(function(error) {
  // An error happened.
   });
  });
  // Funcion Carousel de Fotos
  
  $(function() {
        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var width = jcarousel.innerWidth();

                if (width >= 900) {
                    width = width / 4;
                } else if (width >= 600) {
                    width = width / 3;
                } else if (width >= 400) {
                    width = width / 2;
                }

                jcarousel.jcarousel('items').css('width', width + 'px');
            })
            .jcarousel({
                wrap: 'circular'
            });

        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                perPage: 1,
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });
    });
  // Fin Carousel
});
/*funcion buscador*/
search();
function search() {
  $('.search').click(function(){
  $('.bootsnipp-search').html(`<div class="container"><form><div class="input-group"><input type="text" class="form-control" name="q" placeholder="Ingresa nombre de película aquí..."><span class="input-group-btn"><button class="btn btn-danger" type="reset"><span class="icon-cross"></span></button></span></div></form></div>`);
  cerrarSearch();

  $('.form-control').keyup(function(){
    var movie = $('.form-control').val();
    if(movie.length > 0){
      $('.input-group-btn').html(`<button class="btn btn-info" type="reset"><span class="icon-arrow-right"></span></button>`);
    } else {
      $('.input-group-btn').html(`<button class="btn btn-danger" type="reset"><span class="icon-cross"></span></button>`);
    }
    cerrarSearch();
    $('.btn-info').click(function(){
      searchMovie();
      $('.input-group-btn').html(`<button class="btn btn-danger" type="reset"><span class="icon-cross"></span></button>`)
      $('.form-control').val('');
      cerrarSearch();
    });
  });
});
}


/*
* Función que se encarga de capturar el texto de busqueda
* para luego realizar la consulta con ese parametro
*/
function searchMovie () {
  var title = $('.form-control').val();
  var convertTitle = title.split(' ').join('+');
  var url = "https://www.omdbapi.com/?apikey=3a181f1c&s="+convertTitle;
  console.log(url);
  $.ajax({
    url: url,
    success: renderMovies,
    error: renderError
  });
}
/*
* Función que imprime el resultado de la
* consulta en index.html
*/
function renderMovies (response) {
  console.log(response);
  var movies = response.Search; // Retorna los array del resultado
  $('.second').empty();
  $('.modal-search-results').empty();
  $('.second').html('<div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="results"><h1>Resultados</h1><div class="row search-results"></div></div></div>');
  var j = 0;
  for(var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    if (movie.Poster == 'N/A') {
      movie.Poster = 'http://www.estanflux.es/media/k2/items/cache/0168423241a0678521ccf427016e00be_XL.jpg';
    }
    $('.second').append('<div class="col-xs-12 col-md-6"><div class="row"><div class="col-xs-4 col-md-3"><img src="'+movie.Poster+'" title="'+movie.Title+'" class="img-thumbnail"></div><div class="col-xs-8 col-md-9"><ul class="text-left"><li>Titulo: '+movie.Title+'</li><li>Año: '+movie.Year+'</li><li>Formato: '+movie.Type+'</li></ul><button type="button" class="btn btn-info btn-md text-uppercase pull-right" data-toggle="modal" data-target="#modalInfo'+i+'">Ver Detalles</button></div></div></div>');
      var title = movie.Title;
      var convertTitle = title.split(' ').join('+');
    $.ajax({
      url: "https://www.omdbapi.com/?apikey=3a181f1c&t="+convertTitle,
      async: false,
      success: modalDetailsByTitle
    });
    function modalDetailsByTitle (result) {
      console.log(result);
      var movieDetails = result;
      if (movieDetails.Poster == 'N/A') {
        movie.Poster = 'http://www.estanflux.es/media/k2/items/cache/0168423241a0678521ccf427016e00be_XL.jpg';
      }
      $('.modal-search-results').append('<!-- Modal --><div id="modalInfo'+ j++ +'" class="modal fade" role="dialog"><div class="modal-dialog modal-lg"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">'+movieDetails.Title+'</h4></div><div class="modal-body"><div class="container-fluid"><div class="row"><div class="col-xs-12 col-sm-12 col-md-4 col-lg-4"><div><img src="'+movieDetails.Poster+'" class="img-responsive"></div></div><div class="col-xs-12 col-sm-12 col-md-8 col-lg-8"><p>Director: '+movieDetails.Director+'</p><p>Género: '+movieDetails.Genre+'</p><p>Reparto: '+movieDetails.Actors+'</p><p>Trama: '+movieDetails.Plot+'</p><div class="row"><div class="col-xs-6 col-md-6"><p>Duración: '+movieDetails.Runtime+'</p></div><div class="col-xs-6 col-md-6"><p>País: '+movieDetails.Country+'</p></div></div></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>'); 
    }
  }
}

function renderError (error) {
  console.error(error);
}


function cerrarSearch(){
  $('.btn-danger').click(function(){
    $('.bootsnipp-search').empty();
  });
};
/* fin buscador */

/* boton ir arriba */
$(document).ready(function(){
  $('.ir-arriba').click(function(){
    $('body, html').animate({
      scrollTop: '0px'
    }, 300);
  });

  $(window).scroll(function(){
    if( $(this).scrollTop() > 0 ){
      $('.ir-arriba').slideDown(300);
    } else {
      $('.ir-arriba').slideUp(300);
    }
  });
});
/* fin boton ir arriba */

// Funcion para imprimir peliculas destacadas
function renderTopMovies () {
  var topMovies = ['The Godfather', 'The Godfather: Part II', '12 Angry Men', 'The Good, the Bad and the Ugly', 'Star Wars: Episode V - The Empire Strikes Back', "One Flew Over the Cuckoo's Nest", 'Seven Samurai', 'Star Wars: Episode IV - A New Hope', "It's a Wonderful Life", 'Psycho' ];

  for (var k = 0; k < topMovies.length; k++) {
    var movieTitle = topMovies[k];
    var convertTitle = movieTitle.split(' ').join('+');
    var url = "https://www.omdbapi.com/?apikey=3a181f1c&t="+convertTitle;
    console.log(url);
    $.ajax ({
      url: url,
      success: renderMoviesCarousel
    });
    function renderMoviesCarousel (movieResult) {
      $('.jcarousel').find('ul').append('<li><img src="'+movieResult.Poster+'" title="'+movieResult.Title+'"></li>');
    }
  }

} 


$('.logotipo').click(function () {
  window.location.href="index.html"
});

$('.logoMovil').click(function () {
  window.location.href="index.html"
});
$('.retro').click(function() {
  window.location.href="index.html"
});