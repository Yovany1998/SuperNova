// Importar los módulos necesarios
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import {
  Input,
  Container,
  Item,
  H1,
  Button,
  Header,
  Icon,
  Spinner,
  Card,
  CardItem,
  H3,
  Body,
  Form,
  Footer,
  Left,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

// Obtener los valores por destructuring
const { width, height } = Dimensions.get("window");

const SearchInLibrary = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState(false);
  // funcion handlerSearch manda el valor de search ala otra pantalla
  const handlerSearch = () => {
    if (!search) setSearchError(true);
    else {
      navigation.navigate("Results", { search });
      setSearchError(false);
    }
  };
  // hook de efecto
  useEffect(() => {
    if (search) setSearchError(false);
  }, [search]);

  return (
    <Container>
      <Image
        source={require("../../assets/SuperNova.png")}
        style={styles.logoApp}
      />
      <Form>
        {/* Barra de busqueda */}
        <Header searchBar style={styles.buscador}>
          <Item>
            <Input
              // texto que nos aparece en  la barra y el valor que mandamos ala otra pantalla
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={searchError ? styles.inputError : null}
            />
            {/* Boton de busqueda */}
            <Button
              icon
              onPress={handlerSearch}
              searchBar
              style={styles.buscador}
            >
              <Icon name="search" />
            </Button>
          </Item>
        </Header>
        {/* Imagen de fondo de la pantalla */}
        <Grid>
          <Image
            source={require("../../assets/portada2.jpg")}
            style={styles.wallpaper}
          />
        </Grid>
        {/* Texto de busquedas recomendadas */}
        <H1 style={styles.title}>Search recomendations</H1>
        <View style={styles.container}>
          <Card style={{ marginTop: "10%" }}>
            <CardItem style={{ backgroundColor: "#FFFFFF" }}>
              <Image
                source={require("../../assets/supernova.jpg")}
                style={{ height: 50, width: 50 }}
              />
              <H1 style={styles.suggestion}>Supernova</H1>
            </CardItem>
          </Card>
          <Card style={{ marginTop: "5%" }}>
            <CardItem style={{ backgroundColor: "#FFFFFF" }}>
              <Image
                source={require("../../assets/darkmatter.jpg")}
                style={{ height: 50, width: 50 }}
              />
              <H1 style={styles.suggestion}>Dark matter</H1>
            </CardItem>
          </Card>
          <Card style={{ marginTop: "5%" }}>
            <CardItem style={{ backgroundColor: "#FFFFFF" }}>
              <Image
                source={require("../../assets/blackhole.jpg")}
                style={{ height: 50, width: 50 }}
              />
              <H1 style={styles.suggestion}>Black hole</H1>
            </CardItem>
          </Card>
        </View>
      </Form>
    </Container>
  );
};

// Estilos de nuestra pantalla
const styles = StyleSheet.create({
  container: {
    width: "100%",
    //height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestion: {
    fontSize: 30,
    marginLeft: "10%",
  },
  input: {
    margin: 15,
  },
  searchInput: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    marginRight: 15,
  },
  logoApp: {
    width: width,
    height: "12%",
    resizeMode: "contain",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
    color: "red",
  },
  buscador: {
    backgroundColor: "#333",
  },
  title: {
    marginTop: "5%",
    textAlign: "center",
    color: "white",
    fontSize: 30,
  },
  wallpaper: {
    flex: 1,
    height: height * 0.8,
  },
});

export default SearchInLibrary;
