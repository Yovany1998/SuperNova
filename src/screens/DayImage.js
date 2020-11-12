// Importar los modulos necesarios
import {
  Container,
  H1,
  H3,
  Body,
  Button,
  Spinner,
  Icon,
  Left,
  Content,
  Card,
  CardItem,
  Right,
} from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

import { Col, Row, Grid } from "react-native-easy-grid";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

//Variables que necesitaremos importar de enviorment
const { apiKey, apiImageUrl } = getEnvVars();

//Dimenciones de la pantalla
const { width, height } = Dimensions.get("window");

const DayImage = () => {
  // Estado
  const [dayImage, setMartsRobots] = useState(null);

  //Funcion que retorna un numero aleatorio entre los maximos y minimos
  function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const getMarsRobot = async () => {
    try {
      // Consultar la API
      const response = await backend.get(`planetary/apod?api_key=${apiKey}`);
      // console.log(response.data);

      setMartsRobots(response.data);
    } catch (error) {
      // Error al momento de ejecutar la petición a la API
      setError(true);
    }
  };

  // Hook de efecto
  useEffect(() => {
    // Efecto secundario realizar la petición a la API
    getMarsRobot();
  }, []);

  // si no se recibe una imagen del dia solo retornara el spinner
  if (!dayImage) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="blue" />
      </View>
    );
  }
  return (
    //se mostraran cada uno de los elementos recorriendo la posision del elemento dentro del arreglo
    <Container>
      <Image
        source={require("../../assets/SuperNova.png")} //logo de la parte superior
        style={styles.photoImage}
      />
      <Grid>
        <Image
          source={require("../../assets/portada2.jpg")}
          style={styles.wallpaper}
        />
      </Grid>
      <Content style={{ marginTop: "-60%" }}>
        <Card style={styles.container}>
          <CardItem>
            <Left>
              <Image
                source={require("../../assets/Camera.jpg")}
                style={{ height: 70, width: 50, marginLeft: -10 }}
              />
              <Body>
                <Text><Text style={styles.negritas}>Title: </Text>{dayImage.title}</Text>
                <Text><Text style={styles.negritas}>Copyright: </Text>{dayImage.copyright}</Text>
                <Text note><Text style={styles.negritas}>Date: </Text>{dayImage.date} </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: `${dayImage.url}` }}
              style={styles.dayImage}
            />
          </CardItem>
          <Text style={styles.description}><Text style={styles.negritas}>Caption: </Text>{dayImage.explanation}</Text>

          <CardItem>
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
      </Content>
    </Container>
  );
};

// Estilos de la pagina
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
  input: {
    margin: 15,
  },
  marsphoto: {
    height: 200,
    width: null,
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
    height: "12%",
    resizeMode: "contain",
  },
  dayImage: {
    flex: 1,
    //width: 1000,
    //height: 500,
    height: height * 0.3,
    resizeMode: "contain",
  },
  wallpaper: {
    flex: 1,
    height: height * 0.9,
  },
  description: {
    marginLeft: "2%",
    marginRight: "2%",
    textAlign: "center",
  },
});

//exportamos la pantalla
export default DayImage;
