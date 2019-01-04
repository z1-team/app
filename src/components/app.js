import { h, Component } from 'preact'
import { Router } from 'preact-router'
import Match from 'preact-router/match'
import { Provider } from 'preact-redux'
import store from '../store'

import HeaderContainer from '../containers/HeaderContainer'
import IntroContainer from '../containers/IntroContainer'
import ModerationContainer from '../containers/ModerationContainer'
import TestimonialsContainer from '../containers/TestimonialsContainer'
import FooterContainer from '../containers/FooterContainer'
import PopupsContainer from '../containers/PopupsContainer'

import Main from '../routes/main'
import NotFound from '../routes/not-found'

import UsefullInfo from './usefull-info'

const displayIntro = ({matches, path, url}) => (
	url === '/' || url === '/cards' ? <IntroContainer url={url} /> : null
)
const categoriesTitle = (url) => {
	switch(url) {
		case '/':
			return 'Займы по категориям'
		case '/cards':
			return 'Кредитные карты по категориям'
		default:
			return ''
	}
}
const categoriesToggle = (onToggle) => ({matches, path, url}) => (
		url === '/' || url === '/cards' ? <button class="categories-button" onClick={onToggle}>{categoriesTitle(url)}</button> : null
)

class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url
	}

	handleCategories = () => {

	}

	render() {
		return (
			<Provider store={store}>
				<div id="app">
					<HeaderContainer />
					<Match path="/">{displayIntro}</Match>
					<Router onChange={this.handleRoute}>
						<Main path="/" partners="mfo" />
						<Main path="/cards" partners="cards" />
						<ModerationContainer path="/moderate" />
						<TestimonialsContainer path="/testimonials/:id" />
						<NotFound default />
					</Router>
					<UsefullInfo />
					<FooterContainer />
					<PopupsContainer />
					<Match>{categoriesToggle(this.handleCategories)}</Match>
				</div>
			</Provider>
		)
	}
}

export default App
