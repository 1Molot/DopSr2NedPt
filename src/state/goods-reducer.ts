import {GoodsType, GoodType} from "../Typisation";
import {v1} from "uuid";
import {AddShoplistACType} from "./shoplist-reducer";

const initialState: GoodsType = {}

export const goodsReducer = (state: GoodsType = initialState, action: ActionType): GoodsType => {
    switch (action.type) {
        case "DELETE-GOOD": {
            return {...state, [action.shoplistId]: state[action.shoplistId].filter(el => el.id !== action.goodsId)}
        }
        case "CHANGE-GOOD-STATUS": {
            return {
                ...state,
                [action.shoplistId]: state[action.shoplistId].map(el => el.id === action.goodId ? {
                    ...el,
                    inCart: action.isChecked
                } : el)
            }
        }
        case "ADD-GOOD": {
            const getRandomNumberForExpectedPrice = Math.floor((Math.random() * 10) + 1)
            const getRandomNumberForRealPrice = Math.floor((Math.random() * 10) + 1)
            const newTask: GoodType = {
                id: v1(),
                title: action.title,
                expectedPrice: `$${getRandomNumberForExpectedPrice}`,
                realPrice: '$' + getRandomNumberForRealPrice,
                inCart: false
            }
            return {...state, [action.shoplistId]: [newTask, ...state[action.shoplistId]]}
        }
        case "ADD-SHOPLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        case "UPDATE-GOOD-TITLE": {
            return {
                ...state,
                [action.shoplistId]: state[action.shoplistId].map(el => el.id === action.goodId ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }
        }
        default:
            return state
    }
}

export type ActionType =
    DeleteGoodsACType
    | ChangeGoodStatusACType
    | UpdateGoodTitleACType
    | AddGoodsACType
    | AddShoplistACType

type DeleteGoodsACType = ReturnType<typeof deleteGoodsAC>
type ChangeGoodStatusACType = ReturnType<typeof changeGoodStatusAC>
type UpdateGoodTitleACType = ReturnType<typeof updateGoodTitleAC>
type AddGoodsACType = ReturnType<typeof addGoodsAC>

export const deleteGoodsAC = (shoplistId: string, goodsId: string) => {
    return {
        type: "DELETE-GOOD",
        shoplistId,
        goodsId
    } as const
}
export const changeGoodStatusAC = (shoplistId: string, goodId: string, isChecked: boolean) => {
    return {
        type: "CHANGE-GOOD-STATUS",
        shoplistId,
        goodId,
        isChecked
    } as const
}
export const updateGoodTitleAC = (shoplistId: string, goodId: string, newTitle: string) => {
    return {
        type: "UPDATE-GOOD-TITLE",
        shoplistId,
        goodId,
        newTitle
    } as const
}
export const addGoodsAC = (shoplistId: string, title: string) => {
    return {
        type: "ADD-GOOD",
        shoplistId,
        title
    } as const
}