/**
 * @flow
 */

import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      base_url: 'http://127.0.0.1:8000'
    }
  }

  componentDidMount() {
    this.fetchDataFromApi()
  }

  fetchDataFromApi = () => {
    const url = 'http://127.0.0.1:8000/users.json'

    this.setState({
      loading: true
    })

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: null,
          loading: false,
          refreshing: false
        })
      })
      .catch(error =>
        this.setState({
          error,
          loading: false
        })
      )
  }

  handleRefresh = () =>
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchDataFromApi()
    )

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={{ flex: 1, marginTop: 40 }}>
              <Text style={styles.menuText}> {item.username} </Text>
              <Text style={styles.locText}> {item.email} </Text>
            </View>
          )}
          keyExtractor={item => item.username}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
