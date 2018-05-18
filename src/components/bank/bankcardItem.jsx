/**
 *
 *  Created by youli on 2017/11/16
 *
 */
import React, { PropTypes } from 'react';
import { List, WingBlank } from 'antd-mobile';
import { Image } from '../img/img';
import { getUrl } from '../../utils/imgTool';
import { bankCardNo } from '../../utils/format';
import { bankList, commonBank } from './common';
import * as style from './bankcardItem.less';


const bankcardItem = ({
                        data = {},
                        click = () => {
                        }
                      }) => {
  const { BankName, BankCardNo, BankCode, HolderName } = data;
  let bank = bankList.filter(item => (item.bankCode === BankCode))[0];
  if (!bank || bank.length === 0) {
    bank = commonBank;
  }
  return (
    <WingBlank>
      <List className={style.bankItem} style={{ backgroundColor: bank.bgColor }}>
        <List.Item
          onClick={click} thumb={
            <div className={style.logo}>
              <Image src={getUrl(bank.imgSrc)} maxWidth={36} rate={1} />
            </div>
        }
        >
          {BankName}{HolderName ? `（${HolderName}）` : ''}
          <List.Item.Brief>
            {bankCardNo(BankCardNo)}
          </List.Item.Brief>
        </List.Item>
      </List>
    </WingBlank>
  );
};
bankcardItem.propTypes = {
  data: PropTypes.object,
  click: PropTypes.func
};

export default {
  bankcardItem
};
