class ProdutoController {
  constructor() {
    let $ = document.querySelector.bind(document);

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto',
    );

    this._listaProdutos = new Bind(
      new ListaProdutos(),
      new ProdutosView($('#products')),
      'adiciona',
    )

    this.carregaProdutos()
  }

  carregaProdutos() {
    let service = new ProdutoService();
    
    service
      .obterProdutos()
      .then((produtos) => {
        produtos.forEach((produto) => {
          this._listaProdutos.adiciona(
            this._adicionaProduto(
              produto.imagem,
              produto.descricao,
              new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.valor),
            ),
          );
        });
      })
      .catch((erro) => (this._mensagem.texto = erro));
  }

  search(event) {
    let input = event.target.value
    const produtos = this._listaProdutos

    this._listaProdutos = new Bind(
      new ListaProdutos(),
      new ProdutosView(document.querySelector('#products')),
      'adiciona',
    )

    if(event.target.value === '') {
      return this.carregaProdutos();
    }

    this.filtraProdutos(produtos, input)
  }

  filtraProdutos(list, input) {
    list.produtos.forEach((produto) => {
      if (this._contains(produto.descricao, input)) {
        this._listaProdutos.adiciona(produto);
      }
    });
  }

  _upper(string) {
    return string.toUpperCase();
  }

  _contains(description, value) {
    return this._upper(description).includes(this._upper(value));
  }
 
  _adicionaProduto(imagem, descricao, valor) {
    return new Produto(imagem, descricao, valor);
  }
}