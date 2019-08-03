import React from 'react';
import { Row } from 'antd';
import './index.less';
/**
 * [查看详情的外层组件，仿照ant-design来写]
 * @param  {[type]}    options.className [自定义样式]
 * @param  {[type]}    options.title     [大标题]
 * @param  {Number}    options.col       [每行显示数量]
 * @param  {String}    options.layout    [默认样式]
 * @param  {Number}    options.gutter    [栅格间隔]
 * @param  {[type]}    options.children  [子组件]
 * @param  {[type]}    options.size      [大小,small,large,vertical]
 * @param  {...[type]} options.restProps [其它拓展属性]
 * @return {[type]}                      [description]
 */
const DescriptionList = ({
  className,
  title,
  col = 3,
  layout = 'horizontal',
  gutter = 32,
  children,
  size,
  ...restProps
}) => {  
  const column = col > 4 ? 4 : col;
  // 样式
  const clsString = `descriptionList ${size} ${layout} ${className}`
  return (
    <div className={clsString} {...restProps}>
      {title ? <div className='title'>{title}</div> : null}
      <Row gutter={gutter}>
        {React.Children.map(
          children,
          child => (child ? React.cloneElement(child, { column }) : child)
        )}
      </Row>
    </div>
  );
};

export default DescriptionList;
