import React, {Component} from 'react';

import {
  Image,
  Modal,
  Platform,
  Text,
  TextInput,
  View
} from 'react-native';

import {
  Badge,
  Button,
  Divider,
  Header,
  List,
  ListItem,
  Icon,
  SearchBar
} from 'react-native-elements';

import hash from 'object-hash';

import styles from './styles.js';
import constants from './constants.js';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.fetchApi = this.fetchApi.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      isLoading: false,
      isModalVisible: false,
      inputValue: '',
      filter: 'All',
      resultPlaceholder: 'close search',
      queryResult: []
    };
  }

  closeModal() { // <--------------------------------------------------------------------- handlers
    this.setState({
      isLoading: false,
      isModalVisible: false,
      resultPlaceholder: 'close search',
    });
  }

  fetchApi(text) {
    if (text) {
      this.setState({
        isLoading: true,
        isModalVisible: true,
      });

      fetch(`${constants.API}${text}`)
        .then(response => response.json())
        .then(result => {
          const state = {};

          state.isLoading = false;

          if (result.length) {
            state.queryResult = result;
          } else {
            state.resultPlaceholder = 'we have no results';
          }

          this.setState({...this.state, ...state});
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            resultPlaceholder: error.message,
          });
        });
    }
  }

  renderSearchBar() { // <---------------------------------------------------------------- elements
    return (
      <View style={styles.containerTextInput}>
        <TextInput
          style={styles.textInput}
          value={this.state.inputValue}
          placeholder='Start typing'
          underlineColorAndroid='transparent'
          onChangeText={(inputValue) => this.setState({inputValue})}
        />
        <Icon
          name='search'
          type='font-awesome'
          color={constants.brandGreen}
          onPress={() => this.fetchApi(this.state.inputValue)}
        />
      </View>
    )
  }
  
  renderLogo() {
    return (
      <View>
        <Image
          source={constants.logo}
        />
      </View>
    )
  }
  
  renderMenu() {
    return (
      <View style={styles.containerMenu}>
        <Icon
          name='menu'
        />
      </View>
    )
  }
  
  renderStartPage() {
    return (
      <View style={styles.containerStartPage}>
        <View>
          <Image
            style={styles.pic}
            source={constants.pic}
          />
        </View>
        <View style={styles.containerDescription}>
          <Text style={styles.mainText}>
            {constants.descriptionMainText}
          </Text>
          <Text style={styles.startingFrom}>
            starting from
          </Text>
          <View style={styles.containerPrice}>
            <Text style={styles.priceValue}>
              1000
            </Text>
            <Text style={styles.priceCurrency}>
              THB
            </Text>
          </View>
          <Text style={styles.priceWas}>
            was 2200
          </Text>
        </View>
      </View>
    )
  }
  
  renderModalButtonsGroup() {
    const renderOne = (button) =>
      <Button
        key={button}
        title={button}
        onPress={() => this.setState({filter: button})}
        
        buttonStyle={this.state.filter === button
          ? styles.modalButtonsActive
          : styles.modalButtonsInactive}
        
        textStyle={this.state.filter === button
          ? styles.modalButtonsTitleActive
          : styles.modalButtonsTitleInactive}
      />;
      
    return (
      <View style={styles.containerModalButtonsGroup}>
        {constants.modalButtonsGroup.map(button => renderOne(button))}
      </View>
    )
  }
  
  renderSuggestions() {
    const {queryResult} = this.state;
    const conditional = {};
    
    const renderOne = (item, index) => {
      const icon = item.icon === 'map-marker-alt'
        ? 'map-marker'
        : item.icon === 'dollar-sign'
            ? 'dollar'
            : item.icon;
      
      if (index) {
        let textArray = item.text.split(' ');
  
        conditional.place = textArray.pop();
        textArray.push(' ');
        conditional.text = textArray.join(' ');
        
        conditional.rightElement = (
          <Badge
            value={item.count}
            textStyle={styles.listItemBadgeText}
            containerStyle={styles.listItemBadgeContainer}
          />
        );
        
        conditional.titleElement = (
          <Text style={styles.listItemTitleText}>
            {conditional.text}
            <Text style={styles.listItemTitlePlace}>
              {conditional.place}
            </Text>
          </Text>
        );
        
      } else {
        let textArray = item.text.split(', ');
  
        conditional.place = textArray.shift();
        textArray.unshift(', ');
        conditional.text = textArray.join('');
        
        conditional.rightElement = (
          <Icon
            name='keyboard-arrow-up'
            color={constants.brandGreen}
          />
        );
  
        conditional.titleElement = (
          <Text style={styles.listItemTitlePlace}>
            {conditional.place}
            <Text style={styles.listItemTitleText}>
              {conditional.text}
            </Text>
          </Text>
        )
      }
      
      return (
        <ListItem
          key={hash(item)}
          title={conditional.titleElement}
          rightIcon={conditional.rightElement}
          
          leftIcon={
            <Icon
              name={icon}
              type='font-awesome'
              color={constants.brandGreen}
              containerStyle={styles.containerListItemIcon}
            />
          }
        >
          <Divider />
        </ListItem>
      )
    };
    
    return (
      <View>
        <List>
          {queryResult.map((item, index) => renderOne(item, index))}
        </List>
      </View>
    )
  }
  
  renderModal() {
    const conditionalElement = this.state.queryResult.length
      ? (<View>
          {this.renderModalButtonsGroup()}
          {this.renderSuggestions()}
        </View>)
      : null;
    
    return (
      <View>
        <Modal
          animationType='fade'
          presentationStyle='overFullScreen'
          visible={this.state.isModalVisible}
          onRequestClose={this.closeModal}
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <SearchBar
              lightTheme
              clearIcon
              noIcon
              editable={false}
              onCancel={this.closeModal}
              onClearText={this.closeModal}
              showLoadingIcon={this.state.isLoading}
              placeholder={this.state.resultPlaceholder}
              containerStyle={styles.containerSearchBar}
              inputStyle={styles.searchBarInput}
              platform={Platform.OS}
            />
            {conditionalElement}
          </View>
        </Modal>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.containerMain}>
        <Header
          leftComponent={this.renderLogo()}
          centerComponent={this.renderSearchBar()}
          rightComponent={this.renderMenu()}
          outerContainerStyles={styles.containerHeader}
        />
        {this.renderStartPage()}
        {this.renderModal()}
      </View>
    );
  }
};
