import React, {ChangeEvent} from "react";
import {ShoppingListPropsType} from "../Typisation";
import {Checkbox} from "./Checkbox";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup} from "@mui/material";

export const ShoppingList = (props: ShoppingListPropsType) => {

    const updateGoodTitleHandler = (goodId: string, newTitle: string) => {
        props.updateGoodTitle(props.shoplistId, goodId, newTitle)
    }

    const changeGoodsStatusOnChangeHandler = (goodId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeGoodsStatus(props.shoplistId, goodId, e.currentTarget.checked)
    }

    const mappedGoods = props.goods.map((el, index) => {

        // const changeGoodsStatusOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //     props.changeGoodsStatus(props.shoplistId, el.id, e.currentTarget.checked)
        // }

        const expectedPriceToNumber = Number(el.expectedPrice.replace('$', '')) // '$5'(какое-то значнение expectedPrice ('$5' - просто пример, у нас там значения, которые сидят в массиве)) -> '5'(результат после replace) -> 5(конечный результат после Number)
        const realPriceToNumber = +el.realPrice.slice(1) /// '$5'(какое-то значнение realPrice ('$5' - просто пример, у нас там значения, которые сидят в массиве)) -> '5'(результат после splice(1)) -> 5(конечный результат унарного плюса - +)
        const styleForPrice = expectedPriceToNumber >= realPriceToNumber ? 'goodPrice' : 'badPrice';

        // const updateGoodTitleHandler = (newTitle: string) => {
        //     props.updateGoodTitle(props.shoplistId, el.id, newTitle)
        // }

        return (
            <li key={el.id} className={el.inCart ? 'inCart' : ''}>
                <div>
                    <button onClick={() => props.deleteGoods(props.shoplistId, el.id)}>x</button>
                    <EditableSpan oldTitle={el.title} callback={(newTitle) => updateGoodTitleHandler(el.id, newTitle)}/>
                </div>
                <div className={styleForPrice}>expected price: {el.expectedPrice}</div>
                <div className={styleForPrice}>real price: {el.realPrice}</div>
                <span>in cart: </span>
                <Checkbox checked={el.inCart} onChange={(e) => changeGoodsStatusOnChangeHandler(el.id, e)}/>
                {/*<input type={'checkbox'} checked={el.inCart} onChange={changeGoodsStatusOnChangeHandler}/>*/}
            </li>
        )
    })

    const sumOfGoodsInCart = props.goods
        .filter(el => el.inCart === true)
        .reduce((previousValue, current) => previousValue + Number(current.realPrice.slice(1)), 0);

    const deleteTodoListHandler = () => {
        props.deleteTodoList(props.shoplistId)
    }

    const addGoodHandler = (newTitle: string) => {
        props.addGoods(props.shoplistId, newTitle)
    }

    const updateShoplistTitleHandler = (newTitle: string) => {
        props.updateShoplistTitle(props.shoplistId, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} callback={updateShoplistTitleHandler}/>
                <button onClick={deleteTodoListHandler}>X</button>
            </h3>
            <div>
                <AddItemForm callback={addGoodHandler}/>
                {sumOfGoodsInCart
                    ? <div>Sum of items in the cart - <strong>{sumOfGoodsInCart}</strong></div>
                    : <div>Please add item in the cart</div>
                }
            </div>
            <ul>
                {mappedGoods}
            </ul>
            <div>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button
                        variant={props.filter === "All" ? "contained" : "outlined"}
                        onClick={() => props.changeFilterValue(props.shoplistId, "All")}
                    >All
                    </Button>
                    <Button
                        variant={props.filter === "Not to buy" ? "contained" : "outlined"}
                        onClick={() => props.changeFilterValue(props.shoplistId, "Not to buy")}
                    >Not to buy
                    </Button>
                    <Button
                        variant={props.filter === "Bought" ? "contained" : "outlined"}
                        onClick={() => props.changeFilterValue(props.shoplistId, "Bought")}
                    >Bought
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}