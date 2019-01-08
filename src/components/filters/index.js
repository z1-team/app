import { h, Component } from 'preact'

import { mfoFilters, cardsFilters } from './filters'

import CheckboxFilter from './checkbox'
import RadioFilter from './radio'
import SearchModule from './module'
import RangeInput from '../range-input'

const filterName = {
  mfo: mfoFilters,
  cards: cardsFilters
}

class Filters extends Component {
  constructor(props) {
		super(props)

		this.state = {
			summ_value: 1,
			term_value: 1,
			limit_value: 1,
			rate_value: 1
		}
	}

  handleChange = (name, value) => {
    const {onChange} = this.props

    if(this.state[name] && value === null) {
			this.setState(prev => ({
				[name]: prev[name]+1
			}))
		}

    onChange(name, value)
  }

  filtersType(filter) {
    const {filters, actual, onChange} = this.props
    const counter = this.state

    switch(filter.type) {
      case 'checkbox':
        return (
          <CheckboxFilter name={filter.name}
  					items={filter.items}
  					value={filters[filter.name]}
  					actual={actual[filter.name] || null}
  					onChange={onChange} />
        )
      case 'radio':
        return (
          <RadioFilter name={filter.name}
  					items={filter.items}
  					value={filters[filter.name]}
  					actual={actual[filter.name] || null}
  					onChange={onChange} />
        )
      case 'range':
        return (
          <RangeInput key={counter[filter.name]}
            name={filter.name} label={filter.label}
            start={filter.start} end={filter.end} step={filter.step}
            onChange={onChange} />
        )
      default:
        return <div>{filter.type} is not defined in switch</div>
    }
  }

  render({url, total, location, onChange}) {
    const place =	typeof location !== 'undefined' ? location.city || location.place : 'вашем городе'
    const filters = filterName[url] || filterName.mfo

    return (
      <div class="sidebar">
        <p>Всего микрозаймов: <strong>{total}</strong><br/>Найдено в: <strong>{place}</strong></p>
      {filters.map(filter => (
        <SearchModule title={filter.title} name={filter.name} onChange={onChange}>
          {this.filtersType(filter)}
  			</SearchModule>
      ))}
      </div>
    )
  }
}

export default Filters
