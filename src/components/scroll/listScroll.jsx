/**
 *
 *  Created by youli on 2017/11/11
 *
 */

import React, {PropTypes} from 'react';
import {ListView, ActivityIndicator} from 'antd-mobile';
import {windowHeight} from '../../utils/window';
import {http} from '../../utils/request';
import {CustomIcon} from '../icon/customIcon';
import {setStorage, storageKey, getStorage} from '../../utils/storage';
import * as style from './listScroll.less';

class ListScroll extends React.Component {
  constructor(props) {
    super(props);

    const {
      diffHeight = 0,
      setReloadPage = () => {
      }
    } = this.props;


    const dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID][rowID],
      rowHasChanged: (row1, row2) => {
        const keys1 = Object.keys(row1);
        const keys2 = Object.keys(row2);
        if (keys1.length != keys2.length) {
          return true;
        }
        const result = keys1.filter(item => row1[item] !== row2[item]);

        return result.length > 0;
      }
    });

    setReloadPage(this.reloadPage.bind(this), this.setListViewCache.bind(this, this.props.listname));

    this.state = {
      dataSource,
      rows: [],
      height: (windowHeight - 45 - diffHeight),
      dataEmpty: false,
      isloading: false,
      pageIndex: 0,
      pageSize: 50,
      hasMore: true,
      initialListSize: 20,
    };
  }

  componentDidMount() {
    this.getListViewCache();
  }

  getListViewCache = () => {
    let list_cache = getStorage(storageKey.adminOrder_orderlist_cache);
    const {scrollProperties, state, action} = list_cache || {};
    const {listname, setChangeData, dataProps} = this.props;
    if (!state || !scrollProperties || !action || listname !== action) {
      this.fetchPage();
      return;
    }
    const {rows = [], pageIndex = 0, pageSize = 50, hasMore = true,} = state;
    const {offset = 0} = scrollProperties;
    const {dataSource} = this.state;

    setChangeData({
      responseData: {
        count: rows.length,
        data: rows,
      },
      changeDataSource: this.changeDataSource,
      listRow: rows,
    });
    this.setState({
      isloading: false,
      dataSource: dataSource.cloneWithRows(rows),
      dataEmpty: rows.length === 0,
      initialListSize: rows.length<20?20:rows.length,
      scrollProperties,
      pageSize,
      pageIndex,
      rows,
      hasMore,
    }, () => {
      this.lv.scrollTo(0, offset)
    });
  }

  setListViewCache = (action, cb = () => {
  }) => {
    const {listviewRef = {}} = this.lv;
    const {scrollProperties: newscrollProperties = {}} = listviewRef;
    const {scrollProperties: oldscrollProperties = {}} = this.state;
    const {requestData={}}=this.props;
    let scrollProperties = newscrollProperties;

    if (!newscrollProperties.offset && newscrollProperties.offset !== oldscrollProperties.offset) {
      scrollProperties = oldscrollProperties;
    }
    const data = {
      action,
      requestData,
      scrollProperties,
      state: {
        pageSize: this.state.pageSize,
        pageIndex: this.state.pageIndex,
        rows: this.state.rows,
        hasMore: this.state.hasMore,
      },
    };
    setStorage(storageKey.adminOrder_orderlist_cache, JSON.stringify(data))
    cb();
  }

  onEndReached = () => {
    this.fetchPage();
  }

  changeDataSource = (data) => {
    const {dataSource} = this.state;
    this.setState({
      rows: data,
      dataSource: dataSource.cloneWithRows(data),
    })
  }


  fetchPage = () => {
    const {api, hasPage, dataProps, requestData, setChangeData, localdatasource} = this.props;
    const {pageIndex, pageSize, isloading, hasMore} = this.state;
    const getDataCallBack = (result) => {

    };

    if (isloading || !hasMore) {
      return;
    }

    // 读取本地数据
    if (!api && localdatasource) {
      const {dataSource} = this.state;

      this.setState({
        isloading: false,
        hasMore: false,
        rows: localdatasource,
        dataSource: dataSource.cloneWithRows(localdatasource),
        dataEmpty: localdatasource.length === 0,
        initialListSize:localdatasource.length
      });

      return;
    }

    // 读取服务器数据
    this.setState({
      isloading: true,
      pageIndex: (pageIndex + 1)
    }, () => {
      const {pageIndex: newPageIndex, pageSize, dataSource, rows = []} = this.state;
      http(api, {...requestData, pageIndex: newPageIndex, pageSize}, true)
        .then((result) => {
          const data = dataProps ? result[dataProps] : result;
          const listRow = rows.concat(data);

          try {
            setChangeData({
              responseData: result,
              changeDataSource: this.changeDataSource,
              listRow: listRow.map(item => ({...item})),
            });
          }
          catch (ex){
            console.log(ex)
          }

          this.setState({
            isloading: false,
            hasMore: hasPage ? (data.length === pageSize) : false,
            rows: listRow,
            dataSource: dataSource.cloneWithRows(listRow),
            dataEmpty: (newPageIndex === 1 && listRow.length === 0)
          });
        })
        .catch(() => (
          this.setState({
            isloading: false
          })
        ));
    });
  }

  reloadPage = () => {
    this.setState({
      pageIndex: 0,
      rows: [],
      hasMore: true
    }, () => this.fetchPage());
  }

  render() {
    const {height, dataSource, hasMore, dataEmpty, isloading, pageIndex, initialListSize} = this.state;
    const {renderRow, hideTips} = this.props;
    return (
      <div>
        <ActivityIndicator text="正在加载" toast animating={pageIndex === 1 && isloading}/>
        <div
          className={(!hideTips && dataEmpty) ? style.empty : 'component-hide'}
        >
          <CustomIcon className={style.icon} type={require('../../assets/icon/nodata1.svg')}/>
          <p className={style.noMore}>暂无相关数据</p>
        </div>
        <ListView
          ref={el => this.lv = el}
          style={{height: `${height}px`}}
          className={`${style.list} ${dataEmpty ? 'component-hide' : ''}`}
          renderRow={renderRow}
          dataSource={dataSource}
          initialListSize={initialListSize}
          onEndReached={this.onEndReached}
          renderFooter={() => (<p className={hasMore ? 'component-hide' : style.noMore}>暂无更多</p>)}
        />
      </div>
    );
  }
}

ListScroll.propTypes = {
  hasPage: PropTypes.bool,
  diffHeight: PropTypes.number,
  dataProps: PropTypes.string,
  requestData: PropTypes.object,
  setChangeData: PropTypes.func,
  setReloadPage: PropTypes.func,
  renderRow: PropTypes.func,
  hideTips: PropTypes.bool
};
ListScroll.defaultProps = {
  localdatasource: undefined,
  hasPage: true,
  hideTips: false,
  diffHeight: 0,
  api: {},
  dataProps: '',
  requestData: {},
  setChangeData: () => {
  },
  setReloadPage: () => {
  },
  renderRow: () => {
  }
};

export default {
  ListScroll
};
