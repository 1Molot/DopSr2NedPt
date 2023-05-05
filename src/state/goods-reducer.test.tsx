import {GoodsType} from "../Typisation";
import {addGoodsAC, changeGoodStatusAC, deleteGoodsAC, goodsReducer, updateGoodTitleAC} from "./goods-reducer";
import {addShoplistAC} from "./shoplist-reducer";

let startState: GoodsType

beforeEach(() => {
    startState = {
        shoplist1: [
            {id: '1', title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
            {id: '2', title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
            {id: '3', title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
            {id: '4', title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
        ],
        shoplist2: [
            {id: '5', title: 'Tomato', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
            {id: '6', title: 'Potato', expectedPrice: '$0.99', realPrice: '$0.89', inCart: false},
            {id: '7', title: 'Cucumber', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
            {id: '8', title: 'Sugar', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
        ],
    }
})


test('correct good in correct shoplist should be deleted', () => {
    const endState = goodsReducer(startState, deleteGoodsAC("shoplist2", "5"))

    expect(endState.shoplist1.length).toEqual(startState.shoplist1.length)
    expect(endState.shoplist2.length).toBe(3)
    expect(endState.shoplist2[0].id).toBe("6")
})


test('correct good status in correct shoplist should be changed', () => {
    const endState = goodsReducer(startState, changeGoodStatusAC("shoplist1", "3", false))

    expect(endState.shoplist2[2].inCart).toBe(true)
    expect(endState.shoplist1[2].inCart).toBe(false)
})

test('correct good title in correct shoplist should be updated', () => {
    const endState = goodsReducer(startState, updateGoodTitleAC("shoplist2", "8", "Chicken"))


    expect(endState.shoplist1[3].title).toBe("Eggs")
    expect(endState.shoplist2[3].title).toBe("Chicken")
})
test('task should be added in correct shoplist', () => {
    const endState = goodsReducer(startState, addGoodsAC("shoplist1", "Cat food"))


    expect(endState.shoplist1[0].title).toBe("Cat food")
    expect(endState.shoplist1.length).toBe(5)
    expect(endState.shoplist2.length).toBe(4)

})

test('new empty array of goods should be added when new shoplist added', () => {

    const endState = goodsReducer(startState, addShoplistAC("new shopList"))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "shoplist1" && k !== "shoplist2")

    if (!newKey) throw Error("new key should be added")

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
});

