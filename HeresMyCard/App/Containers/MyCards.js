import React from 'react'
import { View, Text, FlatList, Image, ImageBackground } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, DeckSwiper, Item, Input } from 'native-base'
import FooterScreen from './FooterScreen'
import { connect } from 'react-redux'
import axios from 'axios'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/MyCardsStyle'
import emitbiz from '../Images/emitbiz.jpg'
import oldEmptyShelf from '../Images/oldEmptyShelf.jpg'
import mainBackground from '../Images/main-background.jpg'

class MyCards extends React.PureComponent {
  constructor(){
    super()

    this.state = {
      user: null,
      dataObjects: [
        {title: 'First Title', description: 'First Description', card: emitbiz},
        {title: 'Second Title', description: 'Second Description', card: null},
        {title: 'Third Title', description: 'Third Description', card: null},
        {title: 'Fourth Title', description: 'Fourth Description', card: null},
        {title: 'Fifth Title', description: 'Fifth Description', card: null},
        {title: 'Sixth Title', description: 'Sixth Description', card: null},
        {title: 'Seventh Title', description: 'Seventh Description', card: null}
      ]
    }

  }

  componentDidMount() {
    this.setState({
      user: this.props.navigation.state.params.user
    })
  }
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}) {
    // console.log('this is in renderRow!', item)

    return (
      <Card>
           {/* <CardItem>
             <Left>
               <Thumbnail source={{uri: 'Image URL'}} />
               <Body>
                 <Text>{item.title}</Text>
               </Body>
             </Left>
           </CardItem> */}
           <CardItem cardBody>
             <Image source={{uri: item}} style={{height: 200, width: null, flex: 1}}/>
           </CardItem>
           {/* <CardItem>
             <Left>
               <Button transparent>
                 <Icon active name="thumbs-up" />
                 <Text>12 Likes</Text>
               </Button>
             </Left>
             <Body>
               <Button transparent>
                 <Icon active name="chatbubbles" />
                 <Text>4 Comments</Text>
               </Button>
             </Body>
             <Right>
               <Text>11h ago</Text>
             </Right>
           </CardItem> */}
         </Card>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Header searchBar rounded>
      <Icon name="arrow-back" onPress={() => this.props.navigation.goBack()}
        style={{marginRight: 30}}/>
      <Body style={{width: 200}}>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          <Icon name="ios-people" />
        </Item>
        </Body>
      </Header>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
  <ImageBackground source={mainBackground} style={styles.backgroundImage}>
    <Text style={styles.label}> - No Cards yet, get to networking! - </Text>
  </ImageBackground>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 5

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
      console.log('this is the user from received cards', this.props.navigation.state.params.user)
      let {received_cards} = this.props.navigation.state.params.user
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={received_cards}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          // ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {/* <FooterScreen navigation={this.props.navigation}/> */}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MyCards)
