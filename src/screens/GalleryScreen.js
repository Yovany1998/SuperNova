// Importar los módulos necesarios
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import {
  Container,
  Form,
  Input,
  Item,
  Center,
  Icon,
  Left,
  Thumbnail,
  Header,
  Content,
  Card,
  H1,
  CardItem,
  H3,
  Body,
  Button,
  Grid,
  Spinner,
  Right,
} from "native-base";
import backend from "../api/backendImage";
import getEnvVars from "../../enviroment";

const { apiKey, apisearch, apiImage } = getEnvVars();
//const { apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let nota = [];

const GalleryScreen = () => {
  const [gallery, setGallery] = useState(null);
  const [contador, setContador] = useState(0);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState(false);

  let Termino = "Marte";

  const getGallery = async () => {
    try {
      const response = await backend.get(`${apisearch}=${Termino}&page=1`);

      //console.log(response.data);
      setGallery(response.data);
    } catch (error) {
      // Error al momento de ejecutar la petición a la API
      setError(true);
    }
  };
  const handlerSearch = () => {
    if (!search) setSearchError(true);
    else {
      navigation.navigate("movieSearch", { search });
      setSearchError(false);
    }
  };

  // Hook de efecto
  useEffect(() => {
    // Efecto secundario realizar la petición a la API
    getGallery();
  }, []);

  // Remueve el valor de error del input de búsqueda si el usuario ingresa información
  useEffect(() => {
    if (search) setSearchError(false);
  }, [search]);

  // Promesa

  if (!gallery) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="blue" />
      </View>
    );
  }

  return (
    <Container style={{ marginTop: 20 }}>
      <Image
        source={require("../../assets/SuperNova.png")}
        style={styles.photoImage}
      />
      <Button style={styles.buttonHome} block>
        <Text style={styles.buttonHomeText}>Home</Text>
      </Button>

      <Header searchBar>
        <Item>
          <Input
            placeholder="Buscar"
            value={search}
            onChangeText={setSearch}
            style={searchError ? styles.inputError : null}
          />
        </Item>

        <Button icon>
          <Icon name="search" />
        </Button>
      </Header>

      <Content>
        <Card>
          <CardItem>
            <Left>
              <Image
                source={require("../../assets/Wall-E.png")}
                style={{ height: 50, width: 50, marginLeft: -10 }}
              />
              <Body>
                <Text>
                  Title: {gallery.collection.items[contador].data[0].title}
                </Text>
                <Text>
                  Nasa ID: {gallery.collection.items[contador].data[0].nasa_id}
                </Text>

                <Text>
                  Date Created :
                  {gallery.collection.items[contador].data[0].date_created}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{
                uri: `${gallery.collection.items[contador].links[0].href}`,
              }}
              style={styles.marsphoto}
            />
          </CardItem>

          <H3>Description</H3>
          <Text>{gallery.collection.items[contador].data[0].description}</Text>

          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>{numeroAleatorio(1, 1000)} Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>{numeroAleatorio(1, 1000)} Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>{numeroAleatorio(1, 24)} h ago</Text>
            </Right>
          </CardItem>
          <Button
            style={styles.buttonHome}
            block
            icon
            onPress={() => setContador(contador + 1)}
          >
            <Text>Siguiente</Text>
          </Button>

          <Button
            style={styles.buttonRegresar}
            block
            icon
            onPress={() => setContador(contador - 1)}
          >
            <Text>Regresar</Text>
          </Button>
        </Card>
      </Content>
    </Container>
  );
};

// Estilos de nuestra pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 15,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
    color: "red",
  },
  marsphoto: {
    height: 400,
    width: null,
    resizeMode: "stretch",
    flex: 1,
  },
  photo: {
    width: width,
    height: height * 0.33,
    resizeMode: "stretch",
  },
  search: {
    flexDirection: "column",
    flex: 1,
    marginTop: 40,
    marginRight: 15,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  photoImage: {
    width: width,
    height: "11%",
    resizeMode: "stretch",
    //marginTop: 20,
  },
  buttonHome: {
    backgroundColor: "#333",
  },
  buttonRegresar: {
    backgroundColor: "#566573",
  },
  buttonHomeText: {
    color: "#FFFFFF",
    fontSize: 28,
  },
});

export default GalleryScreen;
