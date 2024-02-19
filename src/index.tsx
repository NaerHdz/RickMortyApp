import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import CardCharacter from './components/CardCharacter';
import {Root, Character} from './types/types.d';

const URL = 'https://rickandmortyapi.com/api';

const fakeData: Root = {
  info: {
    count: 826,
    pages: 42,
    next: 'https://rickandmortyapi.com/api/character/?page=20',
    prev: 'https://rickandmortyapi.com/api/character/?page=18',
  },
  results: [
    {
      id: 361,
      name: 'Toxic Rick',
      status: 'Dead',
      species: 'Humanoid',
      type: "Rick's Toxic Side",
      gender: 'Male',
      origin: {
        name: 'Alien Spa',
        url: 'https://rickandmortyapi.com/api/location/64',
      },
      location: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/20',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/27'],
      url: 'https://rickandmortyapi.com/api/character/361',
      created: '2018-01-10T18:20:41.703Z',
    },
  ],
};

export default function App() {
  const [root, setRoot] = useState<Root>(fakeData);

  const getCharacters = async (url: string) =>
    fetch(url)
      .then(resp => resp.json())
      .then((data: Root) => setRoot(data))
      .catch(e => {});

  useEffect(() => {
    getCharacters(`${URL}/character`);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#808B96'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 15,
        }}>
        <TouchableOpacity
          style={[
            style.button,
            {borderColor: Boolean(root.info.prev) ? '#1d1d1d' : '#EBEBE4'},
          ]}
          disabled={!Boolean(root.info.prev)}
          onPress={() => getCharacters(root.info.prev)}>
          <Text
            style={[
              style.text,
              {color: Boolean(root.info.prev) ? '#1d1d1d' : '#EBEBE4'},
            ]}>
            Prev
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            style.button,
            {borderColor: Boolean(root.info.next) ? '#1d1d1d' : '#EBEBE4'},
          ]}
          disabled={!Boolean(root.info.next)}
          onPress={() => getCharacters(root.info.next)}>
          <Text
            style={[
              style.text,
              {color: Boolean(root.info.next) ? '#1d1d1d' : '#EBEBE4'},
            ]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={root.results}
        renderItem={(props: {item: Character}) => (
          <CardCharacter characters={props.item} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  button: {
    borderWidth: 2,
    width: 100,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
