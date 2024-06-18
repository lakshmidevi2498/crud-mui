import { legacy_createStore  as createStore  } from "redux";
import { rootReducer } from "./Reducer/rootReducer";


const store=createStore(rootReducer)

export default store;