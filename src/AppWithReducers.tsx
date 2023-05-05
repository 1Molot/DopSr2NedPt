import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {ShoppingList} from "./components/ShoppingList";
import {FilterValue, GoodsType, GoodType, ShoplistsType} from "./Typisation";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {
    ActionsType,
    addShoplistAC,
    changeFilterValueAC,
    deleteShoplistAC,
    shoplistReducer, updateShoplistTitleAC
} from "./state/shoplist-reducer";
import {
    ActionType,
    addGoodsAC,
    changeGoodStatusAC,
    deleteGoodsAC,
    goodsReducer,
    updateGoodTitleAC
} from "./state/goods-reducer";

function AppWithReducers() {
    const shoplist1 = v1()
    const shoplist2 = v1()

    // const [shoplists, setShoplists] = useState<ShoplistsType[]>([
    //     {id: shoplist1, title: "What to buy", filter: "All"},
    //     {id: shoplist2, title: "What to buy today", filter: "All"},
    // ])
    //
    // const [goods, setGoods] = useState<GoodsType>({
    //     [shoplist1]: [
    //         {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
    //         {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
    //         {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
    //         {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
    //     ],
    //     [shoplist2]: [
    //         {id: v1(), title: 'Tomato', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
    //         {id: v1(), title: 'Potato', expectedPrice: '$0.99', realPrice: '$0.89', inCart: false},
    //         {id: v1(), title: 'Cucumber', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
    //         {id: v1(), title: 'Sugar', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
    //     ],
    // })

    const [shoplists, dispatchShoplists] = useReducer<Reducer<Array<ShoplistsType>, ActionsType>>(shoplistReducer, [
        {id: shoplist1, title: "What to buy", filter: "All"},
        {id: shoplist2, title: "What to buy today", filter: "All"},
    ])

    const [goods, dispatchGoods] = useReducer<Reducer<GoodsType, ActionType>>(goodsReducer, {
        [shoplist1]: [
            {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
            {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
            {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
            {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
        ],
        [shoplist2]: [
            {id: v1(), title: 'Tomato', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
            {id: v1(), title: 'Potato', expectedPrice: '$0.99', realPrice: '$0.89', inCart: false},
            {id: v1(), title: 'Cucumber', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
            {id: v1(), title: 'Sugar', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
        ],
    })

    const deleteGoods = (shoplistId: string, id: string) => {
        // setGoods({...goods, [shoplistId]: goods[shoplistId].filter(sh => sh.id !== id)})
        const action = deleteGoodsAC(shoplistId, id)
        dispatchGoods(action)
    }

    const changeGoodsStatus = (shoplistId: string, goodsId: string, inChecked: boolean) => {
        // setGoods({
        //     ...goods,
        //     [shoplistId]: goods[shoplistId].map(el => el.id === goodsId ? {...el, inCart: inChecked} : el)
        // })
        dispatchGoods(changeGoodStatusAC(shoplistId, goodsId, inChecked))
    }

    const updateGoodTitle = (shoplistId: string, goodId: string, newTitle: string) => {
        // setGoods({
        //     ...goods,
        //     [shoplistId]: goods[shoplistId].map(el => el.id === goodId ? {...el, title: newTitle} : el)
        // })
        dispatchGoods(updateGoodTitleAC(shoplistId, goodId, newTitle))

    }
    const addGoods = (shoplistId: string, title: string) => {
        // const getRandomNumberForExpectedPrice = Math.floor((Math.random() * 10) + 1)
        // const getRandomNumberForRealPrice = Math.floor((Math.random() * 10) + 1)
        // const addNewGoods = {
        //     id: v1(),
        //     title: title,
        //     expectedPrice: `$${getRandomNumberForExpectedPrice}`,
        //     realPrice: '$' + getRandomNumberForRealPrice,
        //     inCart: false
        // }
        // setGoods({...goods, [shoplistId]: [addNewGoods, ...goods[shoplistId]]})
        dispatchGoods(addGoodsAC(shoplistId, title))

    }

    const AddShopList = (shoplistTitle: string) => {
        // let NewShoplistId = v1()
        // let newShopList: ShoplistsType = {id: NewShoplistId, title: shoplistTitle, filter: "All"}
        // setShoplists([
        //     ...shoplists,
        //     newShopList
        // ])
        // setGoods({
        //     ...goods,
        //     [NewShoplistId]: []
        // })
        const action = addShoplistAC(shoplistTitle)
        dispatchGoods(action)
        dispatchShoplists(action)
    }


    const changeFilterValue = (shoplistId: string, filter: FilterValue) => {
        // setShoplists(shoplists.map(el => el.id === shoplistId ? {...el, filter: filter} : el))
        dispatchShoplists(changeFilterValueAC(shoplistId, filter))
    }


    const deleteShopList = (shoplistId: string) => {
        // setShoplists(shoplists.filter(el => el.id !== shoplistId))
        // delete goods[shoplistId]
        // setGoods({...goods})
        dispatchShoplists(deleteShoplistAC(shoplistId))
    }


    const updateShoplistTitle = (shoplistId: string, newTitle: string) => {
        // setShoplists(shoplists.map(el => el.id === shoplistId ? {...el, title: newTitle} : el))
        dispatchShoplists(updateShoplistTitleAC(shoplistId, newTitle))
    }

    const mappedShoplists = shoplists.map((el, index) => {

        let filteredGoods: Array<GoodType> = []
        if (el.filter === 'All') {
            filteredGoods = goods[el.id]
        }
        if (el.filter === 'Not to buy') {
            filteredGoods = goods[el.id].filter(el => el.inCart !== true)
        }
        if (el.filter === 'Bought') {
            filteredGoods = goods[el.id].filter(el => el.inCart === true)
        }

        return (
            <ShoppingList
                key={index}
                title={el.title}
                goods={filteredGoods}
                addGoods={addGoods}
                changeFilterValue={changeFilterValue}
                deleteGoods={deleteGoods}
                changeGoodsStatus={changeGoodsStatus}
                filter={el.filter}
                deleteTodoList={deleteShopList}
                shoplistId={el.id}
                updateGoodTitle={updateGoodTitle}
                updateShoplistTitle={updateShoplistTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm callback={AddShopList}/>
            {mappedShoplists}
        </div>
    );
}

export default AppWithReducers;
