import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import './index.less';
/**
 * [子组件显示方式]
 * @param  {[type]}    options.term      [标题（如a:b中的a）]
 * @param  {[type]}    options.column    [占比行数]
 * @param  {[type]}    options.className [自定义样式]
 * @param  {[type]}    options.children  [子内容]
 * @param  {...[type]} options.restProps [其它拓展参数]
 * @return {[type]}                      [description]
 */
const Description = ({ term, column, className, children, ...restProps }) => {
  const clsString = `description ${className}`;
  const responsive = {
    1: { xs: 24 },
    2: { xs: 24, sm: 12 },
    3: { xs: 24, sm: 12, md: 8 },
    4: { xs: 24, sm: 12, md: 6 },
  };
  return (
    <Col className={clsString} {...responsive[column]} {...restProps}>
      {term && <div className='term'>{term}</div>}
      {children !== null &&
        children !== undefined && <div className='detail'>{children}</div>}
    </Col>
  );
};

Description.defaultProps = {
  term: '',
};

Description.propTypes = {
  term: PropTypes.node,
};

export default Description;
