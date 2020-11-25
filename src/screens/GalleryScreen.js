//Importamos los archivos que nesecitamos de otras carpetas o librerias
import {
  Container,
  Card,
  H1,
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
import { Video } from "expo-av";
import backend from "../api/backendImage";
import getEnvVars from "../../enviroment";
import { Grid } from "react-native-easy-grid";

//Variables que necesitaremos importar de envoriment para el funcionamieno de esta pantalla
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
      const response = await backend.get(`${apisearch}=${search}`);
      //Mandamos el valor de response.data a setGallery
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

  //Spiner en caso de que la ventana sea diferenete
  if (!gallery) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="blue" />
      </View>
    );
  }

  let videoImagen;
  // Extención mp4 que identifica un video de una imagen
  const extension = "~orig.mp4";

  // Funcion que identifica si la api nos da un video o imagen  y ejecuta el codigo
  // correspondiente a cada uno de los dos casos
  function tipoDeArchivo(item) {
    if (item.data[0].media_type === `video`) {
      // Generamos la dirección del video desfragmentandolo y
      // concatenandolo en una nueva direccion valida para reproducilo de forma correcta
      let urlDelVideo = item.href;
      let fragmentoDosDeUrl = urlDelVideo.slice(0, -16);
      let fragmentoTresDeUrl = urlDelVideo.slice(36, -16);
      // Concatenando la nueba url del video
      urlDelVideo = fragmentoDosDeUrl + fragmentoTresDeUrl + extension;
      // En caso de que sea video
      videoImagen = (
        <Video
          source={{ uri: `${urlDelVideo}` }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={true}
          style={styles.marsphoto}
        />
      );
    } else if (item.data[0].media_type === `image`) {
      // En caso de que sea imagen
      videoImagen = (
        <Image
          source={{
            uri: `${item.links[0].href}`,
          }}
          style={styles.marsphoto}
        />
      );
    } else {
      videoImagen = (
        <Image
          source={{
            uri: `../../assets/SuperNova.png`,
          }}
          style={styles.marsphoto}
        />
      );
    }
    return videoImagen;
  }
  // Función para convertir la fecha que nos da la api a formato ingles,
  // descomponiendo la fecha en fragmentos y concatenandolos luego
  function fechaIngles(cadena) {
    let fecha = cadena;
    // Extraemos el año
    let ano = fecha.slice(0, -16);
    // Extraemos el mes
    let mes = fecha.slice(5, -13);
    // Extraemos el dia
    let dia = fecha.slice(7, -10);
    // Concatenamos el nuevo formato de fecha
    fecha = mes + dia + "-" + ano;
    // Retornamos la fecha ya en el formato correcto que deberia
    // ser en formato ingles
    return fecha;
  }
  return (
    <Container>
      {/* logo de la app */}
      <Image
        source={require("../../assets/SuperNova.png")}
        style={styles.photoImage}
      />
      {/* Imagen de fondo */}
      <Grid>
        <Image
          source={require("../../assets/portada2.jpg")}
          style={styles.wallpaper}
        />
      </Grid>
      {/* Texto de los resultados  encontrados de dicha busqueda */}
      <H1
        style={{
          color: "#FFFFFF",
          textAlign: "center",
          fontSize: 23,
          marginTop: "3%",
          marginBottom: "3%",
        }}
      >
        {/* Resultado de la busqueda realizada  en SearchInLibrary */}
        Results found for {search}: {gallery.collection.items.length}
      </H1>

      {/* Lista de todo el contenido que nos retorna la api */}
      <FlatList
        data={gallery.collection.items}
        keyExtractor={(item) => item.data[0].nasa_id}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Card style={{ marginTop: 30 }}>
                <CardItem style={{ backgroundColor: "#FFFFFF" }}>
                  <CardItem>
                    <Left>
                      {/* Imagen de perfil  */}
                      <Image
                        source={require("../../assets/Hubble.png")}
                        style={{ height: 50, width: 50, marginLeft: -20 }}
                      />
                      {/* Textos que ban el la parte alado de la imagen de perfil */}
                      <Body>
                        <Text>
                          <Text style={styles.negritas}>Title:</Text>{" "}
                          {item.data[0].title}
                        </Text>
                        <Text note>
                          <Text style={styles.negritas}>Nasa Id:</Text>{" "}
                          {item.data[0].nasa_id}
                        </Text>
                        <Text note>
                          <Text style={styles.negritas}>Date created:</Text>{" "}
                          {fechaIngles(item.data[0].date_created)}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </CardItem>
                {/* Llamamos la funcion para verificar que typo de archivo nos retorna la api */}
                <CardItem>{tipoDeArchivo(item)}</CardItem>
                {/* contenido abajo del cuadro de imagen o video */}
                <CardItem>
                  <Body>
                    <Text>
                      <Text style={styles.negritas}>Type:</Text>{" "}
                      {item.data[0].media_type}
                    </Text>
                    <Text style={styles.description}>
                      <Text style={styles.negritas}>Description:</Text>{" "}
                      {item.data[0].description}
                    </Text>
                  </Body>
                </CardItem>
                {/* Iconos de likes, Comments y h ago */}
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
  description: {
    textAlign: "justify",
  },
});

//exportamos la pantalla
export default GalleryScreen;
