import { StyleSheet, StatusBar } from 'react-native';
import { pxToDp } from '../../utils';
const statusBarHeight = StatusBar.currentHeight;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  hearder: {
    backgroundColor: '#fff',
  },
  'nav-bar': {
    marginTop: statusBarHeight,
    height: pxToDp(50),
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: pxToDp(18),
    // backgroundColor: 'pink',
  },
  'nav-bar-right': {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: pxToDp(90),
  },
  'user-card': {
    paddingLeft: pxToDp(22),
    paddingBottom: pxToDp(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'card-left': {
    flexDirection: 'row',
    marginTop: pxToDp(20),
  },
  'card-left-img': {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(5),
  },
  'card-left-userinfo': {
    paddingLeft: pxToDp(18),
    justifyContent: 'space-evenly',
  },
  'card-left-nickName': {
    fontSize: pxToDp(20),
    fontWeight: '600',
    color: '#262626',
  },
  'card-left-sencondaryText': {
    fontSize: pxToDp(14),
    color: '#595959',
  },
  'card-left-sencondary': {
    paddingRight: pxToDp(8),
  },
  'card-left-gender': {
    fontSize: pxToDp(14),
    color: '#595959',
  },
  'card-right': {
    paddingRight: pxToDp(22),
  },
  'card-right-button': {
    marginTop: pxToDp(30),
    color: '#262626',
  },
  property: {
    backgroundColor: '#fff',
    marginTop: pxToDp(10),
    marginLeft: pxToDp(12),
    marginRight: pxToDp(12),
    padding: pxToDp(10),
    paddingTop: pxToDp(8),
    borderRadius: pxToDp(6),
  },
  'property-header': {
    height: pxToDp(25),
  },
  'property-title': {
    fontSize: pxToDp(15),
    marginLeft: pxToDp(20),
    fontWeight: '500',
  },
  'property-body': {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
