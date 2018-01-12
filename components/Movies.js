import React, {Component} from 'react';
import {Text, ScrollView, View} from 'react-native';
import HorizontalImageList from './ImageList';
import Carousel from './Carousel';

import style, { StackNavHeaderStyles } from '../styles/styles';

// TODO: Implement Configuration and LatestMovies
import {Configuration} from '../data/configuration';
import {LatestMovies} from '../data/latest_movies';

class Movies extends Component {
  static navigationOptions = {
    title: 'Movies',
    ...StackNavHeaderStyles,
  };

  showMovieDetails(movie) {
    this.props.navigation.navigate('MovieDetails', {movie: movie});
  }

  showAllMovies(category, movies) {
    this.props.navigation.navigate('AllMovies', 
      {category: category, movies:movies});
  }

  getMoviesList() {
    const baseUrl = Configuration['images']['secure_base_url'];
    const posterSize = Configuration['images']['poster_sizes'][0];
    let movies = [];
    LatestMovies.results.forEach(function(movie) {
        movie['uri'] = baseUrl + '/' + posterSize + '/' + movie['poster_path'];
        movies.push(movie);
      });
    return movies;
  }

  getComingSoonMovieList() {
    const baseUrl = Configuration['images']['secure_base_url'];
    const logoSize = Configuration['images']['backdrop_sizes'][0];
    let movies = [];
    LatestMovies.results.forEach(function(movie) {
        movie['uri'] = baseUrl + '/' + logoSize + '/' + movie['backdrop_path'];
        movies.push(movie);
      });
    return movies;
  }

  render() {
    const {navigate} = this.props.navigation;
    const movies = this.getMoviesList();
    // TODO: should get movies list as props?
    const categories = [
      {
        "title": "Now Showing",
        "movies": movies
      }, {
        "title": "Coming Soon",
        "movies": movies
      }, {
        "title": "Popular",
        "movies": movies
      }
    ];

    return (
      <ScrollView style={style.screenBackgroundColor}>
        <Carousel 
          movies={this.getComingSoonMovieList()} 
          onPress={this.showMovieDetails.bind(this)}
        />
        {categories.map((category, index) => (
          <HorizontalImageList
            isTouchableImage
            hasSeeAllOption
            key={index}
            title={category.title}
            style={style.posterSize}
            onShowAll={this.showAllMovies.bind(this)}
            onPress={this.showMovieDetails.bind(this)}
            images={category.movies}
          />
        ))}
      </ScrollView>
    );
  }
}

export default Movies;
