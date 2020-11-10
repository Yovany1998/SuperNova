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

  return (
    <Container>
      <Image
        source={require("../../assets/SuperNova.png")}
        style={styles.photoImage}
      />

      <Grid>
        <Image
          source={require("../../assets/portada2.jpg")}
          style={{ height: 1000 }}
        />
      </Grid>
      <H1>
        Resultados encontrados de {search} son {gallery.collection.items.length}
      </H1>
      <FlatList
        data={gallery.collection.items}
        keyExtractor={(item) => item.data[0].nasa_id}
        //keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>¡No se han encontrado nada!</Text>}
        renderItem={({ item }) => {
          return (
            <View>
              <Card style={{ marginTop: 50 }}>
                <CardItem style={{ backgroundColor: "#FFFFFF" }}>
                  <CardItem>
                    <Left>
                      <Image
                        source={require("../../assets/Hubble.png")}
                        style={{ height: 50, width: 50, marginLeft: -10 }}
                      />
                      <Body>
                        <Text>Title: {item.data[0].title}</Text>
                        <Text note>Nasa Id: {item.data[0].nasa_id}</Text>
                        <Text note>
                          Date Created: {item.data[0].date_created}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </CardItem>
                <CardItem>
                  <Image
                    source={{
                      uri: `${item.links[0].href}`,
                    }}
                    style={styles.marsphoto}
                  />
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>Type: {item.data[0].media_type}</Text>
                    <Text>description: {item.data[0].description}</Text>
                  </Body>
                </CardItem>
                <CardItem style={{ backgroundColor: "#FFFFFF" }}>
                  <Left>
                    <Button transparent>
                      <Icon active name="thumbs-up" />
                      <Text>{numeroAleatorio(1, 1000)} Likes</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles" />
                      <Text> {numeroAleatorio(1, 100)}Comments</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>{numeroAleatorio(1, 24)}h ago</Text>
                  </Right>
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
    justifyContent: "center",
    alignItems: "center",
  },

  marsphoto: {
    height: 600,
    width: null,
    flex: 1,
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
});

//exportamos la pantalla
export default GalleryScreen;
