//Importamos los archivos que nesecitamos de otras carpetas o librerias
import {
  Container,
  Card,
  H1,
  CardItem,
  Body,
  Button,
  Spinner,
  Icon,
  Left,
  Right,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { Video } from 'expo-av';
import backend from "../api/backendImage";
import getEnvVars from "../../enviroment";
import { Grid } from "react-native-easy-grid";
//Variables que necesitaremos importar de envoriment

const { apisearch } = getEnvVars();

//Dimenciones de la pantalla
const { width, height } = Dimensions.get("window");

const GalleryScreen = ({ route, navigation }) => {
  // Estado del objeto
  const { search } = route.params;

  const [gallery, setGallery] = useState(null);
  const [error, setError] = useState(false);

  //Funcion que retorna un numero aleatorio entre los maximos y minimos
  function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const getGallery = async () => {
    try {
      const response = await backend.get(`${apisearch}=${search}&page=1`);

      setGallery(response.data);
    } catch (error) {
      // Error al momento de ejecutar la petición a la API
      setError(true);
    }
  };
  // Hook de efecto se ejecuta cada vez que se rendiriza la pantala
  useEffect(() => {
    // Efecto secundario realizar la petición a la API solo se ejecutara una vez
    getGallery();
  }, []);

  //flex en caso de que la ventana sea diferenete
  if (!gallery) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="blue" />
      </View>
    );
  }

  let video;
  let videos = `video`;
  const extension = "~orig.mp4";

  function tipo(item) {
    
    if (item.data[0].media_type === videos) {
        let video1 = item.href
        let video2 = video1.slice(0, -16);
        let video3 = video1.slice(36, -16)

        video2 += video3 + extension
        //video2 += extension
        
        video = 
        <Video
          source={{ uri: `${video2}` }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={true}
          //style={{ width: 300, height: 300 }}
          style={styles.marsphoto}
        />

        //video = <Text>corriendo:{video2}</Text>
    }else{
        video = <Image
        source={{
          uri: `${item.links[0].href}`,
        }}
        style={styles.marsphoto}
       />

    }
    console.log(video);
    return (
      video
    );
  }

  console.log(gallery.collection.items[0].href[0])

  return (
    <Container>
      <Image
        source={require("../../assets/SuperNova.png")}
        style={styles.photoImage}
      />

      <Grid>
        <Image
          source={require("../../assets/portada2.jpg")}
          style={styles.wallpaper}
        />
      </Grid>
      <H1 style={{ color: "#FFFFFF", textAlign: "center", fontSize: 23, marginTop: "3%", marginBottom: "3%"}}>
        Results found for {search}: {gallery.collection.items.length}
      </H1>
      <FlatList
        data={gallery.collection.items}
        keyExtractor={(item) => item.data[0].nasa_id}
        //keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Card style={{ marginTop: 50 }}>
                <CardItem style={{ backgroundColor: "#FFFFFF" }}>
                  <CardItem>
                    <Left>
                      <Image
                        source={require("../../assets/Hubble.png")}
                        style={{ height: 50, width: 50, marginLeft: -20 }}
                      />
                      <Body>
                        <Text><Text style={styles.negritas}>Title:</Text> {item.data[0].title}</Text>
                        <Text note><Text style={styles.negritas}>Nasa Id:</Text> {item.data[0].nasa_id}</Text>
                        <Text note>
                          <Text style={styles.negritas}>Date created:</Text> {item.data[0].date_created}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </CardItem>
                <CardItem>
                  {tipo(item)}
                </CardItem>
                <CardItem>
                  <Body>
                    <Text><Text style={styles.negritas}>Type:</Text> {item.data[0].media_type}</Text>
                    <Text style={styles.description}><Text style={styles.negritas}>Description:</Text> {item.data[0].description}</Text>
                  </Body>
                </CardItem>
                <CardItem style={{ backgroundColor: "#FFFFFF" }}>
                  <Body>
                    <Body transparent>
                      <Icon active name="thumbs-up" />
                      <Text> {numeroAleatorio(1, 1000)} Likes</Text>
                    </Body>
                  </Body>
                  <Body>
                    <Body transparent>
                      <Icon active name="chatbubbles" />
                      <Text> {numeroAleatorio(1, 100)} Comments</Text>
                    </Body>
                  </Body>
                  <Body>
                    <Body transparent>
                      <Icon active name="watch" />
                      <Text> {numeroAleatorio(1, 24)} h ago</Text>
                    </Body>
                  </Body>
                </CardItem>
              </Card>
            </View>
          );
        }}
      />
    </Container>
  );
};

//Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "5%",
    marginRight: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  negritas:{
    fontWeight: "bold",
  },
  marsphoto: {
    marginTop: -30,
    marginBottom: -30,
    flex: 1,
    //width: 1000,
    //height: 500,
    height: height * 0.3,
    resizeMode: "contain",
  },
  photo: {
    width: width,
    height: height * 0.33,
    resizeMode: "stretch",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  photoImage: {
    width: width,
    height: "12%",
    resizeMode: "contain",
  },
  wallpaper: {
    flex: 1,
    height: height * 0.9,
  },
  description: {
    textAlign: "justify",
  },
});

//exportamos la pantalla
export default GalleryScreen;
