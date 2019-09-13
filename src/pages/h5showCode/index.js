import React, {Component, Fragment} from 'react';

import './index.css'
import JsBarcode from 'jsbarcode';
import util from '../../utils/base'


class Home extends Component {
    state = {
        activeList: null,
        couponList: []
    };

    componentWillMount() {
        document.title='券码详情'

    }

    componentDidMount() {
        JsBarcode(this.barcode, util.getQueryString('code'), {
            displayValue: false,
            width: 0.6,
            height: 50,
            margin: 0,
        });
    }


    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        return (
            <div className={'container'}>
                <div className="barcode-box">
                    您的券码：
                    <div className={'center'}>
                        <svg
                            ref={(ref) => {
                                this.barcode = ref;
                            }}
                        />
                    </div>
                </div>
            </div>

        );
    }
}


export default Home