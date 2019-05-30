$(document).ready(function(){

  var template_source=$('#template-cards').html();
  var template_function=Handlebars.compile(template_source);

  var urlBase="https://api.themoviedb.org/3";
  var urlBaseImg="https://image.tmdb.org/t/p/";

  var bandiereDisponibili=["en","it","es","de","us","fr"];


  // FUNCTIONS BARRA DI RICERCA
  $('.ricerca').click(function(){
    $('.lista_NavbarRight').toggleClass('displaynone');
    $('#searchfilm').toggleClass('displaynone');
  });

  $('#searchfilm').blur(function(){
    $('#searchfilm').toggleClass('displaynone');
    $('.lista_NavbarRight').toggleClass('displaynone');
  });

  $('#searchfilm').keydown(function(event){
    if (event.which==13) {
      var filmSerieTVcercato=$('#searchfilm').val();
      cercaScheda(filmSerieTVcercato,urlBase);

      $('#searchfilm').val('');

      $('#searchfilm').keydown(function(){
        $('.container_cards').children().remove();
      });
    }
  });


  $(document).on('mouseenter','.card',function(){
    $(this).children('img').fadeTo("fast",0.1);

    $(this).mouseleave(function(){
      $(this).children('img').fadeTo("fast",1);
    });
  });




  // FUNCTION CERCAFILM & SERIETV
  function cercaScheda(ricercaUtente,url){
    $.ajax({
      url:urlBase+"/search/movie",
      method:"GET",
      data: {
        'api_key':"a9cdf17c8817e1396596ef700c4b1a43",
        'query': ricercaUtente,
        'language': "it"
      },
      success:function(data){
        var filmtrovati=data.results;
        console.log(filmtrovati);
        stampaScheda(filmtrovati);
      },
      error: function(){
        alert("Ops, qualcosa è andato storto");
      }
    });

    $.ajax({
      url:urlBase+"/search/tv",
      method:"GET",
      data: {
        'api_key':"a9cdf17c8817e1396596ef700c4b1a43",
        'query': ricercaUtente,
        'language': "it"
      },
      success:function(data){
        var serieTvtrovate=data.results;
        console.log(serieTvtrovate);
        var serietvConvertite=convertiChiavi(serieTvtrovate);
        stampaScheda(serietvConvertite);
      },
      error: function(){
        alert("Ops, qualcosa è andato storto");
      }
    });
  }

  //FUNCTION CONVERTI CHIAVI SERIETV
  function convertiChiavi(serietv){
    var serieconvertite=[];
    for (var i = 0; i < serietv.length; i++) {
      var nuovaSerie={
        'title': serietv[i].name,
        'original_title': serietv[i].original_name,
        'original_language': serietv[i].original_language,
        'vote_average':serietv[i].vote_average,
        'poster_path': serietv[i].poster_path,
        'overview': serietv[i].overview,
      }
      serieconvertite.push(nuovaSerie);
    }
    return serieconvertite;
  }


  // FUNCTION STAMPA SCHEDA FILM O SERIE TV
  function stampaScheda(elencofilm){

    for (var i = 0; i < elencofilm.length; i++) {
      var titoloFilm= elencofilm[i].title;
      var titoloOriginale= elencofilm[i].original_title;
      var linguaOriginale= elencofilm[i].original_language;
      var votoFilm= elencofilm[i].vote_average;
      var urlFinaleImg= elencofilm[i].poster_path;
      var introduzione=elencofilm[i].overview;
      if(introduzione=" "){
        introduzione="-"
      }

      var bandieraLingua=generaBandiera(linguaOriginale);
      var stelle=generaVoto(votoFilm);
      var html_stelle=creaStelleinHTML(stelle);
      var copertina=generaImmagine(urlBaseImg,urlFinaleImg);

      var placeholder = {
        'indirizzo': copertina,
        'titolo': titoloFilm,
        'titoloOrig': titoloOriginale,
        'lingua': bandieraLingua,
        'voto': html_stelle,
        'overview':introduzione
        }

      $('.container_cards').append(template_function(placeholder));
    }
  }

  // FUNCTION GENERA BANDIERA
  function generaBandiera(lingua){
    if (bandiereDisponibili.includes(lingua)) {
      return '<img src="img/'+ lingua +'.png">';
    }
    else{
      return lingua;
    }
  }

  // FUNCTION GENERA VOTO
  function generaVoto(voto){
    return votoAvg=Math.round(voto/2);
  }
  //FUNCTION GENERA STELLE IN HTML
  function creaStelleinHTML(numeroStelle){
    var icone_stelle="";
    for (var i = 0; i < 5; i++) {
      if (i<numeroStelle) {
        icone_stelle += '<i class="fas fa-star"></i>';
      }
      else {
        icone_stelle += '<i class="far fa-star"></i>';
      }
    }
    return icone_stelle;
  }

  // FUNCTION GENERA IMMAGINE
  function generaImmagine(urlB,urlF){
    var larghezzaImg1="w342";
    var indirizzoUrl="";
    if (urlF==null) {
      indirizzoUrl="img/ndisp.jpg";
    }
    else {
      indirizzoUrl=urlB+larghezzaImg1+urlF;
    }
    return indirizzoUrl;
  }

});


//  METODI USATI PRECEDENTEMENTE
//   function generaVoto(voto){
//     votoAvg = Math.round(voto/2);
//     var numeroStelle="";
//     console.log(votoAvg);
//
//     switch (votoAvg) {
//       case 0:
//         numeroStelle= "-";
//         break;
//       case 1:
//         numeroStelle="<i class=\"fas fa-star\"></i>";
//         break;
//       case 2:
//         numeroStelle="<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
//         break;
//       case 3:
//         numeroStelle="<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
//         break;
//       case 4:
//         numeroStelle="<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
//         break;
//       case 5:
//         numeroStelle="<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
//         break;
//     }
//     return numeroStelle;
//   }

// function generaBandiera(lingua){
//   var bandiera="";
//   switch (lingua) {
//     case "en":
//       bandiera="gb.png";
//       break;
//     case "de":
//       bandiera="de.png";
//       break;
//     case "es":
//       bandiera="es.png";
//       break;
//     case "it":
//       bandiera="it.png";
//       break;
//     case "us":
//       bandiera="us.png";
//       break;
//     case "fr":
//       bandiera="fr.png";
//       break;
//   }
//   return bandiera;
// }
