import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { SearchBar } from 'react-native-elements'
import * as _ from 'lodash';

import style, { primaryColor } from './../styles/styles';
import Constant from '../utilities/constants';

import SearcResult from './SearchResult';
import SearchResult from './SearchResult';
  
export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      searchInProgress: false
    }
  }

  onTextChange = (e) => {
    let { api_base_url, lan_region, api_key } = Constant;
    const searchUrl = '/search/multi';

    // Search only is there is any value
    if (e) {
      const url = `${api_base_url}${searchUrl}?${api_key}${lan_region}&query=${encodeURIComponent(e)}`;

      this.setState({
        searchInProgress: true
      });
  
      fetch(url)
      .then((res) => res.json())
      .then(res => {
        this.setState({
          searchResult: res.results,
          searchInProgress: false
        });
      }, (err) => {
        console.log('Error', err);
      });
    }
  }

  onClearText = () => {}

  // Redirect user to respective screen based on search result
  onSelectItem = (item) => {
    switch(item.media_type) {
      case 'movie':
        this.props.navigation.navigate('MovieDetails', {item});
        break;

      case 'tv':
        this.props.navigation.navigate('TvShowDetails', {item});
        break;
      
      case 'person':
        this.props.navigation.navigate('CastDetails', {cast: item});
        break;
      
      default:
        console.log('Unrecognised media type');
        break;
    }
  }

  render() {
    const {searchResult, searchInProgress} = this.state;

    return (
        <View>
          <SearchBar
            style={{marginTop: 20}}
            round
            onChangeText={_.debounce(this.onTextChange, 1000)}
            onClearText={this.onClearText}
            placeholder='Search' />

            <View>
            {/* <Text>Search Results</Text> */}
            {searchInProgress ? 
              <ActivityIndicator size="large" color={primaryColor}/> :
              <SearchResult items={searchResult} onSelect={this.onSelectItem}/>}
            </View>
        </View>
    );
  }
}
