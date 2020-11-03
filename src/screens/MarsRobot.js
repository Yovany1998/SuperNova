import {
  Container,
  Form,
  Input,
  Item,
  H1,
  Card,
  CardItem,
  H3,
  H4,
  H5,
  Body,
  Button,
  Center,
  Header,
  Spinner,
  Icon,
  Left,
  Thumbnail,
  Right,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { Col, Row, Grid } from 'react-native-easy-grid';

const { apiKey } = getEnvVars();

const { width, height } = Dimensions.get("window");

const MarsRobot = () => {
  // Estado
  const [marsrobot, setMartsRobots] = useState(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const getMarsRobot = async () => {
    try {
      // Consultar la API
      const response = await backend.get(
        `mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`
      );
      //console.log(response.data);
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

  if (!marsrobot) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="blue" />
      </View>
    );
  }

  return (
    <Container style={{ marginTop: 20,}}>
      <Image
        source={require("../../assets/SuperNova.png")}
        style={styles.photoImage}
      />
      <Button style={styles.buttonHome} block>
        <Text style={styles.buttonHomeText}>
          Home
        </Text>
      </Button>
      <Grid>
        <Image
          source={require("../../assets/portada2.jpg")}
          style={{ height: 1000,}}
        />
        </Grid>
      <FlatList
        data={marsrobot.photos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>¡No se han encontrado nada!</Text>}
        renderItem={({ item }) => {
          return (
            <View>
              <Card style={{ marginTop: 50}}>
                <CardItem style={{ backgroundColor: "#FFFFFF"}}>
                  <CardItem>
                    <Left>
                    <Image source={require("../../assets/Wall-E.png")} style={{ height: 50, width: 50, marginLeft: -10}}/>
                      <Body>
                        <Text>Full name: {item.camera.full_name}</Text>
                        <Text note>Earth date: {item.earth_date}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </CardItem>
                <CardItem>
                  <Image
                    source={{
                      uri: `${item.img_src}`,
                    }}
                    style={styles.marsphoto}
                  />
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>Code: {item.id}</Text>

                    <Text>Landing date: {item.rover.landing_date}</Text>
                    <Text>Launch date: {item.rover.launch_date}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 15,
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
  buttonHomeText: {
    color: "#FFFFFF",
    fontSize: 28,
  },
});
export default MarsRobot;
