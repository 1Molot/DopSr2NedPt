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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

function AppWithRedux() {
    const shoplists = useSelector<AppRootStateType, Array<ShoplistsType>>(state => state.shoplists)
    const goods = useSelector<AppRootStateType, GoodsType>(state => state.goods)
    const dispatch = useDispatch()


    const deleteGoods = (shoplistId: string, id: string) => {
        // setGoods({...goods, [shoplistId]: goods[shoplistId].filter(sh => sh.id !== id)})
        const action = deleteGoodsAC(shoplistId, id)
        dispatch(action)
    }

    const changeGoodsStatus = (shoplistId: string, goodsId: string, inChecked: boolean) => {
        // setGoods({
        //     ...goods,
        //     [shoplistId]: goods[shoplistId].map(el => el.id === goodsId ? {...el, inCart: inChecked} : el)
        // })
        dispatch(changeGoodStatusAC(shoplistId, goodsId, inChecked))
    }

    const updateGoodTitle = (shoplistId: string, goodId: string, newTitle: string) => {
        // setGoods({
        //     ...goods,
        //     [shoplistId]: goods[shoplistId].map(el => el.id === goodId ? {...el, title: newTitle} : el)
        // })
        dispatch(updateGoodTitleAC(shoplistId, goodId, newTitle))

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
        dispatch(addGoodsAC(shoplistId, title))

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
        dispatch(action)
    }


    const changeFilterValue = (shoplistId: string, filter: FilterValue) => {
        // setShoplists(shoplists.map(el => el.id === shoplistId ? {...el, filter: filter} : el))
        dispatch(changeFilterValueAC(shoplistId, filter))
    }


    const deleteShopList = (shoplistId: string) => {
        // setShoplists(shoplists.filter(el => el.id !== shoplistId))
        // delete goods[shoplistId]
        // setGoods({...goods})
        dispatch(deleteShoplistAC(shoplistId))
    }


    const updateShoplistTitle = (shoplistId: string, newTitle: string) => {
        // setShoplists(shoplists.map(el => el.id === shoplistId ? {...el, title: newTitle} : el))
        dispatch(updateShoplistTitleAC(shoplistId, newTitle))
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

export default AppWithRedux;
