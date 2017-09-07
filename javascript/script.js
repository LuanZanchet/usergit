
document.getElementById("busca").onclick = function(){

   var usuario = document.getElementById("usuario").value; 
   const urlUsuario = 'https://api.github.com/users/' + usuario + '?client_id=7a4d1048b1d4fb84e7e5&client_secret=ebe990d5b51a2c6c251cf85f5f35aa36db6dcb3a';
   const urlRepositorio = 'https://api.github.com/users/'+usuario+'/repos' + '?client_id=7a4d1048b1d4fb84e7e5&client_secret=ebe990d5b51a2c6c251cf85f5f35aa36db6dcb3a';
    
   buscaUsuario(urlUsuario).then(function(usuario){
      console.log(usuario);  
      montarHtmlUsuario(usuario);
   });
    
    buscaRepositorios(urlRepositorio, estrelasDecrecente).then(function(repos){
        console.log(repos);
        montarHtmlRepositorio(repos);
   });
    

};

function montarHtmlUsuario(usuario) {
    
    document.getElementById("perfil").innerHTML = `
      <div class="col-xs-12 col-sm-10 col-sm-offset-1  col-md-8 col-md-offset-2"> 
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${usuario.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3 text-center">
                <img class=" avatar" src="${usuario.avatar_url}" height="150" width="150">
              </div>
              <div class="col-md-9 text-center">
              <span class="label label-default">Seguidores: ${usuario.followers}</span>
              <span class="label label-default">Seguindo: ${usuario.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item email">E-mail: ${usuario.email}</li>
                <li class="list-group-item">Bio: ${usuario.bio}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
}

function montarHtmlRepositorio(repos) {
     document.getElementById("repos").innerHTML = `
          <div class="col-xs-12 col-sm-10 col-sm-offset-1  col-md-8 col-md-offset-2"> 
            <h3 class="page-header">Repositórios</h3>
            <table id="tabela" class="table table-striped table-bordered table-responsive nowrap " cellspacing="0" width="100%">
               <thead>
                    <tr>
                        <th>Nome</th>
                        <th>estrelas</th>
                        <th>linguagem</th>
                        <th>link</th>
                    </tr>
                </thead>  
                <tbody>   
                </tbody>   
                </table>   
      `;
    var quantRepos = repos.length;
    var repositorios = repos.sort(estrelasDecrecente);
    for(i=0; i< quantRepos; i++){
        adicionarLinha(repositorios[i]);
    }
}

function estrelascrecente(a,b) {
  if (a.stargazers_count < b.stargazers_count)
     return -1;
  if (a.stargazers_count > b.stargazers_count)
    return 1;
  return 0;
}
 
function estrelasDecrecente(a,b) {
  if (a.stargazers_count > b.stargazers_count)
     return -1;
  if (a.stargazers_count < b.stargazers_count)
    return 1;
  return 0;
}

function adicionarLinha(repo){
  document.getElementById("tabela").innerHTML += "<tr class='linhas'> <td>"+repo.name+"</td><td>"+ repo.stargazers_count +"</td> <td>"+repo.language+"</td> <td><a href='"+repo.html_url+"'><i class='fa fa-external-link'></i></a> </td> </tr>";
}


function buscaUsuario(url) {
    return fetch(url, {
      method: 'get'
    })
    .then(function(response) { 
       return response.json().then(function(data){
            return data;
        });
    })
    .catch(function(err) { 
      return err;
    });
}

function buscaRepositorios(url) {
    return fetch(url, {
      method: 'get'
        
    })
    .then(function(response) { 
       return response.json().then(function(data){
            return data;
        });
    })
    .catch(function(err) { 
      return err;
    });
}

