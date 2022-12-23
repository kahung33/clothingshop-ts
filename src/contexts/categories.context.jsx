import { createContext, useState, useEffect} from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';


//as the actual value you want to access
export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ( {children} ) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, [])

    const value = { categoriesMap };
    
    // //use to upload SHOP_DATA.js to firebase
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // },[])


    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}