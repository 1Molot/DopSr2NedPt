import {combineReducers, legacy_createStore as createStore, legacy_createStore} from 'redux'
import {goodsReducer} from "./goods-reducer";
import {shoplistReducer} from "./shoplist-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    goods: goodsReducer,
    shoplists: shoplistReducer
})
// непосредственно создаём store
// export const store = createStore(rootReducer)
// export const store = createStore(rootReducer)
export const store = legacy_createStore(rootReducer)
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store