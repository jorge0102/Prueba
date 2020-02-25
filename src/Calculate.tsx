import React from 'react';

import { books, commonGoods, foods, medicines } from './utils';
import { IState } from './interfaces/IState';
import {IProps} from './interfaces/IProps';

class Calculate extends React.PureComponent<IProps, IState>{
    constructor(props: IProps) {
        super(props)

        this.state = {
            articles: "",
            articles1: "",
            articles2: "",
            articles3: "",
            unidades: "",
            unidades1: "",
            unidades2: "",
            unidades3: "",
            precio: 0,
            precio1: 0,
            precio2: 0,
            precio3: 0,
            cesta: {},
            cesta1: {},
            cesta2: {},
            cesta3: {},
            impuesto: 0,
            total: 0
        }
        this.buy = this.buy.bind(this);
        this.impuestoBasico = this.impuestoBasico.bind(this);
        this.cesta = this.cesta.bind(this);
        this.cesta1 = this.cesta1.bind(this);
        this.cesta2 = this.cesta2.bind(this);
        this.cesta3 = this.cesta3.bind(this);
    }

    buy() {
        const { cesta, cesta1, cesta2, cesta3 } = this.state;
        let porcentaje = [];
        let acumulador = [];

        //Cesta no llama a la funcion impuestoBasico por en el input ya hemos controlado de que solo sean productos sin esa tasa, solo comprobara si es de exportacion
        cesta.import === true ? (porcentaje.push(this.impuestoImportacion(cesta.price.toFixed(2))) && acumulador.push(cesta.price.toFixed(2))) : acumulador.push(cesta.price.toFixed(2));
        cesta2.import === true ? (porcentaje.push(this.impuestoImportacion(cesta2.price.toFixed(2))) && acumulador.push(cesta2.price.toFixed(2))) : acumulador.push(cesta2.price.toFixed(2));
        cesta3.import === true ? (porcentaje.push(this.impuestoImportacion(cesta3.price.toFixed(2))) && acumulador.push(cesta3.price.toFixed(2))) : acumulador.push(cesta3.price.toFixed(2));

        //Cesta1 si necestita de las 2 funciones
        if (cesta1.import === true) {
            porcentaje.push(this.impuestoBasico(cesta1.price.toFixed(2)), this.impuestoImportacion(cesta1.price.toFixed(2)));
            acumulador.push(cesta1.price.toFixed(2));
        }
        else if (cesta1.import === false) {
            porcentaje.push(this.impuestoBasico(cesta1.price.toFixed(2)));
            acumulador.push(cesta1.price.toFixed(2));
        }

        let cont = 0;
        for (let i = 0; i < acumulador.length; i++) {
            cont += parseInt(acumulador[i]);
        }

        let cont2 = 0;
        for (let i = 0; i < porcentaje.length; i++) {
            cont2 += porcentaje[i];
        }

        let totalFinal = cont + cont2;

        this.setState({ impuesto: cont2, total: totalFinal });
    }

    cesta(event: any) {
        const articulo = event?.target.value;
        let { cesta, unidades } = this.state;
        let price = 0;

        //Realizo una busqueda para buscar el precio y obtener todos los datos del producto
        for (let i = 0; i < books.length; i++) {
            if (articulo === books[i].book && unidades > "0") {
                price = books[i].price * parseInt(unidades);
                cesta = books[i];
            }
        }
        this.setState({ articles: articulo, precio: price, cesta: cesta });
    }

    cesta1(event: any) {
        const articulo = event?.target.value;
        let { cesta1, unidades1 } = this.state;
        let price = 0;

        //Realizo una busqueda para buscar el precio y obtener todos los datos del producto
        for (let i = 0; i < commonGoods.length; i++) {
            if (articulo === commonGoods[i].commonGoods && unidades1 > "0") {
                price = commonGoods[i].price * parseInt(unidades1);
                cesta1 = commonGoods[i];
            }
        }
        this.setState({ articles1: articulo, precio1: price, cesta1: cesta1 });
    }

    cesta2(event: any) {
        const articulo = event?.target.value;
        let { cesta2, unidades2 } = this.state;
        let price = 0;

        //Realizo una busqueda para buscar el precio y obtener todos los datos del producto
        for (let i = 0; i < foods.length; i++) {
            if (articulo === foods[i].food && unidades2 > "0") {
                price = foods[i].price * parseInt(unidades2);
                cesta2 = foods[i];
            }
        }
        this.setState({ articles2: articulo, precio2: price, cesta2: cesta2 });
    }


    cesta3(event: any) {
        const articulo = event?.target.value;
        let { cesta3, unidades3 } = this.state;
        let price = 0;

        //Realizo una busqueda para buscar el precio y obtener todos los datos del producto
        for (let i = 0; i < medicines.length; i++) {

            if (articulo === medicines[i].medicine && unidades3 > "0") {
                price = medicines[i].price * parseInt(unidades3);
                cesta3 = medicines[i];
            }
        }
        this.setState({ articles3: articulo, precio3: price, cesta3: cesta3 });
    }

    // Los impuestos lo realizo en funciones diferentes para poder utilizarlas si me hicieran falta otra vez
    impuestoBasico(price: number) {
        let valor = 10 * price / 100;

        return valor;
    }

    impuestoImportacion(price: number) {
        let valor = 5 * price / 100;

        return valor;
    }

    render() {

        const { articles, articles1, articles2, articles3, unidades, unidades1, unidades2, unidades3, precio, precio1, precio2, precio3, impuesto, total } = this.state;

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h2>Cesta</h2>
                            <h5>Articulos:</h5>
                            Libros
                  <input placeholder="introduzca la catidad de productos" min="0" max="100" className="form-control" type="number" value={unidades}
                                onChange={({ target: { value } }) => this.setState({ unidades: value })} />

                            <select value={articles}
                                onChange={this.cesta} >
                                {books.map(book => <option value={book.book}>{book.book}</option>)}
                            </select>
                            <p><strong>Precio: {precio.toFixed(2)}</strong></p>
                            <br />
                            <br />
                            Bienes Comunes
                  <input placeholder="introduzca la catidad de productos" min="0" max="100" className="form-control" type="number" value={unidades1}
                                onChange={({ target: { value } }) => { this.setState({ unidades1: value }) }} />

                            <select value={articles1}
                                onChange={this.cesta1} >
                                {commonGoods.map(commonGoods => <option value={commonGoods.commonGoods}>{commonGoods.commonGoods}</option>)}
                            </select>
                            <p><strong>Precio: {precio1.toFixed(2)}</strong></p>
                            <br />
                            <br />
                            Comida
                  <input placeholder="introduzca la catidad de productos" min="0" max="100" className="form-control" type="number" value={unidades2}
                                onChange={({ target: { value } }) => this.setState({ unidades2: value })} />

                            <select value={articles2}
                                onChange={this.cesta2} >
                                {foods.map(foods => <option value={foods.food}>{foods.food}</option>)}
                            </select>
                            <p><strong>Precio: {precio2.toFixed(2)}</strong></p>
                            <br />
                            <br />

                            Medicina
                  <input placeholder="introduzca la catidad de productos" min="0" max="100" className="form-control" type="number" value={unidades3}
                                onChange={({ target: { value } }) => this.setState({ unidades3: value })} />

                            <select value={articles3}
                                onChange={this.cesta3}>
                                {medicines.map(medicina => <option value={medicina.medicine}>{medicina.medicine}</option>)}
                            </select>
                            <p><strong>Precio: {precio3.toFixed(2)}</strong></p>
                            <br />
                            <br />

                            {precio > 0 && precio1 > 0 && precio2 > 0 && precio3 > 0 ? <button onClick={this.buy} type="button" className="btn btn-primary btn-sm">Comprar</button> : <p>El precio debe ser mayor que 0 para poder comprar</p>}
                        </div>
                        <div className="col-6">
                            <h3 >Impuestos: {impuesto.toFixed(2)}</h3>
                            <h2 >Total: {total.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Calculate;