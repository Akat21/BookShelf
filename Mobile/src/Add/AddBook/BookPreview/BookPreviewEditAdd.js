import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, BackHandler } from "react-native"
import { useRoute, useNavigation, CommonActions } from "@react-navigation/native"
import { Divider, Button, Appbar, TextInput, List, IconButton } from "react-native-paper"
import {SafeAreaProvider} from "react-native-safe-area-context"
import _ from 'lodash'

/////////DODAĆ DIALOG POTWIERDZAJĄCY POWRÓT BEZ ZAPISU ORAZ POWRÓT NA STRZAŁCE U GÓRY ZE ZMIANĄ DATY W INFOADD ROUTCIE////////////
export default function BookPreviewEditAdd(){
    const route = useRoute()
    const navigation = useNavigation()

    const [expandIconAuthors, setExpandIconAuthors] = React.useState('chevron-right')
    const [expandedAuthors, setExpandedAuthors] = React.useState(false)

    const [expandedDescription, setExpandedDescription] = React.useState(false)
    const [expandIconDescription, setExpandIconDescription] = React.useState('chevron-right')

    const [descriptionNumOfLines, setDescriptionNumOfLines] = React.useState(1)

    const [isSaved, setIsSaved] = React.useState(false)
    const [color, setColor] = React.useState("transparent")
    const [data, setData] = React.useState({title: "",
                                            isbn: "",
                                            isRead: true,
                                            favorite: true,
                                            borrower: "John Smith",
                                            wishList: false,
                                            publisher:"",
                                            coverType:"nie ma",
                                            volume:1,
                                            publishedDate: "",
                                            categories: [
                                                {
                                                  name: ""
                                                }
                                            ],
                                            authors:[
                                                {
                                                    name: ""
                                                }
                                            ],

                                            imgURI: "",
                                            description: "",
                                            isFound: true})
    const [sourceData, setSourceData] = React.useState({...data})     

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => backHandler.remove();
    }, [sourceData]);

    React.useEffect(() => {
        navigation.setOptions({headerShown:true})
        if (route.params?.data) {
            console.log(route.params.data)
            setData({...route.params.data})
            setSourceData({...route.params.data})
        }
    }, [route.params]);

    React.useEffect(()=>{
        if (_.isEqual(sourceData, data)){
            setIsSaved(true)
        }
        else{
            setIsSaved(false)
        }
    },[data, sourceData])

    const authors = data.authors.map((author, idx)=>{
        return idx === 0 ?
        <View style={styles.authorContainer}>
            <TextInput mode="outlined" value={author.name} onChangeText={(value) => handleAuthorChange(value, idx)}
                       style={[styles.textInput, {marginTop:13}]} label={"Autor " + (idx + 1)} key={idx}/>
            <IconButton icon="close" iconColor="black" size={25} onPress={() => handleAuthorDelete(idx)} style={styles.authorExit} key={idx+1}/>
        </View>
        :
        <View style={styles.authorContainer}>
            <TextInput mode="outlined" value={author.name} onChangeText={(value) => handleAuthorChange(value, idx)}
                       style={styles.textInput} label={"Autor " + (idx + 1)} key={idx}/>
            <IconButton icon="close" iconColor="black" size={25} onPress={() => handleAuthorDelete(idx)} style={styles.authorExit} key={idx+1}/>
        </View>

    })

    function handleAuthorDelete(idx){
        setData(prevData => ({
            ...prevData,
            authors: prevData.authors.filter((author, index) => index !== idx)
        }))
    }

    function handleAuthorChange(value, idx){
        setData(prevData => ({
            ...prevData,
            authors: prevData.authors.map((author, i) => {
                if (i === idx) {
                    return {["name"]: value};
                }
                return author;
            })
        }))
    }
    function handleChange(name, value){
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleOnExpandAuthors(){
        setExpandedAuthors(!expandedAuthors)
        if (expandIconAuthors === "chevron-right") setExpandIconAuthors("chevron-down")
        if (expandIconAuthors === "chevron-down") setExpandIconAuthors("chevron-right")

    }

    function handleOnExpandDescription(){
        setExpandedDescription(!expandedDescription)
        if (expandIconDescription === "chevron-right") setExpandIconDescription("chevron-down")
        if (expandIconDescription === "chevron-down") setExpandIconDescription("chevron-right")

    }

    function handleOnAdd(){
        setData(prevData => ({
            ...prevData,
            authors: [...prevData.authors, {name:""}]
        }))
    }

    function handleOnSave(){
        setSourceData({...data})
        console.log(sourceData)
        setIsSaved(true)
    }

    const handleBackPress = () => {
        navigation.navigate('bookPreviewInfoAdd', {data: sourceData})
        return true
    };

    return(
        <SafeAreaProvider style={{flex:1, flexDirection:"column"}}>
            {data.isFound && <View style={{flex:1, marginTop:20}}>
                <Divider horizontalInset={true} />
                <ScrollView style={{flex:1, margin:10}}>
                    <List.Section>
                        <TextInput mode="outlined" label = "ISBN(opcjonalny)" value={data.isbn} 
                                onChangeText={(value) => handleChange("isbn", value)} style={styles.textInput}/>
                        <TextInput mode="outlined" label = "Tytuł" value={data.title} 
                                onChangeText={(value) => handleChange("title", value)} style={[styles.textInput, {marginTop:-4}]}/>
                        <List.Accordion title="Autorzy" right={() => <List.Icon icon={expandIconAuthors} />} 
                                        style={styles.authorsButton} expanded={expandedAuthors} onPress={handleOnExpandAuthors}>
                            {authors}
                            <Button mode="contained-tonal" icon="plus" iconColor="silver" 
                                    style={[styles.addAuthorsButton, {marginTop: data.authors.length > 0 ? -9 : 2 }]}
                                    onPress={handleOnAdd}>Dodaj autora</Button>
                        </List.Accordion>
                        <Divider style={{marginTop:13}}/>
                        <List.Accordion title="Opis" right={() => <List.Icon icon={expandIconDescription}/>} 
                                        style={styles.descriptionButton} expanded={expandedDescription} 
                                        onPress={handleOnExpandDescription}>
                            <TextInput mode="outlined" label = "Opis" value={data.description} 
                                        onChangeText={(value) => handleChange("description", value)} 
                                        style={[styles.textInput, {marginTop:8}]} 
                                        multiline={true} numberOfLines={descriptionNumOfLines} onContentSizeChange={(e) => {
                                        setDescriptionNumOfLines(e.nativeEvent.contentSize.height / 18)
                                    }}/>
                        </List.Accordion>
                        <TextInput mode="outlined" label = "Data Wydania" value={data.publishedDate} 
                                onChangeText={(value) => handleChange("publishedDate", value)} style={[styles.textInput, {marginTop:8}]}/>
                    </List.Section>
                </ScrollView>
                <Divider bold={true}/>
                <View style={styles.buttons}>
                    <Button mode="contained" icon="check" onPress={handleOnSave} 
                            style={styles.saveButton} disabled={isSaved}>
                        Zapisz
                    </Button>
                </View>
            </View>}
            {data.isFound === false && <Text>Nie rozpoznano książki</Text>}
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:0.32,
        flexDirection:"row",
        height:"50%"
    },
    img:{
        width:"30%",
        height:"100%",
        marginLeft: 10,
        marginTop: 10,
        objectFit: "fill",
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor:"black"
    },
    title:{
        marginLeft: 15,
        marginTop:10,
        fontWeight:"bold",
        fontSize:20,
        maxWidth:"100%",
    },
    authorContainer:{
        flexDirection:"row"
    },
    authorExit:{
        alignSelf:"center"
    },
    authors:{
        marginLeft: 15,
        marginTop: 10,
        fontSize: 15
    },
    authorsButton:{
        backgroundColor:"white",
        borderWidth:1,
        borderRadius: 4,
        borderColor: '#808080',
    },
    addAuthorsButton:{
        backgroundColor:"transparent",
        alignSelf:"flex-start",
        borderRadius:0,
        marginLeft: -8,
    },
    descriptionButton:{
        backgroundColor:"white",
        borderWidth:1,
        borderRadius: 4,
        borderColor: '#808080',
    },
    textInput:{
        flex: 1,
        backgroundColor: "white",
        marginBottom: 12,
    },
    saveButton:{
        borderRadius:0
    },
    buttons:{
        marginTop:10,
    }
})