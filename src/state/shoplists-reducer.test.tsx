import {FilterValue, ShoplistsType} from "../Typisation";
import {v1} from "uuid";
import {
    addShoplistAC,
    changeFilterValueAC,
    deleteShoplistAC,
    shoplistReducer,
    updateShoplistTitleAC
} from "./shoplist-reducer";

let todolistId1: string;
let todolistId2: string;

let startState: Array<ShoplistsType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to buy", filter: "All"},
        {id: todolistId2, title: "What to buy today", filter: "All"},
    ]
})

test('correct shoplist should be removed', () => {
    const endState = shoplistReducer(startState, deleteShoplistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct shoplist should be added', () => {
    let newTodolistTitle = "New shoplist";

    const endState = shoplistReducer(startState, addShoplistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("All");
    expect(endState[2].id).toBeDefined();
});

test('correct shoplist should change its name', () => {
    let newTodolistTitle = "New shoplist title";

    const action = updateShoplistTitleAC(todolistId2, newTodolistTitle);
    const endState = shoplistReducer(startState, action);

    expect(endState[0].title).toBe("What to buy");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of shoplist should be changed', () => {
    let newFilter: FilterValue = "Bought";

    const action = changeFilterValueAC(todolistId2, newFilter);
    const endState = shoplistReducer(startState, action);

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});


