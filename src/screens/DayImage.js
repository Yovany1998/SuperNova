import {
  Container,
  Form,
  Input,
  Item,
  H1,
  H3,
  H4,
  H5,
  Body,
  Button,
  Center,
  Spinner,
  Icon,
  Left,
  Thumbnail,
  Header,
  Content,
  Card,
  CardItem,
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

import { Col, Row, Grid } from "react-native-easy-grid";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

const { apiKey, apiImageUrl } = getEnvVars();

const { width, height } = Dimensions.get("window");

const DayImage = () => {
  // Estado
  const [dayImage, setMartsRobots] = useState(null);

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

  if (!dayImage) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="blue" />
      </View>
    );
  }
  return (
    <Container>
      <Image
        source={require("../../assets/SuperNova.png")}
        style={styles.photoImage}
      />
      <Grid>
        <Image
          source={require("../../assets/portada2.jpg")}
          style={{ height: 1000 }}
        />
      </Grid>
      <Content style={{marginTop: "-55%",}}>
        <Card>
          <CardItem>
            <Left>
            <Image source={require("../../assets/Camera.jpg")} style={{ height: 70, width: 50, marginLeft: -10}}/>
              <Body>
                <H1>{dayImage.title}</H1>
                <Text>copyright: {dayImage.copyright}</Text>
                <Text note>date: {dayImage.date} </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: `${dayImage.url}` }}
              style={{ height: 300, width: null, flex: 1 }}
            />
          </CardItem>
          <H3>Caption</H3>
          <Text>{dayImage.explanation}</Text>

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
      </Content>
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
    //marginTop: 20,
  },
});

export default DayImage;
