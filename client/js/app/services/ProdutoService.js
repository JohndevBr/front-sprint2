class ProdutoService {

  constructor() {
    this._http = new HttpService();
  }

  obterProdutos() {
    return this._http
      .get('produtos')
      .then((produto) => produto)
      .catch((erro) => {
        throw new Error(erro);
      }
      );
  }
}
