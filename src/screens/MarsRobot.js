//Importamos los archivos que nesecitamos de otras carpetas o librerias
import {
  Container,
  Card,
  CardItem,
  Body,
  Spinner,
  Icon,
  Left,
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

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { Grid } from "react-native-easy-grid";

//Variables que necesitaremos importar de envoriment
const { apiKey } = getEnvVars();

//Dimenciones de la pantalla
const { width, height } = Dimensions.get("window");

const MarsRobot = () => {
  // Estado del objeto
  const [marsrobot, setMartsRobots] = useState(null);
  const [error, setError] = useState(false);

  //Funcion que retorna un numero aleatorio entre los maximos y minimos
  function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const getMarsRobot = async () => {
    try {
      // Consultar la API
      const response = await backend.get(
        `mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`
      );
      //Mandamos el valor de response.data a setMartsRobots
      setMartsRobots(response.data);
    } catch (error) {
      // Error al momento de ejecutar la petición a la API
      setError(true);
    }
  };

  // Hook de efecto se ejecuta cada vez que se rendiriza la pantala
  useEffect(() => {
    // Efecto secundario realizar la petición a la API solo se ejecutara una vez
    getMarsRobot();
  }, []);

  //flex en caso de que la ventana sea diferenete
  if (!marsrobot) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="blue" />
      </View>
    );
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
    <Container>
      {/* imagen del logo de la pantalla */}
      <Image
        source={require("../../assets/SuperNova.png")}
        style={styles.photoImage}
      />
      {/* Imagen de fondo de la pantalla */}
      <Grid>
        <Image
          source={require("../../assets/portada2.jpg")}
          style={styles.wallpaper}
        />
      </Grid>
      {/* Lista donde se contendran todos los datos */}
      <FlatList
        data={marsrobot.photos}
        keyExtractor={(item) => item.id.toString()}
        //keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>¡No se han encontrado nada!</Text>}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Card style={{ marginTop: 50 }}>
                <CardItem style={{ backgroundColor: "#FFFFFF" }}>
                  <CardItem>
                    <Left>
                      {/* Imagen de perfil */}
                      <Image
                        source={require("../../assets/Wall-E.png")}
                        style={{ height: 50, width: 50, marginLeft: -20 }}
                      />
                      {/* Contenido ala par de la foto de perfil */}
                      <Body>
                        <Text>
                          <Text style={styles.negritas}>Full name:</Text>{" "}
                          {item.camera.full_name}
                        </Text>
                        <Text>
                          <Text style={styles.negritas}>Code:</Text> {item.id}
                        </Text>
                        <Text note>
                          <Text style={styles.negritas}>Earth date:</Text>{" "}
                          {invertir(item.earth_date)}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </CardItem>
                {/* Imagen que nos brinda la api */}
                <CardItem>
                  <Image
                    source={{
                      uri: `${item.img_src}`,
                    }}
                    style={styles.marsphoto}
                  />
                </CardItem>
                {/* Contenido abajo de la iamgen */}
                <CardItem>
                  <Body>
                    <Text>
                      <Text style={styles.negritas}>Landing date:</Text>{" "}
                      {invertir(item.rover.landing_date)}
                    </Text>
                    <Text>
                      <Text style={styles.negritas}>Launch date:</Text>{" "}
                      {invertir(item.rover.launch_date)}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem style={{ backgroundColor: "#FFFFFF" }}>
                  <Body>
                    <Body transparent>
                      <Icon active name="thumbs-up" />
                      {/* Funcion de numero aleatorio para los likes */}
                      <Text> {numeroAleatorio(1, 1000)} Likes</Text>
                    </Body>
                  </Body>
                  <Body>
                    <Body transparent>
                      <Icon active name="chatbubbles" />
                      {/* Funcion de numero aleatorio para los Comments */}
                      <Text> {numeroAleatorio(1, 100)} Comments</Text>
                    </Body>
                  </Body>
                  <Body>
                    <Body transparent>
                      <Icon active name="watch" />
                      {/* Funcion para numero aleatorio para ago */}
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
  negritas: {
    fontWeight: "bold",
  },
  marsphoto: {
    marginTop: -30,
    marginBottom: -30,
    flex: 1,
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
});

//exportamos la pantalla
export default MarsRobot;
