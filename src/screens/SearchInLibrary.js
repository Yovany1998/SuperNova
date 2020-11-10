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
} from "native-base";

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

      <Header searchBar>
        <Item>
          <Input
            placeholder="Buscar"
            value={search}
            onChangeText={setSearch}
            style={searchError ? styles.inputError : null}
          />
          <Button icon onPress={handlerSearch}>
            <Icon name="search" />
          </Button>
        </Item>
      </Header>
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
    height: height * 0.15,
    resizeMode: "contain",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
    color: "red",
  },
});

export default SearchInLibrary;
