class ProdutosView extends View {

  constructor(elemento) {
    super(elemento);
  }

  template(model) {
    return `
        <ol class="products__list">
          ${model.produtos
            .map(
              (produto) =>
                `
                  <li class="products__card">
                    <div class="card">
                      <img class="card__img" src="${produto.imagem}" alt="${produto.descricao}" />
                      <p class="card__description">
                        ${produto.descricao}
                      </p>
                      <p class="card__price">${produto.valor}</p>
                    </div>
                  </li>
                `
            )
            .join('')}
        </ol>
    `
  }

}
