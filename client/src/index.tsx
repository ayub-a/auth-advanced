import { createContext } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { Store } from './store/store';


interface IState {
    store: Store
}

const store = new Store()

export const StoreContext = createContext<IState>({
    store
})


const root = createRoot(document.getElementById('root'));

root.render(
    <StoreContext.Provider value={{ store }}>
        <App/>
    </StoreContext.Provider>
);