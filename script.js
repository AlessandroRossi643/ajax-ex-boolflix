$(document).ready(function(){

  var template_source=$('#template-cards').html();
  var template_function=Handlebars.compile(template_source);

  var urlBase="https://api.themoviedb.org/3";

  $('#searchfilm').keydown(function(event){
    if (event.which==13) {
      var filmSerieTVcercato=$('#searchfilm').val();
      cercaFilm(filmSerieTVcercato,urlBase);

      $('#searchfilm').val('');

      $('#searchfilm').keydown(function(){
        $('.container_cards').children().remove();
      });
    }
  });

  function cercaFilm(ricercaUtente,url){
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
        stampaFilm(filmtrovati);
      },
      error: function(){
        alert("Ops, qualcosa è andato storto");
      }
    });
  }
  
  function stampaFilm(elencofilm){
    for (var i = 0; i < elencofilm.length; i++) {
      var titoloFilm= elencofilm[i].title;
      var titoloOriginale= elencofilm[i].original_title;
      var linguaOriginale= elencofilm[i].original_language;
      var votoFilm= elencofilm[i].vote_average;
      console.log(titoloFilm, titoloOriginale, linguaOriginale, votoFilm);

      var bandieraLingua=generaBandiera(linguaOriginale);
      var stelle=generaVoto(votoFilm);

      var placeholder = {
        'titolo': titoloFilm,
        'titoloOrig': titoloOriginale,
        'lingua': bandieraLingua,
        'voto': stelle
        }

      $('.container_cards').append(template_function(placeholder));

    }
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
        bandiera="ndisp";
        break;
    }
    return bandiera;
  }


  function generaVoto(voto){
    votoAvg = Math.round(voto/2);
    var numeroStelle="";
    console.log(votoAvg);

    switch (votoAvg) {
      case 0:
        numeroStelle= "-";
        break;
      case 1:
        numeroStelle="<i class=\"fas fa-star\"></i>";
        break;
      case 2:
        numeroStelle="<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
        break;
      case 3:
        numeroStelle="<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
        break;
      case 4:
        numeroStelle="<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
        break;
      case 5:
        numeroStelle="<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
        break;
    }
    return numeroStelle;
  }
});
