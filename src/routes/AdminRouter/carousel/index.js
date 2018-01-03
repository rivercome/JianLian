import React from 'react'
import {Card, Row, Col} from 'antd'
import Carousel from './carouselBox'
import './index.less'

export default class ArticleView extends React.Component {
  render () {
    return (
      <div className='admin-carousel'>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className='admin-carousel-box'>
            <Card title='轮播图1' className='admin-carousel-box-card' hoverable>
              <Carousel id={1} />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className='admin-carousel-box'>
            <Card title='轮播图2' className='admin-carousel-box-card' hoverable>
              <Carousel id={2} />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className='admin-carousel-box'>
            <Card title='轮播图3' className='admin-carousel-box-card' hoverable>
              <Carousel id={3} />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className='admin-carousel-box'>
            <Card title='轮播图4' className='admin-carousel-box-card' hoverable>
              <Carousel id={4} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
