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
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";


// Obtener los valores por destructuring
const { width, height } = Dimensions.get("window");

const SearchInLibrary = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState(false);

  const handlerSearch = () => {
    if (!search) setSearchError(true);
    else {
      navigation.navigate("GalleryScreen", { search });
      setSearchError(false);
    }
  };

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
        <Header searchBar style={styles.buscador}>
          <Item >
            <Input
              placeholder="Buscar"
              value={search}
              onChangeText={setSearch}
              style={searchError ? styles.inputError : null}
            />
            <Button icon onPress={handlerSearch} searchBar style={styles.buscador}>
              <Icon name="search" />
            </Button>
          </Item>
        </Header>
      
        <Grid>
          <Image
            source={require("../../assets/portada2.jpg")}
            style={styles.wallpaper}
          />
        </Grid>
      </Form>

      

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
  movieImage: {
    width: width * 0.99,
    height: height * 0.5,
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
    marginTop: "12%",
    textAlign: "center",
    color: "white",
    fontSize: 130,
  },
  wallpaper: {
    flex: 1,
    height: height * 0.8,
  }
});

export default SearchInLibrary;
