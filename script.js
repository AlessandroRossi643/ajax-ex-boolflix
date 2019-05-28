$(document).ready(function(){

  var template_source=$('#template-cards').html();
  var template_function=Handlebars.compile(template_source);

  var urlBase="https://api.themoviedb.org/3";


  $('#searchfilm').keydown(function(event){
    if (event.which==13) {
      var filmcercato=$('#searchfilm').val();
      cercaFilm(filmcercato,urlBase);
      $('#searchfilm').val('');

      $('#searchfilm').keydown(function(){
        $('.container_cards').children().remove();
      });
    }
  });


  function cercaFilm(filmUtente,url){
    $.ajax({
      url:urlBase+"/search/movie",
      method:"GET",
      data: {
        'api_key':"a9cdf17c8817e1396596ef700c4b1a43",
        'query': filmUtente,
        'language': "it"
      },
      success:function(data){
        var filmtrovati=data.results;
        console.log(filmtrovati);

        for (var i = 0; i < filmtrovati.length; i++) {
          var titoloFilm= filmtrovati[i].title;
          var titoloOriginale= filmtrovati[i].original_title;
          var linguaOriginale= filmtrovati[i].original_language;
          var votoFilm= filmtrovati[i].vote_average;
          console.log(titoloFilm, titoloOriginale, linguaOriginale, votoFilm);

          var bandieraLingua=generaBandiera(linguaOriginale);

          var placeholder = {
            'titolo': titoloFilm,
            'titoloOrig': titoloOriginale,
            'lingua': bandieraLingua,
            'voto': votoFilm
          }

          $('.container_cards').append(template_function(placeholder));
        }
      },

      error: function(){
        alert("Ops, qualcosa è andato storto");
      }
    });
  }

  function generaBandiera(lingua){
    var bandiera="";
    switch (lingua) {
      case "en":
        bandiera="gb.png";
        break;
      case "de":
        bandiera="de.png";
        break;
      case "es":
        bandiera="es.png";
        break;
      case "it":
        bandiera="it.png";
        break;
      case "us":
        bandiera="us.png";
        break;
      case "fr":
        bandiera="fr.png";
        break;
      default:
        bandiera="";
        break;
    }

    return bandiera;
  }
});
