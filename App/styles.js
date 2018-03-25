import {
  Platform,
  StyleSheet,
} from 'react-native';

import constants from './constants.js';


const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  containerHeader: {
    width: '95%',
    margin: 'auto',
    height: constants.headerHeight,
    backgroundColor: '#fff',
  },
  containerTextInput: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  textInput: {
    width: '70%',
    marginRight: 10,
    color: '#000',
    textAlign: 'right',
    fontSize: 17
  },
  containerMenu: {
    marginLeft: 10,
    marginBottom: 7
  },
  containerStartPage: {
    flex: 1
  },
  containerDescription: {
    flex: 1,
    marginLeft: 20
  },
  pic: {
    width: '100%'
  },
  mainText: {
    marginVertical: 20,
    color: '#000',
    fontSize: 20
  },
  containerPrice: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  startingFrom: {
    color: constants.brandRed
  },
  priceValue: {
    color: constants.brandRed,
    fontSize: 20
  },
  priceCurrency: {
    color: constants.brandRed,
    fontSize: 11
  },
  priceWas: {
    textDecorationLine: 'line-through'
  },
  modalContainer: {
    marginTop: constants.headerHeight + 1,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  containerSearchBar: {
    width: '100%',
    paddingLeft: 20,
    backgroundColor: '#fff'
  },
  searchBarInput: {
    color: '#000',
    backgroundColor: '#fff'
  },
  containerModalButtonsGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
    marginBottom: 10
  },
  modalButtonsActive: {
    height: 20,
    borderRadius: 2,
    borderColor: constants.brandGreen,
    backgroundColor: constants.brandGreen
  },
  modalButtonsInactive: {
    height: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: constants.brandGray,
    backgroundColor: '#fff'
  },
  modalButtonsTitleActive: {
    fontSize: 14,
    color: '#fff'
  },
  modalButtonsTitleInactive: {
    fontSize: 14,
    color: constants.brandGray
  },
  containerListItemIcon: {
    marginHorizontal: 15
  },
  listItemTitlePlace: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  listItemTitleText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'normal'
  },
  listItemBadgeContainer: {
    backgroundColor: 'transparent'
  },
  listItemBadgeText: {
    color: constants.brandGray
  },
});

export default styles;
