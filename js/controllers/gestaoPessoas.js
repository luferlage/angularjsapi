angular.module("gestaoPessoas").controller('gestaoPessoasCtrl', function($scope, $filter, $http)
{
	$scope.app = "Gestão de Pessoas";

	var carregarPessoas = function (){
        $http.get('http://localhost:8080/api/pessoas')
        .then(function sucesso(response){
            //window.alert("Carregou com sucesso!");
            $scope.pessoas = response.data;
        }, function falha(response){
            window.alert("Falha ao carregar dados");
            console.log("Erro ao carregar dados :" + response.data);
        })
    };
	//Evitar ao maximo ler $scope dentro do controller
	$scope.adicionarPessoa = function(pessoa){
        $http.post('http://localhost:8080/api/pessoas', pessoa)
        .then(function sucesso(response){
            //window.alert("Pessoa cadastrada com sucesso");
            delete $scope.pessoa;
            $scope.pessoaForm.$setPristine();
            carregarPessoas();
        }, function falha(response){
            window.alert("Falha ao cadastrar pessoa");
            console.log("Erro ao cadastrar pessoa :" + response.data);
        })
    }
    
	$scope.apagarPessoas = function(pessoas)
	{
		//Reatribuir em pessoas as pessoas não selecionadas
		$scope.pessoas = pessoas.filter(function(pessoa)
		{
			//if(!pessoa.selecionado) return pessoa;
			if(!pessoa.selecionado)
			{
				return pessoa;
			}
			else
			{
				//if(window.confirm("Tem certeza que deseja remover esta pessoa?"))
				//{
		            $http.delete('http://localhost:8080/api/pessoas/' + pessoa.idPessoa)
		            .then(function sucesso(response){
		                //window.alert("Pessoa removida com sucesso");
		            }, function falha(response){
		                window.alert("Falha ao remover pessoa");
		                console.log("Erro ao remover pessoa :" + response.data);
		            })
		        //}
			}	
		});
	};
	$scope.isPessoaSelecionado = function (pessoas)
	{
		return pessoas.some(function(pessoa)
		{
			return pessoa.selecionado;
		});
	};
	$scope.ordernarPor = function (campo)
	{
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};

	carregarPessoas();
});