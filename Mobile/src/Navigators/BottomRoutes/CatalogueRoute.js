import React from "react";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native";
import Tags from "../../Catalogue/Tags/Tags";
import Categories from "../../Catalogue/Categories/Categories";
import Shelves from "../../Catalogue/Shelves/Shelves";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function CatalogueRoute(){
    const TopTab = createMaterialTopTabNavigator();

    const TagsRoute = () => <Tags />
    const CategoriesRoute = () => <Categories />    
    const ShelvesRoute = () => <Shelves />
        return (
            <SafeAreaView style={{flex:1}}>
                <Appbar.Header style={{height:60, backgroundColor:"white"}} >
                    <Appbar.Content title="Moje Książki" titleStyle={{fontSize: 20, fontFamily:"sans-serif-medium"}}/>
                </Appbar.Header>

                <TopTab.Navigator>
                    <TopTab.Screen name="shelves" component={ShelvesRoute} options={{title:"Półki"}}/>
                    <TopTab.Screen name="categories" component={CategoriesRoute} options={{title:"Kategorie"}}/>
                    <TopTab.Screen name="tags" component={TagsRoute} options={{title: "Tagi"}}/>
                </TopTab.Navigator>
            </SafeAreaView>
          );
}