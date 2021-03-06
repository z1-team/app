import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import CardInfo from './info'
import StarRating from 'common/components/StarRating'
import Icon from 'common/components/Icon'
import { getWays } from './icons'

import style from './style.scss'
import icons from './icons.scss'

class Card extends Component {
  handleOrder = (event) => {
    const {item, onOrder} = this.props
    const source = event.target.getAttribute('data-source')
    if (typeof onOrder === 'function') {
      onOrder(item.id, item.main.title, source)
    }
  }

  handleEdit = () => {
    const {onEdit, dataID} = this.props

    if(typeof onEdit === 'function') {
      onEdit(dataID)
    }
  }

  handleOpen = () => {
    const {onMore, item} = this.props

    if(typeof onMore === 'function') {
      onMore(item.id, item.main.title)
    }
  }

  getWays() {
      const { item } = this.props
      const { get_ways } = item.filters

      if(get_ways) {
        const secureGetWays = get_ways.length < 8 ? [true].concat(get_ways) : get_ways
        return secureGetWays.map((item, index) => (
          item ? getWays[index] : false
        )).filter(i => i)
      }

      return false
  }

  getEnding() {
    const { item } = this.props
    const count = item.sortBy.testimonials_count
    const ending = count%10

    switch(ending) {
      case 1:
      case 2:
      case 3:
      case 4:
        return "отзыва"
      case 0:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      default:
        return "отзывов"
    }
  }

  render({item, tail, edit}) {
    const rating = Math.round(item.sortBy.rating*10)/10
    const star = Math.round(item.sortBy.rating*20)
    const label = item.main.special_label ? item.main.special_label : ''
    const unpublished = theme => item.main.isPublished || item.main.isPublished === undefined ? '' : `theme-${theme}-border ${style.unpublished}`

    return (
      <div class={`${style.card} ${style[label]}`}>
        {label === 'big_summ' ? <span class={style.label}>На большую сумму</span> : ''}
        {label === 'long_term' ? <span class={style.label}>На долгий период</span> : ''}
        {label === 'quick_solution' ? <span class={style.label}>Быстрое решение</span> : ''}
        {label === 'recommend' ? <span class={style.label}>Рекомендуем!</span> : ''}
        <section>
          <figure>
            <a
              target="_blank"
              href={`${item.main.link}?${tail}`}
              rel="nofollow noopener"
              data-source="image"
              onClick={this.handleOrder}
              >
                <img src={item.main.logo} />
              </a>
            </figure>
            <div class={style.info}>
              <h3>
                <a
                  target="_blank"
                  href={`${item.main.link}?${tail}`}
                  rel="nofollow noopener"
                  data-source="title"
                  onClick={this.handleOrder}
                  >
                    {label === 'recommend' ? <Icon icon="gripfire" /> : ''}
                    {item.main.title}
                  </a>
                </h3>
                <div class={style.rating}>
                  <StarRating rating={item.sortBy.rating} />
                  <p><Link href={`/testimonials/${item.id}`}>{item.sortBy.testimonials_count} {this.getEnding()}</Link> {item.sortBy.rating && `(${rating} из 5)`}</p>
                </div>
                {item.type === 'mfo' && item.main &&
                <ul class={style.pros}>
                  {item.main.money && <li><Icon icon="money" /><strong>{item.main.money}</strong> руб.<div class={style.tooltip}>Сумма займа</div></li>}
                  {item.main.term && <li><Icon icon="calendar" /><strong>{item.main.term}</strong><div class={style.tooltip}>Срок займа</div></li>}
                  {item.main.minRate && <li><Icon icon="percent" />от <strong>{item.main.minRate}</strong> в день<div class={style.tooltip}>Процентная ставка</div></li>}
                </ul>
              }
              {item.type === 'cards' && item.main &&
              <ul class={style.pros}>
                {item.main.limit && <li><Icon icon="credit-card" /><strong>{item.main.limit}</strong> руб.<div class={style.tooltip}>Лимит по карте</div></li>}
                {item.main.percent && <li><Icon icon="percent" />от <strong>{item.main.percent}</strong><div class={style.tooltip}>Процентная ставка</div></li>}
                {item.main.cashback && <li><Icon icon="money" /><strong>{item.main.cashback}</strong><div class={style.tooltip}>Кешбэк</div></li>}
              </ul>
            }
            {this.getWays() &&
              <ul class={style.options}>
                <li>Способы получения: <span>{this.getWays().map(item => (<i key={item} class={`${icons.icon} ${icons[item]}`}></i>))}</span></li>
              </ul>
            }
          </div>
          <div class={style.process}>
            {edit && <button onClick={this.handleEdit}><Icon icon="edit" /></button>}
            <a
              target="_blank"
              href={`${item.main.link}?${tail}`}
              rel="nofollow noopener"
              data-source="button"
              onClick={this.handleOrder}
              >Оформить</a>
            {item.main.firstLoan && <span class={style.processFirstLoan}>{item.main.firstLoan}</span>}
          </div>
        </section>
        <CardInfo firstLoan={item.main.firstLoan} details={item.details} onOpen={this.handleOpen} />
      </div>
    )
  }
}

export default Card
