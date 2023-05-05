import {FilterValue, GoodsType, ShoplistsType} from "../Typisation";
import {v1} from "uuid";

const initialState: Array<ShoplistsType> = []

export const shoplistReducer = (state: Array<ShoplistsType> = initialState, action: ActionsType): Array<ShoplistsType> => {
    switch (action.type) {
        case 'CHANGE-FILTER-VALUE': {
            // setShoplists(shoplists.map(el => el.id === shoplistId ? {...el, filter: filter} : el))
            return state.map(el => el.id === action.payload.shoplistId ? {...el, filter: action.payload.filter} : el)
        }
        case 'DELETE-SHOPLIST': {
            // setShoplists(shoplists.filter(el => el.id !== shoplistId))
            return state.filter(el => el.id !== action.payload.shoplistId)
        }
        case 'ADD-SHOPLIST': {
            const newShoplist: ShoplistsType = {
                id: action.payload.todolistId,
                title: action.payload.shoplistTitle,
                filter: 'All'
            }
            return [...state, newShoplist]
            // return [{
            //     id: action.payload.todolistId,
            //     title: action.payload.shoplistTitle,
            //     filter: 'All'
            // }, ...state]
        }
        case 'UPDATE-SHOPLIST-TITLE': {
            // setShoplists(shoplists.map(el => el.id === shoplistId ? {...el, title: newTitle} : el))
            return state.map(el => el.id === action.payload.shoplistId ? {...el, title: action.payload.newTitle} : el)
        }
        default:
            // throw new Error("Error")
            return state;
    }
}

export type ActionsType = ChangeFilterValueACType | DeleteShoplistACType | AddShoplistACType | updateShoplistTitleACType

export type ChangeFilterValueACType = ReturnType<typeof changeFilterValueAC>
export type DeleteShoplistACType = ReturnType<typeof deleteShoplistAC>
export type AddShoplistACType = ReturnType<typeof addShoplistAC>
export type updateShoplistTitleACType = ReturnType<typeof updateShoplistTitleAC>

export const changeFilterValueAC = (shoplistId: string, filter: FilterValue) => {
    return {
        type: 'CHANGE-FILTER-VALUE',
        payload: {
            shoplistId,
            filter
        }
    } as const
}

export const deleteShoplistAC = (shoplistId: string) => {
    return {
        type: 'DELETE-SHOPLIST',
        payload: {
            shoplistId
        }
    } as const
}

export const addShoplistAC = (shoplistTitle: string) => {
    return {
        type: 'ADD-SHOPLIST',
        payload: {
            todolistId: v1(),
            shoplistTitle,
        }
    } as const
}

export const updateShoplistTitleAC = (shoplistId: string, newTitle: string) => {
    return {
        type: 'UPDATE-SHOPLIST-TITLE',
        payload: {
            shoplistId,
            newTitle
        }
    } as const
}