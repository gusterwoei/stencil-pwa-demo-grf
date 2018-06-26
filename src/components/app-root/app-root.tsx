import { Component, Prop, Listen, Element, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { AppToolbar } from '../app-toolbar/app-toolbar';

@Component({
	tag: 'app-root',
	styleUrl: 'app-root.css'
})
export class AppRoot {
	@Prop() history: RouterHistory
	@State() mShowToolbar: boolean = false;

	@Listen('showToolbarEvent')
	handleShowToolbarEvent(event: CustomEvent) {
		// console.log(event)
		this.mShowToolbar = true
	}

	componentWillLoad() {
		// listening to back button pressed
		window.addEventListener('popstate', (event) => {
			let url = window.location.pathname
			this.mShowToolbar = url.trim() != '/'
		})
	}

	render() {
		return (
			<div>
				<app-toolbar visible={this.mShowToolbar} />
				<main>
					<stencil-router>
						{/* stnecil-route-switch is important to ensure direct deep-level url visit will work on production server */}
						<stencil-route-switch scrollTopOffset={0}>
							<stencil-route url="/" component="app-home" exact={true}></stencil-route>
							<stencil-route url="/repos" component="repos-page" exact={false}></stencil-route>
							<stencil-route url="/repo-info/:owner/:repo" component="repo-detail-page" exact={false}></stencil-route>
							<stencil-route url="/test" component="repo-detail-page" exact={false}></stencil-route>
							<stencil-route component="repos-page"></stencil-route>
						</stencil-route-switch>
					</stencil-router>
				</main>
			</div>
		);
	}
}
