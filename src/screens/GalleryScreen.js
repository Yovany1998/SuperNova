// Importar los módulos necesarios
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import {
  Container,
  Input,
  Item,
  Icon,
  Left,
  Header,
  Content,
  Card,
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

//Variables que necesitaremos importar de envoriment
const { apisearch } = getEnvVars();

//Dimenciones de la pantalla
const { width, height } = Dimensions.get("window");

//Funcion que retorna un numero aleatorio entre los maximos y minimos
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const GalleryScreen = () => {
  //Estados del objeto
  const [gallery, setGallery] = useState(null);
  const [contador, setContador] = useState(0);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState(false);

  //Declaramos Termino para reemplazarlo luego y usarlo en la busqueda
  //Por defecto muestra los resultados de Titan
  let Termino = "Titan";

  const getGallery = async () => {
    try {
      //Peticion ala API
      const response = await backend.get(`${apisearch}=${Termino}&page=1`);
      //Mandamos los datos de response.data asetGallery
      setGallery(response.data);
      //cada vez que haga una consulta el contador empezara desde 0 para mostrar la primera imagen
      contador === 0;
    } catch (error) {
      // Error al momento de ejecutar la petición a la API
      setError(true);
    }
  };
  const handlerSearch = () => {
    if (!search) setSearchError(true);
    else {
      Termino = search;
      getGallery();
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

  //Muestra un spiner si la pantalla es diferente de gallery
  if (!gallery) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="blue" />
      </View>
    );
  }
  //declaramos bottonReturn para usar en la funcion del boton hacia atras(Back)
  let bottonReturn;
  //funcion Back
  function Back(contador) {
    //cada vez que el contador sea 0 no mostrara el boton de Back para evitar que haga una consulta invalida
    if (contador >= 1) {
      bottonReturn = (
        <Button
          style={styles.button}
          block
          icon
          onPress={() => setContador(contador - 1)}
        >
          <Text style={styles.buttontext}>Back</Text>
        </Button>
      );
    }
    return bottonReturn;
  }

  return (
    //se mostraran cada uno de los elementos recorriendo la posision del elemento dentro del arreglo
    <Container>
      <Image
        source={require("../../assets/SuperNova.png")} //logo de la parte superior
        style={styles.photoImage}
      />
      <Header searchBar rounded style={{ backgroundColor: "#333" }}>
        <Item>
          <Input
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
            style={searchError ? styles.inputError : null}
          />
          <Button
            icon
            onPress={handlerSearch}
            style={{ backgroundColor: "#333" }} //boton de busqueda
          >
            <Icon name="search" />
          </Button>
        </Item>
      </Header>
      <Grid>
        <Image
          source={require("../../assets/portada2.jpg")}
          style={{ height: 1000 }}
        />
      </Grid>
      <Content style={{ marginTop: "-50%" }}>
        <Card>
          <CardItem>
            <Left>
              <Image
                source={require("../../assets/Hubble.png")}
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
        </Card>
        <Button
          style={styles.button}
          block
          icon
          onPress={() => setContador(contador + 1)}
        >
          <Text style={styles.buttontext}>Next</Text>
        </Button>

        {Back(contador)}
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
    height: 300,
    //width: null,
    resizeMode: "stretch",
    flex: 1,
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
    height: "12%",
    resizeMode: "contain",
  },

  button: {
    backgroundColor: "#333",
    marginTop: 10,
  },
  ontext: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

//exportamos la pantalla
export default GalleryScreen;
