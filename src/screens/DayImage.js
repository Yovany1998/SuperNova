// Importar los modulos necesarios
import {
  Container,
  Body,
  Spinner,
  Icon,
  Left,
  Content,
  Card,
  CardItem,
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
      //Mandamos el valor de response.data a setMartsRobots
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
  // declaramos la variable videoImagen
  let videoImagen;
  // Funcion de que identifica que nos devuelve la api si una imagen o
  // un video
  function tipoDeArchivo(dayImage) {
    if (dayImage.media_type === `video`) {
      // Si es video retornaria esto que lo que hace es que nos reproduce el video
      // que nos brinda a api
      videoImagen = (
        <Video
          source={{ uri: `${dayImage.url}` }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={true}
          style={styles.marsphoto}
        />
      );
    } else {
      // En caso de que sea imagen retornaria esta parte que lo que hace es que muestra la imagen
      // que nos proporciona la api
      videoImagen = (
        <Image
          source={{
            uri: `${dayImage.url}`,
          }}
          style={styles.marsphoto}
        />
      );
    }
    // Retornamos la variable con el valor de imagen o video
    return videoImagen;
  }

  // Función para convertir la fecha que nos da la api a formato ingles,
  // descomponiendo la fecha en fragmentos y concatenandolos luego
  function invertir(cadena) {
    let fecha = cadena;
    // Extraemos el año
    let ano = fecha.slice(0, -6);
    // Extraemos el mes
    let mes = fecha.slice(5, -2);
    // Extraemos el dia
    let dia = fecha.slice(8);
    // Concatenamos el nuevo formato de fecha
    fecha = mes + dia + "-" + ano;
    // Retornamos la fecha ya en el formato correcto que deberia
    // ser en formato ingles
    return fecha;
  }
  return (
    //se mostraran cada uno de los elementos recorriendo la posision del elemento dentro del arreglo
    <Container>
      <Image
        source={require("../../assets/SuperNova.png")} //logo de la parte superior
        style={styles.photoImage}
      />
      {/* Imagen de fondo */}
      <Grid>
        <Image
          source={require("../../assets/portada2.jpg")}
          style={styles.wallpaper}
        />
      </Grid>
      <Content style={{ marginTop: "-70%" }}>
        <Card style={styles.container}>
          <CardItem>
            <Left>
              {/* Imagen de perfil */}
              <Image
                source={require("../../assets/Camera.jpg")}
                style={{ height: 70, width: 50, marginLeft: -10 }}
              />
              {/* Textos que aparecen ala par de la foto de perfil */}
              <Body>
                <Text>
                  <Text style={styles.negritas}>Title: </Text>
                  {dayImage.title}
                </Text>
                <Text>
                  <Text style={styles.negritas}>Copyright: </Text>
                  {dayImage.copyright}
                </Text>

                <Text note>
                  <Text style={styles.negritas}>Date: </Text>
                  {invertir(dayImage.date)}{" "}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <CardItem>{tipoDeArchivo(dayImage)}</CardItem>
          </CardItem>
          {/* Texto abajo de la imagen correcpondiente ala descripción */}
          <Text style={styles.description}>
            <Text style={styles.negritas}>Caption: </Text>
            {dayImage.explanation}
          </Text>
          {/* Iconos de Comments, Likes,ago que aparecen abajo de la imagen */}
          <CardItem>
            <Body>
              <Body transparent>
                <Icon active name="thumbs-up" />
                {/* Función de numeros aleatorios para los Likes */}
                <Text> {numeroAleatorio(1, 1000)} Likes</Text>
              </Body>
            </Body>
            <Body>
              <Body transparent>
                <Icon active name="chatbubbles" />
                {/* Función de numeros aleatorios para los Comments */}
                <Text> {numeroAleatorio(1, 100)} Comments</Text>
              </Body>
            </Body>
            <Body>
              <Body transparent>
                <Icon active name="watch" />
                {/* función de numeros aleatorios para ago */}
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
  negritas: {
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
